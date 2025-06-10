import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Import all page components
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import CompleteProfile from '@/pages/auth/CompleteProfile';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Contact from '@/pages/Contact';
import QuickLinks from '@/pages/QuickLinks';
import ForBusiness from '@/pages/ForBusiness';
import Events from '@/pages/Events';
import Media from '@/pages/Media';
import OurStory from '@/pages/OurStory';
import ThreeDPreview from '@/pages/ThreeDPreview';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/login" element={<Auth />} />
              <Route path="/auth/signup" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/auth/complete-profile" element={<CompleteProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quick-links" element={<QuickLinks />} />
              <Route path="/for-business" element={<ForBusiness />} />
              <Route path="/events" element={<Events />} />
              <Route path="/media" element={<Media />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/3d-preview" element={<ThreeDPreview />} />

              {/* User routes */}
              <Route
                path="/user/discovery"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <Discovery />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/restaurant/:id"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                      <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">Restaurant Details</h1>
                        <p>Restaurant details page coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/planning"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <Planning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/ai-assistant"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <AIAssistant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/upcoming"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <UpcomingEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/deals"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <Deals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/bookings"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <Bookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                      <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                        <p>Profile page coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/settings"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <UserSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/reservation"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <Reservation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/make-reservation"
                element={
                  <ProtectedRoute allowedRoles={['authenticated']}>
                    <MakeReservation />
                  </ProtectedRoute>
                }
              />

              {/* Owner routes */}
              <Route
                path="/owner/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <OwnerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/restaurant-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <RestaurantDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/register-restaurant"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <RegisterRestaurant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/upload-event"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <UploadEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/deals"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <OwnerDeals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/customers"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                      <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
                        <p>Customer management coming soon...</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/settings"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <OwnerSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/analytics"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/track-bookings"
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <TrackBookings />
                  </ProtectedRoute>
                }
              />

              {/* Admin routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/restaurants"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageRestaurants />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/control"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ControlPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin-auth" element={<AdminAuth />} />
              <Route path="/admin-redirect" element={<AdminRedirect />} />

              {/* 404 route - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
