
import { useState } from 'react';
import { SwitchStatus, SystemStatus, UserSettings, SystemFault, ThemeOption } from '@/types';
import { toast } from '@/components/ui/use-toast';

export const useAppActions = (
  switches: SwitchStatus[],
  setSwitches: React.Dispatch<React.SetStateAction<SwitchStatus[]>>,
  systemStatus: SystemStatus,
  setSystemStatus: React.Dispatch<React.SetStateAction<SystemStatus>>,
  settings: UserSettings,
  setSettings: React.Dispatch<React.SetStateAction<UserSettings>>,
  isConnecting: boolean,
  setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Toggle switch functionality
  const toggleSwitch = (id: string) => {
    // Check if system is connected
    if (!systemStatus.connected) {
      toast({
        variant: "destructive",
        title: "Not connected",
        description: "Connect to controller before toggling switches.",
      });
      return;
    }
    
    setSwitches(prevSwitches => {
      return prevSwitches.map(sw => {
        if (sw.id === id) {
          // Don't toggle if switch is disabled
          if (sw.disabled) {
            return sw;
          }
          
          const newActive = !sw.active;
          
          // Simulate current draw when turned on
          const newCurrent = newActive ? parseFloat((Math.random() * 5 + 0.5).toFixed(1)) : 0;
          
          // Notify the user
          toast({
            title: `${sw.name} ${newActive ? 'activated' : 'deactivated'}`,
            description: newActive ? `Current draw: ${newCurrent}A` : "Current draw: 0A",
            variant: newActive ? "default" : "destructive"
          });
          
          return {
            ...sw,
            active: newActive,
            current: newCurrent
          };
        }
        return sw;
      });
    });
  };
  
  // Mock Bluetooth connection function
  const connectBluetooth = () => {
    setIsConnecting(true);
    
    // Simulate connection delay and outcome
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setSystemStatus(prev => ({ 
          ...prev, 
          connected: true,
          modules: prev.modules.map(m => ({ ...m, connected: true }))
        }));
        toast({
          title: "Connected to controller",
          description: "Successfully connected to power distribution system.",
        });
      } else {
        // Add a connection fault
        const newFault: SystemFault = {
          id: `fault-${Date.now()}`,
          moduleId: null,
          type: 'connection',
          message: 'Failed to establish connection with controller',
          timestamp: Date.now(),
          resolved: false
        };
        
        setSystemStatus(prev => ({
          ...prev,
          faults: [...prev.faults, newFault]
        }));
        
        toast({
          variant: "destructive",
          title: "Connection failed",
          description: "Could not connect to the power distribution system.",
        });
      }
      
      setIsConnecting(false);
    }, 2000);
  };
  
  const disconnectBluetooth = () => {
    setSystemStatus(prev => ({ 
      ...prev, 
      connected: false,
      modules: prev.modules.map(m => ({ ...m, connected: false }))
    }));
    
    toast({
      title: "Disconnected",
      description: "Disconnected from power distribution system.",
    });
  };
  
  const clearFault = (faultId: string) => {
    setSystemStatus(prev => ({
      ...prev,
      faults: prev.faults.map(fault => 
        fault.id === faultId ? { ...fault, resolved: true } : fault
      )
    }));
  };
  
  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };
  
  const setTheme = (theme: ThemeOption) => {
    updateSettings({ theme });
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Handle system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      prefersDark 
        ? document.documentElement.classList.add('dark') 
        : document.documentElement.classList.remove('dark');
    }
  };

  return {
    toggleSwitch,
    connectBluetooth,
    disconnectBluetooth,
    clearFault,
    updateSettings,
    setTheme
  };
};
