
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, HelpCircle, Check, ArrowRight, Lightbulb } from 'lucide-react';
import ButtonCustomizer from '@/components/customize/ButtonCustomizer';
import { useCustomize } from '@/contexts/CustomizeContext';
import { useToast } from '@/components/ui/use-toast';
import CustomIconButton from '@/components/customize/CustomIconButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const ButtonCustomizePage = () => {
  const { saveLayout } = useCustomize();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('customize');
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  
  // Check if user has seen the tutorial before
  useEffect(() => {
    const hasSeen = localStorage.getItem('buttonCustomizeSeen');
    if (!hasSeen) {
      setShowTutorial(true);
    }
  }, []);
  
  const handleSaveLayout = () => {
    saveLayout();
    toast({
      title: "Button layout saved",
      description: "Your custom button layout has been saved successfully.",
      variant: "success",
    });
  };

  const completeTutorial = () => {
    localStorage.setItem('buttonCustomizeSeen', 'true');
    setShowTutorial(false);
  };
  
  const tutorialSteps = [
    {
      title: "Design Custom Control Buttons",
      description: "Create beautiful, functional control buttons that match your specific needs.",
      tips: ["Select button styles that match your device or vehicle type", 
             "Use colors that are easy to distinguish", 
             "Add clear labels so controls are easy to identify"]
    },
    {
      title: "Choose Icons and Colors",
      description: "Pick from a wide range of icons and colors to create visually distinct controls.",
      tips: ["Use consistent icons for similar functions", 
             "Select contrasting colors for important controls",
             "Consider using glow effects for critical functions"]
    },
    {
      title: "Arrange Your Layout",
      description: "Group related buttons together in an intuitive layout for easy access.",
      tips: ["Place frequently used controls in easy-to-reach positions",
             "Group related functions together",
             "Use a grid layout for organized, consistent spacing"]
    }
  ];
  
  if (showTutorial) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto mt-8">
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Lightbulb className="h-8 w-8 text-purple-400 mr-4" />
                {tutorialSteps[tutorialStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg">{tutorialSteps[tutorialStep].description}</p>
              
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-300 mb-2">DESIGN TIPS:</h3>
                <ul className="space-y-2">
                  {tutorialSteps[tutorialStep].tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-center space-x-4">
                {tutorialStep === 1 && (
                  <>
                    <CustomIconButton
                      label="Light" 
                      icon="lightbulb" 
                      color="#3b82f6"
                      glowEffect={true}
                      size="sm"
                    />
                    <CustomIconButton
                      label="Fan"
                      icon="fan"
                      color="#22c55e"
                      size="sm"
                    />
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Progress value={((tutorialStep + 1) / tutorialSteps.length) * 100} className="w-full" />
              <div className="flex justify-between w-full">
                <Button 
                  variant="outline" 
                  onClick={() => tutorialStep > 0 ? setTutorialStep(tutorialStep - 1) : completeTutorial()}
                >
                  {tutorialStep > 0 ? "Back" : "Skip Tutorial"}
                </Button>
                <Button 
                  onClick={() => tutorialStep < tutorialSteps.length - 1 ? setTutorialStep(tutorialStep + 1) : completeTutorial()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {tutorialStep < tutorialSteps.length - 1 ? (
                    <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
                  ) : "Start Customizing"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
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
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Controls Preview</CardTitle>
                  <CardDescription>
                    See how your custom buttons will appear in your control interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
                    <h3 className="text-sm font-medium text-gray-400 mb-4">CONTROL PANEL</h3>
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
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">About Button States</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2 text-center">
                        <CustomIconButton
                          label="Default"
                          icon="power"
                          size="sm"
                        />
                        <p className="text-xs text-gray-400">Standard state</p>
                      </div>
                      <div className="space-y-2 text-center">
                        <CustomIconButton
                          label="Active"
                          icon="power"
                          state="active"
                          size="sm"
                          color="#22c55e"
                        />
                        <p className="text-xs text-gray-400">Currently on/enabled</p>
                      </div>
                      <div className="space-y-2 text-center">
                        <CustomIconButton
                          label="Pressed"
                          icon="power"
                          state="pressed"
                          size="sm"
                          color="#3b82f6"
                        />
                        <p className="text-xs text-gray-400">Being pressed</p>
                      </div>
                      <div className="space-y-2 text-center">
                        <CustomIconButton
                          label="Disabled"
                          icon="power"
                          state="disabled"
                          size="sm"
                        />
                        <p className="text-xs text-gray-400">Cannot be used</p>
                      </div>
                    </div>
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
