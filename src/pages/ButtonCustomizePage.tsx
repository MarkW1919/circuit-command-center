
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, HelpCircle } from 'lucide-react';
import ButtonCustomizer from '@/components/customize/ButtonCustomizer';
import { useCustomize } from '@/contexts/CustomizeContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import ButtonPreview from '@/components/customize/ButtonPreview';
import ButtonTutorial from '@/components/customize/ButtonTutorial';
import { useButtonTutorial } from '@/hooks/useButtonTutorial';
import AnimatedButtonsDemo from '@/components/customize/AnimatedButtonsDemo';

const ButtonCustomizePage = () => {
  const { saveLayout } = useCustomize();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('customize');
  const [showDemo, setShowDemo] = useState(false);
  
  const {
    showTutorial,
    tutorialStep,
    setTutorialStep,
    completeTutorial,
    tutorialSteps
  } = useButtonTutorial();

  const handleSaveLayout = () => {
    saveLayout();
    toast({
      title: "Button layout saved",
      description: "Your custom button layout has been saved successfully.",
      variant: "default",
    });
  };
  
  const handleDismissDemo = () => {
    setShowDemo(false);
  };
  
  if (showTutorial) {
    return (
      <MainLayout>
        <ButtonTutorial 
          tutorialStep={tutorialStep}
          tutorialSteps={tutorialSteps}
          setTutorialStep={setTutorialStep}
          completeTutorial={completeTutorial}
        />
      </MainLayout>
    );
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Button Customizer</h1>
      
      {/* Demo section */}
      {showDemo && (
        <div className="mb-6">
          <AnimatedButtonsDemo />
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" onClick={handleDismissDemo}>
              Dismiss Demo
            </Button>
          </div>
        </div>
      )}
      
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
              Customize your control buttons by selecting styles, colors, and icons. Switch to the Live Preview tab to see how your buttons will look in the interface.
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
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Custom Button Configuration</CardTitle>
                      <CardDescription>
                        Design your control buttons by selecting style, color, shape, and behavior
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-600">New Features</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ButtonCustomizer />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              <ButtonPreview />
            </TabsContent>
          </Tabs>
        </div>
      </DndProvider>
    </div>
  );
};

export default ButtonCustomizePage;
