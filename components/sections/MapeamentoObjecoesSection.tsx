import React from 'react';
import { mockData } from '../../data/mockData';
import { TooltipIcon } from '../ui/TooltipIcon';

function ObjectionCard({ rank, objection, frequency, conversionAfter, currentResponse, suggestedResponse, metricId }: any) {
    return (
        <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6 flex flex-col md:flex-row gap-6 hover:border-[#FF5C35]/40 transition-colors relative hover:z-50">
            <div className="absolute top-4 right-4">
                 <TooltipIcon metricId={metricId} />
            </div>
            <div className="flex flex-col items-center justify-center min-w-[80px]">
                <div className="w-12 h-12 rounded-full bg-[#FF5C35]/10 flex items-center justify-center text-[#FF5C35] font-bold text-xl border border-[#FF5C35]/20">
                    #{rank}
                </div>
                <span className="text-xs text-[#808080] mt-2 text-center">{frequency}x</span>
            </div>
            
            <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-4">"{objection}"</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0D0D0D]/50 p-4 rounded-xl border border-white/5">
                        <p className="text-xs uppercase tracking-wider text-[#FF3B30] mb-2 font-bold">Sua Resposta Atual</p>
                        <p className="text-[#B8B8B8] italic">"{currentResponse}"</p>
                        <div className="mt-2 text-xs text-[#808080]">Conv. após resposta: {conversionAfter}%</div>
                    </div>
                    
                    <div className="bg-[#00E676]/5 p-4 rounded-xl border border-[#00E676]/20">
                        <p className="text-xs uppercase tracking-wider text-[#00E676] mb-2 font-bold">Sugestão Assis</p>
                        <p className="text-white">"{suggestedResponse}"</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function MapeamentoObjecoesSection() {
  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">08</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Mapeamento de Objeções</h2>
            <p className="text-lg text-[#B8B8B8]">Objeções mais frequentes e sugestões de resposta</p>
          </div>
        </div>
        
        <div className="space-y-4">
            {mockData.objections.map((obj, idx) => (
                <ObjectionCard 
                    key={idx} 
                    {...obj} 
                    metricId={idx === 0 ? "objecoes" : undefined}
                />
            ))}
        </div>
      </div>
    </section>
  );
}