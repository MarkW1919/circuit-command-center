
import React from 'react';
import { useApp } from '@/contexts/app';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const SettingsPanel = () => {
  const { settings, updateSettings, setTheme } = useApp();
  
  const handleThemeChange = (value: string) => {
    setTheme(value as any);
  };
  
  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle>Settings</SheetTitle>
        <SheetDescription>
          Customize your power distribution controller
        </SheetDescription>
      </SheetHeader>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Interface</h3>
        
        <div className="space-y-3">
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
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoConnect">Auto-connect</Label>
              <p className="text-sm text-muted-foreground">Automatically connect on startup</p>
            </div>
            <Switch
              id="autoConnect"
              checked={settings.autoConnect}
              onCheckedChange={(checked) => updateSettings({ autoConnect: checked })}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Safety</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="safeMode">Safe Mode</Label>
              <p className="text-sm text-muted-foreground">Disable all circuits on connection loss</p>
            </div>
            <Switch
              id="safeMode"
              checked={settings.safeMode}
              onCheckedChange={(checked) => updateSettings({ safeMode: checked })}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">About</h3>
        <p className="text-sm text-muted-foreground">
          Smart Power Distribution Controller v1.0.0
        </p>
        <p className="text-sm text-muted-foreground">
          © 2025 Power Distribution Systems
        </p>
      </div>
    </div>
  );
};

export default SettingsPanel;
