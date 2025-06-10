import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemSelect } from '@/components/ui/system-select';
import { Star, Search, Filter, MapPin, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const FeaturedRestaurants: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Featured restaurants data - restaurants with rating > 4.2
  const featuredRestaurants = [
    {
      id: '1',
      name: 'Bella Italia Ristorante',
      imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1000',
      cuisine: 'Italian',
      rating: 4.7,
      priceRange: '₹₹₹',
      location: 'Bandra West, Mumbai',
      isNew: false,
      hasDeals: true,
      waitTime: 15
    },
    {
      id: '2',
      name: 'Spice Garden',
      imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000',
      cuisine: 'Indian',
      rating: 4.5,
      priceRange: '₹₹',
      location: 'Juhu, Mumbai',
      isNew: true,
      hasDeals: false,
      waitTime: 8
    },
    {
      id: '3',
      name: 'Sakura Sushi',
      imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1000',
      cuisine: 'Japanese',
      rating: 4.6,
      priceRange: '₹₹₹₹',
      location: 'Lower Parel, Mumbai',
      isNew: false,
      hasDeals: false,
      waitTime: 25
    },
    {
      id: '4',
      name: 'The Royal Feast',
      imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000',
      cuisine: 'Multi-Cuisine',
      rating: 4.8,
      priceRange: '₹₹₹₹',
      location: 'Andheri East, Mumbai',
      isNew: false,
      hasDeals: true,
      waitTime: 0
    },
    {
      id: '5',
      name: 'Mumbai Darbar',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000',
      cuisine: 'North Indian',
      rating: 4.4,
      priceRange: '₹₹₹',
      location: 'Colaba, Mumbai',
      isNew: false,
      hasDeals: true,
      waitTime: 12
    },
    {
      id: '6',
      name: 'Coastal Breeze',
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000',
      cuisine: 'Seafood',
      rating: 4.3,
      priceRange: '₹₹₹',
      location: 'Worli, Mumbai',
      isNew: true,
      hasDeals: false,
      waitTime: 5
    }
  ];

  const cuisineOptions = [
    { value: '', label: 'All Cuisines' },
    { value: 'italian', label: 'Italian' },
    { value: 'indian', label: 'Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'thai', label: 'Thai' },
  ];

  const priceRangeOptions = [
    { value: '', label: 'All Price Ranges' },
    { value: '₹', label: '₹' },
    { value: '₹₹', label: '₹₹' },
    { value: '₹₹₹', label: '₹₹₹' },
    { value: '₹₹₹₹', label: '₹₹₹₹' },
  ];

  const sortOptions = [
    { value: 'rating', label: 'Rating' },
    { value: 'price', label: 'Price' },
    { value: 'name', label: 'Name' },
  ];

  const filteredRestaurants = featuredRestaurants.filter((restaurant) => {
    const searchTermMatch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const cuisineMatch = selectedCuisine ? restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase() : true;
    const priceRangeMatch = selectedPriceRange ? restaurant.priceRange === selectedPriceRange : true;

    return searchTermMatch && cuisineMatch && priceRangeMatch;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'price') {
      // Basic price comparison - improve as needed
      return a.priceRange.length - b.priceRange.length;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName={user?.user_metadata?.name || 'User'} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Featured Restaurants</h1>
            <p className="text-xl text-white/90">Discover top-rated restaurants with ratings above 4.2 stars</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-100 py-8">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <SystemSelect
                value={selectedCuisine}
                onValueChange={(value) => setSelectedCuisine(value)}
                options={cuisineOptions}
                placeholder="Select Cuisine"
              />
              <SystemSelect
                value={selectedPriceRange}
                onValueChange={(value) => setSelectedPriceRange(value)}
                options={priceRangeOptions}
                placeholder="Select Price Range"
              />
            </div>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="relative">
                  <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    {restaurant.isNew && (
                      <Badge className="bg-green-600 text-white">New</Badge>
                    )}
                    {restaurant.hasDeals && (
                      <Badge className="bg-orange-600 text-white">Deals</Badge>
                    )}
                  </div>
                  {restaurant.waitTime > 0 && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {restaurant.waitTime}m
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                    <p className="text-slate-600 text-sm">{restaurant.cuisine}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{restaurant.rating}</span>
                        <span className="text-slate-600">({restaurant.priceRange})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-slate-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {restaurant.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturedRestaurants;
