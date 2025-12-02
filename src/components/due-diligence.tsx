'use client'

import { useState } from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, FileText, Users, DollarSign, BarChart } from 'lucide-react';
import { Card, Badge, Progress } from '@/ui';

const activeDealsDd = [
  { id: 1, name: 'Quantum AI', stage: 'In Progress', progress: 65 },
  { id: 2, name: 'NeuroLink', stage: 'In Progress', progress: 42 },
  { id: 3, name: 'CloudScale', stage: 'Review', progress: 88 },
];

const checklistCategories = [
  {
    name: 'Financial Analysis',
    icon: DollarSign,
    items: [
      { id: 1, task: 'Review last 3 years financials', status: 'completed', assignee: 'Sarah', dueDate: 'Nov 18' },
      { id: 2, task: 'Analyze burn rate and runway', status: 'completed', assignee: 'Mike', dueDate: 'Nov 19' },
      { id: 3, task: 'Evaluate unit economics', status: 'in-progress', assignee: 'Sarah', dueDate: 'Nov 22' },
      { id: 4, task: 'Review cap table', status: 'pending', assignee: 'Alex', dueDate: 'Nov 24' },
    ],
  },
  {
    name: 'Market Analysis',
    icon: BarChart,
    items: [
      { id: 5, task: 'Market size validation', status: 'completed', assignee: 'Emma', dueDate: 'Nov 17' },
      { id: 6, task: 'Competitive landscape analysis', status: 'completed', assignee: 'Emma', dueDate: 'Nov 20' },
      { id: 7, task: 'Growth potential assessment', status: 'in-progress', assignee: 'James', dueDate: 'Nov 23' },
    ],
  },
  {
    name: 'Team Assessment',
    icon: Users,
    items: [
      { id: 8, task: 'Background checks', status: 'completed', assignee: 'HR Team', dueDate: 'Nov 16' },
      { id: 9, task: 'Reference calls', status: 'in-progress', assignee: 'Alex', dueDate: 'Nov 21' },
      { id: 10, task: 'Technical skill assessment', status: 'pending', assignee: 'CTO', dueDate: 'Nov 25' },
    ],
  },
  {
    name: 'Legal Review',
    icon: FileText,
    items: [
      { id: 11, task: 'Review articles of incorporation', status: 'completed', assignee: 'Legal', dueDate: 'Nov 15' },
      { id: 12, task: 'IP portfolio review', status: 'in-progress', assignee: 'Legal', dueDate: 'Nov 22' },
      { id: 13, task: 'Contract review', status: 'pending', assignee: 'Legal', dueDate: 'Nov 26' },
      { id: 14, task: 'Compliance check', status: 'pending', assignee: 'Legal', dueDate: 'Nov 27' },
    ],
  },
];

export function DueDiligence() {
  const [selectedDeal, setSelectedDeal] = useState(activeDealsDd[0]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-[var(--app-success)]" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-[var(--app-warning)]" />;
      default:
        return <Circle className="w-5 h-5 text-[var(--app-text-subtle)]" />;
    }
  };

  const completedTasks = checklistCategories.reduce(
    (acc, cat) => acc + cat.items.filter(item => item.status === 'completed').length,
    0
  );
  const totalTasks = checklistCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl mb-2">Due Diligence</h2>
          <p className="text-sm sm:text-base text-[var(--app-text-muted)]">Track your due diligence progress and tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {activeDealsDd.map((deal) => (
          <Card
            key={deal.id}
            isPressable
            onPress={() => setSelectedDeal(deal)}
            padding="md"
            className={`cursor-pointer transition-all ${
              selectedDeal.id === deal.id
                ? 'border-[var(--app-primary)]'
                : 'border-[var(--app-border)] hover:border-[var(--app-border-subtle)]'
            }`}
          >
            <h3 className="text-base font-medium mb-4">{deal.name}</h3>
            <div className="flex items-center justify-between text-sm text-[var(--app-text-muted)] mb-2">
              <Badge size="sm" variant="flat" className="bg-[var(--app-surface-hover)] text-[var(--app-text-muted)]">
                {deal.stage}
              </Badge>
              <span>{deal.progress}%</span>
            </div>
            <Progress
              value={deal.progress}
              size="sm"
              classNames={{
                base: "h-2",
                track: "bg-[var(--app-surface-hover)]",
                indicator: "bg-[var(--app-primary)]"
              }}
            />
          </Card>
        ))}
      </div>

      <Card padding="md" className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-medium">{selectedDeal.name} - Due Diligence Progress</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-[var(--app-text-muted)]">{completedTasks} of {totalTasks} completed</span>
            <Badge size="sm" variant="bordered" className="text-[var(--app-success)] border-[var(--app-success)]">
              {progressPercentage}%
            </Badge>
          </div>
        </div>
        <Progress
          value={progressPercentage}
          size="sm"
          classNames={{
            base: "h-2 mb-6 sm:mb-8",
            track: "bg-[var(--app-surface-hover)]",
            indicator: "bg-[var(--app-primary)]"
          }}
        />

        <div className="space-y-6">
          {checklistCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.name}>
                <div className="flex items-center gap-2 mb-4">
                  <CategoryIcon className="w-5 h-5 text-[var(--app-primary)]" />
                  <h4 className="text-sm font-medium">{category.name}</h4>
                  <Badge size="sm" variant="flat" className="bg-[var(--app-surface-hover)] text-[var(--app-text-muted)]">
                    {category.items.filter(i => i.status === 'completed').length}/{category.items.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <Card
                      key={item.id}
                      padding="sm"
                      className="bg-[var(--app-surface-hover)] border-0 hover:bg-[var(--app-border-subtle)] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                        <div className="flex items-center gap-3 flex-1">
                          {getStatusIcon(item.status)}
                          <span className={`text-sm sm:text-base ${item.status === 'completed' ? 'text-[var(--app-text-muted)] line-through' : ''}`}>
                            {item.task}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[var(--app-text-muted)] ml-8 sm:ml-0">
                          <span className="hidden sm:inline">{item.assignee}</span>
                          <Badge size="sm" variant="flat" className="bg-[var(--app-surface)] text-[var(--app-text-muted)]">
                            {item.dueDate}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="md">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-[var(--app-warning)]" />
            <h4 className="text-sm font-medium">Risk Flags</h4>
          </div>
          <div className="space-y-3">
            <Card padding="sm" className="bg-[var(--app-warning-bg)] border border-[var(--app-warning)]">
              <div className="text-sm mb-1">High Burn Rate</div>
              <div className="text-xs text-[var(--app-text-muted)]">Current runway: 8 months</div>
            </Card>
            <Card padding="sm" className="bg-[var(--app-danger-bg)] border border-[var(--app-danger)]">
              <div className="text-sm mb-1">Pending IP Dispute</div>
              <div className="text-xs text-[var(--app-text-muted)]">Requires legal review</div>
            </Card>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-[var(--app-success)]" />
            <h4 className="text-sm font-medium">Positive Signals</h4>
          </div>
          <div className="space-y-3">
            <Card padding="sm" className="bg-[var(--app-success-bg)] border border-[var(--app-success)]">
              <div className="text-sm mb-1">Strong Team Background</div>
              <div className="text-xs text-[var(--app-text-muted)]">All founders from top companies</div>
            </Card>
            <Card padding="sm" className="bg-[var(--app-success-bg)] border border-[var(--app-success)]">
              <div className="text-sm mb-1">Market Leader Position</div>
              <div className="text-xs text-[var(--app-text-muted)]">45% market share in niche</div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
