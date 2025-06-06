import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Import missing page components
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import CompleteProfile from "./pages/auth/CompleteProfile";
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
import MakeReservation from "./pages/user/MakeReservation";
import AIAssistant from "./pages/user/AIAssistant";

// Restaurant owner pages
import OwnerDashboard from "./pages/owner/Dashboard";
import UploadEvent from "./pages/owner/UploadEvent";
import OwnerDeals from "./pages/owner/Deals";
import TrackBookings from "./pages/owner/TrackBookings";
import OwnerSettings from "./pages/owner/Settings";
import RegisterRestaurant from "./pages/owner/RegisterRestaurant";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAuth from "./pages/admin/AdminAuth";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";
import Notifications from "./pages/admin/Notifications";
import AdminSettings from "./pages/admin/Settings";
import ControlPanel from "./pages/admin/ControlPanel";
import ManageRestaurants from "./pages/admin/ManageRestaurants";

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
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/auth/:type" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/auth/complete-profile" element={<CompleteProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              
              {/* User routes */}
              <Route path="/user/discovery" element={
                <ProtectedRoute>
                  <Discovery />
                </ProtectedRoute>
              } />
              <Route path="/user/ai-assistant" element={
                <ProtectedRoute>
                  <AIAssistant />
                </ProtectedRoute>
              } />
              <Route path="/user/upcoming" element={
                <ProtectedRoute>
                  <UpcomingEvents />
                </ProtectedRoute>
              } />
              <Route path="/user/deals" element={
                <ProtectedRoute>
                  <Deals />
                </ProtectedRoute>
              } />
              <Route path="/user/planning" element={
                <ProtectedRoute>
                  <Planning />
                </ProtectedRoute>
              } />
              <Route path="/user/bookings" element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              } />
              <Route path="/user/settings" element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              } />
              <Route path="/user/reservation" element={
                <ProtectedRoute>
                  <Reservation />
                </ProtectedRoute>
              } />
              <Route path="/user/make-reservation" element={
                <ProtectedRoute>
                  <MakeReservation />
                </ProtectedRoute>
              } />
              
              {/* Restaurant owner routes */}
              <Route path="/owner/dashboard" element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <OwnerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/owner/register-restaurant" element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <RegisterRestaurant />
                </ProtectedRoute>
              } />
              <Route path="/owner/upload-event" element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <UploadEvent />
                </ProtectedRoute>
              } />
              <Route path="/owner/deals" element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <OwnerDeals />
                </ProtectedRoute>
              } />
              <Route path="/owner/customers" element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <TrackBookings />
                </ProtectedRoute>
              } />
              <Route path="/owner/settings" element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <OwnerSettings />
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute requireAdmin={true}>
                  <ManageUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/restaurants" element={
                <ProtectedRoute requireAdmin={true}>
                  <ManageRestaurants />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute requireAdmin={true}>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/admin/notify" element={
                <ProtectedRoute requireAdmin={true}>
                  <Notifications />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminSettings />
                </ProtectedRoute>
              } />
              <Route path="/control" element={
                <ProtectedRoute requireAdmin={true}>
                  <ControlPanel />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
