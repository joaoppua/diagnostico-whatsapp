import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle } from 'lucide-react';
import { InsightCard } from '../ui/InsightCard';
import { mockData } from '../../data/mockData';
import { TooltipIcon } from '../ui/TooltipIcon';

export function PadroesConversaSection() {
    const talkData = [
        { name: 'Você', value: mockData.conversationPatterns.whoTalksMore.seller },
        { name: 'Lead', value: mockData.conversationPatterns.whoTalksMore.buyer },
    ];
    const COLORS = ['#FF5C35', '#404040'];

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">06</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Padrões de Conversa</h2>
            <p className="text-lg text-[#B8B8B8]">Análise de volume e gatilhos de abandono</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-8 relative hover:z-50 transition-all">
            <TooltipIcon content="CÁLCULO: Contagem de mensagens enviadas pelo vendedor vs lead." />
            <h3 className="text-2xl font-semibold mb-6 text-white">Quem Fala Mais?</h3>
            <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={talkData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                        {talkData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip contentStyle={{backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff'}} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-[#FF5C35]">{talkData[0].value}%</span>
                        <span className="text-xs text-[#808080]">VOCÊ</span>
                    </div>
                </div>
            </div>
            <p className="text-center text-sm text-[#FF3B30] mt-4 font-semibold">
              Ideal: Lead fala 60%, você 40%
            </p>
          </div>
          
          <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-8 relative hover:z-50 transition-all">
            <TooltipIcon content="CÁLCULO: Gatilhos que antecedem o silêncio do lead." metricId="objecoes" />
            <h3 className="text-2xl font-semibold mb-6 text-white">Padrões de Abandono</h3>
            <div className="space-y-6">
                {mockData.conversationPatterns.abandonment.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#B8B8B8]">{item.trigger}</span>
                            <div className="flex gap-2">
                                <span className={`font-bold ${item.percentage > 40 ? 'text-[#FF3B30]' : 'text-[#FFD60A]'}`}>{item.percentage}%</span>
                                <span className="text-[#808080]">{item.count} leads</span>
                            </div>
                        </div>
                        <div className="w-full h-1.5 bg-[#242424] rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${item.percentage > 40 ? 'bg-[#FF3B30]' : 'bg-[#FFD60A]'}`} 
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
            <InsightCard
                type="success"
                icon={<CheckCircle />}
                title="Padrão de Sucesso"
                description="Conversas com +5 perguntas do lead convertem 3x mais. Encoraje perguntas em vez de dar todas as informações."
                metricId="comunicacao-scores"
            />
        </div>
      </div>
    </section>
  );
}