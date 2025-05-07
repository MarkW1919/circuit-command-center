
import React from 'react';
import { cn } from '@/lib/utils';
import * as icons from 'lucide-react';
import { Power } from 'lucide-react';
import AnimatedIcon from '@/components/controls/AnimatedIcon';
import { isAnimatableEquipment, isWinchType } from '../utils/buttonUtils';
import { AnimatableEquipment, WinchDirection } from '@/types';

interface FlipSwitchProps {
  icon: string;
  state: 'default' | 'active' | 'pressed' | 'disabled';
  size: 'sm' | 'md' | 'lg';
  animationEnabled?: boolean;
  animationSpeed?: number;
  animationIntensity?: number;
  direction?: WinchDirection; // For winch direction control
}

const FlipSwitch: React.FC<FlipSwitchProps> = ({
  icon,
  state,
  size,
  animationEnabled = true,
  animationSpeed = 1,
  animationIntensity = 1,
  direction = 'in'
}) => {
  // Get the icon component dynamically from lucide-react
  const IconComponent = (icons as any)[icon.charAt(0).toUpperCase() + icon.slice(1)] || Power;
  
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  // Set background color based on state and winch direction
  const getBgColor = () => {
    if (state !== 'active') return "bg-gray-900";
    
    if (isWinchType(icon)) {
      return direction === 'in' ? "bg-green-900" : "bg-amber-900";
    }
    
    return "bg-red-900";
  };

  return (
    <div className="relative">
      <div className={cn(
        "rounded-md p-1 h-16 w-20 flex flex-col overflow-hidden",
        getBgColor()
      )}>
        <div className={cn(
          "h-3/4 w-full bg-gray-800 rounded-t-sm border border-gray-700 flex items-center justify-center relative transition-transform duration-300",
          state === 'active' ? "translate-y-full" : ""
        )}>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-800 opacity-70"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
          {animationEnabled && isAnimatableEquipment(icon) ? (
            <AnimatedIcon 
              type={icon as AnimatableEquipment}
              isActive={state === 'active'}
              size={iconSizes[size]}
              speed={animationSpeed}
              intensity={animationIntensity}
              direction={direction}
              className="text-white relative z-10"
            />
          ) : (
            <IconComponent size={iconSizes[size]} className="text-white relative z-10" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipSwitch;
