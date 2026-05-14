import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import { readSanityConfig, stableStringify } from './sanity-sync-utils.mjs';

const CLI_CONFIG_PATH = '/private/tmp/black-opal-sanity-config/sanity/config.json';
const SEED_PATH = path.resolve('sanity/seed.ndjson');
const NEW_DOCUMENT_IDS = ['siteSettings', 'pageCopy', 'aboutPage', 'contactPage'];
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

function isMissing(value) {
  return value === undefined || value === null;
}

async function patchMissingFields(client, id, seedDocument) {
  const remote = await client.getDocument(id);

  if (!remote) {
    return { id, status: 'missing' };
  }

  const set = {};

  for (const [key, value] of Object.entries(seedDocument)) {
    if (key.startsWith('_')) {
      continue;
    }

    if (isMissing(remote[key])) {
      set[key] = value;
    }
  }

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

  for (const id of NEW_DOCUMENT_IDS) {
    const document = seedById.get(id);

    if (!document) {
      throw new Error(`Missing ${id} in ${SEED_PATH}`);
    }

    const before = await client.getDocument(id);
    await client.createIfNotExists(documentForCreate(document), { autoGenerateArrayKeys: true });
    results.push({ id, status: before ? 'exists' : 'created' });
    results.push(await patchMissingFields(client, id, document));
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
