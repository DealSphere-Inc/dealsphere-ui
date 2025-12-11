'use client';

import { useState } from 'react';
import { PageContainer, PageHeader, Breadcrumb, Card, Button, Badge } from '@/ui';
import { Plug, Calendar, Mail, Slack, Github, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { getRouteConfig } from '@/config/routes';
import { CalendarIntegration, type CalendarAccount, type CalendarEvent } from './calendar-integration';

const mockCalendarAccounts: CalendarAccount[] = [
  {
    id: '1',
    provider: 'google',
    email: 'john@vestledger.com',
    status: 'connected',
    lastSync: new Date(),
    autoCapture: true,
    captureRules: [],
    syncedCalendars: ['Primary'],
  },
];

const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    calendarAccountId: '1',
    provider: 'google',
    title: 'Investment Committee Meeting',
    description: 'Review Q4 portfolio performance and pipeline.',
    startTime: new Date('2024-12-15T10:00:00'),
    endTime: new Date('2024-12-15T11:00:00'),
    duration: 60,
    location: 'Conference Room A',
    isVirtual: true,
    meetingUrl: 'https://meet.google.com/example',
    organizer: 'john@vestledger.com',
    attendees: [
      {
        email: 'john@vestledger.com',
        name: 'John Doe',
        responseStatus: 'accepted',
        isOrganizer: true,
        isOptional: false,
      },
      {
        email: 'jane@vestledger.com',
        name: 'Jane Smith',
        responseStatus: 'accepted',
        isOrganizer: false,
        isOptional: false,
      },
    ],
    captureStatus: 'captured',
    capturedDate: new Date('2024-12-15T11:05:00'),
    captureRuleId: 'rule-1',
    captureRuleName: 'Default capture',
    linkedContactIds: ['contact-1', 'contact-2'],
    linkedContactNames: ['John Doe', 'Jane Smith'],
    linkedDealIds: ['deal-1'],
    linkedDealNames: ['Fund I'],
    linkedFundIds: ['fund-1'],
    linkedFundNames: ['Fund I'],
    eventType: 'meeting',
    category: 'Investment',
    tags: ['investment', 'committee'],
    isRecurring: false,
    recurrencePattern: '',
    isCancelled: false,
    interactionId: 'interaction-1',
    outcome: 'positive',
    notes: 'Follow-up on due diligence items.',
  },
];

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'connected' | 'available' | 'coming-soon';
  category: 'productivity' | 'communication' | 'development' | 'finance';
}

const availableIntegrations: Integration[] = [
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Sync meetings and deadlines with Google Calendar, Outlook, and more',
    icon: Calendar,
    status: 'connected',
    category: 'productivity',
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Connect your email for deal flow tracking and LP communications',
    icon: Mail,
    status: 'available',
    category: 'communication',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications and updates directly in your Slack workspace',
    icon: Slack,
    status: 'available',
    category: 'communication',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Track technical due diligence and code metrics for portfolio companies',
    icon: Github,
    status: 'coming-soon',
    category: 'development',
  },
];

export function Integrations() {
  const routeConfig = getRouteConfig('/integrations');
  const [calendarAccounts] = useState<CalendarAccount[]>(mockCalendarAccounts);
  const [calendarEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredIntegrations = selectedCategory === 'all'
    ? availableIntegrations
    : availableIntegrations.filter(i => i.category === selectedCategory);

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <Badge color="success" startContent={<CheckCircle2 className="w-3 h-3" />}>Connected</Badge>;
      case 'available':
        return <Badge color="default">Available</Badge>;
      case 'coming-soon':
        return <Badge color="warning">Coming Soon</Badge>;
    }
  };

  return (
    <PageContainer>
      <Breadcrumb items={routeConfig?.breadcrumbs || []} />
      <PageHeader
        title="Integrations"
        description="Connect external tools and services to streamline your workflow"
        icon={Plug}
      />

      <div className="space-y-8">
        {/* Category Filter */}
        <div className="flex gap-2">
          {['all', 'productivity', 'communication', 'development', 'finance'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'solid' : 'bordered'}
              color={selectedCategory === category ? 'primary' : 'default'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.id} padding="lg" className="hover:border-[var(--app-primary)] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--app-primary-bg)] text-[var(--app-primary)] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
                <h3 className="text-lg font-bold mb-2">{integration.name}</h3>
                <p className="text-[var(--app-text-muted)] text-sm mb-4">
                  {integration.description}
                </p>
                <div className="flex gap-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Button variant="bordered" size="sm" startContent={<Settings className="w-4 h-4" />}>
                        Configure
                      </Button>
                      <Button variant="bordered" size="sm" color="danger">
                        Disconnect
                      </Button>
                    </>
                  ) : integration.status === 'available' ? (
                    <Button color="primary" size="sm" fullWidth>
                      Connect
                    </Button>
                  ) : (
                    <Button variant="bordered" size="sm" fullWidth disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Calendar Integration Details */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Calendar Integration</h2>
          <CalendarIntegration
            accounts={calendarAccounts}
            events={calendarEvents}
            onConnectCalendar={(provider) => console.log('Connect calendar:', provider)}
            onDisconnectCalendar={(accountId) => console.log('Disconnect calendar:', accountId)}
            onSyncCalendar={(accountId) => console.log('Sync calendar:', accountId)}
            onConfigureRules={(accountId) => console.log('Configure rules for:', accountId)}
            onToggleAutoCapture={(accountId) => console.log('Toggle auto-capture for:', accountId)}
            onCaptureEvent={(eventId) => console.log('Capture event:', eventId)}
            onIgnoreEvent={(eventId) => console.log('Ignore event:', eventId)}
            onEditEvent={(eventId) => console.log('Edit event:', eventId)}
            onCreateEvent={() => console.log('Create event')}
            onExportEvents={(format) => console.log('Export events:', format)}
          />
        </div>
      </div>
    </PageContainer>
  );
}
