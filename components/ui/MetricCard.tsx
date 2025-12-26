import React from 'react';
import { TooltipIcon } from './TooltipIcon';
import { MetricCardProps } from '../../types';

export function MetricCard({ icon, label, value, subtitle, tooltipContent, metricId }: MetricCardProps) {
  return (
    <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-3xl border border-[#FF5C35]/20 p-6 hover:border-[#FF5C35]/50 hover:-translate-y-1 transition-all duration-300 relative group shadow-lg shadow-black/20 hover:z-50">
      <TooltipIcon content={tooltipContent} metricId={metricId} />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#FF5C35]/10 flex items-center justify-center text-[#FF5C35] border border-[#FF5C35]/20">
          {icon}
        </div>
      </div>
      
      <p className="text-xs uppercase tracking-wider text-[#808080] mb-2 font-bold">{label}</p>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-[#B8B8B8]">{subtitle}</p>
    </div>
  );
}