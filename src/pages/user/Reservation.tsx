import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { SystemSelect } from '@/components/ui/system-select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users, MapPin, CreditCard, Info, Phone } from 'lucide-react';
import { getRestaurantById } from '@/lib/api/restaurants';
import { Restaurant } from '@/lib/api/types';

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
  
  // Get event type label
  const getEventTypeLabel = (eventType: string) => {
    switch (eventType) {
      case 'casual': return 'Casual Dining';
      case 'birthday': return 'Birthday Celebration';
      case 'anniversary': return 'Anniversary';
      case 'business': return 'Business Meeting';
      case 'date': return 'Romantic Date';
      case 'family': return 'Family Gathering';
      default: return 'Other Event';
    }
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
            <div className="text-center py-12">
              <p className="text-lg">Loading reservation details...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Reservation form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Reservation Details</CardTitle>
                    <CardDescription>
                      Fill in your information to complete the booking
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name *</Label>
                              <Input 
                                id="name" 
                                value={reservationData.name}
                                onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number *</Label>
                              <Input 
                                id="phone" 
                                value={reservationData.phone}
                                onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                                required
                              />
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input 
                                id="email" 
                                type="email"
                                value={reservationData.email}
                                onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Additional Requests</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="specialRequests">Special Requests</Label>
                              <Textarea 
                                id="specialRequests" 
                                placeholder="Any special requests for your reservation? (e.g., seating preference, occasion details)"
                                value={reservationData.specialRequests}
                                onChange={(e) => setReservationData({ ...reservationData, specialRequests: e.target.value })}
                                rows={3}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                              <Textarea 
                                id="dietaryRestrictions" 
                                placeholder="Any food allergies or dietary restrictions? (e.g., vegetarian, gluten-free, nut allergy)"
                                value={reservationData.dietaryRestrictions}
                                onChange={(e) => setReservationData({ ...reservationData, dietaryRestrictions: e.target.value })}
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                          <RadioGroup 
                            value={reservationData.paymentMethod}
                            onValueChange={(value) => setReservationData({ ...reservationData, paymentMethod: value })}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pay-at-venue" id="pay-at-venue" />
                              <Label htmlFor="pay-at-venue" className="flex items-center cursor-pointer">
                                Pay at Restaurant
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="credit-card" id="credit-card" />
                              <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Credit/Debit Card
                              </Label>
                            </div>
                          </RadioGroup>
                          
                          {reservationData.paymentMethod === 'credit-card' && (
                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                              <p className="text-sm flex items-start">
                                <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-400" />
                                In a production app, you would see a secure payment form here. For this demo, we're simulating the payment flow.
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="terms" 
                              checked={reservationData.agreeToTerms}
                              onCheckedChange={(checked) => 
                                setReservationData({
                                  ...reservationData,
                                  agreeToTerms: !!checked
                                })
                              }
                              required
                            />
                            <Label 
                              htmlFor="terms" 
                              className="text-sm font-medium cursor-pointer"
                            >
                              I agree to the booking terms and cancellation policy
                            </Label>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-2 pl-6">
                            Cancellations made less than 24 hours before the reservation may incur a fee.
                            No-shows may be subject to a charge of up to 25% of the estimated bill.
                          </p>
                        </div>
                      </div>
                      
                      <CardFooter className="px-0 pt-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                            disabled={!isFormValid()}
                          >
                            Confirm Reservation
                          </Button>
                        </div>
                      </CardFooter>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Restaurant and reservation summary */}
              <div>
                <Card className="bg-gray-50 dark:bg-gray-900">
                  <CardHeader>
                    <div className="mb-2">
                      {restaurant?.price_range && (
                        <Badge className="mb-2">
                          {restaurant.price_range === 'budget' && 'Budget-friendly ($)'}
                          {restaurant.price_range === 'moderate' && 'Moderate ($$)'}
                          {restaurant.price_range === 'high-end' && 'Premium ($$$)'}
                          {restaurant.price_range === 'luxury' && 'Luxury ($$$$)'}
                        </Badge>
                      )}
                      <CardTitle>{restaurant?.name || 'Restaurant'}</CardTitle>
                      <CardDescription>{restaurant?.cuisine || 'Cuisine'}</CardDescription>
                    </div>
                    
                    <div className="aspect-video w-full overflow-hidden rounded-md">
                      <img 
                        src={restaurant?.images?.[0] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3"} 
                        alt={restaurant?.name || 'Restaurant'} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="font-semibold">Reservation Summary</h3>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <CalendarIcon className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
                          <span>
                            {format(new Date(reservationParams.date), 'EEEE, MMMM d, yyyy')}
                          </span>
                        </div>
                        
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
                          <span>{reservationParams.time}</span>
                        </div>
                        
                        <div className="flex items-start">
                          <Users className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
                          <span>
                            {reservationParams.guests} {reservationParams.guests === 1 ? 'guest' : 'guests'}
                          </span>
                        </div>
                        
                        <div className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
                          <span>{getEventTypeLabel(reservationParams.event)}</span>
                        </div>
                        
                        {reservationParams.decor && (
                          <div className="bg-dineVibe-accent/10 p-2 rounded-md text-dineVibe-accent">
                            Special decoration requested
                          </div>
                        )}
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <h3 className="font-semibold mb-2">Restaurant Information</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
                            <span>{restaurant?.location || 'Location not available'}</span>
                          </div>
                          
                          {restaurant?.manager_details && typeof restaurant.manager_details === 'object' && 'contact' in restaurant.manager_details && (
                            <div className="flex items-start">
                              <Phone className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
                              <span>{restaurant.manager_details.contact}</span>
                            </div>
                          )}
                          
                          {restaurant?.description && (
                            <p className="text-gray-600 mt-2">
                              {restaurant.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
