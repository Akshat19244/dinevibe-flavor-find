
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Users, 
  Clock,
  ArrowRight,
  ChefHat,
  Building,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const upcomingBookings = [
    {
      id: 'BK001',
      eventName: 'Anniversary Dinner',
      venue: 'The Royal Banquet',
      date: '2024-06-18',
      time: '19:00',
      guests: 2,
      status: 'confirmed'
    },
    {
      id: 'BK002',
      eventName: 'Birthday Celebration',
      venue: 'Garden Paradise',
      date: '2024-06-25',
      time: '18:00',
      guests: 25,
      status: 'pending'
    }
  ];

  const recommendedVenues = [
    {
      id: '1',
      name: 'Elegant Heights',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=800',
      rating: 4.8,
      priceRange: '₹3,000-6,000',
      cuisine: 'Multi-Cuisine'
    },
    {
      id: '2',
      name: 'Royal Gardens',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
      rating: 4.6,
      priceRange: '₹2,500-5,000',
      cuisine: 'Indian & Continental'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#FFF5E1] mb-2">
              Welcome Back!
            </h1>
            <p className="text-[#FFF5E1]/90">
              Manage your bookings and discover new dining experiences
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-[#D4AF37] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-[#8B0000]" />
                <h3 className="text-lg font-semibold text-[#0C0C0C] mb-2">Plan New Event</h3>
                <p className="text-[#2F2F2F] text-sm mb-4">Use our AI assistant to plan your perfect event</p>
                <Link to="/event-planner">
                  <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] w-full">
                    Start Planning
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-[#D4AF37] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <ChefHat className="h-12 w-12 mx-auto mb-4 text-[#8B0000]" />
                <h3 className="text-lg font-semibold text-[#0C0C0C] mb-2">Book Table</h3>
                <p className="text-[#2F2F2F] text-sm mb-4">Reserve a table at premium restaurants</p>
                <Link to="/dining">
                  <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#0C0C0C] w-full">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-[#D4AF37] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Building className="h-12 w-12 mx-auto mb-4 text-[#8B0000]" />
                <h3 className="text-lg font-semibold text-[#0C0C0C] mb-2">Explore Venues</h3>
                <p className="text-[#2F2F2F] text-sm mb-4">Discover venues with 3D previews</p>
                <Link to="/3d-preview">
                  <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] w-full">
                    View 3D
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Bookings */}
            <Card className="border-[#D4AF37]">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C] flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#8B0000]" />
                  Upcoming Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border border-[#2F2F2F]/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#0C0C0C]">{booking.eventName}</h4>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-[#2F2F2F]">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          {booking.venue}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {booking.date} at {booking.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {booking.guests} guests
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link to="/user/my-bookings">
                    <Button variant="outline" className="w-full border-[#8B0000] text-[#8B0000]">
                      View All Bookings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Venues */}
            <Card className="border-[#D4AF37]">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C] flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedVenues.map((venue) => (
                    <div key={venue.id} className="flex space-x-4">
                      <img
                        src={venue.image}
                        alt={venue.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#0C0C0C]">{venue.name}</h4>
                        <p className="text-sm text-[#2F2F2F]">{venue.cuisine}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{venue.rating}</span>
                          </div>
                          <span className="text-sm font-medium text-[#8B0000]">{venue.priceRange}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link to="/discovery">
                    <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                      Explore More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
