'use client'

import { DecisionWriter } from '@/components/ai/decision-writer';
import { DDChatAssistant } from '@/components/ai/dd-chat-assistant';
import { PitchDeckReader } from '@/components/ai/pitch-deck-reader';
import { PageContainer, PageHeader, Breadcrumb, Card } from '@/ui';
import { getBreadcrumbs, getAISuggestion } from '@/config/routes';
import { Sparkles } from 'lucide-react';

export default function AIToolsPage() {
  const breadcrumbs = getBreadcrumbs('/ai-tools');
  const aiSuggestion = getAISuggestion('/ai-tools');

  return (
    <PageContainer className="space-y-6">
      <Breadcrumb items={breadcrumbs} aiSuggestion={aiSuggestion} />
      <PageHeader
        title="AI Tools"
        description="Generate IC-ready briefs, summarize decks, and chat through diligence with AI copilots"
        icon={Sparkles}
        aiSummary={{
          text: '3 copilots available: Decision Writer, Pitch Deck Reader, and DD Chat Assistant',
          confidence: 0.9
        }}
      />

      <div className="space-y-8">
        <Card padding="lg">
          <DecisionWriter />
        </Card>
        <Card padding="lg">
          <PitchDeckReader />
        </Card>
        <Card padding="lg">
          <DDChatAssistant dealName="Quantum AI" />
        </Card>
      </div>
    </PageContainer>
  );
}
