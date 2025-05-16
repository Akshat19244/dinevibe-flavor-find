
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, DollarSign, Calendar, Clock, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RestaurantCard from '@/components/home/restaurant-card';

// Sample data for planning suggestions
const sampleSuggestions = [
  {
    id: 'p1',
    name: 'The Grand Lounge',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    cuisine: 'Fine Dining',
    rating: 4.8,
    priceRange: '$$$',
    location: '123 Elite Ave, Downtown',
    description: 'Perfect for large groups with private dining areas.',
    capacity: 30,
  },
  {
    id: 'p2',
    name: 'Sunset Terrace',
    imageUrl: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    cuisine: 'Mediterranean',
    rating: 4.6,
    priceRange: '$$',
    location: '456 Ocean View, Seaside',
    description: 'Beautiful outdoor seating with ocean views.',
    capacity: 15,
  },
  {
    id: 'p3',
    name: 'Garden Bistro',
    imageUrl: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    cuisine: 'Farm-to-Table',
    rating: 4.5,
    priceRange: '$$',
    location: '789 Green Valley Rd, Hillside',
    description: 'Charming garden setting with fresh, seasonal ingredients.',
    capacity: 20,
  },
  {
    id: 'p4',
    name: 'Metro Fusion',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    cuisine: 'Asian Fusion',
    rating: 4.7,
    priceRange: '$$$',
    location: '101 Urban Square, Cityscape',
    description: 'Modern ambiance with private event spaces.',
    capacity: 25,
  },
];

const Planning: React.FC = () => {
  const [partySize, setPartySize] = useState<number[]>([8]);
  const [budget, setBudget] = useState<number[]>([150]);
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const handleSearch = () => {
    // In a real app, this would search the database
    // For now, we'll just show the sample results
    setShowResults(true);
  };
  
  // Filter suggestions based on input
  const filteredSuggestions = sampleSuggestions.filter(suggestion => {
    const matchesPartySize = suggestion.capacity >= partySize[0];
    const matchesBudget = suggestion.priceRange.length <= budget[0] / 50; // Simple mapping $=50, $$=100, $$$=150
    const matchesLocation = !location || suggestion.location.toLowerCase().includes(location.toLowerCase());
    const matchesCuisine = !cuisine || suggestion.cuisine.toLowerCase().includes(cuisine.toLowerCase());
    
    return matchesPartySize && matchesBudget && matchesLocation && matchesCuisine;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName="John" />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-4">Plan Your Perfect Dining Experience</h1>
            <p className="text-white mb-2">Tell us what you're looking for and we'll find the perfect spot</p>
          </div>
        </div>
        
        {/* Planning form */}
        <div className="container mx-auto px-4 py-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Party Size</Label>
                      <span className="text-dineVibe-primary font-medium">{partySize[0]} people</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <Slider
                        value={partySize}
                        min={1}
                        max={30}
                        step={1}
                        onValueChange={setPartySize}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Budget per Person</Label>
                      <span className="text-dineVibe-primary font-medium">${budget[0]}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                      <Slider
                        value={budget}
                        min={20}
                        max={300}
                        step={10}
                        onValueChange={setBudget}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location" className="mb-2 block">Location</Label>
                    <div className="flex">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-2.5" />
                      <Input
                        id="location"
                        placeholder="Enter area or neighborhood"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cuisine" className="mb-2 block">Cuisine Preference</Label>
                    <Select value={cuisine} onValueChange={setCuisine}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cuisine type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Cuisine</SelectItem>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="fine dining">Fine Dining</SelectItem>
                        <SelectItem value="farm-to-table">Farm-to-Table</SelectItem>
                        <SelectItem value="fusion">Fusion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date" className="mb-2 block">Preferred Date</Label>
                    <div className="flex">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-2.5" />
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="time" className="mb-2 block">Preferred Time</Label>
                    <div className="flex">
                      <Clock className="h-5 w-5 text-gray-500 mr-2 mt-2.5" />
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button 
                  onClick={handleSearch}
                  className="bg-dineVibe-primary hover:bg-dineVibe-primary/90 w-full md:w-auto"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Find Perfect Venues
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Results section */}
        {showResults && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Perfect Venues for Your Event</h2>
            
            {filteredSuggestions.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">
                  We found {filteredSuggestions.length} venues that match your criteria
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="flex flex-col h-full">
                      <RestaurantCard
                        id={suggestion.id}
                        name={suggestion.name}
                        imageUrl={suggestion.imageUrl}
                        cuisine={suggestion.cuisine}
                        rating={suggestion.rating}
                        priceRange={suggestion.priceRange}
                        location={suggestion.location}
                      />
                      <div className="mt-2 bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-700">{suggestion.description}</p>
                        <p className="text-sm font-medium mt-1">
                          <Users className="inline h-4 w-4 mr-1" />
                          Capacity: {suggestion.capacity} people
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No matching venues found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your criteria for more results</p>
                <Button onClick={() => {
                  setPartySize([8]);
                  setBudget([150]);
                  setLocation('');
                  setCuisine('');
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Planning;
