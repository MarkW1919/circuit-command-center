
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { Switch } from '@/components/ui/switch';
import { SwitchStatus } from '@/types';

const Setup = () => {
  const { systemStatus, switches } = useApp();
  const [activeTab, setActiveTab] = useState('modules');
  const [editedSwitches, setEditedSwitches] = useState<SwitchStatus[]>(switches);
  
  // Mock function to update switch settings
  const handleSwitchChange = (id: string, field: keyof SwitchStatus, value: any) => {
    setEditedSwitches(prev => prev.map(sw => 
      sw.id === id ? { ...sw, [field]: value } : sw
    ));
  };
  
  const equipmentTypes = [
    'light', 'fan', 'outlet', 'alarm', 'vent', 'battery', 'bell', 'power'
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">System Setup</h2>
        
        <Tabs defaultValue="modules" onValueChange={setActiveTab} value={activeTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="modules" className="space-y-4">
            <p className="text-muted-foreground">
              Configure connected power distribution modules
            </p>
            
            {systemStatus.modules.map(module => (
              <Card key={module.id} className={
                !module.connected ? "opacity-60" : module.fault ? "border-status-danger/30" : ""
              }>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{module.name}</span>
                    <Badge color={module.connected ? "active" : "inactive"}>
                      {module.connected ? "Connected" : "Disconnected"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`module-name-${module.id}`}>Module Name</Label>
                      <Input 
                        id={`module-name-${module.id}`} 
                        defaultValue={module.name}
                        disabled={!module.connected}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`module-type-${module.id}`}>Module Type</Label>
                      <Select defaultValue={module.type} disabled={!module.connected}>
                        <SelectTrigger id={`module-type-${module.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="expansion">Expansion</SelectItem>
                          <SelectItem value="led">LED Controller</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Channels</p>
                      <p className="text-sm text-muted-foreground">{module.channels} channels available</p>
                    </div>
                    <div>
                      <p className="font-medium">Temperature</p>
                      <p className="text-sm text-muted-foreground">{module.temperature}°C</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled={!module.connected}>
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="channels" className="space-y-4">
            <p className="text-muted-foreground">
              Configure channel settings and parameters
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {editedSwitches.map(sw => (
                <Card key={sw.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>Channel {sw.channel}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`switch-name-${sw.id}`}>Name</Label>
                      <Input 
                        id={`switch-name-${sw.id}`} 
                        value={sw.name}
                        onChange={(e) => handleSwitchChange(sw.id, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`switch-type-${sw.id}`}>Equipment Type</Label>
                      <Select 
                        value={sw.equipmentType || 'default'} 
                        onValueChange={(value) => handleSwitchChange(sw.id, 'equipmentType', value)}
                      >
                        <SelectTrigger id={`switch-type-${sw.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {equipmentTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                          <SelectItem value="default">Default</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor={`switch-disabled-${sw.id}`}>Disabled</Label>
                        <p className="text-sm text-muted-foreground">Prevent channel from being activated</p>
                      </div>
                      <Switch
                        id={`switch-disabled-${sw.id}`}
                        checked={sw.disabled}
                        onCheckedChange={(checked) => handleSwitchChange(sw.id, 'disabled', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button>Save All Changes</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <p className="text-muted-foreground">
              Configure global system settings
            </p>
            
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="watchdog-active">Watchdog</Label>
                    <p className="text-sm text-muted-foreground">Enable system watchdog protection</p>
                  </div>
                  <Switch
                    id="watchdog-active"
                    checked={systemStatus.watchdogActive}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="safe-state">Safe State</Label>
                    <p className="text-sm text-muted-foreground">All channels off on system error</p>
                  </div>
                  <Switch
                    id="safe-state"
                    checked={systemStatus.safeState}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="control-mode">Control Mode</Label>
                  <Select defaultValue={systemStatus.controlMode}>
                    <SelectTrigger id="control-mode">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="monitor">Monitor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Apply Settings</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Network Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bluetooth-name">Bluetooth Device Name</Label>
                  <Input id="bluetooth-name" defaultValue="PowerController-01" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pairing-pin">Pairing PIN</Label>
                  <Input id="pairing-pin" defaultValue="1234" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Network Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Custom Badge component to match the design
const Badge = ({ children, color = "inactive" }: { children: React.ReactNode; color?: "active" | "inactive" | "warning" | "danger" }) => {
  const colorClasses = {
    active: "bg-status-active",
    inactive: "bg-status-inactive",
    warning: "bg-status-warning",
    danger: "bg-status-danger"
  };
  
  return (
    <span className={`${colorClasses[color]} text-white px-2 py-1 rounded-full text-xs`}>
      {children}
    </span>
  );
};

export default Setup;
