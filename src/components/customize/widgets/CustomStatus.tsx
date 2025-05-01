
import React from 'react';
import { WidgetPosition } from '@/contexts/CustomizeContext';
import { useApp } from '@/contexts/app';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface CustomStatusProps {
  widget: WidgetPosition;
}

const CustomStatus = ({ widget }: CustomStatusProps) => {
  const { systemStatus } = useApp();
  const config = widget.config || {};
  const statusType = config.statusType || 'connection';
  
  const renderStatusContent = () => {
    switch (statusType) {
      case 'connection':
        return (
          <div className="flex items-center justify-center gap-2">
            {systemStatus.connected ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-500 font-medium">Connected</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <span className="text-amber-500 font-medium">Disconnected</span>
              </>
            )}
          </div>
        );
        
      case 'faults':
        const activeFaults = systemStatus.faults.filter(f => !f.resolved).length;
        return (
          <div className="flex items-center justify-center gap-2">
            {activeFaults > 0 ? (
              <>
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-500 font-medium">{activeFaults} Active Fault{activeFaults !== 1 ? 's' : ''}</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-500 font-medium">No Faults</span>
              </>
            )}
          </div>
        );
        
      case 'modules':
        const connectedModules = systemStatus.modules.filter(m => m.connected).length;
        const totalModules = systemStatus.modules.length;
        return (
          <div className="flex items-center justify-center gap-2">
            <Badge variant={connectedModules === totalModules ? "default" : "secondary"}>
              {connectedModules}/{totalModules} Modules
            </Badge>
          </div>
        );
        
      default:
        return <div>Unknown status type</div>;
    }
  };
  
  return (
    <div className="space-y-4 h-full">
      <Select
        value={statusType}
        onValueChange={(value) => {
          widget.config = { ...config, statusType: value };
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="connection">Connection Status</SelectItem>
          <SelectItem value="faults">Fault Status</SelectItem>
          <SelectItem value="modules">Module Status</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="mt-2">
        {renderStatusContent()}
      </div>
    </div>
  );
};

export default CustomStatus;
