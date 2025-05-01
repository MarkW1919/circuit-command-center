
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useApp } from '@/contexts/app';
import PowerSwitch from '@/components/controls/PowerSwitch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Power, AlertCircle, Lightbulb, Fan, Zap } from 'lucide-react';

const Controls = () => {
  const { switches, systemStatus, toggleSwitch } = useApp();
  
  const groupedSwitches = switches.reduce((acc, sw) => {
    // Group by equipment type
    const type = sw.equipmentType || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(sw);
    return acc;
  }, {} as Record<string, typeof switches>);
  
  const equipmentLabels: Record<string, { label: string, icon: React.ReactNode }> = {
    'light': { label: 'Lighting', icon: <Lightbulb className="h-5 w-5" /> },
    'fan': { label: 'Ventilation', icon: <Fan className="h-5 w-5" /> },
    'outlet': { label: 'Power Outlets', icon: <Power className="h-5 w-5" /> },
    'other': { label: 'Other Equipment', icon: <Zap className="h-5 w-5" /> }
  };
  
  // Create master control for all switches
  const allOff = switches.every(sw => !sw.active);
  const allOn = switches.filter(sw => !sw.disabled && !sw.fault).every(sw => sw.active);
  
  const handleMasterToggle = () => {
    // If any are on, turn all off. If all are off, turn all on.
    const newState = allOn ? false : true;
    
    switches.forEach(sw => {
      if (!sw.disabled && !sw.fault && sw.active !== newState) {
        toggleSwitch(sw.id);
      }
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">System Controls</h2>
          
          {systemStatus.connected && (
            <Button
              onClick={handleMasterToggle}
              variant={allOn ? "destructive" : "default"}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Power className="mr-2 h-4 w-4" />
              {allOn ? "All Off" : "All On"}
            </Button>
          )}
        </div>
        
        {!systemStatus.connected && (
          <Card className="border-status-information/30 bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-white">
                <AlertCircle className="h-5 w-5 mr-2 text-cyan-400" />
                <span>System Disconnected</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Connect to your power distribution controller to manage your system.
              </p>
            </CardContent>
          </Card>
        )}
        
        {systemStatus.connected && (
          <div className="space-y-10">
            {Object.entries(groupedSwitches).map(([type, switchesOfType]) => (
              <div key={type} className="space-y-4">
                <div className="flex items-center gap-2">
                  {equipmentLabels[type]?.icon || equipmentLabels['other'].icon}
                  <h3 className="text-xl font-medium">
                    {equipmentLabels[type]?.label || type.charAt(0).toUpperCase() + type.slice(1)}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {switchesOfType.map(sw => (
                    <PowerSwitch key={sw.id} switchData={sw} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Controls;
