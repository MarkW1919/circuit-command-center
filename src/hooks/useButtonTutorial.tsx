
import { useState, useEffect } from 'react';

export interface TutorialStep {
  title: string;
  description: string;
  tips: string[];
}

export const useButtonTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const completeTutorial = () => {
    localStorage.setItem('buttonCustomizeSeen', 'true');
    setShowTutorial(false);
  };

  // Check if user has seen the tutorial before
  useEffect(() => {
    const hasSeen = localStorage.getItem('buttonCustomizeSeen');
    if (!hasSeen) {
      setShowTutorial(true);
    }
  }, []);

  const tutorialSteps: TutorialStep[] = [
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

  return {
    showTutorial,
    tutorialStep,
    setTutorialStep,
    completeTutorial,
    tutorialSteps
  };
};
