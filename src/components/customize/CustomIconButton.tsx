import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import StandardButton from './ButtonVariants/StandardButton';
import FlipSwitch from './ButtonVariants/FlipSwitch';
import { iconSizes, sizeClasses, getStyleDescription, isWinchType } from './utils/buttonUtils';
import { WinchDirection } from '@/types';
import { cn } from '@/lib/utils';

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
  showTooltip?: boolean;
  description?: string;
  // Animation properties
  animationEnabled?: boolean;
  animationSpeed?: number;
  animationIntensity?: number;
  // Winch specific properties
  winchDirection?: WinchDirection;
  momentary?: boolean; // For momentary button behavior
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
  onClick,
  showTooltip = false,
  description,
  // Animation properties
  animationEnabled = true,
  animationSpeed = 1,
  animationIntensity = 1,
  // Winch specific properties
  winchDirection = 'in',
  momentary = false
}: CustomIconButtonProps) => {
  // Handle momentary button behavior
  const handleClick = () => {
    if (onClick) onClick();
    if (momentary && isWinchType(icon)) {
      // For momentary buttons, trigger active state then revert back
      setTimeout(() => {
        if (onClick) onClick(); // Toggle back after delay
      }, 500);
    }
  };

  const buttonContent = (
    <div className="flex flex-col items-center">
      {buttonType === 'flip' ? (
        <FlipSwitch
          icon={icon}
          state={state}
          size={size}
          animationEnabled={animationEnabled}
          animationSpeed={animationSpeed}
          animationIntensity={animationIntensity}
          direction={winchDirection}
        />
      ) : (
        <StandardButton
          icon={icon}
          size={size}
          color={color}
          glowEffect={glowEffect}
          buttonStyle={buttonStyle}
          buttonType={buttonType}
          state={state}
          onClick={handleClick}
          animationEnabled={animationEnabled}
          animationSpeed={animationSpeed}
          animationIntensity={animationIntensity}
          iconSizes={iconSizes}
          sizeClasses={sizeClasses}
          direction={winchDirection}
        />
      )}
      
      {/* Add direction indicator for winch buttons */}
      {isWinchType(icon) ? (
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-center text-gray-200">{label}</span>
          <span className={cn(
            "text-[10px] px-1 rounded",
            winchDirection === 'in' ? "bg-green-800 text-green-100" : "bg-amber-800 text-amber-100"
          )}>
            {winchDirection === 'in' ? "IN" : "OUT"}
          </span>
        </div>
      ) : (
        <span className="text-xs text-center mt-1 text-gray-200">{label}</span>
      )}
    </div>
  );
  
  const tooltipDescription = description || 
    (isWinchType(icon) ? 
      `${getStyleDescription(buttonStyle)} - ${winchDirection.toUpperCase()} direction${momentary ? ' (Momentary)' : ''}` : 
      getStyleDescription(buttonStyle));
  
  if (showTooltip && tooltipDescription) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipDescription}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return buttonContent;
};

export default CustomIconButton;
