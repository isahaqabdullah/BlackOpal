import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import { readSanityConfig, stableStringify } from './sanity-sync-utils.mjs';

const CLI_CONFIG_PATH = '/private/tmp/black-opal-sanity-config/sanity/config.json';
const SEED_PATH = path.resolve('sanity/seed.ndjson');
const SITE_IDS = ['black-opal-india', 'black-opal-middle-east'];
const SITE_SPECIFIC_BASE_IDS = ['siteSettings', 'aboutPage'];
const SHARED_DOCUMENT_IDS = ['pageCopy'];
const EXISTING_DOCUMENT_IDS = ['homePage', 'homePage-black-opal-india', 'homePage-black-opal-middle-east', 'productionPage'];

function readCliAuthToken() {
  if (!existsSync(CLI_CONFIG_PATH)) {
    return '';
  }

  try {
    return JSON.parse(readFileSync(CLI_CONFIG_PATH, 'utf8')).authToken || '';
  } catch {
    return '';
  }
}

function readSeedDocuments() {
  return readFileSync(SEED_PATH, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function documentForCreate(document) {
  const { _rev, ...rest } = document;
  return rest;
}

function fieldsForClone(document) {
  if (!document) {
    return {};
  }

  const { _createdAt, _id, _rev, _updatedAt, ...fields } = document;
  return fields;
}

function isMissing(value) {
  return value === undefined || value === null;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function collectMissingFields(remoteValue, seedValue, set, pathParts = []) {
  if (!isPlainObject(seedValue)) {
    return;
  }

  for (const [key, value] of Object.entries(seedValue)) {
    if (key.startsWith('_')) {
      continue;
    }

    const remoteFieldValue = isPlainObject(remoteValue) ? remoteValue[key] : undefined;
    const fieldPath = [...pathParts, key];

    if (isMissing(remoteFieldValue)) {
      set[fieldPath.join('.')] = value;
      continue;
    }

    if (isPlainObject(value) && isPlainObject(remoteFieldValue)) {
      collectMissingFields(remoteFieldValue, value, set, fieldPath);
    }
  }
}

async function patchMissingFields(client, id, seedDocument) {
  const remote = await client.getDocument(id);

  if (!remote) {
    return { id, status: 'missing' };
  }

  const set = {};
  collectMissingFields(remote, seedDocument, set);

  if (!Object.keys(set).length) {
    return { id, status: 'unchanged' };
  }

  await client.patch(id).set(set).commit({ autoGenerateArrayKeys: true });
  return { id, status: 'updated', fields: Object.keys(set) };
}

async function main() {
  const config = readSanityConfig();
  const token = config.writeToken || config.readToken || readCliAuthToken();

  if (!token) {
    throw new Error('No Sanity write-capable token found in env or CLI auth config.');
  }

  const client = createClient({
    apiVersion: config.apiVersion,
    dataset: config.dataset,
    projectId: config.projectId,
    token,
    useCdn: false,
    perspective: 'published',
  });

  const seedDocuments = readSeedDocuments();
  const seedById = new Map(seedDocuments.map((document) => [document._id, document]));
  const defaultHomePage = seedById.get('homePage-black-opal-india');
  const results = [];

  for (const id of SHARED_DOCUMENT_IDS) {
    const document = seedById.get(id);

    if (!document) {
      throw new Error(`Missing ${id} in ${SEED_PATH}`);
    }

    const before = await client.getDocument(id);
    await client.createIfNotExists(documentForCreate(document), { autoGenerateArrayKeys: true });
    results.push({ id, status: before ? 'exists' : 'created' });
    results.push(await patchMissingFields(client, id, document));
  }

  for (const baseId of SITE_SPECIFIC_BASE_IDS) {
    const legacyDocument = await client.getDocument(baseId);

    for (const siteId of SITE_IDS) {
      const id = `${baseId}-${siteId}`;
      const seedDocument = seedById.get(id);

      if (!seedDocument) {
        throw new Error(`Missing ${id} in ${SEED_PATH}`);
      }

      const before = await client.getDocument(id);
      const document = {
        ...documentForCreate(seedDocument),
        ...fieldsForClone(legacyDocument),
        _id: id,
        _type: seedDocument._type,
        siteId,
      };

      await client.createIfNotExists(document, { autoGenerateArrayKeys: true });
      results.push({ id, status: before ? 'exists' : legacyDocument ? 'created-from-shared' : 'created' });
      results.push(await patchMissingFields(client, id, seedDocument));
    }
  }

  for (const id of EXISTING_DOCUMENT_IDS) {
    const document = seedById.get(id) || (id === 'homePage' ? defaultHomePage : undefined);

    if (!document) {
      results.push({ id, status: 'skipped-no-seed' });
      continue;
    }

    results.push(await patchMissingFields(client, id, document));
  }

  console.log(stableStringify(results));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
