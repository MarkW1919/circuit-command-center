
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { SwitchStatus } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PowerSwitchProps {
  switchData: SwitchStatus;
}

const PowerSwitch = ({ switchData }: PowerSwitchProps) => {
  const { toggleSwitch, systemStatus } = useApp();
  
  const handleToggle = () => {
    toggleSwitch(switchData.id);
  };
  
  const getStatusColor = () => {
    if (switchData.fault) return 'bg-status-danger';
    if (switchData.disabled) return 'bg-status-inactive';
    if (switchData.active) return 'bg-status-active';
    return 'bg-status-inactive';
  };
  
  return (
    <Card className={cn(
      "transition-all duration-200 overflow-hidden border-2",
      switchData.active && !switchData.fault ? "border-status-active/50" : "border-transparent",
      switchData.fault ? "border-status-danger/50" : ""
    )}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-medium">{switchData.name}</span>
          {switchData.fault && (
            <AlertCircle className="h-5 w-5 text-status-danger" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <button
          className={cn(
            "switch-toggle relative mx-auto my-3",
            switchData.active && !switchData.disabled && !switchData.fault ? "switch-toggle-active" : "",
            !switchData.active && !switchData.disabled && !switchData.fault ? "switch-toggle-inactive" : "",
            (switchData.disabled || switchData.fault) ? "switch-toggle-disabled" : ""
          )}
          onClick={handleToggle}
          disabled={switchData.disabled || !systemStatus.connected || switchData.fault}
        >
          <span className={cn(
            "absolute top-1/2 left-3 -translate-y-1/2 text-white font-bold text-lg",
            switchData.active ? "opacity-100" : "opacity-50"
          )}>
            ON
          </span>
          <span className={cn(
            "absolute top-1/2 right-3 -translate-y-1/2 text-white font-bold text-lg",
            !switchData.active ? "opacity-100" : "opacity-50"
          )}>
            OFF
          </span>
          <span
            className={cn(
              "pointer-events-none absolute top-1 bottom-1 left-1 w-12 rounded-full bg-white shadow-lg transform transition-transform duration-200",
              switchData.active ? "translate-x-14" : "translate-x-0"
            )}
          ></span>
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
