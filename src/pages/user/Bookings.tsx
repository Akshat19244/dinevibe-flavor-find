
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, ChevronRight, TicketCheck, Share2, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample data for bookings
const bookings = {
  upcoming: [
    {
      id: 'b1',
      restaurantName: 'The Grand Bistro',
      imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      date: new Date('2025-06-12T19:30:00'),
      location: '123 Fine Dining Blvd, Uptown',
      guests: 2,
      status: 'confirmed',
      specialRequests: 'Window table if possible',
      bookingCode: 'GRB7891',
      phoneNumber: '+1 (555) 123-4567',
    },
    {
      id: 'b2',
      restaurantName: 'Sushi Express',
      imageUrl: 'https://images.unsplash.com/photo-1534256958597-7fe685cbd745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      date: new Date('2025-06-18T18:00:00'),
      location: '456 Ocean Drive, Seaside',
      guests: 4,
      status: 'confirmed',
      specialRequests: 'Birthday celebration - bringing cake',
      bookingCode: 'SUS4562',
      phoneNumber: '+1 (555) 987-6543',
    },
  ],
  past: [
    {
      id: 'b3',
      restaurantName: 'Italian Dreams',
      imageUrl: 'https://images.unsplash.com/photo-1465078106647-13c17d4deed1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: new Date('2025-05-25T20:00:00'),
      location: '789 Pasta Lane, Little Italy',
      guests: 2,
      status: 'completed',
      specialRequests: '',
      bookingCode: 'ITD3314',
      phoneNumber: '+1 (555) 321-7890',
    },
    {
      id: 'b4',
      restaurantName: 'Burger & Brew',
      imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1068&q=80',
      date: new Date('2025-05-10T19:30:00'),
      location: '101 Craft Lane, Downtown',
      guests: 6,
      status: 'completed',
      specialRequests: 'Outside seating preferred',
      bookingCode: 'BNB5678',
      phoneNumber: '+1 (555) 555-1212',
    },
    {
      id: 'b5',
      restaurantName: 'Tandoor Palace',
      imageUrl: 'https://images.unsplash.com/photo-1542367592-8849eb950fd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      date: new Date('2025-04-28T18:30:00'),
      location: '222 Spice Road, East End',
      guests: 3,
      status: 'cancelled',
      cancellationReason: 'Family emergency',
      bookingCode: 'TDP9012',
      phoneNumber: '+1 (555) 444-3333',
    },
  ]
};

// Function to format the date
const formatBookingDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Function to format the time
const formatBookingTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName="John" />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Your Bookings</h1>
            <p className="text-white text-opacity-90">
              Manage your restaurant reservations
            </p>
          </div>
        </div>
        
        {/* Bookings list */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" className="hidden md:flex">
                <Calendar className="h-4 w-4 mr-2" />
                Make New Reservation
              </Button>
            </div>
            
            <TabsContent value="upcoming" className="mt-0">
              {bookings.upcoming.length > 0 ? (
                <div className="space-y-6">
                  {bookings.upcoming.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          <div className="relative h-48 md:h-full">
                            <img 
                              src={booking.imageUrl} 
                              alt={booking.restaurantName} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <div className="text-center px-4">
                                <h3 className="text-white font-bold text-xl mb-1">{booking.restaurantName}</h3>
                                <Badge className="bg-green-500 text-white border-0">
                                  {booking.status.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-span-2 p-6">
                            <div className="flex flex-col h-full justify-between">
                              <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div className="flex items-center text-gray-700">
                                    <Calendar className="h-5 w-5 mr-2 text-dineVibe-primary" />
                                    <span className="font-medium">{formatBookingDate(booking.date)}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-gray-700">
                                    <Clock className="h-5 w-5 mr-2 text-dineVibe-primary" />
                                    <span className="font-medium">{formatBookingTime(booking.date)}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-gray-700">
                                    <MapPin className="h-5 w-5 mr-2 text-dineVibe-primary" />
                                    <span>{booking.location}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-gray-700">
                                    <Users className="h-5 w-5 mr-2 text-dineVibe-primary" />
                                    <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-md">
                                  <TicketCheck className="h-5 w-5 mr-2 text-dineVibe-primary" />
                                  <div>
                                    <span className="text-sm text-gray-500">Booking Reference</span>
                                    <div className="font-medium">{booking.bookingCode}</div>
                                  </div>
                                </div>
                                
                                {booking.specialRequests && (
                                  <div className="mb-4">
                                    <span className="text-sm text-gray-500">Special Requests:</span>
                                    <p className="text-gray-700">{booking.specialRequests}</p>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap justify-between items-center gap-2">
                                <Button variant="outline" size="sm" className="flex items-center">
                                  <Phone className="h-4 w-4 mr-2" />
                                  {booking.phoneNumber}
                                </Button>
                                
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </Button>
                                  
                                  <Button className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                                    Manage Booking
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-4">You don't have any upcoming bookings</h2>
                  <p className="text-gray-600 mb-6">Make a reservation at your favorite restaurant</p>
                  <Button className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                    Find Restaurants
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              {bookings.past.length > 0 ? (
                <div className="space-y-6">
                  {bookings.past.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          <div className="relative h-48 md:h-full">
                            <img 
                              src={booking.imageUrl} 
                              alt={booking.restaurantName} 
                              className="w-full h-full object-cover filter grayscale opacity-80"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <div className="text-center px-4">
                                <h3 className="text-white font-bold text-xl mb-1">{booking.restaurantName}</h3>
                                <Badge className={`border-0 ${
                                  booking.status === 'completed' ? 'bg-gray-500' : 'bg-red-500'
                                } text-white`}>
                                  {booking.status.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-span-2 p-6">
                            <div className="flex flex-col h-full justify-between">
                              <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div className="flex items-center text-gray-700">
                                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                                    <span className="font-medium">{formatBookingDate(booking.date)}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-gray-700">
                                    <Clock className="h-5 w-5 mr-2 text-gray-500" />
                                    <span className="font-medium">{formatBookingTime(booking.date)}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-gray-700">
                                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                                    <span>{booking.location}</span>
                                  </div>
                                  
                                  <div className="flex items-center text-gray-700">
                                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                                    <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                                  </div>
                                </div>
                                
                                {booking.status === 'cancelled' && booking.cancellationReason && (
                                  <div className="mb-4 p-3 bg-red-50 rounded-md">
                                    <span className="text-sm text-red-700 font-medium">Cancellation Reason:</span>
                                    <p className="text-red-700">{booking.cancellationReason}</p>
                                  </div>
                                )}
                                
                                {booking.specialRequests && (
                                  <div className="mb-4">
                                    <span className="text-sm text-gray-500">Special Requests:</span>
                                    <p className="text-gray-700">{booking.specialRequests}</p>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-end">
                                {booking.status === 'completed' && (
                                  <Button variant="outline">
                                    Write a Review
                                  </Button>
                                )}
                                
                                {booking.status === 'completed' && (
                                  <Button className="ml-2 bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                                    Book Again
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-4">No past bookings found</h2>
                  <p className="text-gray-600 mb-6">Your booking history will appear here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center md:hidden">
            <Button className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
              <Calendar className="h-4 w-4 mr-2" />
              Make New Reservation
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bookings;
