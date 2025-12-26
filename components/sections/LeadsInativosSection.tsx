import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { mockData } from '../../data/mockData';
import { TooltipIcon } from '../ui/TooltipIcon';

function InactiveLeadCard({ name, daysInactive, lastMessage, value, recoveryScore, reason, priority }: any) {
    return (
        <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl p-6 border border-[#FF5C35]/20 hover:border-[#FF5C35]/50 transition-colors group relative">
            <TooltipIcon content={`Motivo: ${reason}`} />
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-bold text-white text-lg">{name}</h4>
                    <span className="text-xs text-[#FF5C35] font-semibold bg-[#FF5C35]/10 px-2 py-1 rounded-md mt-1 inline-block border border-[#FF5C35]/20">{priority} PRIORITY</span>
                </div>
                <div className="text-right">
                    <span className="block text-[#00E676] font-bold">R$ {value}</span>
                    <span className="text-xs text-[#808080] flex items-center justify-end gap-1">
                        <Clock size={12} /> {daysInactive}d
                    </span>
                </div>
            </div>
            
            <p className="text-sm text-[#B8B8B8] italic mb-4 line-clamp-2">"{lastMessage}"</p>
            
            <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-1 bg-[#242424] rounded-full">
                    <div className="h-full bg-[#00E676] rounded-full" style={{width: `${recoveryScore}%`}}></div>
                </div>
                <span className="text-xs text-[#00E676] font-bold">{recoveryScore}% chance</span>
            </div>
            
            <button className="w-full py-2.5 rounded-xl bg-[#333]/50 hover:bg-[#FF5C35] border border-white/5 hover:border-[#FF5C35] text-white text-sm font-semibold transition-all">
                Ver Script
            </button>
        </div>
    )
}

export function LeadsInativosSection() {
  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">07</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Leads Inativos</h2>
            <p className="text-lg text-[#B8B8B8]">{mockData.inactiveLeads.length} conversas pausadas com potencial de R$ {mockData.summary.recoverableValue.toLocaleString('pt-BR')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockData.inactiveLeads.map((lead, idx) => (
                <InactiveLeadCard key={idx} {...lead} />
            ))}
        </div>
        
        <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/30 p-8 text-center max-w-3xl mx-auto shadow-2xl shadow-[#FF5C35]/5">
            <p className="text-2xl font-semibold mb-2 text-white">
                5 leads têm alta chance de recuperação
            </p>
            <p className="text-lg text-[#B8B8B8] mb-6">
                Potencial combinado: <span className="text-[#00E676] font-bold">R$ 6.410</span>
            </p>
            <button className="bg-[#FF5C35] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:brightness-110 transition-all shadow-lg shadow-[#FF5C35]/40 flex items-center gap-2 mx-auto">
                Ver Scripts de Recuperação
                <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
}