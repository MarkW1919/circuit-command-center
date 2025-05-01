
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        <div className={cn(
          "fixed inset-y-0 left-0 z-20 bg-sidebar transform transition-transform duration-200 ease-in-out",
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
          "w-64"
        )}>
          <Sidebar />
        </div>
        
        {/* Overlay to close sidebar when clicked (mobile only) */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10" 
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        
        <main className={cn(
          "flex-1 transition-all duration-200",
          !isMobile && "ml-64"
        )}>
          <div className="container mx-auto p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
