
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock,
  Users,
  Filter,
  Heart,
  Calendar,
  ChefHat,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dining: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const restaurants = [
    {
      id: 1,
      name: "The Royal Banquet",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
      cuisine: "Multi-Cuisine",
      location: "Mumbai Central",
      rating: 4.8,
      reviewCount: 342,
      priceRange: "₹2,000-5,000",
      distance: "2.3 km",
      openNow: true,
      features: ["Air Conditioning", "Parking", "Live Music"],
      speciality: "Royal Dining Experience",
      hasVirtualTour: true,
      responseTime: "15 mins"
    },
    {
      id: 2,
      name: "Garden Paradise",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800",
      cuisine: "Indian & Continental",
      location: "Delhi NCR",
      rating: 4.6,
      reviewCount: 256,
      priceRange: "₹1,500-3,500",
      distance: "1.8 km",
      openNow: true,
      features: ["Garden Seating", "WiFi", "Bar"],
      speciality: "Garden Dining",
      hasVirtualTour: true,
      responseTime: "20 mins"
    },
    {
      id: 3,
      name: "Modern Events Hub",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800",
      cuisine: "International",
      location: "Bangalore",
      rating: 4.7,
      reviewCount: 189,
      priceRange: "₹3,000-6,000",
      distance: "3.1 km",
      openNow: false,
      features: ["Modern Ambience", "Private Rooms", "Valet"],
      speciality: "Contemporary Fine Dining",
      hasVirtualTour: true,
      responseTime: "10 mins"
    }
  ];

  const cuisines = ["All", "Indian", "Continental", "Chinese", "Italian", "Multi-Cuisine", "International"];
  const locations = ["All", "Mumbai", "Delhi NCR", "Bangalore", "Pune", "Hyderabad"];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || restaurant.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCuisine && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#0C0C0C] to-[#2F2F2F] py-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-[#FFF5E1] mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <ChefHat className="inline mr-3 h-10 w-10 text-[#D4AF37]" />
                Premium Dining
              </h1>
              <p className="text-xl text-[#FFF5E1]/90 max-w-3xl mx-auto">
                Discover curated restaurants and book tables at India's finest dining destinations
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#2F2F2F]" />
                      <Input
                        placeholder="Search restaurants, cuisines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-none text-[#0C0C0C]"
                      />
                    </div>
                  </div>
                  
                  <select 
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white text-[#0C0C0C] border-none outline-none"
                  >
                    {cuisines.map(cuisine => (
                      <option key={cuisine} value={cuisine.toLowerCase()}>{cuisine}</option>
                    ))}
                  </select>
                  
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white text-[#0C0C0C] border-none outline-none"
                  >
                    {locations.map(location => (
                      <option key={location} value={location.toLowerCase()}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-[#8B0000] py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-[#FFF5E1]">
              <div>
                <div className="text-3xl font-bold mb-2">2,500+</div>
                <div className="text-[#FFF5E1]/80">Partner Restaurants</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <div className="text-[#FFF5E1]/80">Happy Diners</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.8★</div>
                <div className="text-[#FFF5E1]/80">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-[#FFF5E1]/80">Booking Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Listings */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#0C0C0C]">
              Available Restaurants ({filteredRestaurants.length})
            </h2>
            <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 border-[#D4AF37] overflow-hidden">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    {restaurant.openNow ? (
                      <Badge className="bg-green-600 text-white">Open Now</Badge>
                    ) : (
                      <Badge className="bg-red-600 text-white">Closed</Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white text-[#8B0000]">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  {restaurant.hasVirtualTour && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-[#D4AF37] text-[#0C0C0C]">
                        <Sparkles className="h-3 w-3 mr-1" />
                        360° Tour
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#0C0C0C]">{restaurant.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">{restaurant.rating}</span>
                      <span className="text-sm text-[#2F2F2F] ml-1">({restaurant.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-[#8B0000] font-medium mb-2">{restaurant.speciality}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-[#2F2F2F]">
                      <ChefHat className="h-4 w-4 mr-2" />
                      <span className="text-sm">{restaurant.cuisine}</span>
                    </div>
                    <div className="flex items-center text-[#2F2F2F]">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{restaurant.location} • {restaurant.distance}</span>
                    </div>
                    <div className="flex items-center text-[#2F2F2F]">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">Response time: {restaurant.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {restaurant.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-[#8B0000]">{restaurant.priceRange}</div>
                    <div className="flex gap-2">
                      {restaurant.hasVirtualTour && (
                        <Link to="/3d-preview">
                          <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]">
                            360° View
                          </Button>
                        </Link>
                      )}
                      <Link to="/booking-confirmation">
                        <Button size="sm" className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                          <Calendar className="h-4 w-4 mr-1" />
                          Book Table
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-[#0C0C0C] mb-2">No restaurants found</h3>
              <p className="text-[#2F2F2F] mb-6">Try adjusting your search criteria or location</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCuisine('all');
                  setSelectedLocation('all');
                }}
                className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* AI Assistant CTA */}
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C0C0C] mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-[#0C0C0C]/90 mb-8 max-w-2xl mx-auto">
              Let our AI assistant help you find the perfect restaurant based on your preferences, occasion, and budget
            </p>
            <Link to="/ai-assistant">
              <Button size="lg" className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] px-8">
                <Sparkles className="mr-2 h-5 w-5" />
                Ask AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dining;
