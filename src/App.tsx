import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BecomeHost from "./pages/BecomeHost";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Hosting from "./pages/Hosting";
import HostingDashboard from "./pages/hosting/HostingDashboard";
import HostingCalendar from "./pages/hosting/HostingCalendar";
import HostingInbox from "./pages/hosting/HostingInbox";
import HostingListings from "./pages/hosting/HostingListings";
import HostingAccountSettings from "./pages/hosting/HostingAccountSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/become-a-host" element={<BecomeHost />} />
          <Route path="/success" element={<Success />} />
          
          {/* Hosting Dashboard */}
          <Route path="/hosting" element={<Hosting />}>
            <Route index element={<HostingDashboard />} />
            <Route path="calendar" element={<HostingCalendar />} />
            <Route path="inbox" element={<HostingInbox />} />
            <Route path="listings" element={<HostingListings />} />
            <Route path="account-settings" element={<HostingAccountSettings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
