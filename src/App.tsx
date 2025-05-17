
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// User pages
import Discovery from "./pages/user/Discovery";
import UpcomingEvents from "./pages/user/UpcomingEvents";
import Deals from "./pages/user/Deals";
import Planning from "./pages/user/Planning";
import Bookings from "./pages/user/Bookings";
import UserSettings from "./pages/user/Settings";
import Reservation from "./pages/user/Reservation";

// Restaurant owner pages
import OwnerDashboard from "./pages/owner/Dashboard";
import UploadEvent from "./pages/owner/UploadEvent";
import OwnerDeals from "./pages/owner/Deals";
import TrackBookings from "./pages/owner/TrackBookings";
import OwnerSettings from "./pages/owner/Settings";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";
import Notifications from "./pages/admin/Notifications";
import AdminSettings from "./pages/admin/Settings";
import ControlPanel from "./pages/admin/ControlPanel";
import AuthCallback from "./pages/AuthCallback";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth/:type" element={<Auth />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* User routes */}
          <Route path="/user/discovery" element={<Discovery />} />
          <Route path="/user/upcoming" element={<UpcomingEvents />} />
          <Route path="/user/deals" element={<Deals />} />
          <Route path="/user/planning" element={<Planning />} />
          <Route path="/user/bookings" element={<Bookings />} />
          <Route path="/user/settings" element={<UserSettings />} />
          <Route path="/user/reservation" element={<Reservation />} />
          
          {/* Restaurant owner routes */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/upload-event" element={<UploadEvent />} />
          <Route path="/owner/deals" element={<OwnerDeals />} />
          <Route path="/owner/customers" element={<TrackBookings />} />
          <Route path="/owner/settings" element={<OwnerSettings />} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/notify" element={<Notifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/control" element={<ControlPanel />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
