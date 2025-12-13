import type { CalendarAccount, CalendarEvent } from '@/components/integrations/calendar-integration';

export const mockCalendarAccounts: CalendarAccount[] = [
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

export const mockCalendarEvents: CalendarEvent[] = [
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

