'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define User Roles based on Personas
// Primary (Internal) + Secondary (External Stakeholders)
export type UserRole = 'gp' | 'analyst' | 'ops' | 'ir' | 'researcher' | 'lp' | 'auditor' | 'service_provider' | 'strategic_partner';

interface PersonaConfig {
  id: UserRole;
  label: string;
  description: string;
  defaultPath: string;
  category: 'primary' | 'secondary';
}

export const PERSONA_CONFIG: Record<UserRole, PersonaConfig> = {
  // Primary Personas (Internal Team)
  gp: {
    id: 'gp',
    label: 'Strategic Decision Maker (GP)',
    description: 'High-level portfolio performance, deal flow summary, fundraising status.',
    defaultPath: '/dashboard',
    category: 'primary'
  },
  analyst: {
    id: 'analyst',
    label: 'Investment Intelligence Analyst',
    description: 'Deal screening, due diligence data, market research.',
    defaultPath: '/pipeline',
    category: 'primary'
  },
  ops: {
    id: 'ops',
    label: 'Operational Excellence Manager',
    description: 'Fund administration, compliance, back-office tasks.',
    defaultPath: '/fund-admin',
    category: 'primary'
  },
  ir: {
    id: 'ir',
    label: 'Relationship Navigator',
    description: 'LP communications, CRM, contacts.',
    defaultPath: '/lp-management',
    category: 'primary'
  },
  researcher: {
    id: 'researcher',
    label: 'Data-Driven Researcher',
    description: 'Deep dive analytics, market trends, benchmarking.',
    defaultPath: '/reports',
    category: 'primary'
  },
  // Secondary Personas (External Stakeholders)
  lp: {
    id: 'lp',
    label: 'Limited Partner Investor',
    description: 'View fund performance, documents, and capital account.',
    defaultPath: '/lp-portal',
    category: 'secondary'
  },
  auditor: {
    id: 'auditor',
    label: 'Independent Auditor',
    description: 'Access audit trails, compliance records, and reports.',
    defaultPath: '/compliance',
    category: 'secondary'
  },
  service_provider: {
    id: 'service_provider',
    label: 'Service Provider Professional',
    description: 'View assigned tasks, documents, and workflows.',
    defaultPath: '/dashboard',
    category: 'secondary'
  },
  strategic_partner: {
    id: 'strategic_partner',
    label: 'Strategic Partner',
    description: 'Access shared deal flow and co-investment opportunities.',
    defaultPath: '/dealflow-review',
    category: 'secondary'
  }
};

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('user');
    if (savedAuth === 'true' && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Ensure role exists, default to GP if not found (backward compatibility)
        if (!parsedUser.role) {
          parsedUser.role = 'gp';
        }
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse user from local storage', e);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, []);

  const login = (email: string, password: string, role: UserRole = 'gp') => {
    // Mock authentication - default to provided role or GP
    // In a real app, this would come from the backend response
    const mockUser: User = {
      name: 'Alex Morgan',
      email,
      role: role,
      avatar: 'https://i.pravatar.cc/150?u=alex'
    };

    setIsAuthenticated(true);
    setUser(mockUser);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;

    const updatedUser = { ...user, role };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Optional: could redirect here, but better to let the UI react
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, switchRole, user }}>
      {children}
    </AuthContext.Provider>
  );
}



export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
