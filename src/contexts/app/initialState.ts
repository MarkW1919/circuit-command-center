
import { SystemStatus, SwitchStatus, UserSettings, ModuleStatus } from '@/types';

// Initial mock data for development
export const initialSwitches: SwitchStatus[] = [
  { id: 'sw1', name: 'Headlights', moduleId: 'primary', channel: 1, active: false, disabled: false, current: 0 },
  { id: 'sw2', name: 'Fog Lights', moduleId: 'primary', channel: 2, active: false, disabled: false, current: 0 },
  { id: 'sw3', name: 'Light Bar', moduleId: 'primary', channel: 3, active: false, disabled: false, current: 0 },
  { id: 'sw4', name: 'Winch', moduleId: 'primary', channel: 4, active: false, disabled: false, current: 0, fault: false },
  { id: 'sw5', name: 'Air Compressor', moduleId: 'primary', channel: 5, active: false, disabled: false, current: 0 },
  { id: 'sw6', name: 'Interior Lights', moduleId: 'primary', channel: 6, active: false, disabled: false, current: 0 },
  { id: 'sw7', name: 'USB Power', moduleId: 'primary', channel: 7, active: false, disabled: false, current: 0 },
  { id: 'sw8', name: 'Spare', moduleId: 'primary', channel: 8, active: false, disabled: false, current: 0 },
];

export const initialModules: ModuleStatus[] = [
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

export const initialSystemStatus: SystemStatus = {
  connected: false,
  controlMode: 'primary',
  safeState: true,
  watchdogActive: true,
  faults: [],
  modules: initialModules,
};

export const initialSettings: UserSettings = {
  theme: 'system',
  autoConnect: true,
  safeMode: true,
  customLabels: {},
  dashboard: []
};
