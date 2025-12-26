import React from 'react';
import { Zap, Settings, TrendingUp, ArrowRight, CheckSquare } from 'lucide-react';
import { mockData } from '../../data/mockData';

function ActionItem({ label, difficulty, time }: any) {
    return (
        <div className="flex items-start gap-3 bg-[#242424]/50 p-3 rounded-lg border border-white/5 hover:border-[#FF5C35]/30 transition-colors">
            <CheckSquare className="text-[#808080] shrink-0 mt-0.5" size={18} />
            <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <div className="flex gap-2 mt-1">
                     <span className="text-[10px] bg-[#333] px-1.5 py-0.5 rounded text-[#B8B8B8] border border-white/5">{difficulty}</span>
                     <span className="text-[10px] bg-[#333] px-1.5 py-0.5 rounded text-[#B8B8B8] border border-white/5">{time}</span>
                </div>
            </div>
        </div>
    )
}

export function PlanoAcaoSection() {
  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">10</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Plano de Ação</h2>
            <p className="text-lg text-[#B8B8B8]">Roteiro de implementação em 30, 60 e 90 dias</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Month 1 */}
            <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6 md:p-8 hover:border-[#FF5C35]/40 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#FF5C35]/10 border border-[#FF5C35]/20 flex items-center justify-center">
                    <Zap className="text-[#FF5C35]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-[#808080]">MÊS 1</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{mockData.actionPlan.month1.title}</h3>
                  </div>
                </div>
                <p className="text-lg text-[#00E676] font-bold mb-6">Impacto: +R$ {mockData.actionPlan.month1.impact.toLocaleString('pt-BR')}</p>
                <div className="space-y-3">
                    {mockData.actionPlan.month1.actions.map((act, i) => <ActionItem key={i} {...act} />)}
                </div>
            </div>

            {/* Month 2 */}
            <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6 md:p-8 hover:border-[#FF5C35]/40 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/20 flex items-center justify-center">
                    <Settings className="text-[#FFD60A]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-[#808080]">MÊS 2</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{mockData.actionPlan.month2.title}</h3>
                  </div>
                </div>
                <p className="text-lg text-[#00E676] font-bold mb-6">Impacto: +R$ {mockData.actionPlan.month2.impact.toLocaleString('pt-BR')}</p>
                <div className="space-y-3">
                    {mockData.actionPlan.month2.actions.map((act, i) => <ActionItem key={i} {...act} />)}
                </div>
            </div>

            {/* Month 3 */}
            <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6 md:p-8 hover:border-[#FF5C35]/40 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center">
                    <TrendingUp className="text-[#00E676]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-[#808080]">MÊS 3</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{mockData.actionPlan.month3.title}</h3>
                  </div>
                </div>
                <p className="text-lg text-[#00E676] font-bold mb-6">Impacto: +R$ {mockData.actionPlan.month3.impact.toLocaleString('pt-BR')}</p>
                <div className="space-y-3">
                    {mockData.actionPlan.month3.actions.map((act, i) => <ActionItem key={i} {...act} />)}
                </div>
            </div>
        </div>
        
        {/* Final CTA */}
        <div className="bg-gradient-to-br from-[#FF5C35] to-[#00E676] p-1 rounded-3xl">
          <div className="bg-[#0D0D0D] rounded-3xl p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Próximos Passos
              </h3>
              <p className="text-xl text-[#B8B8B8] mb-8">
                Potencial de recuperação identificado: <span className="text-[#00E676] font-bold">R$ {mockData.summary.revenueNotCaptured.toLocaleString('pt-BR')}/mês</span>
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-white text-[#0D0D0D] px-8 py-4 rounded-xl font-semibold text-lg hover:brightness-90 transition-all flex items-center justify-center gap-2">
                  Ativar Assis
                  <ArrowRight size={20} />
                </button>
                <button className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-white/40 transition-all">
                  Falar com Especialista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}