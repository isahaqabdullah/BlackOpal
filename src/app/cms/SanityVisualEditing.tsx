'use client';

import { useRouter } from 'next/navigation';
import { VisualEditing } from 'next-sanity/visual-editing/client-component';

export function SanityVisualEditing() {
  const router = useRouter();

  return (
    <VisualEditing
      zIndex={2147483000}
      refresh={async () => {
        router.refresh();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }}
    />
  );
}
