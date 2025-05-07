
import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useCustomize, WidgetPosition } from '@/contexts/CustomizeContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Move, Info } from 'lucide-react';
import DraggableWidget from './DraggableWidget';
import { toast } from '@/components/ui/use-toast';
import { useApp } from '@/contexts/app';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CustomizableDashboard = () => {
  const { widgets, addWidget, moveWidget } = useCustomize();
  const { switches } = useApp();
  const [selectedType, setSelectedType] = useState<'switch' | 'meter' | 'status' | 'chart'>('switch');
  const gridRef = useRef<HTMLDivElement>(null);
  const [showHelp, setShowHelp] = useState(true);

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
      width: 2,
      height: 2,
      type: selectedType,
      config: {}
    };
    
    addWidget(newWidget);
    toast({
      title: "Widget added",
      description: `New ${selectedType} widget has been added to your dashboard.`,
    });
  };

  const getWidgetTypeDescription = () => {
    switch (selectedType) {
      case 'switch': return 'Control switches with various styles';
      case 'meter': return 'Display gauges and meters for values';
      case 'status': return 'Show system status indicators';
      case 'chart': return 'Visualize data with charts';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {showHelp && (
        <Alert className="bg-gray-800 border-amber-500/50">
          <Info className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-sm text-gray-300">
            <strong>How to use:</strong> Select a widget type, add it to your dashboard, then drag to position. 
            Resize widgets by dragging from the bottom-right corner. Click on a widget to edit its properties.
            <Button variant="link" size="sm" onClick={() => setShowHelp(false)} className="ml-2 text-amber-400 p-0">
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-grow max-w-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Select
                  value={selectedType}
                  onValueChange={(value) => setSelectedType(value as any)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Widget Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="switch">Switch Controls</SelectItem>
                    <SelectItem value="meter">Meters & Gauges</SelectItem>
                    <SelectItem value="status">Status Indicators</SelectItem>
                    <SelectItem value="chart">Charts & Graphs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getWidgetTypeDescription()}</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-xs text-muted-foreground mt-1">{getWidgetTypeDescription()}</p>
        </div>
        
        <Button onClick={handleAddWidget} className="bg-green-600 hover:bg-green-700 text-white">
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
              <div className="text-center text-gray-400 max-w-md p-6 bg-gray-800/40 rounded-lg">
                <Move className="mx-auto h-12 w-12 mb-4 opacity-20" />
                <p className="text-lg font-medium">Your dashboard is empty</p>
                <p className="text-sm mt-2">Start by adding widgets using the controls above.</p>
                <ul className="text-sm mt-4 text-left list-disc pl-5 space-y-1">
                  <li>Add switches to control your system</li>
                  <li>Add meters to monitor values</li>
                  <li>Add status indicators to show system state</li>
                  <li>Add charts to visualize data over time</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Grid helpers */}
        {widgets.length > 0 && isOver && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-blue-500/10 h-full"></div>
              ))}
            </div>
            <div className="grid grid-rows-12 w-full absolute inset-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-b border-blue-500/10 w-full"></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizableDashboard;
