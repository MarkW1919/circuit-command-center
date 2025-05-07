
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Controls from "./pages/Controls";
import Faults from "./pages/Faults";
import Setup from "./pages/Setup";
import Settings from "./pages/Settings";
import CustomizePage from "./pages/CustomizePage";
import ButtonCustomizePage from "./pages/ButtonCustomizePage";
import Diagnostics from "./pages/Diagnostics";
import NotFound from "./pages/NotFound";
import { AppProvider } from "./contexts/app";
import { CustomizeProvider } from "./contexts/CustomizeContext";
import React from "react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <CustomizeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/controls" element={<Controls />} />
              <Route path="/faults" element={<Faults />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/customize" element={<CustomizePage />} />
              <Route path="/buttons" element={<ButtonCustomizePage />} />
              <Route path="/diagnostics" element={<Diagnostics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CustomizeProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
