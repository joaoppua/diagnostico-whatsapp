import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { TooltipProps } from '../../types';

export function TooltipIcon({ content }: TooltipProps) {
  const [show, setShow] = useState(false);
  
  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        className="text-[#808080] hover:text-[#FF5C35] transition-colors cursor-pointer"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        aria-label="More info"
      >
        <Info size={18} />
      </button>
      
      {show && (
        <div className="absolute right-0 top-8 w-64 md:w-96 bg-[#1A1A1A] border border-[#FF5C35]/30 rounded-xl p-4 shadow-2xl text-sm leading-relaxed z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="absolute -top-2 right-4 w-4 h-4 bg-[#1A1A1A] border-l border-t border-[#FF5C35]/30 rotate-45"></div>
          <p className="text-[#B8B8B8] whitespace-pre-line relative z-10">{content}</p>
        </div>
      )}
    </div>
  );
}