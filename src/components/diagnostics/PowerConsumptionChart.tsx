
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend,
  Tooltip
} from 'recharts';

interface PowerConsumptionChartProps {
  powerConsumptionHistory: Array<{time: string, value: number}>;
}

const PowerConsumptionChart = ({ powerConsumptionHistory }: PowerConsumptionChartProps) => {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Power Consumption</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={powerConsumptionHistory}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="time" tick={{fontSize: 12}} />
            <YAxis tick={{fontSize: 12}} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border/50 bg-background p-2 shadow-md">
                      <div className="font-medium">{payload[0].payload.time}</div>
                      <div className="text-sm text-muted-foreground">
                        Current: {Number(payload[0].value).toFixed(1)} A
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#0ea5e9" 
              strokeWidth={2}
              name="Current (A)"
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PowerConsumptionChart;
