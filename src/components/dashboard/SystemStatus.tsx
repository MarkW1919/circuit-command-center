
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlertCircle, Thermometer, Zap } from 'lucide-react';

const SystemStatus = () => {
  const { systemStatus, switches } = useApp();
  
  // Calculate total current
  const totalCurrent = switches
    .filter(sw => sw.active)
    .reduce((sum, sw) => sum + sw.current, 0);
  
  // Get temperature of primary module
  const primaryModule = systemStatus.modules.find(m => m.id === 'primary');
  const temperature = primaryModule?.temperature || 0;
  
  // Get temperature color
  const getTempColor = (temp: number) => {
    if (temp >= 75) return 'text-status-danger';
    if (temp >= 60) return 'text-status-warning';
    return 'text-status-active';
  };
  
  // Get current utilization
  const getCurrentUtilization = (current: number) => {
    // Assuming max current is 100A
    return Math.min(Math.round((current / 100) * 100), 100);
  };
  
  // Get current color
  const getCurrentColor = (current: number) => {
    const utilization = getCurrentUtilization(current);
    if (utilization >= 80) return 'bg-status-danger';
    if (utilization >= 60) return 'bg-status-warning';
    return 'bg-status-active';
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            <span>Current Draw</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCurrent.toFixed(1)} A</div>
          <Progress 
            value={getCurrentUtilization(totalCurrent)} 
            className={cn("mt-2 h-2", getCurrentColor(totalCurrent))}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {getCurrentUtilization(totalCurrent)}% of max capacity
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Thermometer className="h-5 w-5 mr-2" />
            <span>Temperature</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn("text-2xl font-bold", getTempColor(temperature))}>
            {temperature}°C
          </div>
          <Progress 
            value={Math.min(Math.round((temperature / 100) * 100), 100)} 
            className={cn(
              "mt-2 h-2",
              temperature >= 75 ? 'bg-status-danger' :
              temperature >= 60 ? 'bg-status-warning' : 
              'bg-status-active'
            )}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {temperature < 50 ? 'Normal' : 
             temperature < 70 ? 'Elevated' : 'High'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Connection</span>
              <div className="status-indicator">
                <div className={cn(
                  "status-dot",
                  systemStatus.connected ? "status-dot-active" : "status-dot-inactive"
                )}></div>
                <span className="text-xs">{systemStatus.connected ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Watchdog</span>
              <div className="status-indicator">
                <div className={cn(
                  "status-dot",
                  systemStatus.watchdogActive ? "status-dot-active" : "status-dot-inactive"
                )}></div>
                <span className="text-xs">{systemStatus.watchdogActive ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Control Mode</span>
              <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                {systemStatus.controlMode === 'primary' ? 'Primary' : 'Monitor'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatus;
