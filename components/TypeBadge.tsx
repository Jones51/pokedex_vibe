
import React from 'react';
import { TYPE_COLORS } from '../constants';

interface TypeBadgeProps {
  typeName: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ typeName }) => {
  const colorClass = TYPE_COLORS[typeName] || 'bg-gray-500 text-white';
  
  return (
    <span className={`px-4 py-1 text-sm font-bold uppercase rounded-full shadow-md ${colorClass}`}>
      {typeName}
    </span>
  );
};
