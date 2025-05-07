
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import CustomIconButton from './CustomIconButton';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const AnimatedWinchDemo = () => {
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>({
    round: false,
    flip: false,
    glass: false,
    metal: false,
    momentary: false,
  });
  
  const [direction, setDirection] = useState<'in' | 'out'>('in');
  const [momentary, setMomentary] = useState(false);
  
  const toggleButton = (id: string) => {
    setActiveStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleMomentaryClick = () => {
    // For momentary buttons, activate briefly then deactivate
    setActiveStates(prev => ({ ...prev, momentary: true }));
    
    setTimeout(() => {
      setActiveStates(prev => ({ ...prev, momentary: false }));
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Animated Winch Controls</span>
          <div className="flex items-center space-x-2">
            <Label htmlFor="momentary-mode">Momentary Mode</Label>
            <Switch 
              id="momentary-mode" 
              checked={momentary}
              onCheckedChange={setMomentary}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            <ToggleGroup type="single" value={direction} onValueChange={(val) => val && setDirection(val as 'in' | 'out')}>
              <ToggleGroupItem value="in" className="px-8">Winch IN</ToggleGroupItem>
              <ToggleGroupItem value="out" className="px-8">Winch OUT</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <Tabs defaultValue="styles">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="styles">Styles</TabsTrigger>
              <TabsTrigger value="types">Button Types</TabsTrigger>
            </TabsList>
            
            <TabsContent value="styles" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex flex-col items-center">
                  <CustomIconButton
                    label="Glossy"
                    icon="winch"
                    state={activeStates.round ? 'active' : 'default'}
                    buttonStyle="glossy"
                    showTooltip
                    onClick={() => momentary ? handleMomentaryClick() : toggleButton('round')}
                    winchDirection={direction}
                    momentary={momentary}
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <CustomIconButton
                    label="Metal"
                    icon="winch"
                    state={activeStates.metal ? 'active' : 'default'}
                    buttonStyle="metal"
                    showTooltip
                    onClick={() => momentary ? handleMomentaryClick() : toggleButton('metal')}
                    winchDirection={direction}
                    momentary={momentary}
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <CustomIconButton
                    label="Military"
                    icon="winch"
                    state={activeStates.metal ? 'active' : 'default'}
                    buttonStyle="military"
                    showTooltip
                    onClick={() => momentary ? handleMomentaryClick() : toggleButton('metal')}
                    winchDirection={direction}
                    momentary={momentary}
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <CustomIconButton
                    label="Glass"
                    icon="winch"
                    state={activeStates.glass ? 'active' : 'default'}
                    buttonStyle="glass"
                    glowEffect={true}
                    showTooltip
                    onClick={() => momentary ? handleMomentaryClick() : toggleButton('glass')}
                    winchDirection={direction}
                    momentary={momentary}
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button onClick={() => {
                  // Toggle all buttons
                  const newState = !Object.values(activeStates).some(state => state);
                  setActiveStates({
                    round: newState,
                    flip: newState, 
                    glass: newState,
                    metal: newState,
                    momentary: newState
                  });
                }}>
                  Toggle All
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="types">
              <div className="grid grid-cols-2 gap-8 py-4">
                <div className="flex flex-col items-center">
                  <CustomIconButton
                    label="Round"
                    icon="winch"
                    buttonType="round"
                    state={activeStates.round ? 'active' : 'default'}
                    showTooltip
                    onClick={() => momentary ? handleMomentaryClick() : toggleButton('round')}
                    winchDirection={direction}
                    momentary={momentary}
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <CustomIconButton
                    label="Rectangular"
                    icon="winch"
                    buttonType="rectangular"
                    state={activeStates.round ? 'active' : 'default'}
                    showTooltip
                    onClick={() => momentary ? handleMomentaryClick() : toggleButton('round')}
                    winchDirection={direction}
                    momentary={momentary}
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <CustomIconButton
                    label="Oval"
                    icon="winch"
                    buttonType="oval"
                    state={activeStates.round ? 'active' : 'default'}
                    showTooltip
                    onClick={() => momentary ? handleMomentaryClick() : toggleButton('round')}
                    winchDirection={direction}
                    momentary={momentary}
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <CustomIconButton
                    label="Flip Switch"
                    icon="winch"
                    buttonType="flip"
                    state={activeStates.flip ? 'active' : 'default'}
                    showTooltip
                    onClick={() => momentary ? handleMomentaryClick() : toggleButton('flip')}
                    winchDirection={direction}
                    momentary={momentary}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p><strong>Winch Controls</strong>: Use the toggle above to switch between IN/OUT direction.</p>
          <p>The momentary mode simulates a momentary button that activates while pressed.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedWinchDemo;
