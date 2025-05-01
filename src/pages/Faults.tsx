
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock, Thermometer, Wifi, Shield, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Faults = () => {
  const { systemStatus, clearFault } = useApp();
  const [activeTab, setActiveTab] = useState<'active' | 'resolved'>('active');
  
  // Filter faults by status
  const activeFaults = systemStatus.faults.filter(fault => !fault.resolved);
  const resolvedFaults = systemStatus.faults.filter(fault => fault.resolved);
  
  // Get fault icon based on type
  const getFaultIcon = (type: string) => {
    switch(type) {
      case 'connection': return <Wifi className="h-5 w-5" />;
      case 'overload': return <AlertCircle className="h-5 w-5" />;
      case 'temperature': return <Thermometer className="h-5 w-5" />;
      case 'watchdog': return <Shield className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  // Format timestamp to readable date
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Get associated module name
  const getModuleName = (moduleId: string | null) => {
    if (!moduleId) return 'System';
    
    const module = systemStatus.modules.find(m => m.id === moduleId);
    return module ? module.name : 'Unknown Module';
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">System Faults</h2>
          
          <Badge variant="outline" className={activeFaults.length > 0 ? "bg-status-danger text-white" : "bg-status-active text-white"}>
            {activeFaults.length} Active {activeFaults.length === 1 ? 'Fault' : 'Faults'}
          </Badge>
        </div>
        
        <Tabs defaultValue="active" value={activeTab} onValueChange={(value) => setActiveTab(value as 'active' | 'resolved')}>
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            {activeFaults.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-status-active mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Active Faults</h3>
                  <p className="text-muted-foreground">
                    The system is currently operating without any detected issues.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {activeFaults.map(fault => (
                  <Card key={fault.id} className="border-status-danger/30">
                    <CardHeader className="flex flex-row items-center gap-2 pb-2">
                      <div className="bg-status-danger/10 p-2 rounded-full">
                        {getFaultIcon(fault.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{fault.message}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {getModuleName(fault.moduleId)}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(fault.timestamp)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" onClick={() => clearFault(fault.id)}>
                        Clear Fault
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-6">
            {resolvedFaults.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <h3 className="text-xl font-medium mb-2">No Resolved Faults</h3>
                  <p className="text-muted-foreground">
                    There are no previously resolved faults in the system history.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {resolvedFaults.map(fault => (
                  <Card key={fault.id} className="opacity-70">
                    <CardHeader className="flex flex-row items-center gap-2 pb-2">
                      <div className="bg-status-inactive/10 p-2 rounded-full">
                        {getFaultIcon(fault.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{fault.message}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {getModuleName(fault.moduleId)}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(fault.timestamp)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Faults;
