export interface CapitalCall {
  id: string;
  fundName: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'overdue' | 'collected';
  lpId: string;
}

export interface ComplianceTask {
  id: string;
  title: string;
  deadline: Date;
  complexity: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
}

export interface PortfolioCompany {
  id: string;
  name: string;
  runway: number; // months
  burnRate: number;
  health: number; // 0-100
  lastUpdate: Date;
}

export const getMockCapitalCalls = (): CapitalCall[] => {
  const today = new Date();
  return [
    {
      id: '1',
      fundName: 'Fund II',
      amount: 500000,
      dueDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      status: 'overdue',
      lpId: 'lp1',
    },
    {
      id: '2',
      fundName: 'Fund II',
      amount: 250000,
      dueDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: 'overdue',
      lpId: 'lp2',
    },
    {
      id: '3',
      fundName: 'Fund III',
      amount: 750000,
      dueDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: 'overdue',
      lpId: 'lp3',
    },
    {
      id: '4',
      fundName: 'Fund III',
      amount: 300000,
      dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      status: 'pending',
      lpId: 'lp4',
    },
  ];
};

export const getMockComplianceTasks = (): ComplianceTask[] => {
  const today = new Date();
  return [
    {
      id: '1',
      title: 'Annual Fund Audit',
      deadline: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      complexity: 'medium',
      status: 'in_progress',
    },
    {
      id: '2',
      title: 'SEC Form D Filing',
      deadline: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      complexity: 'high',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Quarterly Investor Report',
      deadline: new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
      complexity: 'low',
      status: 'pending',
    },
  ];
};

export const getMockPortfolioCompanies = (): PortfolioCompany[] => {
  return [
    {
      id: '1',
      name: 'CloudScale',
      runway: 8, // months
      burnRate: 150000,
      health: 78,
      lastUpdate: new Date(),
    },
    {
      id: '2',
      name: 'BioTech Inc',
      runway: 6, // months
      burnRate: 200000,
      health: 65,
      lastUpdate: new Date(),
    },
    {
      id: '3',
      name: 'FinServe',
      runway: 18, // months
      burnRate: 100000,
      health: 92,
      lastUpdate: new Date(),
    },
    {
      id: '4',
      name: 'EduTech',
      runway: 24, // months
      burnRate: 75000,
      health: 88,
      lastUpdate: new Date(),
    },
  ];
};

