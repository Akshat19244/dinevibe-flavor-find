
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Star,
  Download,
  MessageCircle,
  Eye
} from 'lucide-react';

const MyBookings: React.FC = () => {
  const [bookings] = useState([
    {
      token: 'DV12345ABCDE',
      venue: 'The Royal Banquet',
      eventType: 'Romantic Dinner',
      date: '2024-01-20',
      time: '19:00',
      guests: 2,
      status: 'confirmed',
      createdAt: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=400'
    },
    {
      token: 'DV67890FGHIJ',
      venue: 'Garden Paradise',
      eventType: 'Birthday Celebration',
      date: '2024-01-25',
      time: '18:00',
      guests: 8,
      status: 'pending',
      createdAt: '2024-01-16',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'
    },
    {
      token: 'DV11111KKKKK',
      venue: 'Modern Events Hub',
      eventType: 'Business Meeting',
      date: '2023-12-15',
      time: '14:00',
      guests: 5,
      status: 'completed',
      createdAt: '2023-12-10',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=400'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-[#0C0C0C] py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#FFF5E1] mb-4">
              My Bookings
            </h1>
            <p className="text-[#FFF5E1]/90">
              Manage and track all your dining and event reservations
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="space-y-6">
                {upcomingBookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="h-16 w-16 mx-auto mb-4 text-[#2F2F2F]/50" />
                      <h3 className="text-xl font-semibold text-[#0C0C0C] mb-2">No upcoming bookings</h3>
                      <p className="text-[#2F2F2F] mb-6">Ready to make your next reservation?</p>
                      <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                        Book a Table
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  upcomingBookings.map((booking) => (
                    <Card key={booking.token} className="border-[#D4AF37]">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <img
                            src={booking.image}
                            alt={booking.venue}
                            className="w-full md:w-48 h-32 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-[#0C0C0C]">{booking.venue}</h3>
                                <p className="text-[#8B0000] font-medium">{booking.eventType}</p>
                              </div>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-2 text-[#8B0000]" />
                                {booking.date}
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-2 text-[#8B0000]" />
                                {booking.time}
                              </div>
                              <div className="flex items-center text-sm">
                                <Users className="h-4 w-4 mr-2 text-[#8B0000]" />
                                {booking.guests} guests
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="font-medium">Token: {booking.token}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                              <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline" className="border-[#2F2F2F] text-[#2F2F2F]">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Contact Venue
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="space-y-6">
                {pastBookings.map((booking) => (
                  <Card key={booking.token} className="border-[#2F2F2F]/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={booking.image}
                          alt={booking.venue}
                          className="w-full md:w-48 h-32 object-cover rounded-lg grayscale"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-[#0C0C0C]">{booking.venue}</h3>
                              <p className="text-[#2F2F2F] font-medium">{booking.eventType}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center text-sm text-[#2F2F2F]">
                              <Calendar className="h-4 w-4 mr-2" />
                              {booking.date}
                            </div>
                            <div className="flex items-center text-sm text-[#2F2F2F]">
                              <Clock className="h-4 w-4 mr-2" />
                              {booking.time}
                            </div>
                            <div className="flex items-center text-sm text-[#2F2F2F]">
                              <Users className="h-4 w-4 mr-2" />
                              {booking.guests} guests
                            </div>
                            <div className="flex items-center text-sm text-[#2F2F2F]">
                              <span>Token: {booking.token}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                              <Star className="h-4 w-4 mr-1" />
                              Rate Experience
                            </Button>
                            <Button size="sm" variant="outline" className="border-[#8B0000] text-[#8B0000]">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyBookings;
