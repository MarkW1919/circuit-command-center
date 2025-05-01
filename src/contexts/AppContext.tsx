import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SystemStatus, SwitchStatus, UserSettings, SystemFault, ThemeOption, ModuleStatus } from '@/types';
import { toast } from '@/components/ui/use-toast';

// Initial mock data for development
const initialSwitches: SwitchStatus[] = [
  { id: 'sw1', name: 'Headlights', moduleId: 'primary', channel: 1, active: false, disabled: false, current: 0 },
  { id: 'sw2', name: 'Fog Lights', moduleId: 'primary', channel: 2, active: false, disabled: false, current: 0 },
  { id: 'sw3', name: 'Light Bar', moduleId: 'primary', channel: 3, active: false, disabled: false, current: 0 },
  { id: 'sw4', name: 'Winch', moduleId: 'primary', channel: 4, active: false, disabled: false, current: 0, fault: false },
  { id: 'sw5', name: 'Air Compressor', moduleId: 'primary', channel: 5, active: false, disabled: false, current: 0 },
  { id: 'sw6', name: 'Interior Lights', moduleId: 'primary', channel: 6, active: false, disabled: false, current: 0 },
  { id: 'sw7', name: 'USB Power', moduleId: 'primary', channel: 7, active: false, disabled: false, current: 0 },
  { id: 'sw8', name: 'Spare', moduleId: 'primary', channel: 8, active: false, disabled: false, current: 0 },
];

const initialModules: ModuleStatus[] = [
  { 
    id: 'primary', 
    name: 'Main Controller', 
    type: 'primary', 
    connected: false, 
    temperature: 23, 
    channels: 8, 
    fault: false 
  }
];

const initialSystemStatus: SystemStatus = {
  connected: false,
  controlMode: 'primary',
  safeState: true,
  watchdogActive: true,
  faults: [],
  modules: initialModules,
};

const initialSettings: UserSettings = {
  theme: 'system',
  autoConnect: true,
  safeMode: true,
  customLabels: {},
  dashboard: []
};

interface AppContextType {
  switches: SwitchStatus[];
  systemStatus: SystemStatus;
  settings: UserSettings;
  isConnecting: boolean;
  toggleSwitch: (id: string) => void;
  connectBluetooth: () => void;
  disconnectBluetooth: () => void;
  clearFault: (faultId: string) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  setTheme: (theme: ThemeOption) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [switches, setSwitches] = useState<SwitchStatus[]>(initialSwitches);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(initialSystemStatus);
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  
  // Load settings from localStorage on initial load
  useEffect(() => {
    const savedSettings = localStorage.getItem('powerControlSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({
          ...prevSettings,
          ...parsedSettings
        }));
      } catch (err) {
        console.error('Error parsing saved settings:', err);
      }
    }
    
    // Apply theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Handle system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      prefersDark 
        ? document.documentElement.classList.add('dark') 
        : document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('powerControlSettings', JSON.stringify(settings));
  }, [settings]);
  
  // Mock Bluetooth connection function - in real app this would use Capacitor plugins
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
  
  const toggleSwitch = (id: string) => {
    // Check if system is in safe state
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
  
  return (
    <AppContext.Provider
      value={{
        switches,
        systemStatus,
        settings,
        isConnecting,
        toggleSwitch,
        connectBluetooth,
        disconnectBluetooth,
        clearFault,
        updateSettings,
        setTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
