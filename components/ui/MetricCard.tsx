import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TooltipIcon } from './TooltipIcon';
import { MetricCardProps } from '../../types';

export function MetricCard({ icon, label, value, subtitle, trend, trendValue, tooltipContent }: MetricCardProps) {
  return (
    <div className="bg-[#1A1A1A]/40 backdrop-blur-md rounded-3xl border border-[#FF5C35]/20 p-6 hover:border-[#FF5C35]/50 hover:-translate-y-1 transition-all duration-300 relative group shadow-lg shadow-black/20">
      <TooltipIcon content={tooltipContent} />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#FF5C35]/10 flex items-center justify-center text-[#FF5C35] border border-[#FF5C35]/20">
          {icon}
        </div>
        {trend !== 'neutral' && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            trend === 'up' ? 'text-[#00E676]' : 'text-[#FF3B30]'
          }`}>
            {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {trendValue}
          </div>
        )}
      </div>
      
      <p className="text-xs uppercase tracking-wider text-[#808080] mb-2 font-bold">{label}</p>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-[#B8B8B8]">{subtitle}</p>
    </div>
  );
}