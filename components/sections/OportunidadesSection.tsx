import React from 'react';
import { Check, Star } from 'lucide-react';
import { mockData } from '../../data/mockData';
import { TooltipIcon } from '../ui/TooltipIcon';

function OpportunityCard({ rank, title, description, impact, ease, timeToResult, tooltipContent }: any) {
    return (
        <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6 flex flex-col md:flex-row items-center gap-6 hover:border-[#FF5C35]/50 transition-all relative group">
            {tooltipContent && <TooltipIcon content={tooltipContent} />}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#FF5C35] to-[#FF8A5F] text-white font-bold text-xl shrink-0 shadow-lg shadow-[#FF5C35]/20">
                {rank}
            </div>
            
            <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
                <p className="text-[#B8B8B8]">{description}</p>
            </div>
            
            <div className="flex items-center gap-6 md:border-l md:border-white/10 md:pl-6 w-full md:w-auto justify-between md:justify-end">
                <div className="text-center">
                    <span className="block text-[#00E676] font-bold text-lg">+R$ {impact.toLocaleString('pt-BR')}</span>
                    <span className="text-xs text-[#808080] uppercase">Impacto</span>
                </div>
                <div className="text-center">
                    <span className="block text-white font-bold text-lg">{ease}/10</span>
                    <span className="text-xs text-[#808080] uppercase">Facilidade</span>
                </div>
                <div className="text-center">
                    <span className="block text-[#FFD60A] font-bold text-lg whitespace-nowrap">{timeToResult}</span>
                    <span className="text-xs text-[#808080] uppercase">Tempo</span>
                </div>
            </div>
        </div>
    )
}

export function OportunidadesSection() {
  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">09</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Oportunidades Identificadas</h2>
            <p className="text-lg text-[#B8B8B8]">Ações de alto impacto ordenadas por facilidade de implementação</p>
          </div>
        </div>
        
        <div className="space-y-4">
            {mockData.opportunities.map((opp, idx) => (
                <OpportunityCard 
                    key={idx} 
                    {...opp} 
                    tooltipContent={idx === 0 ? "CÁLCULO: Impacto = (conversão_potencial - conversão_atual) × volume × ticket_médio." : undefined}
                />
            ))}
        </div>
      </div>
    </section>
  );
}