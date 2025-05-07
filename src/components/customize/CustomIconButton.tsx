
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import StandardButton from './ButtonVariants/StandardButton';
import FlipSwitch from './ButtonVariants/FlipSwitch';
import { iconSizes, sizeClasses, getStyleDescription } from './utils/buttonUtils';

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
  animationIntensity = 1
}: CustomIconButtonProps) => {
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
          onClick={onClick}
          animationEnabled={animationEnabled}
          animationSpeed={animationSpeed}
          animationIntensity={animationIntensity}
          iconSizes={iconSizes}
          sizeClasses={sizeClasses}
        />
      )}
      <span className="text-xs text-center mt-1 text-gray-200">{label}</span>
    </div>
  );
  
  if (showTooltip && (description || buttonStyle)) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent>
            <p>{description || getStyleDescription(buttonStyle)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return buttonContent;
};

export default CustomIconButton;
