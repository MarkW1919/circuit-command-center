
import { AnimatableEquipment } from '@/types';

// Button type classes
export const buttonTypeClasses = {
  round: 'rounded-full',
  rectangular: 'rounded-md',
  oval: 'rounded-full aspect-[1.5/1]',
  flip: 'rounded-md'
};

// Size classes mapping
export const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-24 w-24'
};

// Icon sizes mapping
export const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32
};

// Human-readable style descriptions
export const getStyleDescription = (buttonStyle: string): string => {
  switch (buttonStyle) {
    case 'metal': return 'Brushed metal finish with reflective surface';
    case 'carbon': return 'Carbon fiber texture with woven pattern';
    case 'rubber': return 'Rubber-coated with matte tactile finish';
    case 'glass': return 'Transparent glass effect with subtle reflection';
    case 'military': return 'Industrial-grade with rugged construction';
    case 'glossy': return 'High-gloss shiny finish with light reflection';
    default: return '';
  }
};

// Button style-specific classes and effects
export const getStyleClasses = (buttonStyle: string): string => {
  switch (buttonStyle) {
    case 'metal':
      return 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-400 border border-gray-500';
    case 'carbon':
      return 'bg-black bg-opacity-90 border border-gray-800 before:content-[""] before:absolute before:inset-0 before:bg-[url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23222222\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 5v1H0V0h5z\' /%3E%3Cpath d=\'M6 5v1H5L0 1V0h1l5 5z\' /%3E%3C/g%3E%3C/svg%3E")] before:opacity-20';
    case 'rubber':
      return 'bg-black bg-opacity-80 border-2 border-gray-800 shadow-inner';
    case 'glass':
      return 'bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 shadow-inner';
    case 'military':
      return 'bg-gradient-to-b from-gray-700 to-gray-900 border-2 border-yellow-600 shadow-md';
    case 'glossy':
    default:
      return 'glossy-switch';
  }
};

// State-specific classes
export const getStateClasses = (state: string): string => {
  switch (state) {
    case 'active':
      return 'ring-2 ring-white ring-opacity-60 scale-[0.98]';
    case 'pressed':
      return 'scale-[0.95] shadow-inner brightness-90';
    case 'disabled':
      return 'opacity-50 cursor-not-allowed';
    default:
      return '';
  }
};

// Helper to check if equipment type can be animated
export const isAnimatableEquipment = (type: string): type is AnimatableEquipment => {
  return ['fan', 'winch', 'pump', 'led', 'compressor', 'light', 'heater'].includes(type.toLowerCase());
};

// Winch specific configurations
export const isWinchType = (type: string): boolean => {
  return type.toLowerCase() === 'winch';
};
