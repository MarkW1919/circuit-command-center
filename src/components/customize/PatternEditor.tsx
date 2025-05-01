
import React, { useState } from 'react';
import { useCustomize, PatternBank } from '@/contexts/CustomizeContext';
import { useApp } from '@/contexts/app';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, Play, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PatternEditor = () => {
  const { patternBanks, addPatternBank, updatePatternBank, removePatternBank } = useCustomize();
  const { switches, toggleSwitch } = useApp();
  const { toast } = useToast();
  
  const [newBankName, setNewBankName] = useState('');
  const [selectedSwitches, setSelectedSwitches] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  
  const handleCreateBank = () => {
    if (!newBankName.trim()) {
      toast({
        variant: "destructive",
        title: "Name required",
        description: "Please enter a name for the pattern bank.",
      });
      return;
    }
    
    if (selectedSwitches.length === 0) {
      toast({
        variant: "destructive",
        title: "No switches selected",
        description: "Please select at least one switch for the pattern.",
      });
      return;
    }
    
    addPatternBank({
      name: newBankName,
      switches: selectedSwitches,
      color: selectedColor
    });
    
    toast({
      title: "Pattern bank created",
      description: `Pattern bank "${newBankName}" has been created.`,
    });
    
    // Reset form
    setNewBankName('');
    setSelectedSwitches([]);
  };
  
  const handleActivatePattern = (bank: PatternBank) => {
    // Toggle all switches in this pattern
    bank.switches.forEach(switchId => {
      const switchItem = switches.find(sw => sw.id === switchId);
      if (switchItem && !switchItem.active && !switchItem.disabled && !switchItem.fault) {
        toggleSwitch(switchId);
      }
    });
    
    toast({
      title: "Pattern activated",
      description: `Pattern "${bank.name}" has been activated.`,
    });
  };
  
  const handleSwitchToggle = (switchId: string) => {
    setSelectedSwitches(prev => {
      if (prev.includes(switchId)) {
        return prev.filter(id => id !== switchId);
      } else {
        return [...prev, switchId];
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Create New Pattern Bank</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="bank-name">Pattern Bank Name</Label>
            <Input
              id="bank-name"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              placeholder="Enter pattern name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bank-color">Color</Label>
            <Input
              id="bank-color"
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Select Switches</Label>
            <div className="grid grid-cols-2 gap-2 mt-1 border rounded-md p-2">
              {switches.map((sw) => (
                <div key={sw.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`switch-${sw.id}`} 
                    checked={selectedSwitches.includes(sw.id)}
                    onCheckedChange={() => handleSwitchToggle(sw.id)}
                    disabled={sw.disabled || sw.fault}
                  />
                  <Label 
                    htmlFor={`switch-${sw.id}`}
                    className={`${sw.disabled || sw.fault ? 'text-gray-500' : ''}`}
                  >
                    {sw.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Button onClick={handleCreateBank} className="mt-2">
            <Plus className="mr-2 h-4 w-4" />
            Create Pattern Bank
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pattern Banks</h3>
        {patternBanks.length === 0 ? (
          <div className="text-center p-6 border border-dashed rounded-lg text-gray-400">
            No pattern banks created yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patternBanks.map((bank) => (
              <Card key={bank.id}>
                <CardHeader 
                  style={{ backgroundColor: bank.color || '#3b82f6' }}
                  className="text-white rounded-t-lg"
                >
                  <CardTitle className="flex justify-between items-center">
                    <span>{bank.name}</span>
                    <button
                      onClick={() => removePatternBank(bank.id)}
                      className="text-white/80 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {bank.switches.map((switchId) => {
                      const switchItem = switches.find(sw => sw.id === switchId);
                      return switchItem ? (
                        <div key={switchId} className="text-sm">
                          • {switchItem.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleActivatePattern(bank)}
                  >
                    <Play className="mr-1 h-3 w-3" />
                    Activate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternEditor;
