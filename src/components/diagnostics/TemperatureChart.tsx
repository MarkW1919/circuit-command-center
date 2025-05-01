
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend,
  Tooltip
} from 'recharts';

interface TemperatureChartProps {
  temperatureHistory: Array<{time: string, value: number}>;
}

const TemperatureChart = ({ temperatureHistory }: TemperatureChartProps) => {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Temperature Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={temperatureHistory}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="time" tick={{fontSize: 12}} />
            <YAxis tick={{fontSize: 12}} domain={['auto', 'auto']} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border/50 bg-background p-2 shadow-md">
                      <div className="font-medium">{payload[0].payload.time}</div>
                      <div className="text-sm text-muted-foreground">
                        Temperature: {payload[0].value?.toString()}°C
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#ef4444" 
              fill="url(#temperatureGradient)" 
              name="Temperature (°C)"
              animationDuration={300}
            />
            <defs>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;
