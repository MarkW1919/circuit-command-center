
import React from 'react';
import { WidgetPosition } from '@/contexts/CustomizeContext';
import { useApp } from '@/contexts/app';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';

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
    id: sw.id
  }));
  
  // Custom colors based on current draw
  const getBarColor = (value: number) => {
    if (value >= 10) return '#ef4444'; // High current (red)
    if (value >= 5) return '#f59e0b';  // Medium current (amber)
    return '#22c55e'; // Normal current (green)
  };
  
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
      
      <div className={cn("h-40 mt-2 relative", data.length === 0 && "flex items-center justify-center")}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#22c55e' }}
                formatter={(value: number) => [`${value}A`, 'Current']}
              />
              <Bar dataKey="value" className="animate-pulse">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-400">
            <p>No active switches</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomChart;
