
import React from 'react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { 
  Power, 
  LayoutDashboard, 
  Sliders, 
  AlertCircle, 
  SlidersHorizontal, 
  Settings
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onCloseSidebar: () => void;
}

const Sidebar = ({ isOpen, onCloseSidebar }: SidebarProps) => {
  const { systemStatus, connectBluetooth, disconnectBluetooth, isConnecting } = useApp();
  const location = useLocation();
  
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { id: "control", label: "Controls", icon: Sliders, path: "/controls" },
    { id: "faults", label: "Faults", icon: AlertCircle, path: "/faults", 
      badge: systemStatus.faults.filter(f => !f.resolved).length },
    { id: "setup", label: "Setup", icon: SlidersHorizontal, path: "/setup" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" }
  ];
  
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/40 md:hidden" 
          onClick={onCloseSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-sidebar text-sidebar-foreground transition-transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold">Power Distribution</h2>
          <p className="text-sm text-sidebar-foreground/70">
            {systemStatus.connected ? "Connected" : "Disconnected"}
          </p>
        </div>
        
        <Separator className="bg-sidebar-border" />
        
        <ScrollArea className="flex-1">
          <nav className="p-2">
            <ul className="space-y-1">
              {navItems.map(item => (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sidebar-foreground/70",
                      location.pathname === item.path && "bg-sidebar-accent text-sidebar-foreground"
                    )}
                    asChild
                    onClick={onCloseSidebar}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.label}</span>
                      {item.badge ? (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-status-danger text-xs text-white">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
        
        <Separator className="bg-sidebar-border" />
        
        <div className="p-4">
          <Button 
            className="w-full"
            variant={systemStatus.connected ? "destructive" : "default"}
            onClick={systemStatus.connected ? disconnectBluetooth : connectBluetooth}
            disabled={isConnecting}
          >
            <Power className="mr-2 h-4 w-4" />
            {systemStatus.connected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
