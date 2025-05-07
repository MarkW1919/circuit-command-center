
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Settings, Save, LayoutGrid, Grid3X3, Palette, HelpCircle, Info, CheckCircle, ArrowRight } from 'lucide-react';
import CustomizableDashboard from '@/components/customize/CustomizableDashboard';
import StyleSelector from '@/components/customize/StyleSelector';
import PatternEditor from '@/components/customize/PatternEditor';
import { useCustomize } from '@/contexts/CustomizeContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const CustomizePage = () => {
  const { saveLayout } = useCustomize();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showDemo, setShowDemo] = useState(true);

  // Check if this is the first time the user is visiting this page
  useEffect(() => {
    const hasVisited = localStorage.getItem('customizeVisited');
    if (hasVisited) {
      setShowOnboarding(false);
    }
  }, []);

  const handleSaveLayout = () => {
    saveLayout();
    toast({
      title: "Layout saved",
      description: "Your custom layout has been saved successfully.",
      variant: "default",
    });
  };
  
  const completeOnboarding = () => {
    localStorage.setItem('customizeVisited', 'true');
    setShowOnboarding(false);
  };
  
  const handleDismissDemo = () => {
    setShowDemo(false);
    localStorage.setItem('customize_page_demo_seen', 'true');
    toast({
      title: "Demo dismissed",
      description: "You can always bring it back from the settings panel.",
      variant: "default"
    });
  };

  const onboardingSteps = [
    {
      title: "Welcome to Customization",
      description: "Personalize your control panel exactly the way you want it. Follow these quick steps to get started.",
      icon: <Info className="h-12 w-12 text-blue-400" />,
    },
    {
      title: "Dashboard Layout",
      description: "Add, move, and resize widgets on your dashboard to create your perfect control panel layout.",
      icon: <LayoutGrid className="h-12 w-12 text-green-400" />,
    },
    {
      title: "Visual Styles",
      description: "Choose control styles, colors, and themes that match your preferences or equipment type.",
      icon: <Palette className="h-12 w-12 text-purple-400" />,
    },
    {
      title: "Pattern Banks",
      description: "Set up groups of controls that can be activated together with a single tap.",
      icon: <Grid3X3 className="h-12 w-12 text-amber-400" />,
    },
  ];

  if (showOnboarding) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto mt-8">
          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                {onboardingSteps[onboardingStep].icon}
                <span className="ml-4">{onboardingSteps[onboardingStep].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">{onboardingSteps[onboardingStep].description}</p>
              
              {onboardingStep === 0 && (
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                  <p>Here's what you can customize:</p>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <p>Add, resize, and arrange control widgets on your dashboard</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <p>Choose from different switch styles, colors, and themes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <p>Create pattern banks to group controls together</p>
                  </div>
                </div>
              )}
              
              {onboardingStep === 3 && (
                <Alert className="bg-green-900/20 border-green-500/30">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-sm text-gray-300">
                    All your customizations are automatically saved to your device. You can make changes anytime.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Progress value={((onboardingStep + 1) / onboardingSteps.length) * 100} className="w-full" />
              <div className="flex justify-between w-full">
                <Button 
                  variant="outline" 
                  onClick={() => onboardingStep > 0 ? setOnboardingStep(onboardingStep - 1) : completeOnboarding()}
                >
                  {onboardingStep > 0 ? "Back" : "Skip Tour"}
                </Button>
                <Button 
                  onClick={() => onboardingStep < onboardingSteps.length - 1 ? setOnboardingStep(onboardingStep + 1) : completeOnboarding()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {onboardingStep < onboardingSteps.length - 1 ? (
                    <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
                  ) : "Get Started"}
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
                    <TabsTrigger value="dashboard" className="flex items-center">
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
                    <TabsTrigger value="styles" className="flex items-center">
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
                    <TabsTrigger value="patterns" className="flex items-center">
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
