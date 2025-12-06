'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface NavigationBadge {
  count: number;
  variant: 'danger' | 'warning' | 'info';
  tooltip?: string;
}

interface NavigationContextType {
  expandedGroups: Set<string>;
  toggleGroup: (groupId: string) => void;
  badges: Record<string, NavigationBadge>;
  updateBadge: (itemId: string, badge: NavigationBadge | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const STORAGE_KEY = 'vestledger-nav-expanded-groups';
const DEFAULT_EXPANDED = new Set(['core-operations']); // Core Operations always expanded

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(DEFAULT_EXPANDED);
  const [badges, setBadges] = useState<Record<string, NavigationBadge>>({});

  // Load expanded state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const combined = new Set(DEFAULT_EXPANDED);
        parsed.forEach((item: string) => combined.add(item));
        setExpandedGroups(combined);
      }
    } catch (error) {
      console.error('Failed to load navigation state:', error);
      setExpandedGroups(DEFAULT_EXPANDED);
    }
  }, []);

  // Save expanded state to localStorage (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const toStore = Array.from(expandedGroups).filter(g => g !== 'core-operations');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch (error) {
        console.error('Failed to save navigation state:', error);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [expandedGroups]);

  const toggleGroup = useCallback((groupId: string) => {
    // Don't allow collapsing core-operations
    if (groupId === 'core-operations') return;

    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }, []);

  const updateBadge = useCallback((itemId: string, badge: NavigationBadge | null) => {
    setBadges(prev => {
      if (badge === null) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: badge,
      };
    });
  }, []);

  const value = {
    expandedGroups,
    toggleGroup,
    badges,
    updateBadge,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
