
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedWinchIconProps {
  isActive: boolean;
  direction: 'in' | 'out';
  size?: number;
  className?: string;
  speed?: number;
  intensity?: number;
}

const AnimatedWinchIcon: React.FC<AnimatedWinchIconProps> = ({
  isActive,
  direction,
  size = 24,
  className,
  speed = 1,
  intensity = 1
}) => {
  const [rotation, setRotation] = useState(0);
  const [cableOffset, setCableOffset] = useState(0);
  const animationRef = useRef<number>();
  
  // Handle winch animation
  useEffect(() => {
    let lastTimestamp: number;
    
    if (isActive) {
      const animateWinch = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        
        // Rotation direction based on winch direction
        const directionMultiplier = direction === 'in' ? 1 : -1;
        const rotationSpeed = 0.1 * speed * intensity;
        
        setRotation(prev => (prev + (elapsed * rotationSpeed * directionMultiplier)) % 360);
        
        // Cable bounce effect - subtle oscillation
        setCableOffset(Math.sin(timestamp * 0.005 * speed) * intensity * 0.5);
        
        animationRef.current = requestAnimationFrame(animateWinch);
      };
      
      animationRef.current = requestAnimationFrame(animateWinch);
    } else {
      // Reset or stop animation
      setCableOffset(0);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, direction, speed, intensity]);
  
  const winchSize = { width: size * 1.5, height: size };
  const drumSize = { width: size * 0.8, height: size * 0.6 };
  const sideSize = { width: size * 0.35, height: size * 0.6 };
  
  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: winchSize.width, height: winchSize.height }}
    >
      {/* Winch body */}
      <div className="relative flex items-center">
        {/* Left side of winch */}
        <div
          className="bg-gray-800 rounded-l-lg"
          style={{ 
            width: sideSize.width, 
            height: sideSize.height,
            boxShadow: "inset -2px 0 3px rgba(0,0,0,0.3)"
          }}
        >
          <div className="absolute top-1/4 left-1 w-1 h-1/2 bg-gray-700 rounded-full"></div>
        </div>
        
        {/* Winch drum - this part rotates */}
        <div
          className="relative bg-gray-700 flex items-center justify-center overflow-hidden"
          style={{ 
            width: drumSize.width, 
            height: drumSize.height,
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.1)"
          }}
        >
          {/* Drum ridges that show rotation */}
          <div
            className="absolute inset-0 flex justify-between"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="h-full w-1 bg-gray-900"
                style={{ marginLeft: i === 0 ? undefined : '1px' }}
              ></div>
            ))}
          </div>
          
          {/* Center axle */}
          <div className="absolute w-2 h-2 rounded-full bg-gray-500 z-10"></div>
        </div>
        
        {/* Right side of winch */}
        <div
          className="bg-gray-800 rounded-r-lg"
          style={{ 
            width: sideSize.width, 
            height: sideSize.height,
            boxShadow: "inset 2px 0 3px rgba(0,0,0,0.3)"
          }}
        >
          <div className="absolute top-1/4 right-1 w-1 h-1/2 bg-gray-700 rounded-full"></div>
        </div>
      </div>
      
      {/* Cable and hook */}
      <div className="absolute" style={{ transform: `translateY(${cableOffset}px)` }}>
        <div className="absolute top-[45%] left-[50%] w-[1px] h-[20px] bg-gray-400"></div>
        <svg
          className="absolute"
          width={size * 0.4}
          height={size * 0.4}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ top: `calc(45% + 20px)`, left: `calc(50% - ${(size * 0.4) / 2}px)` }}
        >
          <path d="M12 2a10 10 0 1 0 10 10H2A10 10 0 0 0 12 2v0Z"></path>
          <path d="M12 12v6"></path>
          <path d="M12 12h6"></path>
        </svg>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className={cn(
          "absolute -top-1 -right-1 h-2 w-2 rounded-full",
          direction === 'in' ? "bg-green-500" : "bg-amber-500",
          "animate-pulse"
        )}></div>
      )}
    </div>
  );
};

export default AnimatedWinchIcon;
