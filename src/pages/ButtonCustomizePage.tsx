
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, HelpCircle } from 'lucide-react';
import ButtonCustomizer from '@/components/customize/ButtonCustomizer';
import { useCustomize } from '@/contexts/CustomizeContext';
import { useToast } from '@/components/ui/use-toast';
import CustomIconButton from '@/components/customize/CustomIconButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from "@/components/ui/alert";

const ButtonCustomizePage = () => {
  const { saveLayout } = useCustomize();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('customize');
  
  const handleSaveLayout = () => {
    saveLayout();
    toast({
      title: "Button layout saved",
      description: "Your custom button layout has been saved successfully.",
    });
  };
  
  return (
    <MainLayout>
      <DndProvider backend={HTML5Backend}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Button Customization</h2>
              <p className="text-muted-foreground">Create and customize control buttons for your interface</p>
            </div>
            <Button 
              onClick={handleSaveLayout} 
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Layout
            </Button>
          </div>

          <Alert className="bg-gray-800 border-amber-500/50">
            <HelpCircle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-sm text-gray-300">
              Customize your control buttons by selecting styles, colors, and icons. View the live preview to see how your buttons will look in the interface.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="customize">Customize Buttons</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="customize" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Button Configuration</CardTitle>
                  <CardDescription>
                    Design your control buttons by selecting style, color, shape, and behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ButtonCustomizer />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Controls Preview</CardTitle>
                  <CardDescription>
                    Preview how your custom buttons will appear in your control interface
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <CustomIconButton
                      label="Fan"
                      icon="fan"
                      buttonStyle="glossy"
                      buttonType="round"
                      color="#3b82f6"
                      glowEffect={true}
                      state="active"
                      showTooltip={true}
                    />
                    <CustomIconButton
                      label="Lights"
                      icon="lightbulb"
                      buttonStyle="metal"
                      buttonType="round"
                      color="#6366f1"
                      showTooltip={true}
                    />
                    <CustomIconButton
                      label="Temperature"
                      icon="thermometer"
                      buttonStyle="carbon"
                      buttonType="rectangular"
                      color="#000000"
                      showTooltip={true}
                    />
                    <CustomIconButton
                      label="Dashboard"
                      icon="gauge"
                      buttonStyle="glass"
                      buttonType="oval"
                      glowEffect={true}
                      showTooltip={true}
                    />
                    <CustomIconButton
                      label="Ejector Seat"
                      icon="power"
                      buttonStyle="military"
                      buttonType="flip"
                      state="active"
                      color="#f43f5e"
                      showTooltip={true}
                    />
                    <CustomIconButton
                      label="Heater"
                      icon="thermometer"
                      buttonStyle="rubber"
                      buttonType="rectangular"
                      color="#212121"
                      showTooltip={true}
                    />
                    <CustomIconButton
                      label="Lock"
                      icon="lock"
                      buttonStyle="glossy"
                      buttonType="round"
                      color="#ef4444"
                      state="pressed"
                      showTooltip={true}
                    />
                    <CustomIconButton
                      label="Parking"
                      icon="car"
                      buttonStyle="glass"
                      buttonType="oval"
                      color="#22c55e"
                      state="disabled"
                      showTooltip={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DndProvider>
    </MainLayout>
  );
};

export default ButtonCustomizePage;
