import React from 'react';
import { DollarSign, Target, Users, Clock, Star } from 'lucide-react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { mockData } from '../../data/mockData';
import { MetricCard } from '../ui/MetricCard';

export function HeroSection() {
  const scoreData = [{ name: 'Score', value: mockData.summary.score, fill: '#FF5C35' }];

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,92,53,0.15)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <h1 className="text-4xl md:text-7xl font-bold text-center mb-4 text-white">
          Diagnóstico de Vendas <span className="text-[#FF5C35]">WhatsApp</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#B8B8B8] text-center mb-12">
          {mockData.summary.totalConversations} conversas analisadas nos últimos {mockData.summary.periodDays} dias
        </p>
        
        {/* Card do Score Principal - Glass Effect */}
        <div className="max-w-4xl mx-auto bg-[#1A1A1A]/40 backdrop-blur-xl rounded-3xl border border-[#FF5C35]/20 p-8 md:p-12 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF5C35]/50 to-transparent opacity-50"></div>
          
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
                Você está deixando <span className="text-[#FF3B30] font-bold">R$ {mockData.summary.revenueNotCaptured.toLocaleString('pt-BR')}</span> na mesa todo mês. 
                Este relatório revela exatamente como recuperar esse valor.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Star className="fill-[#FFD700] text-[#FFD700]" size={20} />
                <Star className="fill-[#FFD700] text-[#FFD700]" size={20} />
                <Star className="fill-[#FFD700] text-[#FFD700]" size={20} />
                <Star className="text-[#4A4A4A]" size={20} />
                <Star className="text-[#4A4A4A]" size={20} />
                <span className="text-sm text-[#808080] ml-2">Potencial para 5 estrelas</span>
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
            subtitle="Por mês"
            trend="down"
            trendValue="-52%"
            tooltipContent="CÁLCULO: Soma do valor de todos os deals com status 'perdido' + deals 'em negociação'. DADOS: SUM(deals.value WHERE status IN ('perdido','em_negociacao'))"
          />
          
          <MetricCard
            icon={<Target />}
            label="CONVERSÃO ATUAL"
            value={`${mockData.summary.currentConversion}%`}
            subtitle={`Potencial: ${mockData.summary.potentialConversion}%`}
            trend="up"
            trendValue="+2.3%"
            tooltipContent="CÁLCULO: (Total deals fechados / Total leads) × 100. DADOS: COUNT(deals WHERE status='aprovado') / COUNT(total_deals)"
          />
          
          <MetricCard
            icon={<Users />}
            label="LEADS RECUPERÁVEIS"
            value={mockData.summary.recoverableLeads.toString()}
            subtitle={`Potencial: R$ ${mockData.summary.recoverableValue.toLocaleString('pt-BR')}`}
            trend="neutral"
            tooltipContent="CÁLCULO: Deals em negociação há 3+ dias sem resposta com score recuperabilidade >60%. DADOS: COUNT(deals WHERE status='em_negociacao' AND inactive_days>3)"
          />
          
          <MetricCard
            icon={<Clock />}
            label="CICLO DE VENDA"
            value={`${mockData.summary.salesCycle} dias`}
            subtitle="Média até fechamento"
            trend="down"
            trendValue="-0.8d"
            tooltipContent="CÁLCULO: Média da diferença entre primeira mensagem e última quando status='aprovado'. DADOS: AVG(last_msg_date - first_msg_date WHERE status='aprovado')"
          />
        </div>
      </div>
    </section>
  );
}