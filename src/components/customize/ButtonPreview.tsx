
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CustomIconButton from '@/components/customize/CustomIconButton';

const ButtonPreview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Controls Preview</CardTitle>
        <CardDescription>
          See how your custom buttons will appear in your control interface
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <h3 className="text-sm font-medium text-gray-400 mb-4">CONTROL PANEL</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CustomIconButton
              label="Fan"
              icon="fan"
              buttonStyle="glossy"
              buttonType="round"
              color="#3b82f6"
              glowEffect={true}
              state="active"
              showTooltip={true}
            />
            <CustomIconButton
              label="Lights"
              icon="lightbulb"
              buttonStyle="metal"
              buttonType="round"
              color="#6366f1"
              showTooltip={true}
            />
            <CustomIconButton
              label="Temperature"
              icon="thermometer"
              buttonStyle="carbon"
              buttonType="rectangular"
              color="#000000"
              showTooltip={true}
            />
            <CustomIconButton
              label="Dashboard"
              icon="gauge"
              buttonStyle="glass"
              buttonType="oval"
              glowEffect={true}
              showTooltip={true}
            />
            <CustomIconButton
              label="Ejector Seat"
              icon="power"
              buttonStyle="military"
              buttonType="flip"
              state="active"
              color="#f43f5e"
              showTooltip={true}
            />
            <CustomIconButton
              label="Heater"
              icon="thermometer"
              buttonStyle="rubber"
              buttonType="rectangular"
              color="#212121"
              showTooltip={true}
            />
            <CustomIconButton
              label="Lock"
              icon="lock"
              buttonStyle="glossy"
              buttonType="round"
              color="#ef4444"
              state="pressed"
              showTooltip={true}
            />
            <CustomIconButton
              label="Parking"
              icon="car"
              buttonStyle="glass"
              buttonType="oval"
              color="#22c55e"
              state="disabled"
              showTooltip={true}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">About Button States</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2 text-center">
              <CustomIconButton
                label="Default"
                icon="power"
                size="sm"
              />
              <p className="text-xs text-gray-400">Standard state</p>
            </div>
            <div className="space-y-2 text-center">
              <CustomIconButton
                label="Active"
                icon="power"
                state="active"
                size="sm"
                color="#22c55e"
              />
              <p className="text-xs text-gray-400">Currently on/enabled</p>
            </div>
            <div className="space-y-2 text-center">
              <CustomIconButton
                label="Pressed"
                icon="power"
                state="pressed"
                size="sm"
                color="#3b82f6"
              />
              <p className="text-xs text-gray-400">Being pressed</p>
            </div>
            <div className="space-y-2 text-center">
              <CustomIconButton
                label="Disabled"
                icon="power"
                state="disabled"
                size="sm"
              />
              <p className="text-xs text-gray-400">Cannot be used</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ButtonPreview;
