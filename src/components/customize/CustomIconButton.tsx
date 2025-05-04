
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
  buttonStyle?: 'glossy' | 'metal' | 'carbon' | 'rubber' | 'glass' | 'military';
  buttonType?: 'round' | 'rectangular' | 'oval' | 'flip';
  state?: 'default' | 'active' | 'pressed' | 'disabled';
  onClick?: () => void;
}

const CustomIconButton = ({ 
  label, 
  icon, 
  size = 'md', 
  color = '#3b82f6', 
  glowEffect = false, 
  buttonStyle = 'glossy',
  buttonType = 'round',
  state = 'default',
  onClick 
}: CustomIconButtonProps) => {
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

  // Button type classes
  const buttonTypeClasses = {
    round: 'rounded-full',
    rectangular: 'rounded-md',
    oval: 'rounded-full aspect-[1.5/1]',
    flip: 'rounded-md'
  };

  // Button style-specific classes and effects
  const getStyleClasses = () => {
    switch (buttonStyle) {
      case 'metal':
        return 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-400 border border-gray-500';
      case 'carbon':
        return 'bg-black bg-opacity-90 border border-gray-800 before:content-[""] before:absolute before:inset-0 before:bg-[url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23222222\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 5v1H0V0h5z\' /%3E%3Cpath d=\'M6 5v1H5L0 1V0h1l5 5z\' /%3E%3C/g%3E%3C/svg%3E")] before:opacity-20';
      case 'rubber':
        return 'bg-black bg-opacity-80 border-2 border-gray-800 shadow-inner';
      case 'glass':
        return 'bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 shadow-inner';
      case 'military':
        return 'bg-gradient-to-b from-gray-700 to-gray-900 border-2 border-yellow-600 shadow-md';
      case 'glossy':
      default:
        return 'glossy-switch';
    }
  };

  // State-specific classes
  const getStateClasses = () => {
    switch (state) {
      case 'active':
        return 'ring-2 ring-white ring-opacity-60 scale-[0.98]';
      case 'pressed':
        return 'scale-[0.95] shadow-inner brightness-90';
      case 'disabled':
        return 'opacity-50 cursor-not-allowed';
      default:
        return '';
    }
  };

  // Flip switch specific styles
  const renderFlipSwitch = () => {
    return (
      <div className="relative">
        <div className={cn(
          "bg-gray-900 rounded-md p-1 h-16 w-20 flex flex-col overflow-hidden",
          state === 'active' ? "bg-red-900" : "bg-gray-900"
        )}>
          <div className={cn(
            "h-3/4 w-full bg-gray-800 rounded-t-sm border border-gray-700 flex items-center justify-center relative transition-transform duration-300",
            state === 'active' ? "translate-y-full" : ""
          )}>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-800 opacity-70"></div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
            <IconComponent size={iconSizes[size]} className="text-white relative z-10" />
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col items-center">
      {buttonType === 'flip' ? (
        renderFlipSwitch()
      ) : (
        <button
          onClick={state === 'disabled' ? undefined : onClick}
          className={cn(
            "flex items-center justify-center mb-1 relative transition-all duration-300",
            sizeClasses[size],
            buttonTypeClasses[buttonType],
            getStyleClasses(),
            getStateClasses(),
            glowEffect ? 'animate-pulse' : ''
          )}
          style={{ 
            backgroundColor: buttonStyle !== 'glass' ? color : 'rgba(255, 255, 255, 0.1)',
            boxShadow: glowEffect ? `0 0 15px ${color}` : buttonStyle === 'rubber' ? 'inset 0 2px 4px rgba(0, 0, 0, 0.5)' : 'none'
          }}
        >
          {/* Create inner lighting effects */}
          {buttonStyle === 'glossy' && (
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-25 rounded-full" 
                 style={{borderTopLeftRadius: buttonType === 'rectangular' ? '0.375rem' : undefined, 
                         borderTopRightRadius: buttonType === 'rectangular' ? '0.375rem' : undefined}}></div>
          )}
          
          {/* Button icon with proper styling */}
          <IconComponent 
            size={iconSizes[size]} 
            className={cn(
              "relative z-10",
              buttonStyle === 'glass' ? "text-white drop-shadow-lg" : "text-white"
            )} 
          />
          
          {/* Add LED indicator for active state */}
          {state === 'active' && (
            <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
          )}
        </button>
      )}
      <span className="text-xs text-center mt-1 text-gray-200">{label}</span>
    </div>
  );
};

export default CustomIconButton;
