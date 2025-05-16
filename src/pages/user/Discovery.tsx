
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import RestaurantCard from '@/components/home/restaurant-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  MapPin, 
  Filter, 
  ChevronDown,
  Star,
  DollarSign,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";

// Sample data for restaurants
const allRestaurants = [
  {
    id: '1',
    name: 'The Savory Plate',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    cuisine: 'Italian',
    rating: 4.7,
    priceRange: '$$',
    location: '123 Main St, Anytown',
    isNew: true,
  },
  {
    id: '2',
    name: 'Urban Spice Fusion',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    cuisine: 'Indian Fusion',
    rating: 4.5,
    priceRange: '$$$',
    location: '456 Oak St, Metropolis',
    hasDeals: true,
  },
  {
    id: '3',
    name: 'Sea & Smoke Grill',
    imageUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    cuisine: 'Seafood',
    rating: 4.9,
    priceRange: '$$$',
    location: '789 Pier Ave, Bayfront',
  },
  {
    id: '4',
    name: 'Bamboo Garden',
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    cuisine: 'Asian',
    rating: 4.3,
    priceRange: '$$',
    location: '101 Lotus Ln, Springfield',
    hasDeals: true,
  },
  {
    id: '5',
    name: 'Coffee & Pastry Co',
    imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    cuisine: 'Cafe',
    rating: 4.2,
    priceRange: '$',
    location: '222 Baker St, Centertown',
    isNew: true,
  },
  {
    id: '6',
    name: 'Taco Heaven',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    cuisine: 'Mexican',
    rating: 4.6,
    priceRange: '$$',
    location: '333 Salsa Blvd, Westside',
    hasDeals: true,
  },
  {
    id: '7',
    name: 'Noodle House',
    imageUrl: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    cuisine: 'Japanese',
    rating: 4.8,
    priceRange: '$$',
    location: '444 Ramen Rd, Eastside',
  },
  {
    id: '8',
    name: 'The Green Table',
    imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    cuisine: 'Vegetarian',
    rating: 4.4,
    priceRange: '$$',
    location: '555 Veggie Way, Garden District',
    isNew: true,
  },
];

const Discovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number[]>([3]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter restaurants based on search criteria
  const filteredRestaurants = allRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCuisine = cuisine === '' || restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase());
    
    const matchesPriceRange = priceRange.length === 0 || priceRange.includes(restaurant.priceRange);
    
    const matchesRating = restaurant.rating >= minRating[0];
    
    return matchesSearch && matchesCuisine && matchesPriceRange && matchesRating;
  });
  
  const togglePriceRange = (price: string) => {
    if (priceRange.includes(price)) {
      setPriceRange(priceRange.filter(p => p !== price));
    } else {
      setPriceRange([...priceRange, price]);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName="John" />
      
      <main className="flex-grow">
        {/* Search header */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-6">Discover Restaurants</h1>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search restaurants, cuisines, or locations..." 
                  className="pl-10 border-0 shadow-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-white text-dineVibe-primary flex-shrink-0"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Near Me
                </Button>
                
                <Button 
                  variant={showFilters ? "default" : "outline"}
                  className={`flex-shrink-0 ${showFilters ? 'bg-white text-dineVibe-primary' : 'bg-white text-dineVibe-primary'}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="bg-white rounded-md shadow-lg p-6 mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cuisine filter */}
                <div>
                  <h3 className="font-medium mb-3">Cuisine</h3>
                  <Select value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Cuisines</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="seafood">Seafood</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="cafe">Cafe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Price range filter */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className={priceRange.includes('$') ? 'bg-dineVibe-primary text-white border-dineVibe-primary' : ''}
                      onClick={() => togglePriceRange('$')}
                    >
                      <DollarSign className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="sm"
                      className={priceRange.includes('$$') ? 'bg-dineVibe-primary text-white border-dineVibe-primary' : ''}
                      onClick={() => togglePriceRange('$$')}
                    >
                      <DollarSign className="h-4 w-4" />
                      <DollarSign className="h-4 w-4 -ml-2" />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="sm"
                      className={priceRange.includes('$$$') ? 'bg-dineVibe-primary text-white border-dineVibe-primary' : ''}
                      onClick={() => togglePriceRange('$$$')}
                    >
                      <DollarSign className="h-4 w-4" />
                      <DollarSign className="h-4 w-4 -ml-2" />
                      <DollarSign className="h-4 w-4 -ml-2" />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="sm"
                      className={priceRange.includes('$$$$') ? 'bg-dineVibe-primary text-white border-dineVibe-primary' : ''}
                      onClick={() => togglePriceRange('$$$$')}
                    >
                      <DollarSign className="h-4 w-4" />
                      <DollarSign className="h-4 w-4 -ml-2" />
                      <DollarSign className="h-4 w-4 -ml-2" />
                      <DollarSign className="h-4 w-4 -ml-2" />
                    </Button>
                  </div>
                </div>
                
                {/* Rating filter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Minimum Rating</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1">{minRating[0].toFixed(1)}+</span>
                    </div>
                  </div>
                  <Slider
                    defaultValue={minRating}
                    max={5}
                    min={0}
                    step={0.5}
                    onValueChange={setMinRating}
                    className="py-4"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Results */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">{filteredRestaurants.length} restaurants found</h2>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
          
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
              <Button onClick={() => {
                setSearchTerm('');
                setCuisine('');
                setPriceRange([]);
                setMinRating([3]);
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Discovery;
