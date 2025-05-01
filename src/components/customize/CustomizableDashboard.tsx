
import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useCustomize, WidgetPosition } from '@/contexts/CustomizeContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Move } from 'lucide-react';
import DraggableWidget from './DraggableWidget';
import { toast } from '@/components/ui/use-toast';
import { useApp } from '@/contexts/app';

const CustomizableDashboard = () => {
  const { widgets, addWidget, moveWidget } = useCustomize();
  const { switches } = useApp();
  const [selectedType, setSelectedType] = useState<'switch' | 'meter' | 'status' | 'chart'>('switch');
  const gridRef = useRef<HTMLDivElement>(null);

  // Calculate grid position from mouse coordinates
  const getGridPosition = (x: number, y: number) => {
    if (!gridRef.current) return { gridX: 0, gridY: 0 };
    
    const rect = gridRef.current.getBoundingClientRect();
    const gridWidth = rect.width;
    const gridHeight = rect.height;
    
    // Calculate grid position (12x12 grid)
    const gridX = Math.floor((12 * (x - rect.left)) / gridWidth);
    const gridY = Math.floor((12 * (y - rect.top)) / gridHeight);
    
    // Clamp values to grid boundaries
    return {
      gridX: Math.max(0, Math.min(gridX, 11)),
      gridY: Math.max(0, Math.min(gridY, 11))
    };
  };

  // Set up drop target
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'WIDGET',
    drop: (item: { id: string }, monitor) => {
      const { gridX, gridY } = getGridPosition(
        monitor.getClientOffset()?.x || 0,
        monitor.getClientOffset()?.y || 0
      );
      moveWidget(item.id, gridX, gridY);
      
      toast({
        title: "Widget moved",
        description: `Widget has been moved to position (${gridX}, ${gridY})`,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Handle adding a new widget
  const handleAddWidget = () => {
    // Default position for new widget
    const newWidget = {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      type: selectedType,
      config: {}
    };
    
    addWidget(newWidget);
    toast({
      title: "Widget added",
      description: `New ${selectedType} widget has been added to your dashboard.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Select
          value={selectedType}
          onValueChange={(value) => setSelectedType(value as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Widget Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="switch">Switch</SelectItem>
            <SelectItem value="meter">Meter</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="chart">Chart</SelectItem>
          </SelectContent>
        </Select>
        
        <Button onClick={handleAddWidget}>
          <Plus className="mr-2 h-4 w-4" />
          Add Widget
        </Button>
      </div>

      <div 
        className="bg-gray-900 border border-gray-800 rounded-lg h-[600px] relative p-4 overflow-hidden"
        ref={node => {
          gridRef.current = node;
          drop(node);
        }}
      >
        <div className={`grid grid-cols-12 h-full gap-2 bg-opacity-50 bg-gray-800/20 ${isOver ? 'border-2 border-dashed border-blue-500' : ''}`}>
          {widgets.map((widget) => (
            <DraggableWidget key={widget.id} widget={widget} />
          ))}
          
          {widgets.length === 0 && (
            <div className="col-span-12 flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <Move className="mx-auto h-12 w-12 mb-4 opacity-20" />
                <p className="text-lg font-medium">Your dashboard is empty</p>
                <p className="text-sm">Add widgets using the control above and drag them to position</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizableDashboard;
