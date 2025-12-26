import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TooltipIcon } from '../ui/TooltipIcon';
import { mockData } from '../../data/mockData';

interface ScoreCardProps {
  label: string;
  score: number;
  maxScore: number;
  color: string;
  metricId?: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, score, maxScore, color, metricId }) => {
    return (
        <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-6 relative hover:z-50 transition-all">
            <TooltipIcon metricId={metricId} />
            <div className="flex justify-between mb-2">
                <span className="font-semibold text-white">{label}</span>
                <span className="font-bold text-xl" style={{color}}>{score}/{maxScore}</span>
            </div>
            <div className="w-full h-1.5 bg-[#242424] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(score/maxScore)*100}%`, backgroundColor: color }}></div>
            </div>
        </div>
    )
}

interface RedFlagCardProps {
  title: string;
  description: string;
  severity: 'high' | 'medium';
  metricId?: string;
}

const RedFlagCard: React.FC<RedFlagCardProps> = ({ title, description, severity, metricId }) => {
    const borderColor = severity === 'high' ? 'border-[#FF3B30]/30' : 'border-[#FFD60A]/30';
    const textColor = severity === 'high' ? 'text-[#FF3B30]' : 'text-[#FFD60A]';
    const bgColor = severity === 'high' ? 'bg-[#FF3B30]/5' : 'bg-[#FFD60A]/5';
    
    return (
        <div className={`${bgColor} backdrop-blur-md border ${borderColor} rounded-xl p-4 relative hover:z-50 transition-all`}>
            <TooltipIcon metricId={metricId} />
            <h5 className={`${textColor} font-bold mb-1 text-sm uppercase`}>{title}</h5>
            <p className="text-sm text-[#B8B8B8]">{description}</p>
        </div>
    )
}

export function AnaliseComunicacaoSection() {
    // Mock sentiment data
    const sentimentData = [
        { msg: 1, sentiment: 0.8 },
        { msg: 2, sentiment: 0.85 },
        { msg: 3, sentiment: 0.9 },
        { msg: 4, sentiment: 0.6 }, // Drop at price
        { msg: 5, sentiment: 0.5 },
        { msg: 6, sentiment: 0.4 },
    ];

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <span className="text-6xl font-bold text-[#FF5C35]/20 font-mono">04</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Análise de Comunicação</h2>
            <p className="text-lg text-[#B8B8B8]">Avaliação do tom de voz e padrões linguísticos</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ScoreCard
              label="Profissionalismo"
              score={mockData.communication.scores.professionalism}
              maxScore={10}
              color="#FF5C35"
              metricId="comunicacao-scores"
            />
            <ScoreCard
              label="Empatia"
              score={mockData.communication.scores.empathy}
              maxScore={10}
              color="#FF3B30"
              metricId="comunicacao-scores"
            />
            <ScoreCard
              label="Clareza"
              score={mockData.communication.scores.clarity}
              maxScore={10}
              color="#00E676"
              metricId="comunicacao-scores"
            />
          </div>
          
          <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-2xl border border-[#FF5C35]/20 p-8 relative hover:z-50 transition-all">
            <TooltipIcon content="CÁLCULO: IA faz análise de sentimento mensagem a mensagem." />
            <h3 className="text-2xl font-semibold mb-6 text-white">Sentimento da Conversa</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sentimentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="msg" stroke="#808080" tickLine={false} axisLine={false} tickFormatter={(val) => `Msg ${val}`} />
                        <YAxis stroke="#808080" hide domain={[0, 1]} />
                        <Tooltip contentStyle={{backgroundColor: '#1A1A1A', borderColor: '#333'}} />
                        <Line type="monotone" dataKey="sentiment" stroke="#00E676" strokeWidth={3} dot={{fill: '#0D0D0D', strokeWidth: 2}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">
                <AlertTriangle className="text-[#FF3B30]" />
                Red Flags Identificados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.communication.redFlags.map((flag, idx) => (
                    <RedFlagCard 
                        key={idx}
                        title={flag.title}
                        description={
                            flag.type === 'insecurity' ? `Você usa 'talvez' ${flag.count} vezes - isso demonstra insegurança` :
                            flag.type === 'length' ? `Suas mensagens têm média de ${flag.avgWords} palavras - leads preferem 30-40` :
                            flag.type === 'timing' ? `Você pergunta preço antes de criar valor em ${flag.percentage}% das conversas` :
                            `Você faz apenas ${flag.avg} perguntas por conversa, ideal seria ${flag.ideal}`
                        }
                        severity={flag.type === 'insecurity' || flag.type === 'timing' ? 'high' : 'medium'}
                        metricId="comunicacao-scores"
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}