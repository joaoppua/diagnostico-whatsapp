import React from 'react';
import { InsightCardProps } from '../../types';
import { TooltipIcon } from './TooltipIcon';

const colorMap = {
  success: { bg: 'bg-[#00E676]/5', border: 'border-[#00E676]/30', text: 'text-[#00E676]' },
  warning: { bg: 'bg-[#FFD60A]/5', border: 'border-[#FFD60A]/30', text: 'text-[#FFD60A]' },
  danger: { bg: 'bg-[#FF3B30]/5', border: 'border-[#FF3B30]/30', text: 'text-[#FF3B30]' },
  info: { bg: 'bg-[#0A84FF]/5', border: 'border-[#0A84FF]/30', text: 'text-[#0A84FF]' },
};

export function InsightCard({ type, icon, title, description, tooltipContent, metricId }: InsightCardProps) {
  const colors = colorMap[type];
  
  return (
    <div className={`${colors.bg} backdrop-blur-md border ${colors.border} rounded-xl p-6 relative transition-all hover:bg-opacity-20 hover:z-50`}>
      {(tooltipContent || metricId) && <TooltipIcon content={tooltipContent} metricId={metricId} />}
      
      <div className="flex items-start gap-3">
        <div className={`${colors.text} mt-1 shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 pr-4">
          <h4 className={`font-semibold mb-2 ${colors.text}`}>{title}</h4>
          <p className="text-sm text-[#B8B8B8] leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}