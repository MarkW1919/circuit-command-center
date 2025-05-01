
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Power, Bluetooth, Wifi, Sun, Moon, BellRing, Gauge, Zap, Thermometer, Fan, Wind, Upload, Home, PlugZap, Calendar, Clock, Bell, Radio, Monitor, Music, Volume, Settings, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconSelectorProps {
  onSelectIcon?: (iconName: string) => void;
}

const AVAILABLE_ICONS = [
  { name: 'power', component: Power },
  { name: 'bluetooth', component: Bluetooth },
  { name: 'wifi', component: Wifi },
  { name: 'sun', component: Sun },
  { name: 'moon', component: Moon },
  { name: 'bell', component: Bell },
  { name: 'gauge', component: Gauge },
  { name: 'zap', component: Zap },
  { name: 'thermometer', component: Thermometer },
  { name: 'fan', component: Fan },
  { name: 'wind', component: Wind },
  { name: 'home', component: Home },
  { name: 'plug', component: PlugZap },
  { name: 'calendar', component: Calendar },
  { name: 'clock', component: Clock },
  { name: 'radio', component: Radio },
  { name: 'monitor', component: Monitor },
  { name: 'music', component: Music },
  { name: 'volume', component: Volume },
  { name: 'settings', component: Settings },
  { name: 'lock', component: Lock },
];

const IconSelector: React.FC<IconSelectorProps> = ({ onSelectIcon }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredIcons = searchQuery 
    ? AVAILABLE_ICONS.filter(icon => icon.name.includes(searchQuery.toLowerCase()))
    : AVAILABLE_ICONS;
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search icons..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {filteredIcons.map((icon) => {
          const IconComponent = icon.component;
          return (
            <div
              key={icon.name}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-md border cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors",
                onSelectIcon ? "hover:border-primary" : ""
              )}
              onClick={() => onSelectIcon && onSelectIcon(icon.name)}
            >
              <IconComponent className="h-6 w-6 mb-1" />
              <span className="text-xs">{icon.name}</span>
            </div>
          );
        })}
        
        {filteredIcons.length === 0 && (
          <div className="col-span-4 py-4 text-center text-muted-foreground">
            No icons found matching "{searchQuery}"
          </div>
        )}
      </div>
      
      {!searchQuery && (
        <div className="pt-2 text-center">
          <Upload className="h-4 w-4 inline-block mr-1" />
          <span className="text-xs text-muted-foreground">Upload custom icons in the Button Icons tab</span>
        </div>
      )}
    </div>
  );
};

export default IconSelector;
