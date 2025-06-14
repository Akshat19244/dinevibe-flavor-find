
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  MapPin, 
  Star, 
  Users, 
  IndianRupee, 
  Filter,
  Eye,
  Heart,
  Clock
} from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  priceRange: string;
  location: string;
  cuisine: string;
  features: string[];
  has360View: boolean;
  isTopRated: boolean;
  estimatedTime: string;
  minPricePerGuest: number;
  maxPricePerGuest: number;
}

interface FilterState {
  location: string;
  cuisine: string;
  priceRange: [number, number];
  rating: number;
  features: string[];
  sortBy: string;
}

const DiscoveryFilters: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    cuisine: '',
    priceRange: [1000, 10000],
    rating: 4.0,
    features: [],
    sortBy: 'rating'
  });

  const [restaurants] = useState<Restaurant[]>([
    {
      id: '1',
      name: 'Skyline Rooftop Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400',
      rating: 4.8,
      priceRange: '₹2,000-4,000',
      location: 'Bandra, Mumbai',
      cuisine: 'Multi-Cuisine',
      features: ['Rooftop', 'Live Music', 'City Views', 'Romantic'],
      has360View: true,
      isTopRated: true,
      estimatedTime: '45 mins',
      minPricePerGuest: 2000,
      maxPricePerGuest: 4000
    },
    {
      id: '2',
      name: 'Garden Paradise',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400',
      rating: 4.6,
      priceRange: '₹1,500-3,000',
      location: 'CP, Delhi',
      cuisine: 'Indian & Continental',
      features: ['Garden Setting', 'Family Friendly', 'Outdoor Seating'],
      has360View: true,
      isTopRated: false,
      estimatedTime: '30 mins',
      minPricePerGuest: 1500,
      maxPricePerGuest: 3000
    },
    {
      id: '3',
      name: 'Elegant Indoors',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=400',
      rating: 4.7,
      priceRange: '₹2,500-5,000',
      location: 'Koramangala, Bangalore',
      cuisine: 'Fine Dining',
      features: ['Private Booths', 'Intimate Setting', 'Premium Service'],
      has360View: false,
      isTopRated: true,
      estimatedTime: '60 mins',
      minPricePerGuest: 2500,
      maxPricePerGuest: 5000
    },
    {
      id: '4',
      name: 'Beachside Cafe',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400',
      rating: 4.4,
      priceRange: '₹1,200-2,500',
      location: 'Juhu, Mumbai',
      cuisine: 'Seafood & Continental',
      features: ['Beach View', 'Casual Dining', 'Live Music'],
      has360View: true,
      isTopRated: false,
      estimatedTime: '35 mins',
      minPricePerGuest: 1200,
      maxPricePerGuest: 2500
    }
  ]);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleFeature = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    // Location filter
    if (filters.location && !restaurant.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Cuisine filter
    if (filters.cuisine && !restaurant.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())) {
      return false;
    }
    
    // Price range filter
    const [minPrice, maxPrice] = filters.priceRange;
    if (restaurant.maxPricePerGuest < minPrice || restaurant.minPricePerGuest > maxPrice) {
      return false;
    }
    
    // Rating filter
    if (restaurant.rating < filters.rating) {
      return false;
    }
    
    // Features filter
    if (filters.features.length > 0) {
      const hasFeature = filters.features.some(feature => 
        restaurant.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
      );
      if (!hasFeature) return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.minPricePerGuest - b.minPricePerGuest;
      case 'price-high':
        return b.maxPricePerGuest - a.maxPricePerGuest;
      case 'trending':
        return b.isTopRated ? 1 : -1;
      default:
        return b.rating - a.rating;
    }
  });

  const clearFilters = () => {
    setFilters({
      location: '',
      cuisine: '',
      priceRange: [1000, 10000],
      rating: 4.0,
      features: [],
      sortBy: 'rating'
    });
  };

  const popularFeatures = ['Rooftop', 'Live Music', 'Garden Setting', 'Private Booths', 'Beach View', 'Family Friendly'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-[#D4AF37] sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-[#8B0000]" />
                  Filters
                </span>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location */}
              <div>
                <Label>Location</Label>
                <Input
                  placeholder="Search by location..."
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="border-[#D4AF37]"
                />
              </div>

              {/* Cuisine */}
              <div>
                <Label>Cuisine Type</Label>
                <Select value={filters.cuisine} onValueChange={(value) => updateFilter('cuisine', value)}>
                  <SelectTrigger className="border-[#D4AF37]">
                    <SelectValue placeholder="All cuisines" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Cuisines</SelectItem>
                    <SelectItem value="multi-cuisine">Multi-Cuisine</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="continental">Continental</SelectItem>
                    <SelectItem value="fine-dining">Fine Dining</SelectItem>
                    <SelectItem value="seafood">Seafood</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <Label>Price Range (per person)</Label>
                <div className="px-2 mt-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilter('priceRange', value)}
                    max={10000}
                    min={500}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-[#2F2F2F] mt-1">
                    <span>₹{filters.priceRange[0]}</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <Label>Minimum Rating</Label>
                <Select 
                  value={filters.rating.toString()} 
                  onValueChange={(value) => updateFilter('rating', parseFloat(value))}
                >
                  <SelectTrigger className="border-[#D4AF37]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.0">4.0+ ⭐</SelectItem>
                    <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                    <SelectItem value="4.7">4.7+ ⭐</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Features */}
              <div>
                <Label>Features</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularFeatures.map((feature) => (
                    <Badge
                      key={feature}
                      variant={filters.features.includes(feature) ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        filters.features.includes(feature)
                          ? 'bg-[#8B0000] text-[#FFF5E1]'
                          : 'border-[#D4AF37] text-[#8B0000] hover:bg-[#D4AF37]/10'
                      }`}
                      onClick={() => toggleFeature(feature)}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <Label>Sort By</Label>
                <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="border-[#D4AF37]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="trending">Trending Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#0C0C0C]">
              {filteredRestaurants.length} Restaurants Found
            </h2>
            <Badge variant="outline" className="border-[#D4AF37] text-[#8B0000]">
              Top Rated Spots in Your City
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="border-[#D4AF37] hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {restaurant.isTopRated && (
                      <Badge className="bg-[#8B0000] text-[#FFF5E1]">
                        Top Rated
                      </Badge>
                    )}
                    {restaurant.has360View && (
                      <Badge className="bg-blue-600 text-white">
                        360° View
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/90 hover:bg-white text-[#2F2F2F]"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 rounded-full px-3 py-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold ml-1">{restaurant.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-[#0C0C0C] mb-2">{restaurant.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-[#2F2F2F] text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{restaurant.location}</span>
                    </div>
                    <div className="flex items-center text-[#2F2F2F] text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{restaurant.cuisine}</span>
                    </div>
                    <div className="flex items-center text-[#2F2F2F] text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Est. {restaurant.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {restaurant.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-[#D4AF37] text-[#8B0000]">
                        {feature}
                      </Badge>
                    ))}
                    {restaurant.features.length > 3 && (
                      <Badge variant="outline" className="text-xs border-[#2F2F2F] text-[#2F2F2F]">
                        +{restaurant.features.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-[#8B0000]">{restaurant.priceRange}</div>
                      <div className="text-sm text-[#2F2F2F]">per person</div>
                    </div>
                    <div className="flex space-x-2">
                      {restaurant.has360View && (
                        <Button variant="outline" size="sm" className="border-[#D4AF37] text-[#D4AF37]">
                          <Eye className="h-4 w-4 mr-1" />
                          360°
                        </Button>
                      )}
                      <Button size="sm" className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                        Book Table
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-[#D4AF37]" />
              <h3 className="text-xl font-semibold text-[#0C0C0C] mb-2">No restaurants found</h3>
              <p className="text-[#2F2F2F] mb-4">Try adjusting your filters to see more options</p>
              <Button 
                variant="outline" 
                className="border-[#D4AF37] text-[#D4AF37]"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryFilters;
