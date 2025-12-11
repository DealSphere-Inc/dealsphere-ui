'use client';

// Re-export the homepage component which now uses the shared layout implicitly via (public)/layout.tsx
// However, the Homepage component currently includes Nav and Footer which we need to remove.
// I will need to refactor src/components/homepage.tsx first. 
// For now, I will create this file to render the Homepage, and then refactor Homepage.

import { Homepage } from '@/components/homepage';
import { PageContainer } from '@/ui';

export default function Page() {
  return <Homepage />;
}
