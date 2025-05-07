
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Check } from 'lucide-react';
import CustomIconButton from './CustomIconButton';

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

  const styleDescriptions = {
    modern: "Sleek and contemporary with subtle gradients",
    classic: "Traditional hardware look with solid colors",
    industrial: "Rugged, utilitarian design for harsh environments",
    minimal: "Clean, unobtrusive design focused on functionality"
  };
  
  const colorSchemeDescriptions = {
    blue: "Cool blue tones for a calm interface",
    green: "Nature-inspired greens for eco-friendly feel",
    purple: "Rich purple hues for a luxurious experience", 
    red: "Energetic red accents for high-visibility controls",
    custom: "Create your own unique color palette"
  };
  
  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="h-5 w-5 text-blue-400" />
            <h3 className="text-base font-medium text-white">Style Preview</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8 py-4">
            <CustomIconButton 
              label="Power" 
              icon="power"
              buttonStyle={themeConfig.switchStyle as any} 
              color={themeConfig.colorScheme === 'custom' ? themeConfig.customColors?.primary : undefined}
              showTooltip
              description="This is how your controls will look"
            />
            <CustomIconButton 
              label="Active" 
              icon="power"
              buttonStyle={themeConfig.switchStyle as any}
              state="active"
              color={themeConfig.colorScheme === 'custom' ? themeConfig.customColors?.primary : undefined}
              showTooltip
              description="This is how active controls will look"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Switch Style</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toast({
                  title: "Style Tips",
                  description: "Choose a style that matches your vehicle or equipment type. Industrial for work equipment, glossy for luxury vehicles.",
                });
              }}
            >
              <Info className="mr-2 h-4 w-4" />
              Style Tips
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['modern', 'classic', 'industrial', 'minimal'] as const).map((style) => (
              <Tooltip key={style}>
                <TooltipTrigger asChild>
                  <Card 
                    className={`cursor-pointer transition-all hover:border-primary relative ${themeConfig.switchStyle === style ? 'border-primary border-2' : ''}`}
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
                      
                      {themeConfig.switchStyle === style && (
                        <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{styleDescriptions[style]}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Color Scheme</h3>
          <div className="grid grid-cols-5 gap-2">
            {(['blue', 'green', 'purple', 'red', 'custom'] as const).map((color) => (
              <Tooltip key={color}>
                <TooltipTrigger asChild>
                  <Button 
                    variant={themeConfig.colorScheme === color ? "default" : "outline"}
                    className={`h-20 flex flex-col items-center justify-center gap-2 relative ${themeConfig.colorScheme === color ? 'ring-2 ring-white ring-opacity-30' : ''}`}
                    style={{
                      backgroundColor: color === 'blue' ? '#3b82f6' : 
                                      color === 'green' ? '#22c55e' : 
                                      color === 'purple' ? '#8b5cf6' : 
                                      color === 'red' ? '#ef4444' : 
                                      'transparent'
                    }}
                    onClick={() => handleColorSchemeChange(color)}
                  >
                    <span className="capitalize font-medium">{color}</span>
                    {themeConfig.colorScheme === color && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{colorSchemeDescriptions[color]}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          
          {themeConfig.colorScheme === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 bg-gray-800/30 p-4 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex space-x-2">
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
                  <div 
                    className="h-9 w-9 rounded border border-gray-600"
                    style={{ backgroundColor: themeConfig.customColors?.primary || '#3b82f6' }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex space-x-2">
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
                  <div 
                    className="h-9 w-9 rounded border border-gray-600"
                    style={{ backgroundColor: themeConfig.customColors?.secondary || '#8b5cf6' }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <div className="flex space-x-2">
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
                  <div 
                    className="h-9 w-9 rounded border border-gray-600"
                    style={{ backgroundColor: themeConfig.customColors?.accent || '#22c55e' }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Background</h3>
          <div className="space-y-2">
            <Label htmlFor="background-color">Background Color</Label>
            <div className="flex space-x-4">
              <Input
                id="background-color"
                type="color"
                value={themeConfig.backgroundColor}
                onChange={handleBackgroundChange}
              />
              <div 
                className="flex-grow h-16 rounded-lg mt-2 border border-gray-700 flex items-center justify-center"
                style={{ backgroundColor: themeConfig.backgroundColor }}
              >
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-sm">
                  Preview Background
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StyleSelector;
