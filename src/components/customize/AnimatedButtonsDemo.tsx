
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Settings, Zap, Gauge } from 'lucide-react';
import CustomIconButton from './CustomIconButton';

const AnimatedButtonsDemo = () => {
  const [fanActive, setFanActive] = useState(false);
  const [pumpActive, setPumpActive] = useState(false);
  const [lightsActive, setLightsActive] = useState(false);
  const [winchActive, setWinchActive] = useState(false);
  const [compressorActive, setCompressorActive] = useState(false);
  
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [animationIntensity, setAnimationIntensity] = useState(0.7);
  
  return (
    <Card className="border-blue-500/30 bg-gray-900/70 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-white">
          <Zap className="h-5 w-5 mr-2 text-blue-400" />
          <span>Animated Control Buttons Demo</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buttons">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="buttons" className="text-sm">
              <Gauge className="h-4 w-4 mr-1" />
              Control Panel
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">
              <Settings className="h-4 w-4 mr-1" />
              Animation Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="buttons">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <CustomIconButton 
                label="Fan" 
                icon="fan" 
                state={fanActive ? 'active' : 'default'} 
                onClick={() => setFanActive(!fanActive)}
                buttonStyle="glossy"
                color="#3b82f6"
                glowEffect={fanActive}
                animationEnabled={animationsEnabled}
                animationSpeed={animationSpeed}
                animationIntensity={animationIntensity}
              />
              
              <CustomIconButton 
                label="Water Pump" 
                icon="pump" 
                state={pumpActive ? 'active' : 'default'} 
                onClick={() => setPumpActive(!pumpActive)}
                buttonStyle="metal"
                color="#0ea5e9"
                glowEffect={pumpActive}
                animationEnabled={animationsEnabled}
                animationSpeed={animationSpeed}
                animationIntensity={animationIntensity}
              />
              
              <CustomIconButton 
                label="Light Bar" 
                icon="lightbulb" 
                state={lightsActive ? 'active' : 'default'} 
                onClick={() => setLightsActive(!lightsActive)}
                buttonStyle="carbon"
                buttonType="rectangular"
                color="#f59e0b"
                glowEffect={lightsActive}
                animationEnabled={animationsEnabled}
                animationSpeed={animationSpeed}
                animationIntensity={animationIntensity}
              />
              
              <CustomIconButton 
                label="Winch" 
                icon="winch" 
                state={winchActive ? 'active' : 'default'} 
                onClick={() => setWinchActive(!winchActive)}
                buttonStyle="military"
                buttonType="oval"
                color="#334155"
                glowEffect={winchActive}
                animationEnabled={animationsEnabled}
                animationSpeed={animationSpeed}
                animationIntensity={animationIntensity}
              />
              
              <CustomIconButton 
                label="Compressor" 
                icon="compressor" 
                state={compressorActive ? 'active' : 'default'} 
                onClick={() => setCompressorActive(!compressorActive)}
                buttonStyle="rubber"
                color="#0f172a"
                glowEffect={compressorActive}
                animationEnabled={animationsEnabled}
                animationSpeed={animationSpeed}
                animationIntensity={animationIntensity}
              />
              
              <CustomIconButton 
                label="Heater" 
                icon="heater" 
                buttonStyle="glass"
                buttonType="flip"
                state={compressorActive ? 'active' : 'default'} 
                onClick={() => setCompressorActive(!compressorActive)}
                animationEnabled={animationsEnabled}
                animationSpeed={animationSpeed}
                animationIntensity={animationIntensity}
              />
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              Toggle each button to see the animations in action
            </p>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="animations-toggle" className="font-medium">
                  Animations
                </Label>
                <Toggle 
                  id="animations-toggle"
                  pressed={animationsEnabled}
                  onPressedChange={setAnimationsEnabled}
                  variant="outline"
                >
                  {animationsEnabled ? 'Enabled' : 'Disabled'}
                </Toggle>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="speed-slider" className="font-medium">
                    Animation Speed
                  </Label>
                  <span className="text-sm">{animationSpeed.toFixed(1)}x</span>
                </div>
                <Slider
                  id="speed-slider"
                  min={0.5}
                  max={2}
                  step={0.1}
                  defaultValue={[1]}
                  value={[animationSpeed]}
                  onValueChange={(value) => setAnimationSpeed(value[0])}
                  disabled={!animationsEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="intensity-slider" className="font-medium">
                    Animation Intensity
                  </Label>
                  <span className="text-sm">{Math.round(animationIntensity * 100)}%</span>
                </div>
                <Slider
                  id="intensity-slider"
                  min={0.1}
                  max={1}
                  step={0.1}
                  defaultValue={[0.7]}
                  value={[animationIntensity]}
                  onValueChange={(value) => setAnimationIntensity(value[0])}
                  disabled={!animationsEnabled}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-gray-700/50 pt-4">
        <p className="text-xs text-gray-500">
          Animations are synchronized with button states and backlight effects
        </p>
      </CardFooter>
    </Card>
  );
};

export default AnimatedButtonsDemo;
