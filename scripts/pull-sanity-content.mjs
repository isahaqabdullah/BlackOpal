import {
  createSanitySyncClient,
  fetchCmsDocuments,
  parseSnapshotArg,
  writeSnapshot,
} from './sanity-sync-utils.mjs';

async function main() {
  const snapshotPath = parseSnapshotArg(process.argv.slice(2));
  const client = createSanitySyncClient();
  const documents = await fetchCmsDocuments(client);

  await writeSnapshot(snapshotPath, documents);

  console.log(`Wrote ${documents.length} published Sanity documents to ${snapshotPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
