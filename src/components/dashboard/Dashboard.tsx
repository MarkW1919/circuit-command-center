
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import PowerSwitch from '@/components/controls/PowerSwitch';
import SystemStatus from '@/components/dashboard/SystemStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Power } from 'lucide-react';

const Dashboard = () => {
  const { switches, systemStatus, connectBluetooth, isConnecting } = useApp();
  
  // Get primary module switches
  const primarySwitches = switches.filter(sw => sw.moduleId === 'primary');
  
  // Check if there are active faults
  const hasActiveFaults = systemStatus.faults.some(fault => !fault.resolved);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Power Distribution Dashboard</h2>
      </div>
      
      {!systemStatus.connected && (
        <Card className="border-status-information/30 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Power className="h-5 w-5 mr-2 text-status-information" />
              <span>System Disconnected</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Connect to your power distribution controller to monitor and control your system.
            </p>
            <Button 
              onClick={connectBluetooth}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Now"}
            </Button>
          </CardContent>
        </Card>
      )}
      
      {hasActiveFaults && (
        <Card className="border-status-danger/30 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-status-danger" />
              <span>System Faults Detected</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {systemStatus.faults.filter(f => !f.resolved).length} active {systemStatus.faults.filter(f => !f.resolved).length === 1 ? 'fault' : 'faults'} in the system. Check the Faults panel for details.
            </p>
          </CardContent>
        </Card>
      )}
      
      {systemStatus.connected && (
        <SystemStatus />
      )}
      
      <h3 className="text-xl font-medium mt-6">Main Controls</h3>
      
      <div className="dashboard-grid">
        {primarySwitches.map(sw => (
          <PowerSwitch key={sw.id} switchData={sw} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
