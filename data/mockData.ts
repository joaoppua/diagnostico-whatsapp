import { MockData } from '../types';

export const mockData: MockData = {
  summary: {
    score: 47,
    label: "Precisa de Atenção Urgente",
    totalConversations: 180,
    periodDays: 30,
    revenueNotCaptured: 21719,
    currentConversion: 12.7,
    potentialConversion: 27.4,
    recoverableLeads: 23,
    recoverableValue: 15600,
    salesCycle: 4.2,
  },
  
  temporal: {
    heatmap: Array.from({ length: 91 }, (_, i) => ({
      day: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][Math.floor(i / 13)],
      hour: 8 + (i % 13), // 8h to 20h
      value: Math.floor(Math.random() * 100)
    })),
    insights: {
      bestTime: "Terças às 15h têm 3x mais conversão que Sextas às 11h",
      ignoredLeads: { percentage: 34, lostRevenue: 4200 },
    }
  },
  
  leadSegmentation: {
    hot: { count: 34, percentage: 18.9, conversion: 67 },
    warm: { count: 52, percentage: 28.9, conversion: 23 },
    cold: { count: 61, percentage: 33.9, conversion: 8 },
    ghost: { count: 33, percentage: 18.3, conversion: 2 },
  },
  
  responseTime: {
    average: "3h 12min",
    benchmark: "45min",
    lostRevenue: 8400,
    worstCase: { value: 2300, time: "4h" },
    byRange: [
      { range: "0-5min", conversations: 36, conversion: 35, revenue: 8200 },
      { range: "5-30min", conversations: 22, conversion: 28, revenue: 6100 },
      { range: "30min-2h", conversations: 18, conversion: 15, revenue: 3400 },
      { range: "2h-24h", conversations: 12, conversion: 8, revenue: 1800 },
      { range: "+24h", conversations: 8, conversion: 3, revenue: 600 },
    ]
  },
  
  communication: {
    scores: {
      professionalism: 6.2,
      empathy: 5.1,
      clarity: 7.4,
    },
    redFlags: [
      { type: "insecurity", title: "Uso excessivo de 'talvez'", count: 47 },
      { type: "length", title: "Mensagens muito longas", avgWords: 89 },
      { type: "timing", title: "Preço antes de valor", percentage: 73 },
      { type: "questions", title: "Falta de perguntas", avg: 1.2, ideal: "4-5" },
    ]
  },
  
  funnel: {
    stages: [
      { name: "Contato Inicial", count: 180, percentage: 100, time: "0min", dropoff: 0 },
      { name: "Primeira Resposta", count: 156, percentage: 86.7, time: "3h 12min", dropoff: -13.3 },
      { name: "Engajamento (3+ msgs)", count: 118, percentage: 65.6, time: "8h", dropoff: -24.4 },
      { name: "Qualificação", count: 89, percentage: 49.4, time: "1.2 dias", dropoff: -24.6 },
      { name: "Negociação", count: 67, percentage: 37.2, time: "2.1 dias", dropoff: -24.7 },
      { name: "Fechamento", count: 23, percentage: 12.8, time: "4.2 dias", dropoff: -65.7 },
    ],
    criticalBottleneck: "67% abandonam após enviar preço sem contextualizar valor"
  },
  
  conversationPatterns: {
    whoTalksMore: { seller: 61, buyer: 39 },
    abandonment: [
      { trigger: "Após enviar catálogo", percentage: 43, count: 31 },
      { trigger: "Após mencionar preço", percentage: 67, count: 48 },
      { trigger: "Após primeira resposta lenta", percentage: 28, count: 20 },
      { trigger: "Após mensagem muito longa", percentage: 22, count: 16 },
    ]
  },
  
  inactiveLeads: [
    {
      name: "Maria S.",
      daysInactive: 8,
      lastMessage: "Vou pensar e te retorno",
      value: 1200,
      recoveryScore: 78,
      reason: "Preço apresentado cedo demais",
      priority: "ALTO"
    },
    {
      name: "João P.",
      daysInactive: 12,
      lastMessage: "Quanto tempo demora?",
      value: 890,
      recoveryScore: 65,
      reason: "Não teve resposta",
      priority: "MÉDIO"
    },
    {
      name: "Ana L.",
      daysInactive: 15,
      lastMessage: "Tem desconto?",
      value: 2300,
      recoveryScore: 45,
      reason: "Objeção não tratada",
      priority: "ALTO"
    },
    {
      name: "Carlos M.",
      daysInactive: 6,
      lastMessage: "Vou falar com minha esposa",
      value: 1650,
      recoveryScore: 82,
      reason: "Decisão compartilhada",
      priority: "ALTO"
    },
  ],
  
  objections: [
    {
      rank: 1,
      objection: "Está muito caro",
      frequency: 34,
      conversionAfter: 12,
      currentResponse: "Posso fazer um desconto",
      suggestedResponse: "Entendo sua preocupação. Deixa eu te mostrar o retorno que você vai ter..."
    },
    {
      rank: 2,
      objection: "Vou pensar",
      frequency: 28,
      conversionAfter: 18,
      currentResponse: "Ok, fico no aguardo",
      suggestedResponse: "Claro! Para te ajudar a decidir, qual é a principal dúvida que ainda tem?"
    },
    {
      rank: 3,
      objection: "Preciso falar com alguém",
      frequency: 22,
      conversionAfter: 24,
      currentResponse: "Tá bom",
      suggestedResponse: "Perfeito! Posso te mandar um resumo para compartilhar? O que seria mais útil incluir?"
    },
    {
      rank: 4,
      objection: "Não é o momento",
      frequency: 18,
      conversionAfter: 8,
      currentResponse: "Entendo",
      suggestedResponse: "Compreendo! Quando seria um momento melhor? Posso te lembrar na data certa."
    },
  ],
  
  opportunities: [
    {
      rank: 1,
      title: "Responda em até 5 minutos",
      description: "Leads que recebem resposta em <5min convertem 3x mais",
      impact: 12400,
      ease: 8,
      timeToResult: "1 semana"
    },
    {
      rank: 2,
      title: "Use novo script de abertura",
      description: "Script testado com 34% de conversão vs. 4% atual",
      impact: 8900,
      ease: 10,
      timeToResult: "Imediato"
    },
    {
      rank: 3,
      title: "Reative 23 leads mornos",
      description: "Lista de leads com >60% de recuperabilidade",
      impact: 15600,
      ease: 9,
      timeToResult: "2 semanas"
    },
    {
      rank: 4,
      title: "Mude prospecção para Terças 14-17h",
      description: "Seu melhor horário de conversão identificado",
      impact: 5200,
      ease: 10,
      timeToResult: "1 semana"
    },
    {
      rank: 5,
      title: "Pare de enviar catálogo antes de qualificar",
      description: "43% dos abandonos acontecem após catálogo",
      impact: 7800,
      ease: 9,
      timeToResult: "Imediato"
    },
  ],
  
  actionPlan: {
    month1: {
      title: "Quick Wins",
      impact: 18500,
      actions: [
        { label: "Implementar respostas em <5min", difficulty: "Baixo", time: "1 dia" },
        { label: "Usar novos scripts de abertura", difficulty: "Baixo", time: "1 dia" },
        { label: "Reativar top 20 leads abandonados", difficulty: "Médio", time: "3 dias" },
        { label: "Ajustar horários de prospecção", difficulty: "Baixo", time: "1 dia" },
      ]
    },
    month2: {
        title: "Otimizações",
        impact: 12800,
        actions: [
          { label: "Treinar novo flow de qualificação", difficulty: "Médio", time: "1 semana" },
          { label: "Implementar scripts de objeção", difficulty: "Médio", time: "3 dias" },
          { label: "Testar abordagens A/B", difficulty: "Médio", time: "2 semanas" },
          { label: "Otimizar apresentação de proposta", difficulty: "Baixo", time: "2 dias" },
        ]
    },
    month3: {
        title: "Escala",
        impact: 15600,
        actions: [
          { label: "Automatizar follow-ups", difficulty: "Alto", time: "1 semana" },
          { label: "Criar sequências de nutrição", difficulty: "Alto", time: "2 semanas" },
          { label: "Implementar score de leads", difficulty: "Alto", time: "1 semana" },
          { label: "Otimizar funil completo", difficulty: "Médio", time: "2 semanas" },
        ]
    },
  }
};