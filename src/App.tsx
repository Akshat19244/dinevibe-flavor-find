
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
// These imports will be used once we create these pages
// import UpcomingEvents from "./pages/user/UpcomingEvents";
// import Deals from "./pages/user/Deals";
// import Bookings from "./pages/user/Bookings";

// Restaurant owner pages
// import OwnerDashboard from "./pages/owner/Dashboard";
// import UploadEvent from "./pages/owner/UploadEvent";
// import OwnerDeals from "./pages/owner/Deals";
// import TrackBookings from "./pages/owner/TrackBookings";

// Admin pages
// import AdminDashboard from "./pages/admin/Dashboard";
// import ManageUsers from "./pages/admin/ManageUsers";
// import Reports from "./pages/admin/Reports";
// import Notifications from "./pages/admin/Notifications";

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
          <Route path="/user/upcoming" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          <Route path="/user/deals" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          <Route path="/user/bookings" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          
          {/* Restaurant owner routes */}
          <Route path="/owner/dashboard" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          <Route path="/owner/upload-event" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          <Route path="/owner/deals" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          <Route path="/owner/customers" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          <Route path="/owner/analytics" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          <Route path="/admin/users" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          <Route path="/admin/reports" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          <Route path="/admin/notify" element={<Discovery />} /> {/* Placeholder until we create the real page */}
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
