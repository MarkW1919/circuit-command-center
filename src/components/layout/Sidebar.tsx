
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Activity, ToggleLeft, AlertTriangle, 
  Settings, BarChart3, Sliders, Palette 
} from 'lucide-react';

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Controls", path: "/controls", icon: <ToggleLeft size={18} /> },
    { name: "Diagnostics", path: "/diagnostics", icon: <Activity size={18} /> },
    { name: "Faults", path: "/faults", icon: <AlertTriangle size={18} /> },
    { name: "Setup", path: "/setup", icon: <Sliders size={18} /> },
    { name: "Customize UI", path: "/customize", icon: <Palette size={18} /> },
    { name: "Custom Buttons", path: "/buttons", icon: <BarChart3 size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> }
  ];

  return (
    <div className="bg-sidebar text-sidebar-foreground min-h-screen w-64 flex-shrink-0">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6 text-sidebar-primary">Power Control</h1>
        
        <nav>
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                        : 'hover:bg-sidebar-accent/50 hover:text-sidebar-primary'
                    }`
                  }
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
