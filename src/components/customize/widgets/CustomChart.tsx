
import React from 'react';
import { WidgetPosition } from '@/contexts/CustomizeContext';
import { useApp } from '@/contexts/AppContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface CustomChartProps {
  widget: WidgetPosition;
}

const CustomChart = ({ widget }: CustomChartProps) => {
  const { switches } = useApp();
  const config = widget.config || {};
  const chartType = config.chartType || 'current';
  
  // Create a simple data array for active switches
  const activeSwitches = switches.filter(sw => sw.active);
  const data = activeSwitches.map(sw => ({
    name: sw.name,
    value: sw.current,
  }));
  
  return (
    <div className="space-y-4 h-full">
      <Select
        value={chartType}
        onValueChange={(value) => {
          widget.config = { ...config, chartType: value };
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select chart type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="current">Current Draw</SelectItem>
          <SelectItem value="status">Status Overview</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="h-40 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
        
        {data.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <p>No active switches</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomChart;
