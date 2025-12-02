'use client'

import { Circle } from 'lucide-react';
import { Card } from '@/ui';

const activities = [
  { company: 'Quantum AI', action: 'Moved to Due Diligence', time: '2h ago', color: 'var(--app-primary)' },
  { company: 'BioTech Labs', action: 'Investment approved', time: '5h ago', color: 'var(--app-warning)' },
  { company: 'CloudScale', action: 'Term sheet signed', time: '1d ago', color: 'var(--app-accent)' },
  { company: 'FinFlow', action: 'First meeting scheduled', time: '2d ago', color: 'var(--app-danger)' },
  { company: 'DataStream', action: 'Added to pipeline', time: '3d ago', color: '#a855f7' },
];

export function RecentActivity() {
  return (
    <Card padding="md" className="h-full">
      <h3 className="text-lg mb-6">Recent Activity</h3>
      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className="mt-1">
              <Circle className="w-2 h-2" style={{ color: activity.color }} fill={activity.color} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm mb-1">{activity.company}</div>
              <div className="text-xs text-[var(--app-text-muted)] mb-1">{activity.action}</div>
              <div className="text-xs text-[var(--app-text-subtle)]">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}