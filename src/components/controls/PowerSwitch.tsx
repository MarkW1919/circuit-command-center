
import React from 'react';
import { useApp } from '@/contexts/app';
import { SwitchStatus } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Zap, AirVent, AlarmClock, BatteryCharging, Bell, Fan, Lightbulb, Plug, Power } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PowerSwitchProps {
  switchData: SwitchStatus;
}

// Map of switch equipment types to icons
const equipmentIcons: Record<string, React.ReactNode> = {
  'light': <Lightbulb />,
  'fan': <Fan />,
  'outlet': <Plug />,
  'alarm': <AlarmClock />,
  'vent': <AirVent />,
  'battery': <BatteryCharging />,
  'bell': <Bell />,
  'power': <Power />,
  'default': <Zap />
};

const PowerSwitch = ({ switchData }: PowerSwitchProps) => {
  const { toggleSwitch, systemStatus } = useApp();
  
  const handleToggle = () => {
    toggleSwitch(switchData.id);
  };

  // Get the appropriate icon based on equipment type
  const getSwitchIcon = () => {
    const iconType = switchData.equipmentType || 'default';
    return equipmentIcons[iconType] || equipmentIcons['default'];
  };
  
  return (
    <Card className={cn(
      "transition-all duration-200 overflow-hidden border-2 bg-transparent",
      switchData.active && !switchData.fault ? "border-status-active/20" : "border-transparent",
      switchData.fault ? "border-status-danger/20" : ""
    )}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-medium">{switchData.name}</span>
          {switchData.fault && (
            <AlertCircle className="h-5 w-5 text-status-danger" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2 flex justify-center">
        <button
          onClick={handleToggle}
          disabled={switchData.disabled || !systemStatus.connected || switchData.fault}
          className={cn(
            "relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300",
            "disabled:opacity-60 disabled:cursor-not-allowed"
          )}
        >
          {/* Outer metal ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800"></div>
          
          {/* Inner black glossy circle */}
          <div className={cn(
            "absolute inset-1 rounded-full transition-all duration-300",
            "bg-black shadow-lg",
            switchData.active ? "bg-gradient-to-tr from-black via-black to-gray-800" : "bg-gradient-to-tr from-black to-gray-900",
            // Gloss effect
            "before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-50",
            // Reflection effect
            "after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-1/3 after:rounded-t-full after:bg-gradient-to-b after:from-white/10 after:to-transparent after:opacity-30"
          )}>
            {/* Icon for the specific equipment type */}
            <div className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300",
              switchData.active ? "opacity-100 scale-100" : "opacity-60 scale-95"
            )}>
              <div className={cn(
                "h-10 w-10 transition-all duration-300",
                switchData.active ? "text-cyan-400" : "text-cyan-600"
              )}>
                {getSwitchIcon()}
              </div>
            </div>
          </div>
        </button>
      </CardContent>
      <CardFooter className="p-4 pt-0 justify-between items-center text-sm">
        <span className="text-muted-foreground">CH {switchData.channel}</span>
        {switchData.active && (
          <div className="flex items-center gap-1 text-status-active">
            <Zap className="h-3 w-3" />
            <span>{switchData.current}A</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PowerSwitch;
