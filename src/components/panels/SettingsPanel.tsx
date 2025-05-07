
import React, { useState } from 'react';
import { useApp } from '@/contexts/app';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Lightbulb, Shield, Bell, Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SettingsPanel = () => {
  const { settings, updateSettings, setTheme } = useApp();
  const [activeTab, setActiveTab] = useState('interface');
  
  const handleThemeChange = (value: string) => {
    setTheme(value as any);
    toast({
      title: "Theme updated",
      description: `Interface theme set to ${value}.`,
    });
  };

  const handleToggleSetting = (key: string, value: boolean) => {
    updateSettings({ [key]: value });
    toast({
      title: "Setting updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} has been ${value ? 'enabled' : 'disabled'}.`,
      variant: value ? "default" : "destructive",
    });
  };
  
  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle className="text-xl">Settings</SheetTitle>
        <SheetDescription>
          Customize your power distribution controller
        </SheetDescription>
      </SheetHeader>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="interface" className="flex items-center justify-center">
            <Settings className="h-4 w-4 mr-2" />
            Interface
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center justify-center">
            <Shield className="h-4 w-4 mr-2" />
            Safety
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center justify-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="interface">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <p className="text-sm text-muted-foreground">Choose your preferred appearance</p>
                    </div>
                    <Select defaultValue={settings.theme} onValueChange={handleThemeChange}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoConnect" className="flex items-center">
                        Auto-connect
                        {settings.autoConnect && <Badge className="ml-2 bg-green-600 text-[10px]">ENABLED</Badge>}
                      </Label>
                      <p className="text-sm text-muted-foreground">Automatically connect on startup</p>
                    </div>
                    <Switch
                      id="autoConnect"
                      checked={settings.autoConnect}
                      onCheckedChange={(checked) => handleToggleSetting('autoConnect', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="rememberLayout">Remember Layout</Label>
                      <p className="text-sm text-muted-foreground">Save your dashboard arrangement</p>
                    </div>
                    <Switch
                      id="rememberLayout"
                      checked={settings.rememberLayout !== false}
                      onCheckedChange={(checked) => handleToggleSetting('rememberLayout', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="safeMode" className="flex items-center">
                        Safe Mode
                        {settings.safeMode && <Badge className="ml-2 bg-red-600 text-[10px]">CRITICAL</Badge>}
                      </Label>
                      <p className="text-sm text-muted-foreground">Disable all circuits on connection loss</p>
                    </div>
                    <Switch
                      id="safeMode"
                      checked={settings.safeMode}
                      onCheckedChange={(checked) => handleToggleSetting('safeMode', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="overloadProtection">Overload Protection</Label>
                      <p className="text-sm text-muted-foreground">Cut power when circuit exceeds rated capacity</p>
                    </div>
                    <Switch
                      id="overloadProtection"
                      checked={settings.overloadProtection !== false}
                      onCheckedChange={(checked) => handleToggleSetting('overloadProtection', checked)}
                    />
                  </div>
                </div>
                
                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 flex items-start">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">
                      Safety features protect your equipment and prevent damage. We recommend leaving these enabled.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifyFaults">Fault Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notifications for system faults</p>
                    </div>
                    <Switch
                      id="notifyFaults"
                      checked={settings.notifyFaults !== false}
                      onCheckedChange={(checked) => handleToggleSetting('notifyFaults', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifyUpdates">Update Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notifications for firmware updates</p>
                    </div>
                    <Switch
                      id="notifyUpdates"
                      checked={settings.notifyUpdates !== false}
                      onCheckedChange={(checked) => handleToggleSetting('notifyUpdates', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="soundEffects">Sound Effects</Label>
                      <p className="text-sm text-muted-foreground">Play sounds for actions and alerts</p>
                    </div>
                    <Switch
                      id="soundEffects"
                      checked={settings.soundEffects !== false}
                      onCheckedChange={(checked) => handleToggleSetting('soundEffects', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">About</h3>
        <div className="flex items-start space-x-2">
          <div className="bg-gray-800 rounded-md p-2">
            <Check className="h-4 w-4 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Smart Power Distribution Controller v1.0.0
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 Power Distribution Systems
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Check for Updates
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
