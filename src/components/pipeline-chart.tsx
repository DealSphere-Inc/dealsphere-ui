'use client'

import { Card, BarChart, Bar, ChartXAxis, ChartYAxis, ChartGrid, ChartTooltip } from '@/ui';

const data = [
  { stage: 'Sourced', count: 124 },
  { stage: 'First Meet', count: 47 },
  { stage: 'Due Diligence', count: 18 },
  { stage: 'Term Sheet', count: 8 },
  { stage: 'Closed', count: 5 },
];

export function PipelineChart() {
  return (
    <Card padding="md">
      <h3 className="text-lg mb-6">Pipeline Overview</h3>
      <BarChart data={data} height={300}>
        <ChartGrid />
        <ChartXAxis dataKey="stage" />
        <ChartYAxis />
        <ChartTooltip />
        <Bar dataKey="count" fill="var(--app-primary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </Card>
  );
}