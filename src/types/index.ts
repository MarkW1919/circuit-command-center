
// System types

export interface SwitchStatus {
  id: string;
  name: string;
  moduleId: string;
  channel: number;
  active: boolean;
  disabled: boolean;
  current: number; // Current in amps
  fault?: boolean;
}

export interface ModuleStatus {
  id: string;
  name: string;
  type: "primary" | "expansion" | "led";
  connected: boolean;
  temperature: number; // Temperature in celsius
  channels: number; // Number of channels
  fault: boolean;
}

export interface SystemStatus {
  connected: boolean;
  controlMode: "primary" | "monitor";
  safeState: boolean;
  watchdogActive: boolean;
  faults: SystemFault[];
  modules: ModuleStatus[];
}

export interface SystemFault {
  id: string;
  moduleId: string | null;
  type: "connection" | "overload" | "temperature" | "watchdog" | "other";
  message: string;
  timestamp: number;
  resolved: boolean;
}

export interface DashboardItem {
  id: string;
  type: "switch" | "gauge" | "status" | "group";
  x: number;
  y: number;
  width: number;
  height: number;
  config: Record<string, any>;
}

export type ThemeOption = "system" | "light" | "dark" | "blue" | "high-contrast";

export interface UserSettings {
  theme: ThemeOption;
  autoConnect: boolean;
  safeMode: boolean;
  customLabels: Record<string, string>;
  dashboard: DashboardItem[];
}
