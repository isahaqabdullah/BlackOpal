# Deployment Rule

All deployable code, configuration, fallback copy, and CMS snapshot changes must be committed to git before deployment.

For this project, the normal deployment path is:

1. Make the code or CMS-related changes locally.
2. Run the relevant verification, usually `npm run build`.
3. Commit the deployable changes to git.
4. Push the commit so Vercel deploys from the repository.

Do not use an uncommitted direct Vercel deploy for normal website updates.

CMS-only content changes may be pushed to Sanity when needed, but the matching local seed or snapshot changes should still be committed afterward so the repo remains the source of truth.
