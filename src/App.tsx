import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Home from '@/pages/Home';
import Discovery from '@/pages/Discovery';
import Dining from '@/pages/Dining';
import Events from '@/pages/Events';
import AIAssistant from '@/pages/AIAssistant';
import ThreeDPreview from '@/pages/ThreeDPreview';
import PartnerWithUs from '@/pages/PartnerWithUs';
import Contact from '@/pages/Contact';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';

// Owner pages
import OwnerDashboard from '@/pages/owner/Dashboard';
import OwnerAnalytics from '@/pages/owner/Analytics';
import OwnerUploadEvent from '@/pages/owner/UploadEvent';
import OwnerDeals from '@/pages/owner/Deals';
import OwnerTrackBookings from '@/pages/owner/TrackBookings';
import OwnerSettings from '@/pages/owner/Settings';
import VenueRegistration from '@/pages/owner/VenueRegistration';

// User pages
import UserDashboard from '@/pages/user/Dashboard';
import UserMyBookings from '@/pages/user/MyBookings';
import UserEventPlanner from '@/pages/user/EventPlanner';
import BookingForm from '@/pages/user/BookingForm';
import UserBookingConfirmation from '@/pages/user/BookingConfirmation';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/dining" element={<Dining />} />
              <Route path="/events" element={<Events />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/3d-preview" element={<ThreeDPreview />} />
              <Route path="/partner-with-us" element={<PartnerWithUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth/login" element={<Auth />} />
              <Route path="/auth/signup" element={<Auth />} />

              {/* Owner Routes */}
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/analytics" element={<OwnerAnalytics />} />
              <Route path="/owner/upload-event" element={<OwnerUploadEvent />} />
              <Route path="/owner/deals" element={<OwnerDeals />} />
              <Route path="/owner/track-bookings" element={<OwnerTrackBookings />} />
              <Route path="/owner/settings" element={<OwnerSettings />} />
              <Route path="/owner/register-venue" element={<VenueRegistration />} />

              {/* User Routes */}
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/my-bookings" element={<UserMyBookings />} />
              <Route path="/user/event-planner" element={<UserEventPlanner />} />
              <Route path="/event-planner" element={<UserEventPlanner />} />
              <Route path="/booking-form" element={<BookingForm />} />
              <Route path="/booking-confirmation" element={<UserBookingConfirmation />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
