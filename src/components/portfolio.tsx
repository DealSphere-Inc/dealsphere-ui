'use client'

import { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { LayoutGrid, FileText, TrendingUp, MessageSquare } from 'lucide-react';
import { PortfolioDashboard } from './portfolio-dashboard';
import { PortfolioDocuments } from './portfolio-documents';
import { PortfolioUpdates } from './portfolio-updates';

export function Portfolio() {
  const [selected, setSelected] = useState<string>('overview');

  return (
    <div>
      <Tabs
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        classNames={{
          base: "px-4 sm:px-6 lg:px-8",
          tabList: "gap-4 border-b border-[var(--app-border)]",
          cursor: "bg-[var(--app-primary)]",
          tab: "px-4 py-3",
          tabContent: "group-data-[selected=true]:text-[var(--app-primary)]"
        }}
      >
        <Tab
          key="overview"
          title={
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              <span>Overview</span>
            </div>
          }
        >
          <PortfolioDashboard />
        </Tab>
        <Tab
          key="updates"
          title={
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Updates</span>
            </div>
          }
        >
          <PortfolioUpdates />
        </Tab>
        <Tab
          key="documents"
          title={
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </div>
          }
        >
          <PortfolioDocuments />
        </Tab>
      </Tabs>
    </div>
  );
}
