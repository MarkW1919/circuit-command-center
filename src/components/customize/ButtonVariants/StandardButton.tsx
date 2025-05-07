
import React from 'react';
import { cn } from '@/lib/utils';
import * as icons from 'lucide-react';
import { Power } from 'lucide-react';
import AnimatedIcon from '@/components/controls/AnimatedIcon';
import { buttonTypeClasses, getStyleClasses, getStateClasses, isAnimatableEquipment } from '../utils/buttonUtils';
import { AnimatableEquipment } from '@/types';

interface StandardButtonProps {
  icon: string;
  size: 'sm' | 'md' | 'lg';
  color?: string;
  glowEffect?: boolean;
  buttonStyle?: 'glossy' | 'metal' | 'carbon' | 'rubber' | 'glass' | 'military';
  buttonType?: 'round' | 'rectangular' | 'oval';
  state?: 'default' | 'active' | 'pressed' | 'disabled';
  onClick?: () => void;
  animationEnabled?: boolean;
  animationSpeed?: number;
  animationIntensity?: number;
  iconSizes: Record<string, number>;
  sizeClasses: Record<string, string>;
}

const StandardButton: React.FC<StandardButtonProps> = ({
  icon,
  size,
  color = '#3b82f6',
  glowEffect = false,
  buttonStyle = 'glossy',
  buttonType = 'round',
  state = 'default',
  onClick,
  animationEnabled = true,
  animationSpeed = 1,
  animationIntensity = 1,
  iconSizes,
  sizeClasses
}) => {
  // Get the icon component dynamically from lucide-react
  const IconComponent = (icons as any)[icon.charAt(0).toUpperCase() + icon.slice(1)] || Power;

  return (
    <button
      onClick={state === 'disabled' ? undefined : onClick}
      className={cn(
        "flex items-center justify-center mb-1 relative transition-all duration-300 hover:scale-105 active:scale-95",
        sizeClasses[size],
        buttonTypeClasses[buttonType],
        getStyleClasses(buttonStyle),
        getStateClasses(state),
        glowEffect ? 'animate-pulse' : ''
      )}
      style={{ 
        backgroundColor: buttonStyle !== 'glass' ? color : 'rgba(255, 255, 255, 0.1)',
        boxShadow: glowEffect ? `0 0 15px ${color}` : buttonStyle === 'rubber' ? 'inset 0 2px 4px rgba(0, 0, 0, 0.5)' : 'none'
      }}
    >
      {/* Create inner lighting effects */}
      {buttonStyle === 'glossy' && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-25 rounded-full" 
          style={{
            borderTopLeftRadius: buttonType === 'rectangular' ? '0.375rem' : undefined, 
            borderTopRightRadius: buttonType === 'rectangular' ? '0.375rem' : undefined
          }}
        ></div>
      )}
      
      {/* Button icon with proper styling - choose between animated and static */}
      {animationEnabled && isAnimatableEquipment(icon) ? (
        <AnimatedIcon 
          type={icon as AnimatableEquipment}
          isActive={state === 'active'}
          size={iconSizes[size]}
          speed={animationSpeed}
          intensity={animationIntensity}
          className={cn(
            "relative z-10",
            buttonStyle === 'glass' ? "text-white drop-shadow-lg" : "text-white"
          )}
        />
      ) : (
        <IconComponent 
          size={iconSizes[size]} 
          className={cn(
            "relative z-10",
            buttonStyle === 'glass' ? "text-white drop-shadow-lg" : "text-white"
          )} 
        />
      )}
      
      {/* Add LED indicator for active state */}
      {state === 'active' && (
        <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
      )}

      {/* Add ripple effect for pressed state */}
      {state === 'pressed' && (
        <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping"></div>
      )}
    </button>
  );
};

export default StandardButton;
