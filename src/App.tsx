
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// User pages
import Discovery from "./pages/user/Discovery";
import UpcomingEvents from "./pages/user/UpcomingEvents";
import Deals from "./pages/user/Deals";
import Planning from "./pages/user/Planning";
import Bookings from "./pages/user/Bookings";
import UserSettings from "./pages/user/Settings";

// Restaurant owner pages
import OwnerDashboard from "./pages/owner/Dashboard";
import UploadEvent from "./pages/owner/UploadEvent";
import OwnerDeals from "./pages/owner/Deals";
import TrackBookings from "./pages/owner/TrackBookings";
import OwnerAnalytics from "./pages/owner/Analytics";
import OwnerSettings from "./pages/owner/Settings";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";
import Notifications from "./pages/admin/Notifications";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth/:type" element={<Auth />} />
          
          {/* User routes */}
          <Route path="/user/discovery" element={<Discovery />} />
          <Route path="/user/upcoming" element={<UpcomingEvents />} />
          <Route path="/user/deals" element={<Deals />} />
          <Route path="/user/planning" element={<Planning />} />
          <Route path="/user/bookings" element={<Bookings />} />
          <Route path="/user/settings" element={<UserSettings />} />
          
          {/* Restaurant owner routes */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/upload-event" element={<UploadEvent />} />
          <Route path="/owner/deals" element={<OwnerDeals />} />
          <Route path="/owner/customers" element={<TrackBookings />} />
          <Route path="/owner/analytics" element={<OwnerAnalytics />} />
          <Route path="/owner/settings" element={<OwnerSettings />} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/notify" element={<Notifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
