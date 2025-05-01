import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/app';

// Number of data points to display in historical charts
const MAX_DATA_POINTS = 20;

export interface DiagnosticsData {
  temperatureHistory: Array<{time: string, value: number}>;
  powerConsumptionHistory: Array<{time: string, value: number}>;
  currentTemperature: number;
  currentPowerConsumption: number;
  temperatureRate: number;
  systemEfficiency: number;
  activeChannels: number;
}

export const useDiagnostics = (autoRefresh: boolean = true) => {
  const { systemStatus, switches } = useApp();
  
  // State for tracking temperature and power consumption history
  const [temperatureHistory, setTemperatureHistory] = useState<Array<{time: string, value: number}>>([]);
  const [powerConsumptionHistory, setPowerConsumptionHistory] = useState<Array<{time: string, value: number}>>([]);
  
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
  
  // Active channels count
  const activeChannels = switches.filter(sw => sw.active).length;

  const data: DiagnosticsData = {
    temperatureHistory,
    powerConsumptionHistory,
    currentTemperature,
    currentPowerConsumption,
    temperatureRate,
    systemEfficiency,
    activeChannels
  };

  return data;
};
