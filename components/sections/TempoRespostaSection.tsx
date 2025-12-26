import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, CartesianGrid } from 'recharts';
import { InsightCard } from '../ui/InsightCard';
import { TooltipIcon } from '../ui/TooltipIcon';
import { mockData } from '../../data/mockData';

export function TempoRespostaSection() {
  const chartData = mockData.responseTime.byRange;

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">03</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Tempo de Resposta</h2>
            <p className="text-lg text-[#B8B8B8]">Correlação entre velocidade de atendimento e taxa de conversão</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-8">
            <h3 className="text-2xl font-semibold mb-6 text-white">Tempo de Resposta vs. Conversão</h3>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="range" stroke="#808080" tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#808080" hide />
                  <YAxis yAxisId="right" orientation="right" stroke="#FF5C35" hide />
                  <Tooltip 
                     contentStyle={{backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff'}}
                     cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  />
                  <Bar yAxisId="left" dataKey="conversations" name="Volume Conversas" fill="#333" radius={[4, 4, 0, 0]} barSize={40} />
                  <Line yAxisId="right" type="monotone" dataKey="conversion" name="Taxa Conversão %" stroke="#FF5C35" strokeWidth={3} dot={{fill: '#FF5C35', r: 4}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-[#808080] mt-4 flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-[#333]"></span> Volume
               <span className="w-8 h-1 bg-[#FF5C35] rounded-full ml-4"></span> Conversão
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6 relative hover:z-50 transition-all">
              <TooltipIcon metricId="tempo-resposta" />
              <p className="text-sm uppercase tracking-wider text-[#808080] mb-2">Seu Tempo Médio</p>
              <p className="text-5xl font-bold text-[#FF3B30] mb-2">{mockData.responseTime.average}</p>
              <p className="text-sm text-[#B8B8B8]">Benchmark do setor: {mockData.responseTime.benchmark}</p>
            </div>
            
            <InsightCard
              type="danger"
              icon={<AlertCircle />}
              title="Perda Calculada"
              description={`Você perdeu R$ ${mockData.responseTime.lostRevenue} em vendas por responder após 1h. Cada minuto de atraso reduz a conversão em 2.3%.`}
              metricId="tempo-resposta"
            />
            
            <div className="bg-[#FF3B30]/5 backdrop-blur-md border border-[#FF3B30]/30 rounded-xl p-6 relative hover:z-50 transition-all">
              <TooltipIcon content="CÁLCULO: Deal de maior valor perdido com alto response_time." />
              <p className="text-sm font-semibold text-[#FF3B30] mb-2">Pior Caso Real</p>
              <p className="text-sm text-[#B8B8B8]">
                Lead de <span className="text-white font-bold">R$ {mockData.responseTime.worstCase.value}</span> perdido por responder {mockData.responseTime.worstCase.time} depois
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}