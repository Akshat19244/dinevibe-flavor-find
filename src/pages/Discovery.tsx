
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Discovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const restaurants = [
    {
      id: '1',
      name: 'The Royal Feast',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=400',
      cuisine: 'Multi-Cuisine',
      rating: 4.8,
      location: 'Bandra West, Mumbai',
      price: '₹₹₹₹',
      type: 'Fine Dining',
      reviews: 245
    },
    {
      id: '2',
      name: 'Spice Symphony',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=400',
      cuisine: 'Indian',
      rating: 4.6,
      location: 'Connaught Place, Delhi',
      price: '₹₹₹',
      type: 'Fine Dining',
      reviews: 189
    },
    {
      id: '3',
      name: 'Golden Terrace',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=400',
      cuisine: 'Continental',
      rating: 4.7,
      location: 'Koramangala, Bangalore',
      price: '₹₹₹₹',
      type: 'Banquet',
      reviews: 156
    },
    {
      id: '4',
      name: 'Garden Palace',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400',
      cuisine: 'Multi-Cuisine',
      rating: 4.9,
      location: 'Juhu, Mumbai',
      price: '₹₹₹₹₹',
      type: 'Garden Venue',
      reviews: 312
    },
    {
      id: '5',
      name: 'Heritage Grand',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=400',
      cuisine: 'North Indian',
      rating: 4.5,
      location: 'CP, Delhi',
      price: '₹₹₹',
      type: 'Banquet',
      reviews: 98
    },
    {
      id: '6',
      name: 'Coastal Breeze',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400',
      cuisine: 'Seafood',
      rating: 4.4,
      location: 'Marine Drive, Mumbai',
      price: '₹₹₹₹',
      type: 'Fine Dining',
      reviews: 167
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    return restaurant.rating > 4.2 &&
           (searchTerm === '' || restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedCity === '' || restaurant.location.includes(selectedCity)) &&
           (selectedCuisine === '' || restaurant.cuisine === selectedCuisine) &&
           (selectedBudget === '' || restaurant.price === selectedBudget);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1] mb-4">
              Discover Premium Venues
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              Verified restaurants and venues with ratings above 4.2 stars
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#2F2F2F] py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#FFF5E1]/60" />
                <Input 
                  placeholder="Search restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#FFF5E1] border-[#D4AF37]"
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="bg-[#FFF5E1] border-[#D4AF37]">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger className="bg-[#FFF5E1] border-[#D4AF37]">
                  <SelectValue placeholder="Cuisine Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indian">Indian</SelectItem>
                  <SelectItem value="Continental">Continental</SelectItem>
                  <SelectItem value="Multi-Cuisine">Multi-Cuisine</SelectItem>
                  <SelectItem value="Seafood">Seafood</SelectItem>
                  <SelectItem value="North Indian">North Indian</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                <SelectTrigger className="bg-[#FFF5E1] border-[#D4AF37]">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="₹₹">₹₹ (Budget)</SelectItem>
                  <SelectItem value="₹₹₹">₹₹₹ (Mid-range)</SelectItem>
                  <SelectItem value="₹₹₹₹">₹₹₹₹ (Premium)</SelectItem>
                  <SelectItem value="₹₹₹₹₹">₹₹₹₹₹ (Luxury)</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCity('');
                  setSelectedCuisine('');
                  setSelectedBudget('');
                }}
                variant="outline"
                className="border-[#D4AF37] text-[#FFF5E1] hover:bg-[#D4AF37] hover:text-[#0C0C0C]"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0C0C0C]">
              {filteredRestaurants.length} Premium Venues Found
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="card-luxury overflow-hidden">
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#8B0000] text-[#FFF5E1] px-2 py-1 rounded-full text-sm font-semibold">
                    {restaurant.price}
                  </div>
                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#0C0C0C] px-2 py-1 rounded-full text-sm font-semibold">
                    {restaurant.type}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">{restaurant.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-[#2F2F2F]">{restaurant.cuisine}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-[#D4AF37] fill-current" />
                      <span className="ml-1 font-semibold">{restaurant.rating}</span>
                      <span className="ml-1 text-sm text-[#2F2F2F]">({restaurant.reviews})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="h-4 w-4 text-[#8B0000]" />
                    <span className="text-[#2F2F2F] text-sm">{restaurant.location}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/restaurant/${restaurant.id}`} className="flex-1">
                      <Button className="w-full btn-primary">View Details</Button>
                    </Link>
                    <Link to={`/book/${restaurant.id}`}>
                      <Button className="btn-secondary">Book Now</Button>
                    </Link>
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

export default Discovery;
