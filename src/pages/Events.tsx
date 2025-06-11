
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, IndianRupee, Sparkles, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [budget, setBudget] = useState('');
  const [preference, setPreference] = useState('');

  const eventVenues = [
    {
      id: '1',
      name: 'Royal Garden Palace',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=400',
      type: 'Garden Venue',
      capacity: '200-500',
      rating: 4.9,
      location: 'Juhu, Mumbai',
      price: '₹80,000 - ₹2,00,000',
      specialities: ['Garden Setting', 'Premium Catering', 'Decoration']
    },
    {
      id: '2',
      name: 'Grand Banquet Hall',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400',
      type: 'Banquet Hall',
      capacity: '100-300',
      rating: 4.7,
      location: 'CP, Delhi',
      price: '₹50,000 - ₹1,50,000',
      specialities: ['AC Hall', 'Stage Setup', 'Audio/Visual']
    },
    {
      id: '3',
      name: 'Luxury Resort',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
      type: 'Resort',
      capacity: '50-200',
      rating: 4.8,
      location: 'Goa',
      price: '₹1,00,000 - ₹5,00,000',
      specialities: ['Beach View', 'Accommodation', 'Full Service']
    },
    {
      id: '4',
      name: 'Heritage Hotel',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400',
      type: 'Hotel',
      capacity: '150-400',
      rating: 4.6,
      location: 'Rajasthan',
      price: '₹75,000 - ₹3,00,000',
      specialities: ['Royal Ambiance', 'Heritage Architecture', 'Traditional Cuisine']
    }
  ];

  const eventTypes = [
    { value: 'wedding', label: 'Wedding', icon: '💒' },
    { value: 'birthday', label: 'Birthday', icon: '🎂' },
    { value: 'conference', label: 'Conference', icon: '💼' },
    { value: 'anniversary', label: 'Anniversary', icon: '💕' },
    { value: 'corporate', label: 'Corporate Event', icon: '🏢' },
    { value: 'custom', label: 'Custom Event', icon: '🎉' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1] mb-4">
              Luxury Event Planning
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              Create unforgettable moments with our premium venues and AI-powered planning
            </p>
          </div>
        </div>

        {/* Event Planning Wizard */}
        <div className="bg-[#2F2F2F] py-12">
          <div className="container mx-auto px-4">
            <Card className="max-w-6xl mx-auto bg-[#FFF5E1] border-[#D4AF37]">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C] text-center text-2xl">
                  <Sparkles className="inline mr-2 h-6 w-6 text-[#8B0000]" />
                  Plan Your Perfect Event
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Event Type */}
                <div>
                  <h3 className="text-lg font-semibold text-[#0C0C0C] mb-4">Step 1: Select Event Type</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {eventTypes.map((type) => (
                      <Card 
                        key={type.value}
                        className={`cursor-pointer transition-all ${
                          eventType === type.value 
                            ? 'ring-2 ring-[#8B0000] bg-[#8B0000]/10' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setEventType(type.value)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <div className="font-medium text-[#0C0C0C]">{type.label}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Step 2: Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Guest Count</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                      <Select value={guestCount} onValueChange={setGuestCount}>
                        <SelectTrigger className="pl-10 border-[#D4AF37]">
                          <SelectValue placeholder="Number of Guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50-100 Guests</SelectItem>
                          <SelectItem value="150">100-200 Guests</SelectItem>
                          <SelectItem value="300">200-400 Guests</SelectItem>
                          <SelectItem value="500">400+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Budget Range</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                      <Select value={budget} onValueChange={setBudget}>
                        <SelectTrigger className="pl-10 border-[#D4AF37]">
                          <SelectValue placeholder="Select Budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">₹50,000 - ₹1,00,000</SelectItem>
                          <SelectItem value="mid">₹1,00,000 - ₹3,00,000</SelectItem>
                          <SelectItem value="premium">₹3,00,000 - ₹5,00,000</SelectItem>
                          <SelectItem value="luxury">₹5,00,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Food Preference</label>
                    <Select value={preference} onValueChange={setPreference}>
                      <SelectTrigger className="border-[#D4AF37]">
                        <SelectValue placeholder="Food Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                        <SelectItem value="mixed">Mixed Menu</SelectItem>
                        <SelectItem value="custom">Custom Menu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link to="/ai-assistant" className="flex-1">
                    <Button className="w-full btn-secondary">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get AI Recommendations
                    </Button>
                  </Link>
                  <Button className="flex-1 btn-primary">
                    Search Venues
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Venues */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0C0C0C] mb-2">Premium Event Venues</h2>
            <p className="text-[#2F2F2F]">Handpicked venues for your special occasions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventVenues.map((venue) => (
              <Card key={venue.id} className="card-luxury overflow-hidden">
                <div className="relative">
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#8B0000] text-[#FFF5E1] px-3 py-1 rounded-full text-sm font-semibold">
                    {venue.type}
                  </div>
                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#0C0C0C] px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {venue.rating}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">{venue.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-[#2F2F2F] font-medium">Capacity: {venue.capacity}</span>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-[#8B0000]" />
                      <span className="text-sm text-[#2F2F2F]">{venue.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-[#8B0000] mb-2">{venue.price}</p>
                    <div className="flex flex-wrap gap-2">
                      {venue.specialities.map((spec, index) => (
                        <span key={index} className="bg-[#D4AF37]/20 text-[#8B0000] px-2 py-1 rounded-full text-xs font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/venue/${venue.id}`} className="flex-1">
                      <Button variant="outline" className="w-full border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]">
                        View Details
                      </Button>
                    </Link>
                    <Link to={`/book-event/${venue.id}`}>
                      <Button className="btn-primary">Book Venue</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Assistant Teaser */}
        <div className="bg-gradient-to-r from-[#8B0000] to-[#D4AF37] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-[#FFF5E1] mb-4">Let AI Plan Your Perfect Event</h2>
            <p className="text-xl text-[#FFF5E1]/90 mb-8 max-w-2xl mx-auto">
              Our advanced AI assistant analyzes your preferences to create personalized event recommendations
            </p>
            <Link to="/ai-assistant">
              <Button className="bg-[#FFF5E1] text-[#0C0C0C] hover:bg-[#FFF5E1]/90 px-8 py-4 text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Try AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
