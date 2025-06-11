
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Star, MapPin, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dining: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guestCount, setGuestCount] = useState('');

  const diningRestaurants = [
    {
      id: '1',
      name: 'The Royal Feast',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=400',
      cuisine: 'Multi-Cuisine',
      rating: 4.8,
      location: 'Bandra West, Mumbai',
      price: '₹₹₹₹',
      availability: 'Available',
      waitTime: '15 mins',
      speciality: 'Live Kitchen'
    },
    {
      id: '2',
      name: 'Spice Symphony',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=400',
      cuisine: 'Indian',
      rating: 4.6,
      location: 'Connaught Place, Delhi',
      price: '₹₹₹',
      availability: 'Available',
      waitTime: '10 mins',
      speciality: 'Tandoor Special'
    },
    {
      id: '3',
      name: 'Coastal Breeze',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400',
      cuisine: 'Seafood',
      rating: 4.4,
      location: 'Marine Drive, Mumbai',
      price: '₹₹₹₹',
      availability: 'Filling Fast',
      waitTime: '25 mins',
      speciality: 'Ocean View'
    },
    {
      id: '4',
      name: 'Heritage Dining',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=400',
      cuisine: 'North Indian',
      rating: 4.5,
      location: 'Karol Bagh, Delhi',
      price: '₹₹₹',
      availability: 'Available',
      waitTime: '20 mins',
      speciality: 'Traditional Ambiance'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1] mb-4">
              Premium Dining Experience
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              Book tables at finest restaurants for an unforgettable dining experience
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-[#2F2F2F] py-8">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-[#FFF5E1] border-[#D4AF37]">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C] text-center flex items-center justify-center">
                  <ChefHat className="mr-2 h-6 w-6 text-[#8B0000]" />
                  Find Your Perfect Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                    <Input 
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="pl-10 border-[#D4AF37]"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="pl-10 border-[#D4AF37]">
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                    <Select value={guestCount} onValueChange={setGuestCount}>
                      <SelectTrigger className="pl-10 border-[#D4AF37]">
                        <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="btn-primary">
                    Search Tables
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Restaurants */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0C0C0C] mb-2">Available Restaurants</h2>
            <p className="text-[#2F2F2F]">Premium dining establishments with immediate availability</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diningRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="card-luxury overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#8B0000] text-[#FFF5E1] px-2 py-1 rounded-full text-sm font-semibold">
                      {restaurant.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#0C0C0C]">{restaurant.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-[#D4AF37] fill-current" />
                        <span className="ml-1 font-semibold">{restaurant.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-[#2F2F2F] mb-2">{restaurant.cuisine}</p>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="h-4 w-4 text-[#8B0000]" />
                      <span className="text-sm text-[#2F2F2F]">{restaurant.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm font-semibold ${
                        restaurant.availability === 'Available' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {restaurant.availability}
                      </span>
                      <span className="text-sm text-[#2F2F2F]">Wait: {restaurant.waitTime}</span>
                    </div>
                    
                    <div className="bg-[#D4AF37]/10 p-2 rounded mb-4">
                      <span className="text-sm font-medium text-[#8B0000]">
                        ✨ {restaurant.speciality}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link to={`/restaurant/${restaurant.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]">
                          View Menu
                        </Button>
                      </Link>
                      <Link to={`/book/${restaurant.id}`}>
                        <Button className="btn-primary">Book Table</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Features */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#FFF5E1] mb-4">Why Choose DineVibe?</h2>
              <p className="text-[#FFF5E1]/80 max-w-2xl mx-auto">
                Premium dining experiences with exclusive benefits and seamless booking
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-[#FFF5E1]" />
                </div>
                <h3 className="text-xl font-semibold text-[#FFF5E1] mb-2">Instant Booking</h3>
                <p className="text-[#FFF5E1]/80">Real-time availability and instant confirmation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-[#0C0C0C]" />
                </div>
                <h3 className="text-xl font-semibold text-[#FFF5E1] mb-2">Premium Only</h3>
                <p className="text-[#FFF5E1]/80">Only restaurants with 4.2+ ratings</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="h-8 w-8 text-[#FFF5E1]" />
                </div>
                <h3 className="text-xl font-semibold text-[#FFF5E1] mb-2">Curated Experience</h3>
                <p className="text-[#FFF5E1]/80">Hand-picked restaurants for exceptional dining</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dining;
