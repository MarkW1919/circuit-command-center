
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Settings, Save, LayoutGrid, Grid3X3, Palette } from 'lucide-react';
import CustomizableDashboard from '@/components/customize/CustomizableDashboard';
import StyleSelector from '@/components/customize/StyleSelector';
import PatternEditor from '@/components/customize/PatternEditor';
import { useCustomize } from '@/contexts/CustomizeContext';

const CustomizePage = () => {
  const { saveLayout } = useCustomize();
  const { toast } = useToast();

  const handleSaveLayout = () => {
    saveLayout();
    toast({
      title: "Layout saved",
      description: "Your custom layout has been saved successfully.",
    });
  };

  return (
    <MainLayout>
      <DndProvider backend={HTML5Backend}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Customize Interface</h2>
            <Button 
              onClick={handleSaveLayout} 
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Layout
            </Button>
          </div>
          
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="dashboard">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Dashboard Layout
              </TabsTrigger>
              <TabsTrigger value="styles">
                <Palette className="mr-2 h-4 w-4" />
                Styles & Themes
              </TabsTrigger>
              <TabsTrigger value="patterns">
                <Grid3X3 className="mr-2 h-4 w-4" />
                Pattern Banks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Customization</CardTitle>
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
                </CardHeader>
                <CardContent>
                  <PatternEditor />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DndProvider>
    </MainLayout>
  );
};

export default CustomizePage;
