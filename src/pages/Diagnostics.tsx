import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useApp } from '@/contexts/app';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend,
  Tooltip
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ChartLine, Battery, ThermometerSun } from 'lucide-react';
import { cn } from '@/lib/utils';

// Number of data points to display in historical charts
const MAX_DATA_POINTS = 20;

const Diagnostics = () => {
  const { systemStatus, switches } = useApp();
  
  // State for tracking temperature and power consumption history
  const [temperatureHistory, setTemperatureHistory] = useState<Array<{time: string, value: number}>>([]);
  const [powerConsumptionHistory, setPowerConsumptionHistory] = useState<Array<{time: string, value: number}>>([]);
  
  // Option to enable auto-refresh
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Function to get the current time formatted
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  // Calculate total current draw
  const calculateTotalPower = () => {
    return switches
      .filter(sw => sw.active)
      .reduce((sum, sw) => sum + sw.current, 0);
  };
  
  // Update data every 2 seconds if auto-refresh is enabled
  useEffect(() => {
    if (!autoRefresh) return;
    
    const intervalId = setInterval(() => {
      const currentTime = getCurrentTime();
      const primaryModule = systemStatus.modules.find(m => m.id === 'primary');
      const temperature = primaryModule?.temperature || 0;
      
      // Add slight random fluctuation to make charts more realistic
      const tempWithNoise = temperature + (Math.random() * 2 - 1);
      
      setTemperatureHistory(prev => {
        const newData = [...prev, { time: currentTime, value: tempWithNoise }];
        // Keep only the most recent data points
        return newData.slice(-MAX_DATA_POINTS);
      });
      
      const totalPower = calculateTotalPower();
      // Add slight random fluctuation to power readings
      const powerWithNoise = totalPower + (Math.random() * 0.5 - 0.25);
      
      setPowerConsumptionHistory(prev => {
        const newData = [...prev, { time: currentTime, value: powerWithNoise }];
        // Keep only the most recent data points
        return newData.slice(-MAX_DATA_POINTS);
      });
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [autoRefresh, systemStatus.modules, switches]);
  
  // Initialize with some data
  useEffect(() => {
    const currentTime = getCurrentTime();
    const primaryModule = systemStatus.modules.find(m => m.id === 'primary');
    const temperature = primaryModule?.temperature || 0;
    const totalPower = calculateTotalPower();
    
    setTemperatureHistory([{ time: currentTime, value: temperature }]);
    setPowerConsumptionHistory([{ time: currentTime, value: totalPower }]);
  }, []);
  
  // Helper function to determine temperature status color
  const getTemperatureStatusColor = (temp: number) => {
    if (temp >= 75) return 'text-status-danger';
    if (temp >= 60) return 'text-status-warning';
    return 'text-status-active';
  };
  
  // Calculate current temperature from the most recent data point
  const currentTemperature = temperatureHistory.length > 0 
    ? temperatureHistory[temperatureHistory.length - 1].value 
    : 0;
  
  // Calculate current power consumption from the most recent data point
  const currentPowerConsumption = powerConsumptionHistory.length > 0 
    ? powerConsumptionHistory[powerConsumptionHistory.length - 1].value 
    : 0;

  // Calculate temperature rates
  const temperatureRate = temperatureHistory.length > 1
    ? (temperatureHistory[temperatureHistory.length - 1].value - temperatureHistory[0].value) / temperatureHistory.length
    : 0;

  // Calculate efficiency metrics (for demonstration)
  const systemEfficiency = Math.max(0, Math.min(100, 95 - (currentTemperature / 2)));

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Temperature Status Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ThermometerSun className="h-5 w-5 mr-2" />
                <span>Temperature</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("text-3xl font-bold", getTemperatureStatusColor(currentTemperature))}>
                {currentTemperature.toFixed(1)}°C
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Rate: {temperatureRate > 0 ? '+' : ''}{temperatureRate.toFixed(2)}°C/min
              </div>
            </CardContent>
          </Card>
          
          {/* Current Draw Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Battery className="h-5 w-5 mr-2" />
                <span>Current Draw</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {currentPowerConsumption.toFixed(1)} A
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Active Channels: {switches.filter(sw => sw.active).length}
              </div>
            </CardContent>
          </Card>
          
          {/* System Efficiency Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ChartLine className="h-5 w-5 mr-2" />
                <span>System Efficiency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {systemEfficiency.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {systemEfficiency > 90 ? 'Optimal' : systemEfficiency > 75 ? 'Good' : 'Needs attention'}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="temperature" className="space-y-4">
          <TabsList>
            <TabsTrigger value="temperature">Temperature Trend</TabsTrigger>
            <TabsTrigger value="power">Power Consumption</TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature" className="space-y-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Temperature Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={temperatureHistory}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="time" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}} domain={['auto', 'auto']} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border border-border/50 bg-background p-2 shadow-md">
                              <div className="font-medium">{payload[0].payload.time}</div>
                              <div className="text-sm text-muted-foreground">
                                Temperature: {payload[0].value}°C
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ef4444" 
                      fill="url(#temperatureGradient)" 
                      name="Temperature (°C)"
                      animationDuration={300}
                    />
                    <defs>
                      <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="power" className="space-y-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Power Consumption</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={powerConsumptionHistory}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="time" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border border-border/50 bg-background p-2 shadow-md">
                              <div className="font-medium">{payload[0].payload.time}</div>
                              <div className="text-sm text-muted-foreground">
                                Current: {payload[0].value.toFixed(1)} A
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0ea5e9" 
                      strokeWidth={2}
                      name="Current (A)"
                      dot={false}
                      animationDuration={300}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Diagnostics;
