
import React from 'react';
import { DollarSign, Target, Users, Clock, Star, CalendarRange, MessageSquare, CalendarCheck } from 'lucide-react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { mockData } from '../../data/mockData';
import { MetricCard } from '../ui/MetricCard';
import { TooltipIcon } from '../ui/TooltipIcon';

export function HeroSection() {
  const scoreData = [{ name: 'Score', value: mockData.summary.score, fill: '#FF5C35' }];

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,92,53,0.15)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <h1 className="text-4xl md:text-7xl font-bold text-center mb-8 text-white">
          Diagnóstico de Vendas <span className="text-[#FF5C35]">WhatsApp</span>
        </h1>
        
        {/* Metadata Bar */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
                <div className="flex items-center gap-2 bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#FF5C35]/20 px-4 py-2 rounded-full text-sm text-[#B8B8B8]">
                    <MessageSquare size={16} className="text-[#FF5C35]" />
                    <span className="font-medium text-white">1.984</span> conversas analisadas
                </div>
                
                <div className="flex items-center gap-2 bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#FF5C35]/20 px-4 py-2 rounded-full text-sm text-[#B8B8B8]">
                    <CalendarRange size={16} className="text-[#FF5C35]" />
                    Período de análise: <span className="text-white">{mockData.summary.analysisPeriod}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#FF5C35]/20 px-4 py-2 rounded-full text-sm text-[#B8B8B8]">
                <CalendarCheck size={16} className="text-[#FF5C35]" />
                Relatório gerado em: <span className="text-white">{mockData.summary.analysisDate}</span>
            </div>
        </div>
        
        {/* Card do Score Principal - Glass Effect */}
        <div className="max-w-4xl mx-auto bg-[#1A1A1A]/40 backdrop-blur-xl rounded-3xl border border-[#FF5C35]/20 p-8 md:p-12 shadow-2xl mb-12 relative hover:z-50 transition-all">
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF5C35]/50 to-transparent opacity-50"></div>
          </div>
          
          <TooltipIcon metricId="score-saude" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            {/* Medidor Circular */}
            <div className="relative w-48 h-48 shrink-0">
               <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="80%" 
                  outerRadius="100%" 
                  barSize={8} 
                  data={scoreData} 
                  startAngle={180} 
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background={{ fill: '#333' }} dataKey="value" cornerRadius={30} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center -mt-6">
                <span className="text-6xl font-bold text-white">{mockData.summary.score}</span>
                <span className="text-sm text-[#808080] uppercase font-bold tracking-wide">Regular</span>
              </div>
            </div>
            
            {/* Info do Score */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm uppercase tracking-wider text-[#808080] mb-2 font-semibold">SCORE DE SAÚDE DE VENDAS</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Precisa de <span className="text-[#FF3B30]">Atenção Urgente</span>
              </h2>
              <p className="text-base md:text-lg text-[#B8B8B8] mb-4">
                Você está deixando <span className="text-[#FF3B30] font-bold">R$ {mockData.summary.revenueNotCaptured.toLocaleString('pt-BR')}</span> na mesa.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Star className="fill-[#FFD700] text-[#FFD700]" size={20} />
                <Star className="fill-[#FFD700] text-[#FFD700]" size={20} />
                <Star className="fill-[#FFD700] text-[#FFD700]" size={20} />
                <Star className="text-[#4A4A4A]" size={20} />
                <Star className="text-[#4A4A4A]" size={20} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid de 4 Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            icon={<DollarSign />}
            label="RECEITA NÃO CAPTURADA"
            value={`R$ ${mockData.summary.revenueNotCaptured.toLocaleString('pt-BR')}`}
            subtitle="No período"
            metricId="receita-nao-capturada"
          />
          
          <MetricCard
            icon={<Target />}
            label="CONVERSÃO ATUAL"
            value={`${mockData.summary.currentConversion}%`}
            subtitle={`Potencial: ${mockData.summary.potentialConversion}%`}
            metricId="conversao-atual"
          />
          
          <MetricCard
            icon={<Users />}
            label="LEADS RECUPERÁVEIS"
            value={mockData.summary.recoverableLeads.toString()}
            subtitle={`Potencial: R$ ${mockData.summary.recoverableValue.toLocaleString('pt-BR')}`}
            metricId="leads-recuperaveis"
          />
          
          <MetricCard
            icon={<Clock />}
            label="CICLO DE VENDA"
            value={`${mockData.summary.salesCycle} dias`}
            subtitle="Média até fechamento"
            metricId="ciclo-venda"
          />
        </div>
      </div>
    </section>
  );
}