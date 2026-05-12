import {
  createSanitySyncClient,
  fetchCmsDocumentsById,
  parseSnapshotArg,
  readSnapshot,
  stableStringify,
  stripRevision,
  systemlessFields,
  documentForCreate,
} from './sanity-sync-utils.mjs';

function hasApplyFlag(argv) {
  return argv.includes('--apply');
}

function assertUniqueIds(documents) {
  const seen = new Set();

  for (const document of documents) {
    if (seen.has(document._id)) {
      throw new Error(`Duplicate document in snapshot: ${document._id}`);
    }

    seen.add(document._id);
  }
}

function diffFields(local, remote) {
  const localFields = systemlessFields(local);
  const remoteFields = systemlessFields(remote);
  const set = {};
  const unset = [];

  for (const [key, value] of Object.entries(localFields)) {
    if (stableStringify(value) !== stableStringify(remoteFields[key])) {
      set[key] = value;
    }
  }

  for (const key of Object.keys(remoteFields)) {
    if (!(key in localFields)) {
      unset.push(key);
    }
  }

  return { set, unset };
}

function summarizePlan({ creates, updates, conflicts, unchanged, apply }) {
  console.log(apply ? 'Apply mode: validating and writing CMS changes.' : 'Dry run: no Sanity documents will be changed.');
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Creates: ${creates.length}`);
  console.log(`Updates: ${updates.length}`);
  console.log(`Conflicts: ${conflicts.length}`);

  if (creates.length) {
    console.log(`Create IDs: ${creates.map((document) => document._id).join(', ')}`);
  }

  if (updates.length) {
    console.log(`Update IDs: ${updates.map(({ local }) => local._id).join(', ')}`);
  }

  if (conflicts.length) {
    console.log('Conflicts:');
    for (const conflict of conflicts) {
      console.log(`- ${conflict.id}: ${conflict.reason}`);
    }
  }
}

async function applyChanges({ creates, updates }) {
  const client = createSanitySyncClient({ write: true });

  for (const document of creates) {
    await client.createIfNotExists(documentForCreate(document), { autoGenerateArrayKeys: true });
    console.log(`Created ${document._id}`);
  }

  for (const { local, remote } of updates) {
    const { set, unset } = diffFields(local, remote);
    let patch = client.patch(local._id).ifRevisionId(local._rev);

    if (Object.keys(set).length) {
      patch = patch.set(set);
    }

    if (unset.length) {
      patch = patch.unset(unset);
    }

    await patch.commit({ autoGenerateArrayKeys: true });
    console.log(`Updated ${local._id}`);
  }
}

async function main() {
  const argv = process.argv.slice(2);
  const apply = hasApplyFlag(argv);
  const snapshotPath = parseSnapshotArg(argv);
  const localDocuments = await readSnapshot(snapshotPath);

  assertUniqueIds(localDocuments);

  const readClient = createSanitySyncClient();
  const remoteDocuments = await fetchCmsDocumentsById(
    readClient,
    localDocuments.map((document) => document._id),
  );
  const remoteById = new Map(remoteDocuments.map((document) => [document._id, document]));
  const creates = [];
  const updates = [];
  const conflicts = [];
  let unchanged = 0;

  for (const local of localDocuments) {
    const remote = remoteById.get(local._id);

    if (!remote) {
      creates.push(local);
      continue;
    }

    if (remote._type !== local._type) {
      conflicts.push({
        id: local._id,
        reason: `remote type is ${remote._type}, snapshot type is ${local._type}`,
      });
      continue;
    }

    if (remote._rev !== local._rev) {
      conflicts.push({
        id: local._id,
        reason: `remote revision ${remote._rev} does not match snapshot revision ${local._rev}`,
      });
      continue;
    }

    if (stableStringify(stripRevision(local)) === stableStringify(stripRevision(remote))) {
      unchanged += 1;
      continue;
    }

    updates.push({ local, remote });
  }

  summarizePlan({ apply, conflicts, creates, unchanged, updates });

  if (conflicts.length) {
    throw new Error('Aborting because the snapshot is stale. Run npm run cms:pull before editing or resolve the conflicting documents manually.');
  }

  if (!apply) {
    console.log('Run npm run cms:push -- --apply to write these changes if the dry run looks correct.');
    return;
  }

  await applyChanges({ creates, updates });
  console.log('CMS push completed without deleting any documents.');
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);

  if (/permission|unauthorized|forbidden|token/i.test(message)) {
    console.error(`${message}\nSet SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN to a Sanity token with write access, then retry.`);
  } else {
    console.error(message);
  }

  process.exitCode = 1;
});
