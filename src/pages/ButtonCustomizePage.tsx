
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import ButtonCustomizer from '@/components/customize/ButtonCustomizer';
import { useCustomize } from '@/contexts/CustomizeContext';
import { useToast } from '@/components/ui/use-toast';

const ButtonCustomizePage = () => {
  const { saveLayout } = useCustomize();
  const { toast } = useToast();
  
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
            <h2 className="text-2xl font-semibold">Button Customization</h2>
            <Button 
              onClick={handleSaveLayout} 
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Layout
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Custom Button Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <ButtonCustomizer />
            </CardContent>
          </Card>
        </div>
      </DndProvider>
    </MainLayout>
  );
};

export default ButtonCustomizePage;
