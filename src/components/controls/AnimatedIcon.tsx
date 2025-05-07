
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Fan, 
  Lightbulb, 
  CircleArrowDown, 
  CircleArrowUp,
  Gauge,
  Droplets,
  Waves
} from 'lucide-react';
import { AnimatableEquipment } from '@/types';

interface AnimatedIconProps {
  type: AnimatableEquipment | string;
  isActive: boolean;
  size?: number;
  className?: string;
  speed?: number; // animation speed multiplier
  intensity?: number; // animation intensity (0-1)
}

const AnimatedIcon = ({
  type,
  isActive,
  size = 24,
  className,
  speed = 1,
  intensity = 1
}: AnimatedIconProps) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  
  // Handle animation effects based on active state
  useEffect(() => {
    let animationFrame: number;
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      // Different animation types based on component
      switch (type) {
        case 'fan':
          // Fan rotation animation
          let lastTimestamp: number;
          
          const animateFan = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const elapsed = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            
            setRotation(prev => (prev + (elapsed * 0.2 * speed)) % 360);
            animationFrame = requestAnimationFrame(animateFan);
          };
          
          animationFrame = requestAnimationFrame(animateFan);
          break;
          
        case 'winch':
          // Winch animation - alternating up/down movement
          let direction = 1;
          interval = setInterval(() => {
            setRotation(prev => {
              const newRotation = prev + (direction * 20 * speed);
              if (newRotation > 40 || newRotation < -40) direction *= -1;
              return newRotation;
            });
          }, 100 / speed);
          break;
          
        case 'pump':
        case 'compressor':
          // Pulsing animation
          let growing = true;
          interval = setInterval(() => {
            setScale(prev => {
              const newScale = prev + (growing ? 0.05 : -0.05) * intensity;
              if (newScale > 1.1 * intensity + 0.9) growing = false;
              if (newScale < 1) growing = true;
              return newScale;
            });
          }, 50 / speed);
          break;
          
        case 'led':
        case 'light':
          // Pulsing opacity animation is handled in CSS
          break;
      }
    } else {
      // Reset when inactive
      setRotation(0);
      setScale(1);
    }
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (interval) clearInterval(interval);
    };
  }, [isActive, type, speed, intensity]);
  
  // Apply the appropriate animation style based on component type
  const animationStyle = {
    transform: type === 'fan' ? 
      `rotate(${rotation}deg)` : 
      type === 'winch' ? 
      `translateY(${Math.sin(rotation * Math.PI / 180) * 2}px)` : 
      type === 'pump' || type === 'compressor' ? 
      `scale(${scale})` : 
      undefined
  };
  
  // Render the appropriate icon based on type
  const renderIcon = () => {
    switch (type) {
      case 'fan':
        return <Fan size={size} style={animationStyle} />;
      case 'light':
      case 'led':
        return (
          <div className="relative">
            <Lightbulb size={size} />
            {isActive && (
              <div 
                className={cn(
                  "absolute inset-0 rounded-full bg-yellow-400 opacity-70 blur-[2px] -z-10",
                  "animate-pulse",
                  intensity < 0.5 ? "animate-[pulse_2s_ease-in-out_infinite]" : 
                  intensity < 0.8 ? "animate-[pulse_1.5s_ease-in-out_infinite]" : 
                  "animate-[pulse_1s_ease-in-out_infinite]"
                )}
              />
            )}
          </div>
        );
      case 'winch':
        return (
          <div className="relative" style={animationStyle}>
            <CircleArrowUp size={size} className="absolute opacity-60" />
            <CircleArrowDown size={size} className="absolute opacity-60" />
          </div>
        );
      case 'compressor':
        return <Gauge size={size} style={animationStyle} />;
      case 'pump':
        return (
          <div className="relative" style={animationStyle}>
            <Waves size={size} />
            {isActive && (
              <Droplets 
                size={size/2} 
                className={cn(
                  "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400 opacity-70",
                  "animate-[pulse_1s_ease-in-out_infinite]"
                )} 
              />
            )}
          </div>
        );
      case 'heater':
        return (
          <div className="relative">
            <Lightbulb size={size} className="text-red-500" />
            {isActive && (
              <div 
                className={cn(
                  "absolute inset-0 rounded-full bg-red-500 opacity-70 blur-[2px] -z-10",
                  "animate-pulse",
                  intensity < 0.5 ? "animate-[pulse_2s_ease-in-out_infinite]" : 
                  intensity < 0.8 ? "animate-[pulse_1.5s_ease-in-out_infinite]" : 
                  "animate-[pulse_1s_ease-in-out_infinite]"
                )}
              />
            )}
          </div>
        );
      default:
        return <div className="h-6 w-6 rounded-full bg-gray-300"></div>;
    }
  };
  
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {renderIcon()}
    </div>
  );
};

export default AnimatedIcon;
