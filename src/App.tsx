import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Import all page components
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import CompleteProfile from '@/pages/auth/CompleteProfile';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Contact from '@/pages/Contact';

// User pages
import Discovery from '@/pages/user/Discovery';
import Planning from '@/pages/user/Planning';
import AIAssistant from '@/pages/user/AIAssistant';
import UpcomingEvents from '@/pages/user/UpcomingEvents';
import Deals from '@/pages/user/Deals';
import Bookings from '@/pages/user/Bookings';
import UserSettings from '@/pages/user/Settings';
import Reservation from '@/pages/user/Reservation';
import MakeReservation from '@/pages/user/MakeReservation';

// Owner pages
import OwnerDashboard from '@/pages/owner/Dashboard';
import RestaurantDashboard from '@/pages/owner/RestaurantDashboard';
import RegisterRestaurant from '@/pages/owner/RegisterRestaurant';
import UploadEvent from '@/pages/owner/UploadEvent';
import OwnerDeals from '@/pages/owner/Deals';
import OwnerSettings from '@/pages/owner/Settings';
import Analytics from '@/pages/owner/Analytics';
import TrackBookings from '@/pages/owner/TrackBookings';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import ManageRestaurants from '@/pages/admin/ManageRestaurants';
import Reports from '@/pages/admin/Reports';
import AdminSettings from '@/pages/admin/Settings';
import Notifications from '@/pages/admin/Notifications';
import ControlPanel from '@/pages/admin/ControlPanel';
import AdminAuth from '@/pages/admin/AdminAuth';
import AdminRedirect from '@/pages/admin/AdminRedirect';

import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-react-theme">
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/*" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/auth/complete-profile" element={<CompleteProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />

              {/* User routes */}
              <Route
                path="/user/*"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <Routes>
                      <Route path="/discovery" element={<Discovery />} />
                      <Route path="/planning" element={<Planning />} />
                      <Route path="/ai-assistant" element={<AIAssistant />} />
                      <Route path="/upcoming" element={<UpcomingEvents />} />
                      <Route path="/deals" element={<Deals />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/profile" element={<div>User Profile</div>} />
                      <Route path="/settings" element={<UserSettings />} />
                      <Route path="/reservation" element={<Reservation />} />
                      <Route path="/make-reservation" element={<MakeReservation />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />

              {/* Owner routes */}
              <Route
                path="/owner/*"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <Routes>
                      <Route path="/dashboard" element={<OwnerDashboard />} />
                      <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
                      <Route path="/register-restaurant" element={<RegisterRestaurant />} />
                      <Route path="/upload-event" element={<UploadEvent />} />
                      <Route path="/deals" element={<OwnerDeals />} />
                      <Route path="/customers" element={<div>Customers Management</div>} />
                      <Route path="/settings" element={<OwnerSettings />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/track-bookings" element={<TrackBookings />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />

              {/* Admin routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Routes>
                      <Route path="/dashboard" element={<AdminDashboard />} />
                      <Route path="/users" element={<AdminUsers />} />
                      <Route path="/restaurants" element={<ManageRestaurants />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/settings" element={<AdminSettings />} />
                      <Route path="/notifications" element={<Notifications />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />

              {/* Control panel route */}
              <Route
                path="/control"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ControlPanel />
                  </ProtectedRoute>
                }
              />

              {/* Admin auth route */}
              <Route path="/admin-auth" element={<AdminAuth />} />
              <Route path="/admin-redirect" element={<AdminRedirect />} />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
