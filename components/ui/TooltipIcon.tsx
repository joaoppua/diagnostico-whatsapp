import React, { useState } from 'react';
import { Info, Code, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TooltipProps } from '../../types';
import { metricDocumentation } from '../../data/metricDocumentation';

export function TooltipIcon({ content, metricId }: TooltipProps) {
  const [show, setShow] = useState(false);
  
  // Se tiver metricId, busca a documentação, senão usa o content legado
  const doc = metricId ? metricDocumentation[metricId] : null;
  // Use shortDescription for the hover text
  const displayContent = doc ? doc.shortDescription : content;
  
  if (!displayContent) return null;

  return (
    <div className="absolute top-4 right-4 z-[100]" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <button
        className="text-[#808080] hover:text-[#FF5C35] transition-colors cursor-pointer relative z-[101] bg-transparent border-0 outline-none"
        onClick={() => setShow(!show)}
        aria-label="Ver Doc Técnica"
        type="button"
      >
        <Code size={18} />
      </button>
      
      {show && (
        <div 
          className="absolute right-0 top-8 w-80 bg-[#0D0D0D] border border-[#FF5C35]/40 rounded-xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.9)] z-[9999] animate-in fade-in zoom-in-95 duration-200 ring-1 ring-white/10"
        >
          <div className="absolute -top-2 right-0.5 w-4 h-4 bg-[#0D0D0D] border-l border-t border-[#FF5C35]/40 rotate-45 transform"></div>
          
          {doc && (
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
              <Database size={12} className="text-[#FF5C35]" />
              <h5 className="text-[#FF5C35] font-mono text-xs font-bold uppercase tracking-wider truncate">
                {doc.name}
              </h5>
            </div>
          )}
          
          <p className="text-[#B8B8B8] text-xs font-sans leading-relaxed relative z-10 mb-3 bg-[#1A1A1A] p-2 rounded border border-white/5">
            {displayContent}
          </p>

          {doc && (
            <Link 
              to={`/docs/${doc.id}`}
              className="flex items-center justify-between text-xs font-semibold text-white hover:text-[#FF5C35] transition-colors pt-1 w-full group"
            >
              <span className="font-mono text-[10px] text-[#808080]">COMO CALCULAR &gt;</span>
              <span className="bg-[#FF5C35]/20 px-1.5 py-0.5 rounded text-[10px] text-[#FF5C35] group-hover:bg-[#FF5C35] group-hover:text-white transition-colors uppercase font-bold">VER DOC TÉCNICA</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}