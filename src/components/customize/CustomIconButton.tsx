
import React from 'react';
import { Power, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as icons from 'lucide-react';

interface CustomIconButtonProps {
  label: string;
  icon: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  glowEffect?: boolean;
  onClick?: () => void;
}

const CustomIconButton = ({ label, icon, size = 'md', color = '#3b82f6', glowEffect = false, onClick }: CustomIconButtonProps) => {
  // Get the icon component dynamically from lucide-react
  const IconComponent = (icons as any)[icon.charAt(0).toUpperCase() + icon.slice(1)] || Power;
  
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  };
  
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };
  
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={cn(
          "rounded-full glossy-switch flex items-center justify-center mb-1 relative transition-all duration-300",
          sizeClasses[size],
          glowEffect ? 'animate-pulse' : ''
        )}
        style={{ 
          backgroundColor: color,
          boxShadow: glowEffect ? `0 0 15px ${color}` : 'none'
        }}
      >
        <IconComponent size={iconSizes[size]} className="text-white" />
      </button>
      <span className="text-xs text-center mt-1 text-gray-200">{label}</span>
    </div>
  );
};

export default CustomIconButton;
