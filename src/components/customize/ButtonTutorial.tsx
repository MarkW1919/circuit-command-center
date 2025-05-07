
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Check, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import CustomIconButton from '@/components/customize/CustomIconButton';

interface TutorialStep {
  title: string;
  description: string;
  tips: string[];
}

interface ButtonTutorialProps {
  tutorialStep: number;
  tutorialSteps: TutorialStep[];
  setTutorialStep: (step: number) => void;
  completeTutorial: () => void;
}

const ButtonTutorial = ({ 
  tutorialStep, 
  tutorialSteps, 
  setTutorialStep, 
  completeTutorial 
}: ButtonTutorialProps) => {
  return (
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
  );
};

export default ButtonTutorial;
