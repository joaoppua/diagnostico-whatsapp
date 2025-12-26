
import React from 'react';
import { AlertCircle, Clock, Zap, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, YAxis } from 'recharts';
import { mockData } from '../../data/mockData';
import { TooltipIcon } from '../ui/TooltipIcon';

interface HeatmapCellProps {
  value: number;
  day: string;
  hour: number;
  isNight: boolean;
}

// Escala de "Foco": Cinza (Ruído) -> Laranja (Sinal)
const getHeatColor = (value: number) => {
    if (value === 0) return 'bg-[#1F1F1F]'; // Vazio
    if (value < 25) return 'bg-[#333333]'; // Baixo (Cinza - Pouco relevante)
    if (value < 50) return 'bg-[#662516]'; // Médio-Baixo (Laranja muito escuro)
    if (value < 75) return 'bg-[#B34125]'; // Médio-Alto (Laranja médio)
    // Pico: Laranja Brand Vibrante + Glow
    return 'bg-[#FF5C35] shadow-[0_0_12px_rgba(255,92,53,0.5)] border border-[#FF5C35]/50'; 
};

const getHeatLabel = (value: number) => {
    if (value === 0) return 'Sem dados';
    if (value < 25) return 'Volume Baixo';
    if (value < 50) return 'Volume Moderado';
    if (value < 75) return 'Volume Alto';
    return 'Pico Crítico';
};

// Minimalist Heatmap Cell
const HeatmapCell: React.FC<HeatmapCellProps> = ({ value, day, hour, isNight }) => {
    const colorClass = getHeatColor(value);
    const label = getHeatLabel(value);
    const isPeak = value >= 75;
    
    return (
        <div className="relative group w-full pt-[100%]">
            <div 
                className={`absolute inset-0 rounded transition-all duration-300 ease-out 
                    ${colorClass} 
                    ${isPeak ? 'z-10 scale-105' : 'hover:border-white/20 border border-transparent'}
                    group-hover:scale-110 group-hover:z-20
                `}
            ></div>
            
            {/* Popover Tooltip on Hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 whitespace-nowrap">
                <div className="flex justify-between items-center gap-4 mb-1 border-b border-white/10 pb-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#808080] font-bold">{day}, {hour}h</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${isPeak ? 'bg-[#FF5C35] text-white' : 'bg-[#333] text-[#B8B8B8]'}`}>
                        {label}
                    </span>
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Zap size={12} className="text-[#FF5C35] fill-current" />
                    {value} mensagens
                </div>
            </div>
        </div>
    );
};

export function AnaliseTemporalSection() {
  const periodData = [
    { period: 'Manhã', value: 14 },
    { period: 'Tarde', value: 19 },
    { period: 'Noite', value: 7 }
  ];

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const hours = Array.from({ length: 15 }, (_, i) => 8 + i); // 8h to 22h

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">01</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Análise Temporal</h2>
            <p className="text-lg text-[#B8B8B8]">Mapa de calor da demanda para identificar gargalos</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* COLUNA 1: HEATMAP MINIMALISTA */}
          <div className="xl:col-span-2 bg-[#1A1A1A]/40 backdrop-blur-md rounded-3xl border border-[#FF5C35]/10 p-6 md:p-8 flex flex-col relative overflow-hidden group/card hover:border-[#FF5C35]/20 transition-colors">
            
            <div className="absolute top-6 right-6 z-20">
                 <TooltipIcon metricId="heatmap-temporal" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Concentração de Mensagens</h3>
                    <p className="text-sm text-[#808080]">Volume de entrada por dia e hora</p>
                </div>
                
                {/* Legenda Monocromática */}
                <div className="flex items-center gap-3 bg-[#0D0D0D]/50 p-2 rounded-lg border border-white/5">
                    <span className="text-[10px] text-[#808080] font-bold uppercase">Volume</span>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-[#333]"></div>
                        <div className="w-3 h-3 rounded-sm bg-[#662516]"></div>
                        <div className="w-3 h-3 rounded-sm bg-[#B34125]"></div>
                        <div className="w-3 h-3 rounded-sm bg-[#FF5C35] border border-[#FF5C35]/50 shadow-[0_0_5px_rgba(255,92,53,0.5)]"></div>
                    </div>
                    <span className="text-[10px] text-[#FF5C35] font-bold uppercase">Crítico</span>
                </div>
            </div>

            <div className="w-full overflow-x-auto custom-scrollbar pb-2">
                <div className="min-w-[600px]">
                    {/* Grid Único para Cabeçalho e Dados - Garante alinhamento e espaçamento perfeito */}
                    <div className="grid grid-cols-[40px_repeat(15,_1fr)] gap-2">
                        
                        {/* Header Row */}
                        <div className="text-[10px] text-[#555] font-mono flex items-end justify-center pb-1">DIA</div>
                        {hours.map(h => (
                            <div key={`h-${h}`} className={`text-[10px] font-mono font-bold flex items-end justify-center pb-1 ${h >= 18 ? 'text-[#FF3B30]' : 'text-[#808080]'}`}>
                                {h}h
                            </div>
                        ))}

                        {/* Data Rows */}
                        {days.map((day, dIdx) => (
                            <React.Fragment key={day}>
                                <div className="text-[10px] font-bold text-[#555] uppercase tracking-wider flex items-center">{day}</div>
                                {hours.map((h, hIdx) => {
                                    const isNight = h >= 18;
                                    let value = mockData.temporal.heatmap[dIdx * 13 + (hIdx % 13)]?.value || Math.floor(Math.random() * 95);
                                    
                                    // Manipulação visual
                                    if ((day === 'Seg' || day === 'Ter') && (h >= 10 && h <= 14)) value = Math.max(value, 80);
                                    if (day === 'Dom') value = Math.min(value, 20);

                                    return (
                                        <HeatmapCell 
                                            key={`${day}-${h}`}
                                            value={value} 
                                            day={day} 
                                            hour={h}
                                            isNight={isNight}
                                        />
                                    )
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="mt-4 flex gap-2 items-start bg-[#1A1A1A] p-3 rounded-lg border border-white/5">
                <Info size={14} className="text-[#808080] mt-0.5 shrink-0" />
                <p className="text-xs text-[#B8B8B8]">
                    <span className="text-white font-bold">Insight:</span> Os pontos brilhantes em laranja (<span className="text-[#FF5C35]">●</span>) indicam onde sua equipe está sobrecarregada. Zonas cinzas indicam ociosidade.
                </p>
            </div>
          </div>
          
          {/* COLUNA 2: ALERTA & VOLUME */}
          <div className="flex flex-col gap-6">
            
            <div className="bg-[#FF3B30]/5 backdrop-blur-md rounded-3xl border border-[#FF3B30]/20 p-6 flex flex-col justify-between hover:bg-[#FF3B30]/10 transition-colors group">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <AlertCircle size={18} className="text-[#FF3B30]" />
                        <span className="text-[#FF3B30] font-bold text-xs uppercase tracking-wider group-hover:underline">Zona de Risco (18h-22h)</span>
                    </div>
                    <p className="text-sm text-[#B8B8B8] leading-relaxed mb-4">
                        Apesar do volume visualmente menor na área avermelhada do mapa, a conversão é 0% pois não há atendimento.
                    </p>
                </div>
                <div>
                     <p className="text-xs text-[#808080] uppercase mb-1">Perda Mensal Estimada</p>
                     <p className="text-2xl font-bold text-white">R$ {mockData.temporal.insights.ignoredLeads.lostRevenue.toLocaleString('pt-BR')}</p>
                </div>
            </div>

            <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-3xl border border-[#FF5C35]/10 p-6 flex-1 flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Clock size={16} className="text-[#FF5C35]" />
                        Volume por Turno
                    </h3>
                </div>
                
                <div className="flex-1 min-h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={periodData} margin={{ top: 10, right: 0, bottom: 0, left: -25 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis 
                                dataKey="period" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#808080', fontSize: 11, fontWeight: 500}} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#555', fontSize: 10}} 
                            />
                            <Tooltip 
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                contentStyle={{
                                    backgroundColor: '#0D0D0D', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '12px'
                                }}
                            />
                            <Bar 
                                dataKey="value" 
                                radius={[6, 6, 0, 0]} 
                                barSize={40}
                                fill="#FF5C35"
                                fillOpacity={0.8}
                            />
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
