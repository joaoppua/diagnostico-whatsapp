
import { MetricDoc } from '../types';

export const metricDocumentation: Record<string, MetricDoc> = {
  "score-saude": {
    id: "score-saude",
    name: "Score de Saúde de Vendas",
    shortDescription: "Score de 0 a 100 calculado pela IA analisando 5 aspectos da sua operação:\n- Velocidade de resposta (25%)\n- Taxa de conversão (30%)\n- Engajamento (20%)\n- Qualidade da comunicação (15%)\n- Aproveitamento de oportunidades (10%)\n\nA IA analisa seus dados e atribui nota pra cada pilar, depois soma com os pesos.",
    fullDescription: "Nota de 0 a 100 que a IA dá analisando sua operação. Ela olha 5 pilares, dá nota pra cada um, aplica pesos e soma.",
    calculation: {
      formula: "(Velocidade * 0.25) + (Conversão * 0.30) + (Engajamento * 0.20) + (Comunicação * 0.15) + (Oportunidades * 0.10)",
      dataSources: [
        "conversas (json)", "deals (json)", "mensagens (json)"
      ],
      example: `
Velocidade: 3h 12min (Ruim -> Nota 30) * 0.25 = 7.5
Conversão: 12.7% (Regular -> Nota 50) * 0.30 = 15
Engajamento: 86.7% (Bom -> Nota 100) * 0.20 = 20
Comunicação: 2 flags (Excelente -> Nota 100) * 0.15 = 15
Oportunidades: 34% (Ruim -> Nota 30) * 0.10 = 3

Score Final = 7.5 + 15 + 20 + 15 + 3 = 60.5
      `
    },
    llmPrompt: `
Você é um auditor de vendas. Analise os dados e calcule o Score de Saúde (0-100).

DADOS:
{dados_json}

INSTRUÇÕES:

1. VELOCIDADE DE RESPOSTA (25% do score):
   - Tempo médio: {tempo_medio_resposta}
   - Dê nota 0-100:
     * <5min = 100
     * 5-30min = 80
     * 30min-2h = 60
     * 2h-24h = 30
     * >24h = 0

2. CONVERSÃO (30% do score):
   - Taxa atual: {taxa_conversao}%
   - Dê nota 0-100:
     * >25% = 100
     * 15-25% = 70
     * 10-15% = 50
     * 5-10% = 30
     * <5% = 0

3. ENGAJAMENTO (20% do score):
   - Taxa de resposta: {taxa_resposta_leads}%
   - Média de mensagens: {media_mensagens}
   - Dê nota 0-100:
     * >80% resposta + 6+ msgs = 100
     * 60-80% + 4-6 msgs = 70
     * 40-60% + 3-4 msgs = 50
     * <40% + <3 msgs = 20

4. COMUNICAÇÃO (15% do score):
   - Analise as mensagens do vendedor
   - Conte red flags:
     * Palavras de insegurança ("talvez", "acho")
     * Mensagens longas (>80 palavras)
     * Preço antes de criar valor
     * Poucas perguntas (<3 por conversa)
   - Dê nota 0-100:
     * 0-2 flags = 100
     * 3-4 flags = 60
     * 5+ flags = 20

5. OPORTUNIDADES (10% do score):
   - Leads em negociação: {leads_em_negociacao}
   - Leads recuperáveis: {leads_recuperaveis}
   - Taxa: {leads_recuperaveis / leads_em_negociacao}%
   - Dê nota 0-100:
     * >70% = 100
     * 40-70% = 60
     * <40% = 30

CÁLCULO FINAL:
Score = (Velocidade × 0.25) + (Conversão × 0.30) + (Engajamento × 0.20) + (Comunicação × 0.15) + (Oportunidades × 0.10)

CLASSIFICAÇÃO:
- 85-100: Excelente (verde, 5 estrelas)
- 70-84: Bom (verde, 4 estrelas)
- 55-69: Regular (amarelo, 3 estrelas)
- 40-54: Urgente (laranja, 2 estrelas)
- 0-39: Crítico (vermelho, 1 estrela)

Retorne JSON:
{
  "score": 47,
  "label": "Regular",
  "status": "Precisa de Atenção Urgente",
  "color": "#FF5C35",
  "stars": 2,
  "message": "Você está deixando R$ 21.719 na mesa todo mês. Este relatório mostra como recuperar.",
  "breakdown": {
    "velocidade": 32,
    "conversao": 41,
    "engajamento": 58,
    "comunicacao": 62,
    "oportunidades": 45
  }
}
    `
  },

  "receita-nao-capturada": {
    id: "receita-nao-capturada",
    name: "Receita Não Capturada",
    shortDescription: "Soma do valor de todos os deals perdidos + deals em negociação parados há 7+ dias.\n\nÉ o dinheiro que escapou mas que poderia ter sido fechado neste período.",
    fullDescription: "Valor total em R$ de oportunidades que não viraram venda. Inclui deals perdidos + deals parados há 7+ dias.",
    calculation: {
      formula: "Σ(valor dos deals perdidos) + Σ(valor dos deals parados)",
      dataSources: ["deals", "value", "status", "last_message_date"],
      example: `
8 deals perdidos × R$ 1.550 médio = R$ 12.400
15 deals parados × R$ 621 médio = R$ 9.319

Total = R$ 21.719
      `
    },
    implementationNotes: `
const dealsPerdidos = deals.filter(d => d.status === 'perdido');
const dealsParados = deals.filter(d => 
  d.status === 'em_negociacao' && 
  diasDesde(d.last_message_date) > 7
);

const receitaNaoCapturada = 
  soma(dealsPerdidos.map(d => d.value)) + 
  soma(dealsParados.map(d => d.value));
    `
  },

  "conversao-atual": {
    id: "conversao-atual",
    name: "Taxa de Conversão",
    shortDescription: "Percentual de deals fechados sobre o total de leads que entraram.\n\nFórmula: (deals fechados ÷ total de leads) × 100\n\nO \"Potencial\" é estimativa do que você poderia atingir corrigindo gargalos.",
    fullDescription: "Taxa de conversão: quantos leads viraram venda.",
    calculation: {
      formula: "(Deals Fechados / Total de Leads) × 100",
      dataSources: ["deals", "status"],
      example: `
Total de leads: 180
Deals com status = 'aprovado': 23

Conversão = 23 / 180 × 100 = 12.7%
      `
    },
    implementationNotes: `
const totalLeads = deals.length;
const dealsFechados = deals.filter(d => d.status === 'aprovado').length;
const conversao = (dealsFechados / totalLeads) * 100;
    `,
    llmPrompt: `
Analise o funil e estime conversão potencial se os principais gargalos forem corrigidos.

DADOS:
- Conversão atual: {conversao_atual}%
- Funil: {dados_funil_completo}
- Gargalos: {lista_de_gargalos}

Estime a conversão potencial realista.

Retorne JSON:
{
  "conversao_potencial": 27.4,
  "premissas": ["Reduzir abandono após preço", "Melhorar qualificação"]
}
    `
  },

  "leads-recuperaveis": {
    id: "leads-recuperaveis",
    name: "Leads Recuperáveis",
    shortDescription: "Deals em negociação parados há 3+ dias que têm boa chance de fechar ainda.\n\nScore de recuperabilidade leva em conta: valor do deal, engajamento anterior, tempo parado.",
    fullDescription: "Deals em negociação parados há 3+ dias que ainda valem a pena ir atrás. A IA dá score de recuperabilidade pra cada um.",
    calculation: {
      formula: "Filtra Inativos (3+ dias) -> IA Score -> Filtra Score >= 60%",
      dataSources: ["deals", "messages"],
      example: `
67 deals em negociação
→ 38 parados há 3+ dias
→ IA analisa e dá score pra cada um
→ 23 têm score >= 60%
→ Potencial = R$ 15.600
      `
    },
    implementationNotes: `
// 1. Filtra inativos
const inativos = deals.filter(d => 
  d.status === 'em_negociacao' && 
  diasDesde(d.last_message_date) >= 3
);

// 2. Passa cada um pra LLM
const comScore = await Promise.all(
  inativos.map(lead => calcularScoreIA(lead))
);

// 3. Filtra recuperáveis
const recuperaveis = comScore.filter(l => l.score >= 60);
const valorTotal = soma(recuperaveis.map(l => l.valor));
    `,
    llmPrompt: `
Analise cada lead inativo e dê score de recuperabilidade (0-100).

LEAD:
- ID: {deal_id}
- Valor: R$ {deal_value}
- Dias parado: {days_inactive}
- Histórico: {messages}

CRITÉRIOS:
- Valor alto = +pontos
- Muito engajamento prévio = +pontos
- Lead demonstrou interesse forte = +pontos
- Muito tempo parado (>14d) = -pontos
- Última msg foi objeção não tratada = -pontos

Retorne JSON pra cada lead:
{
  "deal_id": 123,
  "score": 78,
  "motivo_parada": "Preço cedo demais",
  "valor": 1200
}
    `
  },

  "ciclo-venda": {
    id: "ciclo-venda",
    name: "Ciclo de Venda",
    shortDescription: "Tempo médio desde o primeiro contato até fechar a venda.\n\nCalculado como: última mensagem - primeira mensagem dos deals aprovados.\n\nNão é perfeito (usa última msg como proxy), mas dá boa noção.",
    fullDescription: "Tempo médio que um lead leva desde entrar até virar cliente.",
    calculation: {
      formula: "Média(data_última_mensagem - data_primeira_mensagem) dos deals aprovados",
      dataSources: ["deals", "created_at", "last_message_date", "status"],
      example: `
Deal 1: 04/fev - 02/fev = 2 dias
Deal 2: 10/fev - 05/fev = 5 dias
Deal 3: 14/fev - 08/fev = 6 dias

Média = (2 + 5 + 6) / 3 = 4.3 dias
      `
    },
    implementationNotes: `
const dealsAprovados = deals.filter(d => d.status === 'aprovado');

const ciclos = dealsAprovados.map(d => {
  const dias = diasEntre(d.created_at, d.last_message_date);
  return dias;
});

const cicloMedio = media(ciclos);
    `
  },

  "tempo-resposta": {
    id: "tempo-resposta",
    name: "Tempo Médio de Resposta (TMR)",
    shortDescription: "Média de quanto tempo você demora pra responder a primeira mensagem de um lead novo. Pega timestamp da primeira mensagem do cara, subtrai do timestamp da sua primeira resposta, tira a média.",
    fullDescription: "Delta T entre a criação do lead (primeira msg dele) e a primeira msg do vendedor. Só conta horário comercial (ex: 9h as 18h). Se o lead mandou 20h e eu respondi 9h05 do dia seguinte, o tempo é 5min, não 13 horas.",
    calculation: {
      formula: "AVG(first_agent_reply_ts - first_lead_msg_ts) [ajustado business hours]",
      dataSources: ["messages"],
      example: `
Lead msg: 14:00
Agent msg: 14:15
Delta: 15min.

Faz isso pra todos e tira a média.
      `
    },
    ranges: [
      { min: 0, max: 5, label: "Excelente", color: "#00E676", message: "Aproveita o momento de impulso" },
      { min: 6, max: 60, label: "Atenção", color: "#FFD60A", message: "Esfriando..." },
      { min: 61, max: 9999, label: "Ruim", color: "#FF3B30", message: "Lead provavelmente já falou com outro" }
    ]
  },

  "segmentacao-leads": {
    id: "segmentacao-leads",
    name: "Segmentação (Classificador)",
    shortDescription: "Classifica leads em Quentes (perguntam preço/respondem rápido), Mornos (interesse médio), Frios (só olham) e Fantasmas (sumiram).",
    fullDescription: "Regras simples baseadas em contagem de mensagens e palavras-chave.",
    calculation: {
      formula: "IF msg_count > 5 AND has_intent_keywords -> HOT; ELSE IF msg_count > 2 -> WARM...",
      dataSources: ["messages"],
      example: `
- Quente: > 5 msgs trocadas + keywords ('pix', 'preço', 'comprar')
- Morno: > 2 msgs trocadas
- Fantasma: Agent mandou msg, Lead não respondeu a última há > 2 dias
- Frio: Resto
      `
    }
  },

  "heatmap-temporal": {
    id: "heatmap-temporal",
    name: "Heatmap (Dia x Hora)",
    shortDescription: "Cálculo\nAgrupa TODAS as mensagens por dia da semana + hora. Faz distribuição percentual de volume. Separa mensagens RECEBIDAS (do buyer) vs ENVIADAS (do seller).",
    fullDescription: "Análise de densidade temporal das mensagens recebidas para identificar horários de pico e gargalos de atendimento.",
    calculation: {
      formula: "GROUP BY messages.day_of_week, messages.hour, messages.direction",
      dataSources: ["messages"],
      example: "Visualização baseada em volume relativo."
    }
  },

  "funil-vendas": {
    id: "funil-vendas",
    name: "Funil de Conversão (Drop-off)",
    shortDescription: "Mede quantos leads passam de uma etapa pra outra. Etapas: Contato -> Resposta -> Engajamento -> Qualificação -> Negociação -> Venda.",
    fullDescription: "Conta leads únicos que atingiram cada marco. O drop-off é a % que ficou pra trás na etapa anterior.",
    calculation: {
      formula: "Count(Leads que chegaram na etapa X)",
      dataSources: ["deals", "messages"],
      example: `
1. Contato Inicial: 100 leads
2. Respondeu: 80 leads (20% drop)
3. Engajado (>3 msgs): 40 leads (50% drop)
...
      `
    }
  },

  "comunicacao-scores": {
    id: "comunicacao-scores",
    name: "Scores de Comunicação (LLM)",
    shortDescription: "IA lê suas mensagens e dá nota de 0 a 10 pra Profissionalismo, Empatia e Clareza. Procura padrões como 'talvez' (insegurança) ou textos muito longos.",
    fullDescription: "A gente pega as últimas 50 mensagens enviadas pelo vendedor e manda pra API do LLM avaliar.",
    calculation: {
      formula: "LLM Prompt -> JSON { professionalism: 0-10, empathy: 0-10... }",
      dataSources: ["messages (outbound)"],
      example: `
Input: "Oi, preço é 50."
Output IA: Clareza 8, Profissionalismo 4 (muito seco), Empatia 2.
      `,
    },
    llmPrompt: `
Analise as mensagens deste vendedor. Dê nota 0-10 para:
1. Profissionalismo (formalidade adequada, educação)
2. Empatia (uso de nome do cliente, compreensão)
3. Clareza (respostas diretas)

Retorne JSON.
      `
  },

  "leads-inativos": {
    id: "leads-inativos",
    name: "Fila de Leads Inativos",
    shortDescription: "Lista de deals em negociação que tão parados há 3+ dias. Pra cada um mostra: última mensagem, quanto vale, chance de recuperar (score), e por que provavelmente parou.",
    fullDescription: "Query simples ordenando leads abertos e sem interação recente pelo valor financeiro.",
    calculation: {
      formula: "SELECT * FROM Deals WHERE status='open' AND last_msg > 3d ORDER BY value DESC",
      dataSources: ["deals"],
      example: "Lista ordenada: Lead de 5k (parado há 4 dias) aparece antes de Lead de 100 reais (parado há 20 dias).",
    }
  },

  "objecoes": {
    id: "objecoes",
    name: "Clusterização de Objeções",
    shortDescription: "IA pega todas as objeções que os leads deram ('tá caro', 'vou pensar', etc), agrupa as parecidas, conta quantas vezes apareceu cada uma.",
    fullDescription: "Pega a última mensagem do lead em deals PERDIDOS. Usa NLP para agrupar frases similares.",
    calculation: {
      formula: "Cluster(Last_Msg_Lost_Deals)",
      dataSources: ["messages", "deals"],
      example: `
Msgs: "tá caro", "muito alto o valor", "preço salgado" -> Cluster "Preço" (Count: 3).
Msgs: "vou ver com esposa", "falar com marido" -> Cluster "Decisor" (Count: 2).
      `,
    },
    llmPrompt: `
Agrupe as seguintes frases de recusa em categorias (ex: Preço, Tempo, Concorrente).
Conte a frequência de cada categoria.
      `
  },

  "oportunidades": {
    id: "oportunidades",
    name: "Oportunidades (Recomendação)",
    shortDescription: "IA lista ações que vão dar mais resultado. Ranqueia por: quanto R$ vai gerar, quão fácil é fazer, quanto tempo até ver resultado.",
    fullDescription: "Regra de negócio: Se conversão < benchmark, sugere 'Melhorar Conversão'. Se tempo resposta > 1h, sugere 'Responder Rápido'. O impacto financeiro é projetado.",
    calculation: {
      formula: "Impacto = (Benchmark - Atual) * Volume * Ticket",
      dataSources: ["metrics_summary"],
      example: `
Se você responder em 5min (hoje é 1h), a conversão sobe estimada 3%.
3% de 100 leads = 3 vendas a mais.
Ticket 500.
Impacto = R$ 1.500.
      `
    }
  }
};
