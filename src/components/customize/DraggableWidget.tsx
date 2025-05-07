
import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useCustomize, WidgetPosition } from '@/contexts/CustomizeContext';
import { X, GripVertical, ArrowsUpFromLine, MoveHorizontal, MoveVertical, Move } from 'lucide-react';
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
  const [highlightResize, setHighlightResize] = useState<'none' | 'right' | 'bottom' | 'corner'>('none');

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
    setHighlightResize(direction);
    
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
      setHighlightResize('none');
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

  // Get widget type label for the title
  const getWidgetTypeLabel = () => {
    switch (widget.type) {
      case 'switch': return 'Switch Controls';
      case 'meter': return 'Meter Widget';
      case 'status': return 'Status Widget';
      case 'chart': return 'Chart Widget';
      default: return 'Widget';
    }
  };

  return (
    <div
      ref={(node) => {
        ref.current = node;
        drag(node);
      }}
      className={cn(
        "relative bg-gray-800 border border-gray-700 rounded-lg p-3 transition-all",
        isDragging && "opacity-50 border-blue-500 border-2 shadow-lg",
        isResizing && "border-green-500 border-2",
        "cursor-move"
      )}
      style={gridStyle}
    >
      {/* Widget header */}
      <div className="absolute top-0 left-0 right-0 bg-gray-900/80 p-1 px-2 flex items-center justify-between rounded-t-lg z-10">
        <div className="flex items-center">
          <GripVertical size={14} className="text-gray-400 mr-2" />
          <span className="text-xs font-medium text-gray-300">{getWidgetTypeLabel()}</span>
        </div>
        <button
          onClick={() => removeWidget(widget.id)}
          className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-700/50"
          aria-label="Remove widget"
        >
          <X size={14} />
        </button>
      </div>
      
      <div className="pt-8">
        {renderWidget()}
      </div>
      
      {/* Resize indicators - more visible and user-friendly */}
      <div 
        className={cn(
          "absolute bottom-1 right-1 w-6 h-6 cursor-se-resize flex items-center justify-center",
          highlightResize === 'corner' && "bg-green-500/30 rounded-full"
        )}
        onMouseDown={(e) => handleResize(e, 'corner')}
        onMouseEnter={() => setHighlightResize('corner')}
        onMouseLeave={() => !isResizing && setHighlightResize('none')}
      >
        <ArrowsUpFromLine size={14} className={cn("rotate-180", highlightResize === 'corner' ? "text-white" : "text-gray-400")} />
      </div>
      
      <div 
        className={cn(
          "absolute bottom-1 left-12 right-12 h-4 cursor-s-resize flex items-center justify-center",
          highlightResize === 'bottom' && "bg-green-500/30"
        )}
        onMouseDown={(e) => handleResize(e, 'bottom')}
        onMouseEnter={() => setHighlightResize('bottom')}
        onMouseLeave={() => !isResizing && setHighlightResize('none')}
      >
        <MoveVertical size={14} className={cn(highlightResize === 'bottom' ? "text-white" : "text-gray-400")} />
      </div>
      
      <div 
        className={cn(
          "absolute top-12 bottom-12 right-1 w-4 cursor-e-resize flex items-center justify-center",
          highlightResize === 'right' && "bg-green-500/30"
        )}
        onMouseDown={(e) => handleResize(e, 'right')}
        onMouseEnter={() => setHighlightResize('right')}
        onMouseLeave={() => !isResizing && setHighlightResize('none')}
      >
        <MoveHorizontal size={14} className={cn(highlightResize === 'right' ? "text-white" : "text-gray-400")} />
      </div>
      
      {/* Overlay when dragging to indicate draggable */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center rounded-lg">
          <Move className="h-8 w-8 text-blue-300" />
        </div>
      )}
    </div>
  );
};

export default DraggableWidget;
