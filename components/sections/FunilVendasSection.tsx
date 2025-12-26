import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { InsightCard } from '../ui/InsightCard';
import { mockData } from '../../data/mockData';
import { TooltipIcon } from '../ui/TooltipIcon';

function FunnelStage({ label, count, percentage, time, dropoff, color, metricId }: any) {
    return (
        <div className="relative group hover:z-50 transition-all">
            <TooltipIcon metricId={metricId} />
            <div className="flex items-center gap-4 mb-2">
                <div className="flex-1 h-12 rounded-r-full flex items-center px-4 relative overflow-visible" 
                     style={{ 
                         backgroundColor: `${color}15`, 
                         borderLeft: `4px solid ${color}`,
                         width: `${percentage}%` 
                     }}>
                    <span className="font-semibold text-white truncate z-10">{label}</span>
                </div>
                <div className="flex flex-col items-end min-w-[80px]">
                    <span className="font-bold text-white">{count}</span>
                    <span className="text-xs text-[#808080]">{percentage}%</span>
                </div>
                <div className="flex flex-col items-end min-w-[80px]">
                    <span className="text-sm text-[#B8B8B8]">{time}</span>
                    {dropoff && <span className="text-xs text-[#FF3B30] font-semibold">{dropoff}</span>}
                </div>
            </div>
        </div>
    )
}

export function FunilVendasSection() {
  const stages = [
      { ...mockData.funnel.stages[0], color: '#FF5C35' },
      { ...mockData.funnel.stages[1], color: '#FF6B4A' },
      { ...mockData.funnel.stages[2], color: '#FF8A5F' },
      { ...mockData.funnel.stages[3], color: '#FFA974' },
      { ...mockData.funnel.stages[4], color: '#FFC889' },
      { ...mockData.funnel.stages[5], color: '#00E676' },
  ];

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">05</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Funil de Vendas</h2>
            <p className="text-lg text-[#B8B8B8]">Visualização do fluxo de conversão em cada etapa</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-8">
            <div className="space-y-4">
                {stages.map((stage, idx) => (
                    <FunnelStage 
                        key={idx}
                        label={stage.name}
                        count={stage.count}
                        percentage={stage.percentage}
                        time={stage.time}
                        dropoff={stage.dropoff ? `${stage.dropoff}%` : null}
                        color={stage.color}
                        metricId="funil-vendas"
                    />
                ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <InsightCard
              type="danger"
              icon={<AlertCircle />}
              title="Gargalo Crítico Identificado"
              description={mockData.funnel.criticalBottleneck}
              metricId="funil-vendas"
            />
            
            <InsightCard
              type="warning"
              icon={<AlertTriangle />}
              title="Problema de Qualificação"
              description="24.6% de abandono na fase de qualificação. Você está fazendo perguntas que afastam em vez de engajar."
              metricId="funil-vendas"
            />
            
            <InsightCard
              type="success"
              icon={<CheckCircle />}
              title="Ponto Forte"
              description="Sua taxa de fechamento após negociação (74.2%) está acima da média. O problema está antes."
              metricId="conversao-atual"
            />
            
            <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6">
              <h4 className="text-xl font-semibold mb-4 text-white">Tempo Médio por Estágio</h4>
              <div className="space-y-3 text-sm">
                 {stages.slice(0,5).map((s, i) => (
                     <div key={i} className="flex justify-between border-b border-white/5 pb-2 last:border-0">
                         <span className="text-[#B8B8B8]">{s.name}</span>
                         <span className="text-white font-semibold">{s.time}</span>
                     </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}