
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useApp } from '@/contexts/app';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const { settings, updateSettings, setTheme } = useApp();
  
  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold">Settings</h2>
        
        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred appearance</p>
                  </div>
                  <Select 
                    defaultValue={settings.theme} 
                    onValueChange={(value) => setTheme(value as any)}
                  >
                    <SelectTrigger id="theme" className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System Default</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="high-contrast">High Contrast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Color Scheme Preview</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3 bg-card">
                      <h4 className="font-medium mb-2">Background</h4>
                      <div className="space-y-2">
                        <div className="h-5 w-full bg-background rounded"></div>
                        <div className="h-5 w-full bg-card rounded"></div>
                        <div className="h-5 w-full bg-muted rounded"></div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-3 bg-card">
                      <h4 className="font-medium mb-2">Accents</h4>
                      <div className="space-y-2">
                        <div className="h-5 w-full bg-primary rounded"></div>
                        <div className="h-5 w-full bg-secondary rounded"></div>
                        <div className="h-5 w-full bg-accent rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-3 bg-card">
                    <h4 className="font-medium mb-2">Status Colors</h4>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="h-8 rounded bg-status-active flex items-center justify-center text-white text-xs">Active</div>
                      <div className="h-8 rounded bg-status-inactive flex items-center justify-center text-white text-xs">Inactive</div>
                      <div className="h-8 rounded bg-status-warning flex items-center justify-center text-white text-xs">Warning</div>
                      <div className="h-8 rounded bg-status-danger flex items-center justify-center text-white text-xs">Danger</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="behavior" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connection Settings</CardTitle>
                <CardDescription>Configure how the system connects and operates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-connect">Auto Connect</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically connect to the controller on startup
                    </p>
                  </div>
                  <Switch 
                    id="auto-connect" 
                    checked={settings.autoConnect}
                    onCheckedChange={(checked) => updateSettings({ autoConnect: checked })}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="safe-mode">Safe Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Disable all outputs on connection loss or error
                    </p>
                  </div>
                  <Switch 
                    id="safe-mode" 
                    checked={settings.safeMode}
                    onCheckedChange={(checked) => updateSettings({ safeMode: checked })}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Custom Labels</CardTitle>
                <CardDescription>Customize display names for your equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You can assign custom names to your equipment through the Setup page
                </p>
                <Button variant="outline">Edit Custom Labels</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Software</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-transparent bg-clip-text inline-block mb-2">
                    POWER TECH
                  </h3>
                  <p className="text-xl text-pink-500 font-semibold">SEEN IT FIRST</p>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-1">Power Distribution Controller</h4>
                  <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                  
                  <h4 className="font-medium mb-1 mt-4">Developed by</h4>
                  <p className="text-sm text-muted-foreground">Power Tech Engineering</p>
                  
                  <h4 className="font-medium mb-1 mt-4">Support</h4>
                  <p className="text-sm text-muted-foreground">
                    support@powertechengineering.com
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Check for Updates</Button>
                <Button variant="outline">License Information</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
