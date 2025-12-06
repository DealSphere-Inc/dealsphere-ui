'use client';

import { BarChart3, TrendingUp, FileText, DollarSign, Download, Calendar, CheckCircle2 } from 'lucide-react';
import { Card, Button, Badge } from '@/ui';
import { MetricCard } from '@/components/metric-card';

export function LPDashboard() {
  const metrics = [
    {
      label: 'Capital Account',
      value: '$4.2M',
      change: '+12.4%',
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      label: 'Total Distributions',
      value: '$1.8M',
      change: 'YTD',
      trend: 'up' as const,
      icon: TrendingUp,
    },
    {
      label: 'NAV',
      value: '$5.6M',
      change: 'Q3 2024',
      trend: 'up' as const,
      icon: BarChart3,
    },
    {
      label: 'IRR',
      value: '24.3%',
      change: 'Net',
      trend: 'up' as const,
      icon: TrendingUp,
    },
  ];

  const documents = [
    { name: 'Q3 2024 LP Report', type: 'Report', date: 'Oct 15, 2024' },
    { name: 'Capital Call Notice #12', type: 'Notice', date: 'Sep 30, 2024' },
    { name: 'Distribution Notice #8', type: 'Notice', date: 'Aug 15, 2024' },
    { name: 'Fund III LPA Amendment', type: 'Legal', date: 'Jul 01, 2024' },
  ];

  const capitalActivity = [
    { type: 'Capital Call', amount: '$500K', date: 'Oct 01, 2024', status: 'Paid' },
    { type: 'Distribution', amount: '$125K', date: 'Sep 15, 2024', status: 'Received' },
    { type: 'Capital Call', amount: '$500K', date: 'Jul 01, 2024', status: 'Paid' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">LP Portal</h2>
          <p className="text-sm text-[var(--app-text-muted)]">Your investment overview and documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="bordered" startContent={<Calendar className="w-4 h-4" />}>
            Schedule Meeting
          </Button>
          <Button color="primary" startContent={<Download className="w-4 h-4" />}>
            Download Statements
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="md">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-medium">Recent Documents</h3>
             <Button size="sm" variant="light">View All</Button>
           </div>
           <div className="space-y-3">
             {documents.map((doc, idx) => (
               <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-[var(--app-border-subtle)] hover:bg-[var(--app-surface-hover)] transition-colors">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-[var(--app-primary-bg)] flex items-center justify-center text-[var(--app-primary)]">
                     <FileText className="w-5 h-5" />
                   </div>
                   <div>
                     <div className="font-medium text-sm">{doc.name}</div>
                     <div className="text-xs text-[var(--app-text-muted)]">{doc.type} • {doc.date}</div>
                   </div>
                 </div>
                 <Button size="sm" variant="light" isIconOnly>
                   <Download className="w-4 h-4" />
                 </Button>
               </div>
             ))}
           </div>
        </Card>

        <Card padding="md">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            Capital Activity
          </h3>
          <div className="space-y-3">
            {capitalActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[var(--app-border-subtle)]">
                 <div>
                   <div className="text-sm font-medium">{item.type}</div>
                   <div className="text-xs text-[var(--app-text-muted)]">{item.date}</div>
                 </div>
                 <div className="text-right">
                   <div className={`font-medium ${item.type === 'Distribution' ? 'text-green-500' : ''}`}>{item.amount}</div>
                   <Badge size="sm" variant="flat" color={item.status === 'Paid' || item.status === 'Received' ? 'success' : 'warning'}>
                     {item.status}
                   </Badge>
                 </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
