'use client'

import { useState } from 'react';
import { PageContainer, PageHeader, Breadcrumb } from '@/ui';
import { Receipt } from 'lucide-react';
import { getRouteConfig } from '@/config/routes';
import { ChartOfAccounts, type Account } from './chart-of-accounts';
import { GeneralLedger, type JournalEntry } from './general-ledger';

const mockAccounts: Account[] = [
  {
    id: '1',
    code: '1000',
    name: 'Cash',
    type: 'asset',
    category: 'current-asset',
    balance: 1250000,
    isActive: true,
    isSystem: false,
    description: 'Operating cash account',
  },
  {
    id: '2',
    code: '2000',
    name: 'Accounts Payable',
    type: 'liability',
    category: 'current-liability',
    balance: 125000,
    isActive: true,
    isSystem: false,
    description: 'Outstanding payables',
  },
];

const mockEntries: JournalEntry[] = [
  {
    id: '1',
    entryNumber: 'JE-2024-001',
    date: new Date('2024-12-01'),
    description: 'Capital call receipt',
    status: 'posted',
    createdBy: 'John Doe',
    createdAt: new Date('2024-12-01'),
    lineItems: [
      {
        id: '1-1',
        accountId: '1',
        accountCode: '1000',
        accountName: 'Cash',
        debit: 500000,
        credit: 0,
      },
    ],
  },
];

export function Accounting() {
  const [selectedTab, setSelectedTab] = useState<string>('chart-of-accounts');
  const routeConfig = getRouteConfig('/accounting');

  return (
    <PageContainer>
      <div className="space-y-6">
          <div>
            {routeConfig && (
          <Breadcrumb
            items={routeConfig.breadcrumbs}
            aiSuggestion={routeConfig.aiSuggestion}
          />
        )}
          </div>

        <PageHeader
          title="Accounting"
          description="Financial accounting and ledger management"
          icon={Receipt}
          aiSummary={{
            text: "Track all financial transactions and account balances. AI recommends monthly reconciliation.",
            confidence: 0.89
          }}
          tabs={[
            { id: 'chart-of-accounts', label: 'Chart of Accounts' },
            { id: 'general-ledger', label: 'General Ledger' }
          ]}
          activeTab={selectedTab}
          onTabChange={(tabId) => setSelectedTab(tabId)}
        />

        <div className="mt-6">
          {selectedTab === 'chart-of-accounts' && (
            <ChartOfAccounts
              accounts={mockAccounts}
              onAddAccount={(parentId) => console.log('Add account:', parentId)}
              onEditAccount={(accountId) => console.log('Edit account:', accountId)}
              onDeleteAccount={(accountId) => console.log('Delete account:', accountId)}
              onViewLedger={(accountId) => console.log('View ledger:', accountId)}
            />
          )}
          {selectedTab === 'general-ledger' && (
            <GeneralLedger
              entries={mockEntries}
              accountId="1"
              accountName="All Accounts"
              onAddEntry={() => console.log('Add entry')}
              onEditEntry={(entryId) => console.log('Edit entry:', entryId)}
              onReverseEntry={(entryId) => console.log('Reverse entry:', entryId)}
              onExport={(format) => console.log('Export:', format)}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
