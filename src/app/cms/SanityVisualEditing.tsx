'use client';

import { useRouter } from 'next/navigation';
import { VisualEditing } from 'next-sanity/visual-editing';

export function SanityVisualEditing() {
  const router = useRouter();

  return (
    <VisualEditing
      zIndex={2147483000}
      refresh={async () => {
        router.refresh();
      }}
    />
  );
}
