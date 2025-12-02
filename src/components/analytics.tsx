'use client'

import { TrendingUp, DollarSign, Target, Award } from 'lucide-react';
import { Card, Badge, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ChartXAxis, ChartYAxis, ChartGrid, ChartTooltip, Legend } from '@/ui';

const dealFlowData = [
  { month: 'Jun', sourced: 42, invested: 2 },
  { month: 'Jul', sourced: 38, invested: 1 },
  { month: 'Aug', sourced: 55, invested: 3 },
  { month: 'Sep', sourced: 48, invested: 2 },
  { month: 'Oct', sourced: 62, invested: 4 },
  { month: 'Nov', sourced: 71, invested: 3 },
];

const portfolioGrowthData = [
  { quarter: 'Q1 2024', value: 180 },
  { quarter: 'Q2 2024', value: 195 },
  { quarter: 'Q3 2024', value: 218 },
  { quarter: 'Q4 2024', value: 243 },
];

const sectorAllocationData = [
  { name: 'AI/ML', value: 28, color: '#818CF8' }, // Primary indigo - leading sector
  { name: 'SaaS', value: 22, color: '#22D3EE' }, // Cyan accent - tech
  { name: 'FinTech', value: 18, color: '#EAB308' }, // Gold secondary - valuable
  { name: 'HealthTech', value: 15, color: '#22C55E' }, // Green - health/growth
  { name: 'CleanTech', value: 10, color: '#8B5CF6' }, // Purple - innovation
  { name: 'Other', value: 7, color: '#71717A' }, // Muted zinc
];

const stageAllocationData = [
  { name: 'Seed', value: 35, color: '#22C55E' }, // Green - early/growth stage
  { name: 'Series A', value: 40, color: '#818CF8' }, // Primary indigo - main stage
  { name: 'Series B', value: 25, color: '#EAB308' }, // Gold - mature/valuable
];

export function Analytics() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl mb-2">Analytics</h2>
        <p className="text-sm sm:text-base text-[var(--app-text-muted)]">Insights and metrics across your portfolio</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[var(--app-primary-bg)] rounded-lg">
              <Target className="w-5 h-5 text-[var(--app-primary)]" />
            </div>
            <Badge size="sm" variant="bordered" className="text-[var(--app-success)] border-[var(--app-success)]">+18%</Badge>
          </div>
          <div className="text-2xl mb-1">316</div>
          <div className="text-sm text-[var(--app-text-muted)]">Deals Sourced (YTD)</div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[var(--app-primary-bg)] rounded-lg">
              <DollarSign className="w-5 h-5 text-[var(--app-primary)]" />
            </div>
            <Badge size="sm" variant="bordered" className="text-[var(--app-success)] border-[var(--app-success)]">+12%</Badge>
          </div>
          <div className="text-2xl mb-1">$42M</div>
          <div className="text-sm text-[var(--app-text-muted)]">Deployed Capital</div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[var(--app-warning-bg)] rounded-lg">
              <TrendingUp className="w-5 h-5 text-[var(--app-warning)]" />
            </div>
            <Badge size="sm" variant="bordered" className="text-[var(--app-success)] border-[var(--app-success)]">+8%</Badge>
          </div>
          <div className="text-2xl mb-1">3.7x</div>
          <div className="text-sm text-[var(--app-text-muted)]">Avg Multiple</div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[var(--app-danger-bg)] rounded-lg">
              <Award className="w-5 h-5 text-[var(--app-danger)]" />
            </div>
            <Badge size="sm" variant="bordered" className="text-[var(--app-success)] border-[var(--app-success)]">Top 10%</Badge>
          </div>
          <div className="text-2xl mb-1">32%</div>
          <div className="text-sm text-[var(--app-text-muted)]">IRR</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card padding="md">
            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Deal Flow</h3>
            <LineChart data={dealFlowData} height={280}>
              <ChartGrid />
              <ChartXAxis dataKey="month" />
              <ChartYAxis />
              <ChartTooltip />
              <Legend />
              <Line type="monotone" dataKey="sourced" stroke="#22D3EE" strokeWidth={2} name="Sourced" />
              <Line type="monotone" dataKey="invested" stroke="#818CF8" strokeWidth={2} name="Invested" />
            </LineChart>
        </Card>

        <Card padding="md">
            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Portfolio Growth</h3>
            <AreaChart data={portfolioGrowthData} height={280}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <ChartGrid />
              <ChartXAxis dataKey="quarter" />
              <ChartYAxis />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22C55E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                name="Value ($M)"
              />
            </AreaChart>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="md">
            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Sector Allocation</h3>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="w-full sm:w-1/2">
                <PieChart height={220}>
                  <Pie
                    data={sectorAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sectorAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="flex-1 space-y-3">
                {sectorAllocationData.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }} />
                      <span className="text-sm">{sector.name}</span>
                    </div>
                    <Badge size="sm" variant="flat" className="bg-[var(--app-surface-hover)] text-[var(--app-text-muted)]">
                      {sector.value}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
        </Card>

        <Card padding="md">
            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Stage Allocation</h3>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="w-full sm:w-1/2">
                <PieChart height={220}>
                  <Pie
                    data={stageAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {stageAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="flex-1 space-y-3">
                {stageAllocationData.map((stage, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                      <span className="text-sm">{stage.name}</span>
                    </div>
                    <Badge size="sm" variant="flat" className="bg-[var(--app-surface-hover)] text-[var(--app-text-muted)]">
                      {stage.value}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
        </Card>
      </div>
    </div>
  );
}
