
import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useCustomize, WidgetPosition } from '@/contexts/CustomizeContext';
import { X, GripVertical, ArrowsOutCardinal } from 'lucide-react';
import { cn } from '@/lib/utils';
import CustomSwitch from './widgets/CustomSwitch';
import CustomMeter from './widgets/CustomMeter';
import CustomStatus from './widgets/CustomStatus';
import CustomChart from './widgets/CustomChart';

interface DraggableWidgetProps {
  widget: WidgetPosition;
}

const DraggableWidget = ({ widget }: DraggableWidgetProps) => {
  const { moveWidget, removeWidget, resizeWidget } = useCustomize();
  const ref = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  // Set up drag functionality
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'WIDGET',
    item: { id: widget.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Handle resizing
  const handleResize = (e: React.MouseEvent, direction: 'right' | 'bottom' | 'corner') => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = widget.width;
    const startHeight = widget.height;
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      if (direction === 'right' || direction === 'corner') {
        // Calculate new width based on delta X (each grid unit is roughly 1/12 of container width)
        const gridElement = ref.current?.parentElement;
        if (gridElement) {
          const gridWidth = gridElement.getBoundingClientRect().width;
          const widthChange = Math.round((deltaX / gridWidth) * 12);
          const newWidth = Math.max(1, Math.min(startWidth + widthChange, 12));
          resizeWidget(widget.id, newWidth, widget.height);
        }
      }
      
      if (direction === 'bottom' || direction === 'corner') {
        // Calculate new height based on delta Y
        const gridElement = ref.current?.parentElement;
        if (gridElement) {
          const gridHeight = gridElement.getBoundingClientRect().height;
          const heightChange = Math.round((deltaY / gridHeight) * 12);
          const newHeight = Math.max(1, Math.min(startHeight + heightChange, 12));
          resizeWidget(widget.id, widget.width, newHeight);
        }
      }
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setIsResizing(false);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Render the appropriate widget based on type
  const renderWidget = () => {
    switch (widget.type) {
      case 'switch':
        return <CustomSwitch widget={widget} />;
      case 'meter':
        return <CustomMeter widget={widget} />;
      case 'status':
        return <CustomStatus widget={widget} />;
      case 'chart':
        return <CustomChart widget={widget} />;
      default:
        return <div>Unknown widget type</div>;
    }
  };

  // Calculate grid position styles
  const gridStyle = {
    gridColumn: `span ${widget.width} / span ${widget.width}`,
    gridRow: `span ${widget.height} / span ${widget.height}`,
    transform: `translate(${widget.x * 100}%, ${widget.y * 10}%)`,
  };

  return (
    <div
      ref={(node) => {
        ref.current = node;
        drag(node);
      }}
      className={cn(
        "relative bg-gray-800 border border-gray-700 rounded-lg p-3 transition-all",
        isDragging && "opacity-50 border-blue-500 border-2",
        isResizing && "border-green-500 border-2",
        "cursor-move"
      )}
      style={gridStyle}
    >
      <div className="absolute top-1 right-1 z-10">
        <button
          onClick={() => removeWidget(widget.id)}
          className="text-gray-400 hover:text-red-500 p-1"
        >
          <X size={14} />
        </button>
      </div>
      
      <div className="absolute top-1 left-1 z-10">
        <GripVertical size={14} className="text-gray-400" />
      </div>
      
      <div className="pt-5">
        {renderWidget()}
      </div>
      
      {/* Resize handles */}
      <div 
        className="absolute bottom-1 right-1 w-4 h-4 cursor-se-resize" 
        onMouseDown={(e) => handleResize(e, 'corner')}
      >
        <ArrowsOutCardinal size={14} className="text-gray-400" />
      </div>
      
      <div 
        className="absolute bottom-1 left-0 right-0 h-1 cursor-s-resize"
        onMouseDown={(e) => handleResize(e, 'bottom')}
      />
      
      <div 
        className="absolute top-0 bottom-0 right-1 w-1 cursor-e-resize"
        onMouseDown={(e) => handleResize(e, 'right')}
      />
    </div>
  );
};

export default DraggableWidget;
