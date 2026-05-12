import { createSanitySyncClient, SITE_IDS } from './sanity-sync-utils.mjs';

function cloneHomePageDocument(legacyHomePage, siteId) {
  const { _createdAt, _id, _rev, _updatedAt, ...fields } = legacyHomePage;

  return {
    ...fields,
    _id: `homePage-${siteId}`,
    _type: 'homePage',
    siteId,
  };
}

async function main() {
  const client = createSanitySyncClient({ write: true });
  const legacyHomePage = await client.getDocument('homePage');

  if (!legacyHomePage) {
    throw new Error('Could not find legacy Sanity document homePage. Import the current seed or create a homepage first.');
  }

  for (const siteId of SITE_IDS) {
    const targetId = `homePage-${siteId}`;
    const existing = await client.getDocument(targetId);

    if (existing) {
      console.log(`Skipped ${targetId}; it already exists.`);
      continue;
    }

    await client.createIfNotExists(cloneHomePageDocument(legacyHomePage, siteId), {
      autoGenerateArrayKeys: true,
    });
    console.log(`Created ${targetId} from legacy homePage.`);
  }
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
