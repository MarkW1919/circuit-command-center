
import React from 'react';
import { useApp } from '@/contexts/app';
import PowerSwitch from '@/components/controls/PowerSwitch';
import SystemStatus from '@/components/dashboard/SystemStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Power, Fan, Lightbulb, Gauge, Thermometer } from 'lucide-react';
import CustomIconButton from '@/components/customize/CustomIconButton';

const Dashboard = () => {
  const { switches, systemStatus, connectBluetooth, isConnecting } = useApp();
  
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
  
  return (
    <div className="space-y-6 bg-black min-h-screen py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Power Distribution Dashboard</h2>
      </div>
      
      {!systemStatus.connected && (
        <Card className="border-status-information/30 bg-gray-900">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <Power className="h-5 w-5 mr-2 text-cyan-400" />
              <span>System Disconnected</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Connect to your power distribution controller to monitor and control your system.
            </p>
            <Button 
              onClick={connectBluetooth}
              disabled={isConnecting}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              {isConnecting ? "Connecting..." : "Connect Now"}
            </Button>
          </CardContent>
        </Card>
      )}
      
      {hasActiveFaults && (
        <Card className="border-status-danger/30 bg-gray-900">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <AlertCircle className="h-5 w-5 mr-2 text-status-danger" />
              <span>System Faults Detected</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              {systemStatus.faults.filter(f => !f.resolved).length} active {systemStatus.faults.filter(f => !f.resolved).length === 1 ? 'fault' : 'faults'} in the system. Check the Faults panel for details.
            </p>
          </CardContent>
        </Card>
      )}
      
      {systemStatus.connected && (
        <SystemStatus />
      )}
      
      <div className="mt-10 pb-4">
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-8">
            {switchesWithEquipment.slice(0, 4).map(sw => (
              <PowerSwitch key={sw.id} switchData={sw} />
            ))}
          </div>
          <div className="space-y-8">
            {switchesWithEquipment.slice(4, 8).map(sw => (
              <PowerSwitch key={sw.id} switchData={sw} />
            ))}
          </div>
        </div>
        
        {/* Auto Controls Demo Section */}
        <Card className="mt-10 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Vehicle Controls Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <CustomIconButton
                label="Fan"
                icon="fan"
                buttonStyle="glossy"
                buttonType="round"
                color="#3b82f6"
                glowEffect={true}
                state="active"
              />
              <CustomIconButton
                label="Lights"
                icon="lightbulb"
                buttonStyle="metal"
                buttonType="round"
                color="#6366f1"
              />
              <CustomIconButton
                label="Temperature"
                icon="thermometer"
                buttonStyle="carbon"
                buttonType="rectangular"
                color="#000000"
              />
              <CustomIconButton
                label="Dashboard"
                icon="gauge"
                buttonStyle="glass"
                buttonType="oval"
                glowEffect={true}
              />
              <CustomIconButton
                label="Ejector Seat"
                icon="power"
                buttonStyle="military"
                buttonType="flip"
                state="active"
                color="#f43f5e"
              />
              <CustomIconButton
                label="Heater"
                icon="thermometer"
                buttonStyle="rubber"
                buttonType="rectangular"
                color="#212121"
              />
              <CustomIconButton
                label="Lock"
                icon="lock"
                buttonStyle="glossy"
                buttonType="round"
                color="#ef4444"
                state="pressed"
              />
              <CustomIconButton
                label="Parking"
                icon="car"
                buttonStyle="glass"
                buttonType="oval"
                color="#22c55e"
                state="disabled"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-transparent bg-clip-text inline-block">
            POWER TECH
          </h2>
          <p className="text-xl text-pink-500 font-semibold">SEEN IT FIRST</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
