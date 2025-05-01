
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Move, Trash2 } from 'lucide-react';
import { ButtonActionType, ButtonLayoutType, CustomButtonConfig } from './ButtonCustomizer';
import CustomIconButton from './CustomIconButton';
import ButtonEditor from './ButtonEditor';
import { toast } from '@/components/ui/use-toast';
import { useDrag, useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';

interface ButtonLayoutEditorProps {
  layoutType: ButtonLayoutType;
}

const ButtonLayoutEditor: React.FC<ButtonLayoutEditorProps> = ({ layoutType }) => {
  const [buttons, setButtons] = useState<CustomButtonConfig[]>([]);
  const [editingButton, setEditingButton] = useState<CustomButtonConfig | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  const handleAddButton = () => {
    const newButton: CustomButtonConfig = {
      id: `button-${Date.now()}`,
      label: 'New Button',
      icon: 'power',
      actionType: 'toggle',
      commandId: '',
      position: { x: 0, y: 0 }
    };
    
    setButtons([...buttons, newButton]);
    setEditingButton(newButton);
    setIsEditorOpen(true);
  };
  
  const handleUpdateButton = (updatedButton: CustomButtonConfig) => {
    setButtons(buttons.map(btn => 
      btn.id === updatedButton.id ? updatedButton : btn
    ));
    setIsEditorOpen(false);
    
    toast({
      title: "Button updated",
      description: "Your button configuration has been saved.",
    });
  };
  
  const handleDeleteButton = (buttonId: string) => {
    setButtons(buttons.filter(btn => btn.id !== buttonId));
    setIsEditorOpen(false);
    
    toast({
      title: "Button deleted",
      description: "The button has been removed from your layout.",
    });
  };
  
  const handleEditButton = (button: CustomButtonConfig) => {
    setEditingButton(button);
    setIsEditorOpen(true);
  };
  
  const moveButton = (dragIndex: number, hoverIndex: number) => {
    const draggedButton = buttons[dragIndex];
    const newButtons = [...buttons];
    newButtons.splice(dragIndex, 1);
    newButtons.splice(hoverIndex, 0, draggedButton);
    setButtons(newButtons);
  };

  const getLayoutClassNames = () => {
    switch (layoutType) {
      case 'grid':
        return 'grid grid-cols-2 sm:grid-cols-4 gap-4';
      case 'leftRight':
        return 'flex flex-col sm:flex-row gap-4 justify-around';
      case 'column':
        return 'flex flex-col gap-4 items-center';
      default:
        return 'grid grid-cols-2 sm:grid-cols-4 gap-4';
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <div className={cn("bg-gray-900 rounded-lg p-6 min-h-[200px]", getLayoutClassNames())}>
          {buttons.length > 0 ? (
            buttons.map((button, index) => (
              <DraggableButton 
                key={button.id}
                index={index}
                button={button}
                onEdit={() => handleEditButton(button)}
                moveButton={moveButton}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-400 h-40">
              <Move className="h-8 w-8 mb-2 opacity-50" />
              <p>No buttons yet</p>
              <p className="text-xs">Add buttons and drag to arrange</p>
            </div>
          )}
        </div>
        
        <Button variant="outline" onClick={handleAddButton} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Button
        </Button>
        
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Configure Button</DialogTitle>
            </DialogHeader>
            {editingButton && (
              <ButtonEditor 
                button={editingButton}
                onSave={handleUpdateButton}
                onDelete={() => handleDeleteButton(editingButton.id)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
};

interface DraggableButtonProps {
  button: CustomButtonConfig;
  index: number;
  onEdit: () => void;
  moveButton: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableButton: React.FC<DraggableButtonProps> = ({ button, index, onEdit, moveButton }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'CUSTOM_BUTTON',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [, drop] = useDrop({
    accept: 'CUSTOM_BUTTON',
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;
      
      moveButton(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  
  drag(drop(ref));
  
  return (
    <div 
      ref={ref}
      className={cn("relative", isDragging ? "opacity-50" : "")}
      onClick={onEdit}
    >
      <CustomIconButton 
        label={button.label}
        icon={button.icon}
        color={button.color}
        glowEffect={button.glowEffect}
      />
      <div className="absolute inset-0 cursor-move opacity-0 hover:opacity-100 bg-black/30 rounded-full flex items-center justify-center">
        <Move className="text-white h-8 w-8" />
      </div>
    </div>
  );
};

export default ButtonLayoutEditor;
