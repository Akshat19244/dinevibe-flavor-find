
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { getRestaurantById } from '@/lib/api/restaurants';
import { Restaurant } from '@/lib/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import ReservationForm from '@/components/reservation/ReservationForm';
import ReservationSummary from '@/components/reservation/ReservationSummary';

const Reservation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const reservationParams = {
    restaurant_id: queryParams.get('restaurant_id') || '',
    date: queryParams.get('date') || format(new Date(), 'yyyy-MM-dd'),
    time: queryParams.get('time') || '19:00',
    guests: Number(queryParams.get('guests')) || 2,
    event: queryParams.get('event') || 'casual',
    decor: queryParams.get('decor') === 'true',
  };
  
  // State
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState({
    name: user?.user_metadata?.name || '',
    phone: user?.user_metadata?.phone || '',
    email: user?.email || '',
    specialRequests: '',
    dietaryRestrictions: '',
    agreeToTerms: false,
    paymentMethod: 'pay-at-venue',
  });
  
  // Load restaurant details
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        if (reservationParams.restaurant_id) {
          const restaurantData = await getRestaurantById(reservationParams.restaurant_id);
          setRestaurant(restaurantData);
        } else {
          // Fallback if no ID provided - demo purposes
          setRestaurant(getMockRestaurant());
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        toast({
          title: "Error",
          description: "Failed to load restaurant details.",
          variant: "destructive",
        });
        
        // Set mock data for demo purposes
        setRestaurant(getMockRestaurant());
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurant();
  }, [reservationParams.restaurant_id, toast]);
  
  // Mock restaurant for demo/fallback
  const getMockRestaurant = (): Restaurant => {
    return {
      id: "mock1",
      name: "Bella Italia",
      description: "Authentic Italian cuisine in a cozy setting",
      location: "123 Main St, Downtown",
      cuisine: "Italian",
      owner_id: "owner1",
      images: ["https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3"],
      seating_capacity: 50,
      offers_decoration: true,
      is_approved: true,
      created_at: new Date().toISOString(),
      price_range: "moderate",
      budget_range: { min: 50, max: 100 },
      manager_details: {
        name: "Mario Rossi",
        email: "info@bellaitalia.com",
        contact: "+1 (555) 123-4567"
      }
    };
  };
  
  // Form validation
  const isFormValid = () => {
    return (
      reservationData.name.trim() !== '' &&
      reservationData.phone.trim() !== '' &&
      reservationData.email.trim() !== '' &&
      reservationData.agreeToTerms
    );
  };
  
  // Handle reservation submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and agree to the terms.",
        variant: "destructive",
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your reservation.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API to create the reservation
    // For demo purposes, we'll just show a success message and redirect
    toast({
      title: "Reservation Confirmed!",
      description: `Your reservation at ${restaurant?.name} has been booked for ${format(new Date(reservationParams.date), 'MMMM d, yyyy')} at ${reservationParams.time}.`,
    });
    
    // Redirect to bookings page to see the new reservation
    setTimeout(() => {
      navigate('/user/bookings');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName={user?.user_metadata?.name || 'User'} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Reservation</h1>
            <p className="text-white text-opacity-90">
              Just a few more details to book your perfect dining experience
            </p>
          </div>
        </div>
        
        {/* Reservation form */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Skeleton className="h-[600px] w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-[500px] w-full rounded-lg" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Reservation form */}
              <div className="lg:col-span-2">
                <ReservationForm 
                  reservationData={reservationData}
                  setReservationData={setReservationData}
                  isFormValid={isFormValid}
                  handleSubmit={handleSubmit}
                  onNavigateBack={() => navigate(-1)}
                />
              </div>
              
              {/* Restaurant and reservation summary */}
              <div>
                <ReservationSummary 
                  restaurant={restaurant}
                  reservationParams={reservationParams}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reservation;
