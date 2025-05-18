import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { createReservation } from '@/lib/api/reservations';
import { getAllRestaurants } from '@/lib/api/restaurants';
import { getUserProfile } from '@/lib/api/users';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Restaurant } from '@/lib/api/types';

const MakeReservation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
  // Form state
  const [guestCount, setGuestCount] = useState<number>(2);
  const [budget, setBudget] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [restaurantId, setRestaurantId] = useState<string>('');
  const [optionalDish, setOptionalDish] = useState<string>('');
  const [optionalDecoration, setOptionalDecoration] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [contactNumber, setContactNumber] = useState<string>('');
  
  // Event type options
  const eventTypes = [
    'Birthday Party',
    'Anniversary',
    'Corporate Event',
    'Wedding',
    'Family Gathering',
    'Casual Dining',
    'Business Meeting',
    'Other'
  ];
  
  // Budget options
  const budgetOptions = [
    'Under $100',
    '$100 - $300',
    '$300 - $500',
    '$500 - $1000',
    'Over $1000'
  ];
  
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.id);
          setUserProfile(profile);
          
          // Pre-fill contact number if available
          if (profile.contact_number) {
            setContactNumber(profile.contact_number);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
          toast({
            title: 'Error',
            description: 'Failed to load your profile information.',
            variant: 'destructive'
          });
        }
      }
    };
    
    const loadRestaurants = async () => {
      try {
        const allRestaurants = await getAllRestaurants();
        setRestaurants(allRestaurants);
      } catch (error) {
        console.error('Error loading restaurants:', error);
        toast({
          title: 'Error',
          description: 'Failed to load restaurant options.',
          variant: 'destructive'
        });
      }
    };
    
    loadUserProfile();
    loadRestaurants();
  }, [user, toast]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be signed in to make a reservation.',
        variant: 'destructive'
      });
      return;
    }
    
    if (!bookingDate) {
      toast({
        title: 'Missing Date',
        description: 'Please select a booking date.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create reservation data object
      const reservationData = {
        user_id: user.id,
        restaurant_id: restaurantId || null,
        guest_count: guestCount,
        budget,
        location,
        event_type: eventType,
        optional_dish: optionalDish,
        optional_decoration: optionalDecoration,
        booking_date: bookingDate.toISOString()
      };
      
      // Create reservation in database
      await createReservation(reservationData);
      
      toast({
        title: 'Reservation Created!',
        description: 'Your reservation has been successfully created.',
      });
      
      // Redirect to bookings page
      navigate('/user/bookings');
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: 'Reservation Failed',
        description: 'There was an error creating your reservation. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName={userProfile?.name || 'User'} />
      
      <main className="flex-grow py-8">
        <div className="container max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Make a Reservation</CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestCount">Number of Guests*</Label>
                      <Input 
                        id="guestCount" 
                        type="number" 
                        min="1" 
                        value={guestCount} 
                        onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range*</Label>
                      <Select value={budget} onValueChange={setBudget} required>
                        <SelectTrigger id="budget">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map(option => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Preferred Location*</Label>
                    <Input 
                      id="location" 
                      placeholder="Enter city or area" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type*</Label>
                      <Select value={eventType} onValueChange={setEventType} required>
                        <SelectTrigger id="eventType">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date">Booking Date*</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {bookingDate ? format(bookingDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={bookingDate}
                            onSelect={setBookingDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                
                {/* Optional Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Optional Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="restaurant">Specific Restaurant (Optional)</Label>
                    <Select value={restaurantId} onValueChange={setRestaurantId}>
                      <SelectTrigger id="restaurant">
                        <SelectValue placeholder="Select a restaurant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any restaurant</SelectItem>
                        {restaurants.map(restaurant => (
                          <SelectItem key={restaurant.id} value={restaurant.id}>
                            {restaurant.name} - {restaurant.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="optionalDish">Dish Preference (Optional)</Label>
                    <Input 
                      id="optionalDish" 
                      placeholder="Any specific dish you'd like?" 
                      value={optionalDish} 
                      onChange={(e) => setOptionalDish(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="optionalDecoration">Decoration or Setup (Optional)</Label>
                    <Textarea 
                      id="optionalDecoration" 
                      placeholder="Any special decoration or setup requirements?" 
                      value={optionalDecoration} 
                      onChange={(e) => setOptionalDecoration(e.target.value)} 
                      rows={3} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number*</Label>
                    <Input 
                      id="contactNumber" 
                      placeholder="Your contact number" 
                      value={contactNumber} 
                      onChange={(e) => setContactNumber(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Creating Reservation...' : 'Make Reservation'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MakeReservation;
