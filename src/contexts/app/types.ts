
import { SystemStatus, SwitchStatus, UserSettings, ThemeOption, SystemFault } from '@/types';

export interface AppContextType {
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
