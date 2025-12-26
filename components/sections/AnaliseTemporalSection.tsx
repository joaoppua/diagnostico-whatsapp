import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { InsightCard } from '../ui/InsightCard';
import { mockData } from '../../data/mockData';

export function AnaliseTemporalSection() {
  const periodData = [
    { period: 'Manhã (8h-12h)', value: 14 },
    { period: 'Tarde (12h-18h)', value: 19 },
    { period: 'Noite (18h-22h)', value: 7 }
  ];

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">01</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Análise Temporal</h2>
            <p className="text-lg text-[#B8B8B8]">Mapeamento dos padrões de conversão por dia e horário</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Heatmap Simulation */}
          <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-8 hover:border-[#FF5C35]/40 transition-colors">
            <h3 className="text-2xl font-semibold mb-6 text-white">Mapa de Calor de Conversas</h3>
            <div className="h-80 flex flex-col justify-between">
                {/* Simple Grid Representation for Heatmap */}
                <div className="grid grid-cols-8 gap-1 h-full">
                    <div className="flex flex-col justify-between text-xs text-[#808080] pr-2">
                         <span>08h</span>
                         <span>12h</span>
                         <span>16h</span>
                         <span>20h</span>
                    </div>
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day, dIndex) => (
                         <div key={day} className="flex flex-col gap-1">
                             <span className="text-xs text-center text-[#808080] mb-1">{day}</span>
                             {Array.from({length: 13}).map((_, hIndex) => {
                                 const intensity = Math.random(); 
                                 const opacity = intensity < 0.2 ? 0.1 : intensity;
                                 return (
                                     <div 
                                        key={hIndex} 
                                        className="flex-1 rounded-sm bg-[#FF5C35]" 
                                        style={{ opacity: opacity }}
                                        title={`${day} ${8+hIndex}h`}
                                     />
                                 )
                             })}
                         </div>
                    ))}
                </div>
            </div>
          </div>
          
          {/* Insights */}
          <div className="space-y-4">
            <InsightCard
              type="success"
              icon={<CheckCircle />}
              title="Seu Melhor Horário"
              description={mockData.temporal.insights.bestTime}
              tooltipContent="CÁLCULO: Cruza horário das mensagens com deals fechados. Identifica correlação horário × taxa_conversão."
            />
            
            <InsightCard
              type="danger"
              icon={<AlertCircle />}
              title="Leads Ignorados"
              description={`Você ignora ${mockData.temporal.insights.ignoredLeads.percentage}% dos leads que chegam após 18h. Isso representa R$ ${mockData.temporal.insights.ignoredLeads.lostRevenue}/mês perdidos.`}
              tooltipContent="CÁLCULO: Mensagens recebidas após 18h sem resposta no mesmo dia × ticket_médio."
            />
            
            <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6">
              <h4 className="text-xl font-semibold mb-4 text-white">Conversão por Período</h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={periodData}>
                    <XAxis dataKey="period" stroke="#808080" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff'}}
                        itemStyle={{color: '#FF5C35'}}
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {periodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#FF5C35" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}