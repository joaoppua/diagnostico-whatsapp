import { ReactNode } from 'react';

export interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  subtitle: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue?: string;
  tooltipContent: string;
}

export interface InsightCardProps {
  type: 'success' | 'warning' | 'danger' | 'info';
  icon: ReactNode;
  title: string;
  description: string;
  tooltipContent?: string;
}

export interface TooltipProps {
  content: string;
}

// Mock Data Types
export interface MockData {
  summary: {
    score: number;
    label: string;
    totalConversations: number;
    periodDays: number;
    revenueNotCaptured: number;
    currentConversion: number;
    potentialConversion: number;
    recoverableLeads: number;
    recoverableValue: number;
    salesCycle: number;
  };
  temporal: {
    heatmap: Array<{ day: string; hour: number; value: number }>;
    insights: {
      bestTime: string;
      ignoredLeads: { percentage: number; lostRevenue: number };
    };
  };
  leadSegmentation: {
    hot: { count: number; percentage: number; conversion: number };
    warm: { count: number; percentage: number; conversion: number };
    cold: { count: number; percentage: number; conversion: number };
    ghost: { count: number; percentage: number; conversion: number };
  };
  responseTime: {
    average: string;
    benchmark: string;
    lostRevenue: number;
    worstCase: { value: number; time: string };
    byRange: Array<{ range: string; conversations: number; conversion: number; revenue: number }>;
  };
  communication: {
    scores: {
      professionalism: number;
      empathy: number;
      clarity: number;
    };
    redFlags: Array<{ type: string; title: string; count?: number; avgWords?: number; percentage?: number; avg?: number; ideal?: string }>;
  };
  funnel: {
    stages: Array<{ name: string; count: number; percentage: number; time: string; dropoff: number }>;
    criticalBottleneck: string;
  };
  conversationPatterns: {
    whoTalksMore: { seller: number; buyer: number };
    abandonment: Array<{ trigger: string; percentage: number; count: number }>;
  };
  inactiveLeads: Array<{
    name: string;
    daysInactive: number;
    lastMessage: string;
    value: number;
    recoveryScore: number;
    reason: string;
    priority: string;
  }>;
  objections: Array<{
    rank: number;
    objection: string;
    frequency: number;
    conversionAfter: number;
    currentResponse: string;
    suggestedResponse: string;
  }>;
  opportunities: Array<{
    rank: number;
    title: string;
    description: string;
    impact: number;
    ease: number;
    timeToResult: string;
  }>;
  actionPlan: {
    month1: {
      title: string;
      impact: number;
      actions: Array<{ label: string; difficulty: string; time: string }>;
    };
    month2: {
      title: string;
      impact: number;
      actions: Array<{ label: string; difficulty: string; time: string }>;
    };
    month3: {
      title: string;
      impact: number;
      actions: Array<{ label: string; difficulty: string; time: string }>;
    };
  };
}