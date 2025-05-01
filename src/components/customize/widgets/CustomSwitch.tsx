
import React from 'react';
import { WidgetPosition } from '@/contexts/CustomizeContext';
import { useApp } from '@/contexts/app';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface CustomSwitchProps {
  widget: WidgetPosition;
}

const CustomSwitch = ({ widget }: CustomSwitchProps) => {
  const { switches, toggleSwitch } = useApp();
  const config = widget.config || {};
  const selectedSwitchId = config.switchId || (switches[0]?.id ?? null);
  
  const selectedSwitch = switches.find(sw => sw.id === selectedSwitchId);
  
  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      {/* Switch selection */}
      <Select
        value={selectedSwitchId || ''}
        onValueChange={(value) => {
          widget.config = { ...config, switchId: value };
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select switch" />
        </SelectTrigger>
        <SelectContent>
          {switches.map(sw => (
            <SelectItem key={sw.id} value={sw.id}>
              {sw.name} (CH {sw.channel})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Switch control */}
      {selectedSwitch && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Label htmlFor={`switch-${widget.id}`} className="mb-1">{selectedSwitch.name}</Label>
            {selectedSwitch.active && (
              <div className="flex items-center gap-1 text-status-active animate-pulse">
                <Zap className="h-3 w-3" />
                <span className="text-xs font-medium">{selectedSwitch.current}A</span>
              </div>
            )}
          </div>
          <div className={cn(
            "relative",
            selectedSwitch.active && "after:absolute after:inset-0 after:rounded-full after:bg-status-active/20 after:animate-ping after:animation-delay-300"
          )}>
            <Switch
              id={`switch-${widget.id}`}
              checked={selectedSwitch.active}
              onCheckedChange={() => toggleSwitch(selectedSwitch.id)}
              disabled={selectedSwitch.disabled || selectedSwitch.fault}
              className={selectedSwitch.active ? "bg-status-active" : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSwitch;
