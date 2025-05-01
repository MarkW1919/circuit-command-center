
import React from 'react';
import { useCustomize, ThemeConfig } from '@/contexts/CustomizeContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useToast } from '@/components/ui/use-toast';

const StyleSelector = () => {
  const { themeConfig, updateTheme } = useCustomize();
  const { toast } = useToast();
  
  const handleSwitchStyleChange = (style: string) => {
    updateTheme({ switchStyle: style as ThemeConfig['switchStyle'] });
    toast({
      title: "Style updated",
      description: `Switch style changed to ${style}.`,
    });
  };
  
  const handleColorSchemeChange = (scheme: string) => {
    updateTheme({ colorScheme: scheme as ThemeConfig['colorScheme'] });
    toast({
      title: "Color scheme updated",
      description: `Color scheme changed to ${scheme}.`,
    });
  };
  
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTheme({ backgroundColor: e.target.value });
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Switch Style</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['modern', 'classic', 'industrial', 'minimal'] as const).map((style) => (
            <Card 
              key={style}
              className={`cursor-pointer transition-all hover:border-primary ${themeConfig.switchStyle === style ? 'border-primary border-2' : ''}`}
              onClick={() => handleSwitchStyleChange(style)}
            >
              <CardContent className="p-4 flex flex-col items-center">
                <div className={`w-16 h-16 rounded-lg mb-2 flex items-center justify-center
                  ${style === 'modern' ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : ''}
                  ${style === 'classic' ? 'bg-gray-200 border border-gray-400 text-gray-800' : ''}
                  ${style === 'industrial' ? 'bg-yellow-500 border-2 border-black text-black' : ''}
                  ${style === 'minimal' ? 'bg-transparent border border-gray-300 text-gray-400' : ''}
                `}>
                  {/* Switch preview */}
                  <div className={`w-8 h-8 rounded-full 
                    ${style === 'modern' ? 'bg-white/20 backdrop-blur-sm' : ''}
                    ${style === 'classic' ? 'bg-gray-600' : ''}
                    ${style === 'industrial' ? 'bg-gray-800' : ''}
                    ${style === 'minimal' ? 'bg-gray-200' : ''}
                  `}></div>
                </div>
                <span className="text-sm font-medium capitalize">{style}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Color Scheme</h3>
        <ToggleGroup 
          type="single" 
          value={themeConfig.colorScheme}
          onValueChange={(value) => {
            if (value) handleColorSchemeChange(value);
          }}
          className="justify-start"
        >
          {(['blue', 'green', 'purple', 'red', 'custom'] as const).map((color) => (
            <ToggleGroupItem key={color} value={color} className="capitalize">
              {color}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        
        {themeConfig.colorScheme === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <Input
                id="primary-color"
                type="color"
                value={themeConfig.customColors?.primary || '#3b82f6'}
                onChange={(e) => updateTheme({
                  customColors: {
                    ...themeConfig.customColors,
                    primary: e.target.value
                  }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <Input
                id="secondary-color"
                type="color"
                value={themeConfig.customColors?.secondary || '#8b5cf6'}
                onChange={(e) => updateTheme({
                  customColors: {
                    ...themeConfig.customColors,
                    secondary: e.target.value
                  }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <Input
                id="accent-color"
                type="color"
                value={themeConfig.customColors?.accent || '#22c55e'}
                onChange={(e) => updateTheme({
                  customColors: {
                    ...themeConfig.customColors,
                    accent: e.target.value
                  }
                })}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Background</h3>
        <div className="space-y-2">
          <Label htmlFor="background-color">Background Color</Label>
          <Input
            id="background-color"
            type="color"
            value={themeConfig.backgroundColor}
            onChange={handleBackgroundChange}
          />
          <div 
            className="h-16 rounded-lg mt-2 border border-gray-700"
            style={{ backgroundColor: themeConfig.backgroundColor }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;
