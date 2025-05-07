
import React, { useState } from 'react';
import { useApp } from '@/contexts/app';
import PowerSwitch from '@/components/controls/PowerSwitch';
import SystemStatus from '@/components/dashboard/SystemStatus';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Power, Bluetooth, Settings, Gauge, Zap, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const { switches, systemStatus, connectBluetooth, isConnecting } = useApp();
  const [showIntro, setShowIntro] = useState(true);
  
  // Get primary module switches
  const primarySwitches = switches.filter(sw => sw.moduleId === 'primary');
  
  // Assign equipment types to the switches if not already assigned
  const switchesWithEquipment = primarySwitches.map((sw, index) => {
    if (!sw.equipmentType) {
      // Assign different equipment types based on index
      const equipmentTypes = ['light', 'fan', 'outlet', 'alarm', 'vent', 'battery', 'bell', 'power'];
      return {
        ...sw,
        equipmentType: equipmentTypes[index % equipmentTypes.length]
      };
    }
    return sw;
  });
  
  // Check if there are active faults
  const hasActiveFaults = systemStatus.faults.some(fault => !fault.resolved);
  
  // Calculate system health percentage
  const systemHealthPercentage = 100 - (systemStatus.faults.filter(f => !f.resolved).length / systemStatus.faults.length) * 100;
  
  const dismissIntro = () => {
    setShowIntro(false);
    localStorage.setItem('dashboard_intro_seen', 'true');
  };
  
  return (
    <TooltipProvider>
      <div className="space-y-6 bg-black min-h-screen py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white">Power Distribution Dashboard</h2>
            <p className="text-sm text-gray-400">
              {systemStatus.connected 
                ? `Connected • Last updated: ${new Date().toLocaleTimeString()}`
                : 'Disconnected • Connect to monitor your system'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={systemStatus.connected ? "bg-green-600" : "bg-gray-600"}>
              {systemStatus.connected ? "ONLINE" : "OFFLINE"}
            </Badge>
          </div>
        </div>
        
        {showIntro && localStorage.getItem('dashboard_intro_seen') !== 'true' && (
          <Card className="border-blue-500/30 bg-gray-900/70 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-white">
                <Settings className="h-5 w-5 mr-2 text-blue-400" />
                <span>Welcome to Your Power Control System</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">
                This dashboard allows you to monitor and control all your power systems in one place.
                Connect to your controller to get started.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-start space-x-3 bg-gray-800/50 p-3 rounded-lg">
                  <div className="bg-blue-900/50 p-2 rounded-full">
                    <Bluetooth className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Connect</h3>
                    <p className="text-sm text-gray-400">Link to your power controller</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-gray-800/50 p-3 rounded-lg">
                  <div className="bg-green-900/50 p-2 rounded-full">
                    <Gauge className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Monitor</h3>
                    <p className="text-sm text-gray-400">View status and power usage</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-gray-800/50 p-3 rounded-lg">
                  <div className="bg-purple-900/50 p-2 rounded-full">
                    <Zap className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Control</h3>
                    <p className="text-sm text-gray-400">Manage your power systems</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={dismissIntro}
                variant="outline" 
                className="border-blue-500/30 text-blue-400"
              >
                Got it
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {!systemStatus.connected && (
          <Card className="border-blue-600/30 bg-gray-900 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="flex items-center text-white">
                <Power className="h-5 w-5 mr-2 text-cyan-400" />
                <span>System Disconnected</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-gray-400 mb-4">
                Connect to your power distribution controller to monitor and control your system.
              </p>
              <Button 
                onClick={connectBluetooth}
                disabled={isConnecting}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <Bluetooth className="mr-2 h-4 w-4" />
                {isConnecting ? "Connecting..." : "Connect Now"}
              </Button>
            </CardContent>
          </Card>
        )}
        
        {hasActiveFaults && (
          <Card className="border-red-500/30 bg-gray-900 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="flex items-center text-white">
                <AlertCircle className="h-5 w-5 mr-2 text-status-danger animate-pulse" />
                <span>System Faults Detected</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <p className="text-gray-400 mb-2 md:mb-0">
                  {systemStatus.faults.filter(f => !f.resolved).length} active {systemStatus.faults.filter(f => !f.resolved).length === 1 ? 'fault' : 'faults'} in the system
                </p>
                
                <div className="flex items-center space-x-2">
                  <div className="w-32">
                    <p className="text-xs mb-1 text-gray-500">System Health</p>
                    <Progress value={systemHealthPercentage} className="h-2" 
                      style={{backgroundColor: 'rgba(239, 68, 68, 0.2)'}} />
                  </div>
                  <span className="text-sm font-medium">{Math.round(systemHealthPercentage)}%</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="mr-2"
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Run Diagnostics
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {systemStatus.connected && (
          <SystemStatus />
        )}
        
        <div className="mt-10 pb-4">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-cyan-400" />
            Power Controls
            <Badge className="ml-3 bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer">
              {switchesWithEquipment.length} Devices
            </Badge>
          </h3>
          
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-8">
              {switchesWithEquipment.slice(0, 4).map(sw => (
                <Tooltip key={sw.id}>
                  <TooltipTrigger asChild>
                    <div>
                      <PowerSwitch key={sw.id} switchData={sw} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs space-y-1">
                      <p><span className="font-medium">ID:</span> {sw.id}</p>
                      <p><span className="font-medium">Type:</span> {sw.equipmentType}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="space-y-8">
              {switchesWithEquipment.slice(4, 8).map(sw => (
                <Tooltip key={sw.id}>
                  <TooltipTrigger asChild>
                    <div>
                      <PowerSwitch key={sw.id} switchData={sw} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs space-y-1">
                      <p><span className="font-medium">ID:</span> {sw.id}</p>
                      <p><span className="font-medium">Type:</span> {sw.equipmentType}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-transparent bg-clip-text inline-block">
              POWER TECH
            </h2>
            <p className="text-xl text-pink-500 font-semibold">SEEN IT FIRST</p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
