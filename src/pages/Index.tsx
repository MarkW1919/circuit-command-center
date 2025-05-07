
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from '@/contexts/app';
import AnimatedWinchDemo from '@/components/customize/AnimatedWinchDemo';

const Index = () => {
  const { systemStatus, switches } = useApp();
  
  const activeSwitches = switches.filter(sw => sw.active).length;
  const totalSwitches = switches.length;
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Marine Control System</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system state overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Connection Status:</span>
                  <span className={systemStatus.connected ? "text-status-active" : "text-status-danger"}>
                    {systemStatus.connected ? "Connected" : "Disconnected"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Channels:</span>
                  <span>{activeSwitches} of {totalSwitches}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Faults:</span>
                  <span className={systemStatus.faults.filter(f => !f.resolved).length > 0 ? "text-status-danger" : "text-status-inactive"}>
                    {systemStatus.faults.filter(f => !f.resolved).length}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/controls" className="w-full">
                <Button className="w-full">Open Controls</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Navigation</CardTitle>
              <CardDescription>Access key system features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/controls" className="block">
                <Button variant="outline" className="w-full justify-start">Power Control</Button>
              </Link>
              <Link to="/diagnostics" className="block">
                <Button variant="outline" className="w-full justify-start">System Diagnostics</Button>
              </Link>
              <Link to="/customize" className="block">
                <Button variant="outline" className="w-full justify-start">Customize Interface</Button>
              </Link>
              <Link to="/buttons" className="block">
                <Button variant="outline" className="w-full justify-start">Button Customization</Button>
              </Link>
              <Link to="/winch-demo" className="block">
                <Button variant="default" className="w-full justify-start bg-cyan-600 hover:bg-cyan-700">
                  Animated Winch Demo
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Feature Preview</CardTitle>
              <CardDescription>Interactive winch button animation</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <AnimatedWinchDemo />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
