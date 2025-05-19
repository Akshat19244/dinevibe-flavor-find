
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { createReservation } from '@/lib/api/reservations';
import { getRecommendedRestaurants } from '@/lib/api/restaurants';
import { getUserProfile } from '@/lib/api/users';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, MapPin, DollarSign, Users, Star } from 'lucide-react';
import { Restaurant } from '@/lib/api/types';
import { SystemSelect } from '@/components/ui/system-select';

const MakeReservation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState<Restaurant[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  // Form state
  const [guestCount, setGuestCount] = useState<number>(2);
  const [budget, setBudget] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [needsDecoration, setNeedsDecoration] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [restaurantId, setRestaurantId] = useState<string>('');
  const [optionalDish, setOptionalDish] = useState<string>('');
  const [optionalDecoration, setOptionalDecoration] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [contactNumber, setContactNumber] = useState<string>('');
  const [step, setStep] = useState<'search' | 'results' | 'details'>('search');
  
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
    
    loadUserProfile();
  }, [user, toast]);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSearching(true);
    setSearchPerformed(true);
    
    try {
      // Find restaurants matching criteria
      const results = await getRecommendedRestaurants(
        location,
        budget,
        guestCount,
        needsDecoration
      );
      
      setRecommendedRestaurants(results);
      setStep('results');
    } catch (error) {
      console.error('Error searching for restaurants:', error);
      toast({
        title: 'Search Error',
        description: 'Failed to search for restaurants. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setRestaurant(restaurant);
    setRestaurantId(restaurant.id);
    setStep('details');
  };
  
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
        event_type: needsDecoration ? 'Decorated Event' : 'Standard Booking',
        optional_dish: optionalDish,
        optional_decoration: needsDecoration ? optionalDecoration : '',
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
  
  const renderSearchForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Find the Perfect Restaurant</CardTitle>
        <CardDescription>Tell us your preferences for a personalized recommendation</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                Location
              </Label>
              <Input 
                id="location" 
                placeholder="Enter city or area" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="focus:ring-2 focus:ring-primary/20" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                Budget Range
              </Label>
              <SystemSelect
                value={budget}
                onValueChange={setBudget}
                placeholder="Select budget"
                className="focus:ring-2 focus:ring-primary/20"
                options={budgetOptions.map(option => ({
                  value: option,
                  label: option
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guestCount" className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                Number of Guests
              </Label>
              <Input 
                id="guestCount" 
                type="number" 
                min="1" 
                value={guestCount} 
                onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)} 
                className="focus:ring-2 focus:ring-primary/20" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                Date
              </Label>
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
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="needsDecoration" 
                checked={needsDecoration} 
                onCheckedChange={(checked) => setNeedsDecoration(checked as boolean)} 
              />
              <Label htmlFor="needsDecoration">I need special decoration</Label>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Restaurants...
              </>
            ) : (
              'Find Restaurants'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
  
  const renderRestaurantResults = () => (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Restaurant Recommendations</h2>
          <p className="text-muted-foreground">
            {recommendedRestaurants.length} restaurants found matching your criteria
          </p>
        </div>
        
        <Button variant="outline" onClick={() => setStep('search')} className="mt-2 sm:mt-0">
          Modify Search
        </Button>
      </div>
      
      {recommendedRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {recommendedRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {restaurant.images && restaurant.images[0] && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={restaurant.images[0]} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.cuisine} • {restaurant.location}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>4.5</span>
                  </div>
                  <span>{restaurant.price_range || '$$$'}</span>
                </div>
                
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {restaurant.description}
                </p>
                
                {restaurant.offers_decoration && (
                  <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Decoration Available
                  </span>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => handleSelectRestaurant(restaurant)}
                  className="w-full"
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mt-6 text-center p-8">
          <div className="mx-auto max-w-md">
            <h3 className="text-xl font-medium mb-2">No Restaurants Found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any restaurants matching your exact criteria. Try adjusting your search parameters.
            </p>
            <Button onClick={() => setStep('search')}>
              Modify Search
            </Button>
          </div>
        </Card>
      )}
    </>
  );
  
  const renderReservationDetails = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Complete Your Reservation</CardTitle>
        <CardDescription>
          {restaurant?.name} • {restaurant?.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Restaurant details summary */}
          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium">Booking Summary</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>Location:</div>
              <div>{restaurant?.location}</div>
              
              <div>Date:</div>
              <div>{bookingDate ? format(bookingDate, 'PPP') : 'Not selected'}</div>
              
              <div>Party Size:</div>
              <div>{guestCount} guests</div>
              
              <div>Budget:</div>
              <div>{budget}</div>
            </div>
          </div>
          
          {needsDecoration && (
            <div className="space-y-2">
              <Label htmlFor="decorationDetails">Decoration Details</Label>
              <Textarea 
                id="decorationDetails" 
                placeholder="Describe your decoration requirements" 
                value={optionalDecoration} 
                onChange={(e) => setOptionalDecoration(e.target.value)} 
                rows={3}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="optionalDish">Special Dish Requests (Optional)</Label>
            <Input 
              id="optionalDish" 
              placeholder="Any specific dishes you'd like?" 
              value={optionalDish} 
              onChange={(e) => setOptionalDish(e.target.value)} 
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
          
          <div className="pt-4 flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep('results')}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Creating Reservation...' : 'Confirm Reservation'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName={userProfile?.name || 'User'} />
      
      <main className="flex-grow py-8">
        <div className="container max-w-4xl mx-auto px-4">
          {step === 'search' && renderSearchForm()}
          {step === 'results' && renderRestaurantResults()}
          {step === 'details' && renderReservationDetails()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MakeReservation;
