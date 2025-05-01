
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

// Types for customization
export interface WidgetPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'switch' | 'meter' | 'status' | 'chart';
  config?: any;
}

export interface PatternBank {
  id: string;
  name: string;
  switches: string[];
  color?: string;
}

export interface ThemeConfig {
  switchStyle: 'modern' | 'classic' | 'industrial' | 'minimal';
  colorScheme: 'blue' | 'green' | 'purple' | 'red' | 'custom';
  backgroundColor: string;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface CustomizeContextType {
  widgets: WidgetPosition[];
  themeConfig: ThemeConfig;
  patternBanks: PatternBank[];
  moveWidget: (id: string, x: number, y: number) => void;
  resizeWidget: (id: string, width: number, height: number) => void;
  addWidget: (widget: Omit<WidgetPosition, 'id'>) => void;
  removeWidget: (id: string) => void;
  updateTheme: (newTheme: Partial<ThemeConfig>) => void;
  addPatternBank: (bank: Omit<PatternBank, 'id'>) => void;
  updatePatternBank: (id: string, updates: Partial<PatternBank>) => void;
  removePatternBank: (id: string) => void;
  saveLayout: () => void;
  loadLayout: () => void;
}

const defaultTheme: ThemeConfig = {
  switchStyle: 'modern',
  colorScheme: 'blue',
  backgroundColor: '#111827',
};

const CustomizeContext = createContext<CustomizeContextType | undefined>(undefined);

export const CustomizeProvider = ({ children }: { children: ReactNode }) => {
  const [widgets, setWidgets] = useState<WidgetPosition[]>([]);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultTheme);
  const [patternBanks, setPatternBanks] = useState<PatternBank[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    loadLayout();
  }, []);

  const moveWidget = (id: string, x: number, y: number) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === id ? { ...widget, x, y } : widget
    ));
  };

  const resizeWidget = (id: string, width: number, height: number) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === id ? { ...widget, width, height } : widget
    ));
  };

  const addWidget = (widget: Omit<WidgetPosition, 'id'>) => {
    const id = `widget-${Date.now()}`;
    setWidgets(prev => [...prev, { ...widget, id }]);
  };

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== id));
  };

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    setThemeConfig(prev => ({ ...prev, ...newTheme }));
  };

  const addPatternBank = (bank: Omit<PatternBank, 'id'>) => {
    const id = `pattern-${Date.now()}`;
    setPatternBanks(prev => [...prev, { ...bank, id }]);
  };

  const updatePatternBank = (id: string, updates: Partial<PatternBank>) => {
    setPatternBanks(prev => prev.map(bank => 
      bank.id === id ? { ...bank, ...updates } : bank
    ));
  };

  const removePatternBank = (id: string) => {
    setPatternBanks(prev => prev.filter(bank => bank.id !== id));
  };

  const saveLayout = () => {
    try {
      localStorage.setItem('powerControl_widgets', JSON.stringify(widgets));
      localStorage.setItem('powerControl_theme', JSON.stringify(themeConfig));
      localStorage.setItem('powerControl_patterns', JSON.stringify(patternBanks));
    } catch (error) {
      console.error('Error saving layout:', error);
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Could not save your layout to local storage.",
      });
    }
  };

  const loadLayout = () => {
    try {
      // Load widgets
      const savedWidgets = localStorage.getItem('powerControl_widgets');
      if (savedWidgets) {
        setWidgets(JSON.parse(savedWidgets));
      }
      
      // Load theme
      const savedTheme = localStorage.getItem('powerControl_theme');
      if (savedTheme) {
        setThemeConfig(JSON.parse(savedTheme));
      }
      
      // Load pattern banks
      const savedPatterns = localStorage.getItem('powerControl_patterns');
      if (savedPatterns) {
        setPatternBanks(JSON.parse(savedPatterns));
      }
    } catch (error) {
      console.error('Error loading layout:', error);
    }
  };

  return (
    <CustomizeContext.Provider
      value={{
        widgets,
        themeConfig,
        patternBanks,
        moveWidget,
        resizeWidget,
        addWidget,
        removeWidget,
        updateTheme,
        addPatternBank,
        updatePatternBank,
        removePatternBank,
        saveLayout,
        loadLayout
      }}
    >
      {children}
    </CustomizeContext.Provider>
  );
};

export const useCustomize = () => {
  const context = useContext(CustomizeContext);
  if (context === undefined) {
    throw new Error('useCustomize must be used within a CustomizeProvider');
  }
  return context;
};
