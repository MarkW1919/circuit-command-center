
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Settings, Save, LayoutGrid, Grid3X3, Palette, HelpCircle } from 'lucide-react';
import CustomizableDashboard from '@/components/customize/CustomizableDashboard';
import StyleSelector from '@/components/customize/StyleSelector';
import PatternEditor from '@/components/customize/PatternEditor';
import { useCustomize } from '@/contexts/CustomizeContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CustomizePage = () => {
  const { saveLayout } = useCustomize();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleSaveLayout = () => {
    saveLayout();
    toast({
      title: "Layout saved",
      description: "Your custom layout has been saved successfully.",
    });
  };

  return (
    <MainLayout>
      <TooltipProvider>
        <DndProvider backend={HTML5Backend}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Customize Interface</h2>
                <p className="text-muted-foreground">Design your own control panel by customizing layout, styles, and patterns</p>
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={handleSaveLayout} 
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Layout
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save your customizations to keep them after refreshing</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6 flex items-center space-x-3 border border-blue-500/30">
              <HelpCircle className="text-blue-400 h-6 w-6 flex-shrink-0" />
              <p className="text-sm text-gray-200">
                Welcome to the customization panel. Use the tabs below to customize your dashboard layout, 
                choose your preferred visual styles, or create pattern banks for quick control.
              </p>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="dashboard">
                      <LayoutGrid className="mr-2 h-4 w-4" />
                      Dashboard Layout
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add and arrange widgets on your dashboard</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="styles">
                      <Palette className="mr-2 h-4 w-4" />
                      Styles & Themes
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose control styles and color schemes</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="patterns">
                      <Grid3X3 className="mr-2 h-4 w-4" />
                      Pattern Banks
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create and manage control patterns</p>
                  </TooltipContent>
                </Tooltip>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard Customization</CardTitle>
                    <CardDescription>
                      Add widgets to your dashboard and drag them to position. Resize widgets by dragging from the bottom-right corner.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomizableDashboard />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="styles" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Choose your preferred control styles, color schemes, and background colors.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StyleSelector />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="patterns" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pattern Banks</CardTitle>
                    <CardDescription>
                      Create and manage pattern banks to quickly activate groups of controls.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PatternEditor />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DndProvider>
      </TooltipProvider>
    </MainLayout>
  );
};

export default CustomizePage;
