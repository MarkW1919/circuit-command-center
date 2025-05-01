
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, SunMedium, Trash2 } from 'lucide-react';
import { CustomButtonConfig, ButtonActionType } from './ButtonCustomizer';
import IconSelector from './IconSelector';
import CustomIconButton from './CustomIconButton';

interface ButtonEditorProps {
  button: CustomButtonConfig;
  onSave: (button: CustomButtonConfig) => void;
  onDelete: () => void;
}

const BUTTON_COLORS = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#f59e0b', // Amber
  '#eab308', // Yellow
  '#84cc16', // Lime
  '#22c55e', // Green
  '#10b981', // Emerald
  '#14b8a6', // Teal
  '#06b6d4', // Cyan
  '#0ea5e9', // Light Blue
  '#3b82f6', // Blue
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#a855f7', // Purple
  '#d946ef', // Fuchsia
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#64748b', // Slate
  '#334155', // Gray
];

const ButtonEditor: React.FC<ButtonEditorProps> = ({ button, onSave, onDelete }) => {
  const [editedButton, setEditedButton] = useState<CustomButtonConfig>({...button});
  const [selectedIcon, setSelectedIcon] = useState(button.icon);
  
  const handleChange = (field: keyof CustomButtonConfig, value: any) => {
    setEditedButton({
      ...editedButton,
      [field]: value
    });
  };
  
  const handleSelectIcon = (iconName: string) => {
    setSelectedIcon(iconName);
    handleChange('icon', iconName);
  };
  
  const handleSave = () => {
    onSave(editedButton);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-6">
        <CustomIconButton 
          label={editedButton.label}
          icon={editedButton.icon}
          color={editedButton.color}
          glowEffect={editedButton.glowEffect}
        />
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label">Button Label</Label>
          <Input
            id="label"
            value={editedButton.label}
            onChange={(e) => handleChange('label', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="commandId">Command ID / Channel</Label>
          <Input
            id="commandId"
            value={editedButton.commandId}
            onChange={(e) => handleChange('commandId', e.target.value)}
            placeholder="Enter command or channel ID"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="actionType">Button Behavior</Label>
          <Select 
            value={editedButton.actionType} 
            onValueChange={(value) => handleChange('actionType', value as ButtonActionType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select behavior" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toggle">Toggle (On/Off)</SelectItem>
              <SelectItem value="momentary">Momentary (Press & Hold)</SelectItem>
              <SelectItem value="linked">Linked (Group Activation)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Button Icon</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <span className="mr-2">{selectedIcon}</span>
                <span>Select Icon</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <IconSelector onSelectIcon={handleSelectIcon} />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label>Button Color</Label>
          <div className="grid grid-cols-6 gap-2">
            {BUTTON_COLORS.map((color) => (
              <div
                key={color}
                className={`h-6 w-6 rounded-full cursor-pointer flex items-center justify-center ${editedButton.color === color ? 'ring-2 ring-offset-2 ring-offset-background' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleChange('color', color)}
              >
                {editedButton.color === color && <Check className="h-3 w-3 text-white" />}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Toggle
            pressed={editedButton.glowEffect}
            onPressedChange={(pressed) => handleChange('glowEffect', pressed)}
          >
            <SunMedium className="h-4 w-4 mr-2" />
            Glow Effect
          </Toggle>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ButtonEditor;
