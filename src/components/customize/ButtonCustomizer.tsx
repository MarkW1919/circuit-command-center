
import React, { useState } from 'react';
import { useCustomize } from '@/contexts/CustomizeContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Grid2X2, LayoutPanelLeft, LayoutPanelTop, Upload, Check, Image as ImageIcon } from 'lucide-react';
import IconSelector from './IconSelector';
import ButtonLayoutEditor from './ButtonLayoutEditor';
import { toast } from '@/components/ui/use-toast';

export type ButtonActionType = 'toggle' | 'momentary' | 'linked';
export type ButtonLayoutType = 'grid' | 'leftRight' | 'column';

export interface CustomButtonConfig {
  id: string;
  label: string;
  icon: string;
  actionType: ButtonActionType;
  commandId: string;
  position: { x: number; y: number };
  color?: string;
  glowEffect?: boolean;
}

const ButtonCustomizer = () => {
  const { addWidget, saveLayout } = useCustomize();
  const [activeTab, setActiveTab] = useState('layout');
  const [selectedLayout, setSelectedLayout] = useState<ButtonLayoutType>('grid');
  
  const handleAddButtonLayout = () => {
    // Add a new button layout widget to the dashboard
    addWidget({
      x: 0,
      y: 0,
      width: 4,
      height: 4,
      type: 'chart', // We'll reuse the chart type for now, but could create a custom button layout type
      config: {
        layout: selectedLayout,
        buttons: []
      }
    });
    
    toast({
      title: "Button layout added",
      description: "Your custom button layout has been added to the dashboard.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="layout">Layout Options</TabsTrigger>
          <TabsTrigger value="icons">Button Icons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Button Layout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Layout Style</Label>
                <ToggleGroup type="single" value={selectedLayout} onValueChange={(value) => value && setSelectedLayout(value as ButtonLayoutType)} className="grid grid-cols-3 gap-2">
                  <ToggleGroupItem value="grid" className="flex flex-col items-center p-3">
                    <Grid2X2 className="h-8 w-8 mb-1" />
                    <span className="text-xs">Grid</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="leftRight" className="flex flex-col items-center p-3">
                    <LayoutPanelLeft className="h-8 w-8 mb-1" />
                    <span className="text-xs">Left/Right</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="column" className="flex flex-col items-center p-3">
                    <LayoutPanelTop className="h-8 w-8 mb-1" />
                    <span className="text-xs">Column</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <ButtonLayoutEditor layoutType={selectedLayout} />
              
              <Button onClick={handleAddButtonLayout} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Button Layout to Dashboard
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="icons">
          <Card>
            <CardHeader>
              <CardTitle>Button Icons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <IconSelector />
              
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Upload your custom icon</p>
                <p className="text-xs text-gray-400">PNG, SVG (max 1MB)</p>
                <Button variant="outline" className="mt-2">
                  Select File
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ButtonCustomizer;
