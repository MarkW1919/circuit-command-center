
import React from 'react';
import { WidgetPosition } from '@/contexts/CustomizeContext';
import { useApp } from '@/contexts/AppContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface CustomMeterProps {
  widget: WidgetPosition;
}

const CustomMeter = ({ widget }: CustomMeterProps) => {
  const { switches } = useApp();
  const config = widget.config || {};
  const selectedSwitchId = config.switchId || (switches[0]?.id ?? null);
  
  const selectedSwitch = switches.find(sw => sw.id === selectedSwitchId);
  
  // Calculate progress value (0-100) from current
  const maxCurrent = 15; // Assuming max current is 15A
  const progress = selectedSwitch ? Math.min(100, (selectedSwitch.current / maxCurrent) * 100) : 0;
  
  return (
    <div className="space-y-4 h-full">
      <Select
        value={selectedSwitchId || ''}
        onValueChange={(value) => {
          widget.config = { ...config, switchId: value };
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select meter source" />
        </SelectTrigger>
        <SelectContent>
          {switches.map(sw => (
            <SelectItem key={sw.id} value={sw.id}>
              {sw.name} (CH {sw.channel})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedSwitch && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{selectedSwitch.name}</span>
            <span>{selectedSwitch.current}A</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default CustomMeter;
