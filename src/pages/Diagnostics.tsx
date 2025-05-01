
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/app';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import SystemStatsCards from '@/components/diagnostics/SystemStatsCards';
import TemperatureChart from '@/components/diagnostics/TemperatureChart';
import PowerConsumptionChart from '@/components/diagnostics/PowerConsumptionChart';
import { useDiagnostics } from '@/hooks/useDiagnostics';

const Diagnostics = () => {
  const { systemStatus } = useApp();
  
  // Option to enable auto-refresh
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Use the diagnostics hook to get all the data
  const diagnosticsData = useDiagnostics(autoRefresh);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">System Diagnostics</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
              <Label htmlFor="auto-refresh">Auto-refresh</Label>
            </div>
            
            <Badge variant={systemStatus.connected ? "default" : "destructive"}>
              {systemStatus.connected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </div>
        
        <SystemStatsCards 
          currentTemperature={diagnosticsData.currentTemperature}
          currentPowerConsumption={diagnosticsData.currentPowerConsumption}
          temperatureRate={diagnosticsData.temperatureRate}
          systemEfficiency={diagnosticsData.systemEfficiency}
          activeChannels={diagnosticsData.activeChannels}
        />
        
        <Tabs defaultValue="temperature" className="space-y-4">
          <TabsList>
            <TabsTrigger value="temperature">Temperature Trend</TabsTrigger>
            <TabsTrigger value="power">Power Consumption</TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature" className="space-y-4">
            <TemperatureChart temperatureHistory={diagnosticsData.temperatureHistory} />
          </TabsContent>
          
          <TabsContent value="power" className="space-y-4">
            <PowerConsumptionChart powerConsumptionHistory={diagnosticsData.powerConsumptionHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Diagnostics;
