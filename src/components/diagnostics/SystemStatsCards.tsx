
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, ChartLine, ThermometerSun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SwitchStatus } from '@/types';

interface SystemStatsCardsProps {
  currentTemperature: number;
  currentPowerConsumption: number;
  temperatureRate: number;
  systemEfficiency: number;
  activeChannels: number;
}

const SystemStatsCards = ({ 
  currentTemperature, 
  currentPowerConsumption, 
  temperatureRate, 
  systemEfficiency, 
  activeChannels
}: SystemStatsCardsProps) => {
  
  // Helper function to determine temperature status color
  const getTemperatureStatusColor = (temp: number) => {
    if (temp >= 75) return 'text-status-danger';
    if (temp >= 60) return 'text-status-warning';
    return 'text-status-active';
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Temperature Status Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ThermometerSun className="h-5 w-5 mr-2" />
            <span>Temperature</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn("text-3xl font-bold", getTemperatureStatusColor(currentTemperature))}>
            {currentTemperature.toFixed(1)}°C
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Rate: {temperatureRate > 0 ? '+' : ''}{temperatureRate.toFixed(2)}°C/min
          </div>
        </CardContent>
      </Card>
      
      {/* Current Draw Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Battery className="h-5 w-5 mr-2" />
            <span>Current Draw</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {currentPowerConsumption.toFixed(1)} A
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Active Channels: {activeChannels}
          </div>
        </CardContent>
      </Card>
      
      {/* System Efficiency Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ChartLine className="h-5 w-5 mr-2" />
            <span>System Efficiency</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {systemEfficiency.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {systemEfficiency > 90 ? 'Optimal' : systemEfficiency > 75 ? 'Good' : 'Needs attention'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatsCards;
