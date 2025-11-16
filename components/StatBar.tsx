
import React from 'react';
import { STAT_COLORS } from '../constants';

interface StatBarProps {
  statName: string;
  value: number;
}

const MAX_STAT_VALUE = 255;

export const StatBar: React.FC<StatBarProps> = ({ statName, value }) => {
  const percentage = (value / MAX_STAT_VALUE) * 100;
  const statKey = statName.toLowerCase().replace(' ', '-');
  const colorClass = STAT_COLORS[statKey] || 'bg-gray-400';

  return (
    <div className="flex items-center gap-4 mb-2">
      <p className="w-1/3 text-sm font-semibold text-right">{statName}</p>
      <div className="w-2/3 bg-gray-200 dark:bg-gray-600 rounded-full h-5">
        <div
          className={`h-5 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold ${colorClass}`}
          style={{ width: `${percentage}%` }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};
