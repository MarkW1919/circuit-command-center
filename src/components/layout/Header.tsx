
import React from 'react';
import { useApp } from '@/contexts/app';
import { Settings, Menu, Power, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import SettingsPanel from '@/components/panels/SettingsPanel';
import { useIsMobile } from '@/hooks/use-mobile';

const ConnectionStatus = () => {
  const { systemStatus, isConnecting } = useApp();
  
  return (
    <div className="flex items-center gap-2">
      {isConnecting ? (
        <div className="status-indicator text-status-information">
          <div className="status-dot bg-status-information animate-pulse-slow"></div>
          <span>Connecting...</span>
        </div>
      ) : systemStatus.connected ? (
        <div className="status-indicator text-status-active">
          <div className="status-dot status-dot-active"></div>
          <span>Connected</span>
        </div>
      ) : (
        <div className="status-indicator text-status-inactive">
          <div className="status-dot status-dot-inactive"></div>
          <span>Disconnected</span>
        </div>
      )}
    </div>
  );
};

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { systemStatus, connectBluetooth, disconnectBluetooth, isConnecting } = useApp();
  const isMobile = useIsMobile();
  
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Power Controller</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ConnectionStatus />
          
          {systemStatus.faults.filter(f => !f.resolved).length > 0 && (
            <Button variant="ghost" size="icon" className="relative text-status-danger">
              <AlertCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-status-danger text-xs text-white">
                {systemStatus.faults.filter(f => !f.resolved).length}
              </span>
            </Button>
          )}
          
          {!isMobile && (
            <Button 
              variant={systemStatus.connected ? "destructive" : "default"}
              onClick={systemStatus.connected ? disconnectBluetooth : connectBluetooth}
              disabled={isConnecting}
            >
              <Power className="mr-2 h-4 w-4" />
              {systemStatus.connected ? "Disconnect" : "Connect"}
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SettingsPanel />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
