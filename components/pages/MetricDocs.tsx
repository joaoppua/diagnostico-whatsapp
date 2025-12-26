import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, Calculator, FileText, Cpu, Code2 } from 'lucide-react';
import { metricDocumentation } from '../../data/metricDocumentation';

export function MetricDocs() {
  const { metricId } = useParams();
  const navigate = useNavigate();
  const doc = metricId ? metricDocumentation[metricId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [metricId]);

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl font-bold mb-4 font-mono text-[#FF3B30]">404: Métrica não encontrada</h1>
        <button onClick={() => navigate('/')} className="text-[#FF5C35] hover:underline font-mono">
          Voltar para Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-20 font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10 z-50">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#808080] hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#FF5C35] font-bold font-mono">DOC TÉCNICA (DEV-TO-DEV)</span>
            <h1 className="text-sm font-mono text-white">{doc.name}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 pt-28 max-w-4xl">
        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">{doc.name}</h2>
          <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-lg">
             <h3 className="text-[#FF5C35] font-bold uppercase text-xs mb-2 flex items-center gap-2">
                <FileText size={14} /> O que é
             </h3>
             <p className="text-lg text-[#B8B8B8] leading-relaxed whitespace-pre-line">
                {doc.fullDescription}
             </p>
          </div>
        </section>

        {/* Calculation & Logic */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-lg">
                <h3 className="text-[#00E676] font-bold uppercase text-xs mb-3 flex items-center gap-2">
                    <Calculator size={14} /> Como calcular
                </h3>
                <code className="block bg-black/40 p-3 rounded text-sm font-mono text-white border border-white/5 break-words">
                    {doc.calculation.formula}
                </code>
            </div>

            <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-lg">
                <h3 className="text-[#FFD60A] font-bold uppercase text-xs mb-3 flex items-center gap-2">
                    <Database size={14} /> Dados Necessários
                </h3>
                <ul className="space-y-2">
                    {doc.calculation.dataSources.map((source, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[#B8B8B8] font-mono">
                            <span className="w-1.5 h-1.5 bg-[#FFD60A] rounded-full"></span>
                            {source}
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        {/* Implementation Logic (JS) */}
        {doc.implementationNotes && (
            <section className="mb-10">
                <h3 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
                    <Code2 size={20} className="text-[#0A84FF]" />
                    Lógica de Implementação (JS)
                </h3>
                <div className="bg-[#1A1A1A] border border-[#0A84FF]/30 p-6 rounded-lg relative">
                    <pre className="text-[#89CFF0] font-mono text-sm whitespace-pre-wrap">{doc.implementationNotes}</pre>
                </div>
            </section>
        )}

        {/* Example */}
        <section className="mb-10">
            <h3 className="text-white font-bold mb-4 text-lg">Exemplo Prático</h3>
            <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-lg font-mono text-sm text-[#B8B8B8] whitespace-pre-wrap leading-relaxed">
                {doc.calculation.example}
            </div>
        </section>

        {/* LLM Prompt */}
        {doc.llmPrompt && (
            <section className="mb-10">
                <h3 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
                    <Cpu size={20} className="text-[#A855F7]" />
                    Prompt pra IA
                </h3>
                <div className="bg-[#1A1A1A] border border-[#A855F7]/30 p-6 rounded-lg relative">
                    <pre className="text-[#E9D5FF] font-mono text-sm whitespace-pre-wrap">{doc.llmPrompt}</pre>
                </div>
            </section>
        )}

        {/* Ranges */}
        {doc.ranges && (
             <section className="mb-12">
                <h3 className="text-white font-bold mb-4 text-lg">Ranges (O que é bom/ruim)</h3>
                <div className="bg-[#1A1A1A] border border-white/10 rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="p-4 text-xs font-bold uppercase text-[#808080]">Range</th>
                                <th className="p-4 text-xs font-bold uppercase text-[#808080]">Label</th>
                                <th className="p-4 text-xs font-bold uppercase text-[#808080]">O que significa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doc.ranges.map((range, idx) => (
                                <tr key={idx} className="border-b border-white/5 last:border-0">
                                    <td className="p-4 font-mono text-sm text-[#FF5C35]">
                                        {range.min} - {range.max ?? '+'}
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded text-xs font-bold border" style={{ color: range.color, borderColor: `${range.color}40`, backgroundColor: `${range.color}10` }}>
                                            {range.label}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-[#B8B8B8]">
                                        {range.message}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </section>
        )}

      </main>
    </div>
  );
}