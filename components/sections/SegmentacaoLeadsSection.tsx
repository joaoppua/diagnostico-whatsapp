import React from 'react';
import { TrendingUp } from 'lucide-react';
import { InsightCard } from '../ui/InsightCard';
import { mockData } from '../../data/mockData';
import { TooltipIcon } from '../ui/TooltipIcon';

interface SegmentCardProps {
    label: string;
    count: number;
    percentage: number;
    color: string;
    conversionRate: number;
    description: string;
    tooltipContent: string;
}

function LeadSegmentCard({ label, count, percentage, color, conversionRate, description, tooltipContent }: SegmentCardProps) {
    return (
        <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6 relative flex flex-col h-full hover:border-[#FF5C35]/50 hover:-translate-y-1 transition-all duration-300">
            <TooltipIcon content={tooltipContent} />
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold uppercase tracking-wider" style={{ color }}>{label}</span>
                <span className="text-2xl font-bold text-white">{count}</span>
            </div>
            
            <div className="mb-4">
                <div className="w-full h-1.5 bg-[#242424] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-[#808080]">
                    <span>{percentage}% do total</span>
                    <span className="text-white font-semibold">{conversionRate}% conv.</span>
                </div>
            </div>
            
            <p className="text-sm text-[#B8B8B8] mt-auto leading-relaxed">{description}</p>
        </div>
    );
}

export function SegmentacaoLeadsSection() {
  const { hot, warm, cold, ghost } = mockData.leadSegmentation;

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">02</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Segmentação de Leads</h2>
            <p className="text-lg text-[#B8B8B8]">Classificação automática por nível de interesse</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <LeadSegmentCard
            label="Leads Quentes"
            count={hot.count}
            percentage={hot.percentage}
            color="#FF5C35"
            conversionRate={hot.conversion}
            description="Perguntam preço, pedem detalhes, respondem rápido"
            tooltipContent="CÁLCULO: Sistema classifica automaticamente. Critérios: menção de preço, urgência, engajamento alto."
          />
          <LeadSegmentCard
            label="Leads Mornos"
            count={warm.count}
            percentage={warm.percentage}
            color="#FFD60A"
            conversionRate={warm.conversion}
            description="Demonstram interesse, mas hesitam"
            tooltipContent="CÁLCULO: Engajamento moderado, sem urgência clara."
          />
          <LeadSegmentCard
            label="Leads Frios"
            count={cold.count}
            percentage={cold.percentage}
            color="#0A84FF"
            conversionRate={cold.conversion}
            description="Apenas pesquisando, sem urgência"
            tooltipContent="CÁLCULO: Baixo engajamento, respostas curtas."
          />
          <LeadSegmentCard
            label="Leads Fantasmas"
            count={ghost.count}
            percentage={ghost.percentage}
            color="#6B6B6B"
            conversionRate={ghost.conversion}
            description="Não respondem após primeira mensagem"
            tooltipContent="CÁLCULO: 1 msg do buyer, seller respondeu, buyer não voltou."
          />
        </div>
        
        <InsightCard
          type="success"
          icon={<TrendingUp />}
          title="Padrão de Alta Conversão Identificado"
          description="Leads que mencionam 'quanto custa' na primeira mensagem convertem 67% mais. Priorize esses contatos."
          tooltipContent="CÁLCULO: IA analisa padrões linguísticos em conversas fechadas."
        />
      </div>
    </section>
  );
}