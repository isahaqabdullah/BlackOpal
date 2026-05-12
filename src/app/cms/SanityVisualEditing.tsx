import { VisualEditing } from '@sanity/visual-editing/react-router';
import { isSanityPreviewActive } from './sanity';
import { useSiteContent } from '../content/SiteContentProvider';

export function SanityVisualEditing() {
  const { refresh } = useSiteContent();

  if (!isSanityPreviewActive()) {
    return null;
  }

  return (
    <VisualEditing
      zIndex={2147483000}
      refresh={async () => {
        await refresh({ showLoading: false });
      }}
    />
  );
}
