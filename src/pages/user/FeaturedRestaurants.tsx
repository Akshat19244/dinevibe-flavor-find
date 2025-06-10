
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import RestaurantCard from '@/components/home/restaurant-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

const FeaturedRestaurants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterCuisine, setFilterCuisine] = useState('all');

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
    }
  ];

  const filteredRestaurants = featuredRestaurants
    .filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCuisine === 'all' || restaurant.cuisine === filterCuisine)
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Featured Restaurants
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our top-rated restaurants with exceptional reviews and verified quality
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterCuisine} onValueChange={setFilterCuisine}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                <SelectItem value="Italian">Italian</SelectItem>
                <SelectItem value="Indian">Indian</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
                <SelectItem value="Multi-Cuisine">Multi-Cuisine</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No restaurants found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturedRestaurants;
