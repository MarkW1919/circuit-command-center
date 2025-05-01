
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initialSettings, initialSwitches, initialSystemStatus } from './initialState';
import { useAppActions } from './appActions';
import { AppContextType } from './types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [switches, setSwitches] = useState(initialSwitches);
  const [systemStatus, setSystemStatus] = useState(initialSystemStatus);
  const [settings, setSettings] = useState(initialSettings);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  
  // Import all the actions
  const actions = useAppActions(
    switches,
    setSwitches,
    systemStatus,
    setSystemStatus,
    settings,
    setSettings,
    isConnecting,
    setIsConnecting
  );
  
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
  
  return (
    <AppContext.Provider
      value={{
        switches,
        systemStatus,
        settings,
        isConnecting,
        ...actions
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
