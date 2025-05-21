
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock, Users, DollarSign, Star, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getRecommendedRestaurants } from '@/lib/api/restaurants';
import { type Restaurant } from '@/lib/api/types';
import { format } from 'date-fns';

const MakeReservation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const searchParams = {
    location: queryParams.get('location') || '',
    date: queryParams.get('date') || format(new Date(), 'yyyy-MM-dd'),
    time: queryParams.get('time') || '19:00',
    guests: Number(queryParams.get('guests')) || 2,
    budget: queryParams.get('budget') || 'medium',
    cuisine: queryParams.get('cuisine') || '',
    event: queryParams.get('event') || 'casual',
    decor: queryParams.get('decor') === 'true',
    dietary: queryParams.get('dietary')?.split(',') || [],
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Convert budget string to price range format
        let budgetString = '$50-$100'; // default medium
        
        if (searchParams.budget === 'low') budgetString = '$20-$50';
        else if (searchParams.budget === 'medium') budgetString = '$50-$100';
        else if (searchParams.budget === 'high') budgetString = '$100-$150';
        else if (searchParams.budget === 'luxury') budgetString = '$150-$300';
        
        // Fetch recommended restaurants based on search criteria
        const recommendedRestaurants = await getRecommendedRestaurants(
          searchParams.location,
          budgetString,
          searchParams.guests,
          searchParams.decor
        );
        
        // If there's a cuisine filter, apply it client-side
        let filteredRestaurants = recommendedRestaurants;
        if (searchParams.cuisine && searchParams.cuisine !== 'any') {
          filteredRestaurants = filteredRestaurants.filter(
            restaurant => restaurant.cuisine.toLowerCase().includes(searchParams.cuisine.toLowerCase())
          );
        }
        
        setRestaurants(filteredRestaurants);
      } catch (error) {
        console.error("Error fetching recommended restaurants:", error);
        toast({
          title: "Error",
          description: "Failed to load restaurant recommendations.",
          variant: "destructive",
        });
        
        // Set some mock restaurants for demo purposes if the API call fails
        setRestaurants(getMockRestaurants());
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurants();
  }, [searchParams, toast]);
  
  // Mock restaurants for demo/fallback
  const getMockRestaurants = (): Restaurant[] => {
    return [
      {
        id: "r1",
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
      },
      {
        id: "r2",
        name: "Spice Garden",
        description: "Flavorful Indian dishes with modern presentation",
        location: "456 Oak Ave, Midtown",
        cuisine: "Indian",
        owner_id: "owner2",
        images: ["https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3"],
        seating_capacity: 60,
        offers_decoration: false,
        is_approved: true,
        created_at: new Date().toISOString(),
        price_range: "high-end",
        budget_range: { min: 100, max: 150 },
      },
      {
        id: "r3",
        name: "Ocean Breeze",
        description: "Fresh seafood in a sophisticated atmosphere",
        location: "789 Shore Dr, Waterfront",
        cuisine: "Seafood",
        owner_id: "owner3",
        images: ["https://images.unsplash.com/photo-1615719413546-198b25453f85?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3"],
        seating_capacity: 40,
        offers_decoration: true,
        is_approved: true,
        created_at: new Date().toISOString(),
        price_range: "luxury",
        budget_range: { min: 150, max: 250 },
      },
    ];
  };
  
  // Handle restaurant selection for booking
  const handleSelectRestaurant = (restaurant: Restaurant) => {
    // Create reservation query params
    const reservationParams = new URLSearchParams({
      restaurant_id: restaurant.id,
      date: searchParams.date,
      time: searchParams.time,
      guests: searchParams.guests.toString(),
      event: searchParams.event,
      decor: searchParams.decor.toString(),
    });
    
    navigate(`/user/reservation?${reservationParams.toString()}`);
  };
  
  // Format budget label
  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case 'low': return 'Budget-friendly ($)';
      case 'medium': return 'Moderate ($$)';
      case 'high': return 'Premium ($$$)';
      case 'luxury': return 'Luxury ($$$$)';
      default: return 'Any budget';
    }
  };
  
  // Get budget range in dollars
  const getBudgetRange = (budget: string) => {
    switch (budget) {
      case 'low': return '$20 - $50';
      case 'medium': return '$50 - $100';
      case 'high': return '$100 - $150';
      case 'luxury': return '$150 - $300';
      default: return 'Any price range';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName={user?.user_metadata?.name || 'User'} />
      
      <main className="flex-grow">
        {/* Hero section with search criteria */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-4">Restaurant Recommendations</h1>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 flex flex-wrap gap-2 items-center text-white">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{searchParams.location || 'Any location'}</span>
              </div>
              
              <div className="bg-white bg-opacity-20 w-1 h-4 mx-2 rounded-full hidden sm:block" />
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{format(new Date(searchParams.date), 'MMM dd, yyyy')}</span>
              </div>
              
              <div className="bg-white bg-opacity-20 w-1 h-4 mx-2 rounded-full hidden sm:block" />
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{searchParams.time}</span>
              </div>
              
              <div className="bg-white bg-opacity-20 w-1 h-4 mx-2 rounded-full hidden sm:block" />
              
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{searchParams.guests} {searchParams.guests === 1 ? 'guest' : 'guests'}</span>
              </div>
              
              <div className="bg-white bg-opacity-20 w-1 h-4 mx-2 rounded-full hidden sm:block" />
              
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{getBudgetLabel(searchParams.budget)}</span>
              </div>
              
              <div className="ml-auto pt-2 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/user/planning')}
                  className="text-white bg-transparent border-white hover:bg-white hover:text-dineVibe-primary"
                >
                  Edit Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Restaurant results */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg">Loading restaurant recommendations...</p>
            </div>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">No Restaurants Found</h2>
              <p className="text-gray-600 mb-8">
                We couldn't find any restaurants matching your criteria. Try adjusting your search parameters.
              </p>
              <Button 
                onClick={() => navigate('/user/planning')}
                className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
              >
                Update Search
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {restaurants.length} {restaurants.length === 1 ? 'Restaurant' : 'Restaurants'} Found
                </h2>
                <p className="text-gray-600">
                  Here are the best matches for your dining needs
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={restaurant.images?.[0] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3"} 
                        alt={restaurant.name} 
                        className="w-full h-48 object-cover"
                      />
                      
                      {restaurant.offers_decoration && searchParams.decor && (
                        <Badge className="absolute top-3 right-3 bg-dineVibe-accent">
                          Decoration Available
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                          <CardDescription>
                            {restaurant.cuisine}
                          </CardDescription>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{(Math.random() * 2 + 3).toFixed(1)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{restaurant.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          <span className="line-clamp-1">{restaurant.location}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          <span>Up to {restaurant.seating_capacity} guests</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          <span>
                            {restaurant.price_range === 'budget' && 'Budget-friendly ($)'}
                            {restaurant.price_range === 'moderate' && 'Moderate ($$)'}
                            {restaurant.price_range === 'high-end' && 'Premium ($$$)'}
                            {restaurant.price_range === 'luxury' && 'Luxury ($$$$)'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        onClick={() => handleSelectRestaurant(restaurant)}
                        className="w-full bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                      >
                        Book This Restaurant
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MakeReservation;
