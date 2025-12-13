'use client'

import { useUIKey } from '@/store/ui';
import type { BadgeData } from '@/data/mocks/hooks/ai-badges';

export function useAIBadges(): BadgeData {
  const { value: badges } = useUIKey<BadgeData>('ai-badges', {});
  return badges;
}
