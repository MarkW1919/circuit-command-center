
import React from 'react';
import { WidgetPosition } from '@/contexts/CustomizeContext';
import { useApp } from '@/contexts/AppContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
          <Label htmlFor={`switch-${widget.id}`}>{selectedSwitch.name}</Label>
          <Switch
            id={`switch-${widget.id}`}
            checked={selectedSwitch.active}
            onCheckedChange={() => toggleSwitch(selectedSwitch.id)}
            disabled={selectedSwitch.disabled || selectedSwitch.fault}
          />
        </div>
      )}
    </div>
  );
};

export default CustomSwitch;
