
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useCustomize, WidgetPosition } from '@/contexts/CustomizeContext';
import { X, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import CustomSwitch from './widgets/CustomSwitch';
import CustomMeter from './widgets/CustomMeter';
import CustomStatus from './widgets/CustomStatus';
import CustomChart from './widgets/CustomChart';

interface DraggableWidgetProps {
  widget: WidgetPosition;
}

const DraggableWidget = ({ widget }: DraggableWidgetProps) => {
  const { moveWidget, removeWidget } = useCustomize();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'WIDGET',
    item: { id: widget.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse button
      // Calculate grid position based on mouse position
      const gridElement = ref.current?.parentElement;
      if (gridElement) {
        const rect = gridElement.getBoundingClientRect();
        const x = Math.floor(12 * (e.clientX - rect.left) / rect.width);
        const y = Math.floor(12 * (e.clientY - rect.top) / rect.height);
        
        // Ensure position is within bounds
        const boundedX = Math.max(0, Math.min(x, 11));
        const boundedY = Math.max(0, Math.min(y, 11));
        
        moveWidget(widget.id, boundedX, boundedY);
      }
    }
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
        isDragging && "opacity-50",
        "cursor-move"
      )}
      style={gridStyle}
      onMouseMove={handleMouseMove}
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
    </div>
  );
};

export default DraggableWidget;
