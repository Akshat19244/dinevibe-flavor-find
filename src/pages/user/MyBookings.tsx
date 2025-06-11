
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, Phone, Mail } from 'lucide-react';
import { getUserReservations } from '@/lib/api/reservations';
import { format } from 'date-fns';

const MyBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const userBookings = await getUserReservations(user.id);
          setBookings(userBookings);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [user]);

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.booking_date) >= new Date() && booking.status !== 'cancelled'
  );
  
  const pastBookings = bookings.filter(booking => 
    new Date(booking.booking_date) < new Date() || booking.status === 'completed'
  );

  const BookingCard = ({ booking, type }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-[#2E3A59]">
              {booking.restaurants?.name || 'Venue Booking'}
            </CardTitle>
            <p className="text-slate-600">{booking.event_type}</p>
          </div>
          <Badge 
            variant={booking.status === 'confirmed' ? 'default' : 
                    booking.status === 'pending' ? 'secondary' : 'destructive'}
          >
            {booking.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-[#FF6F61]" />
            <span>{format(new Date(booking.booking_date), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-[#FF6F61]" />
            <span>{booking.guest_count} guests</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-[#FF6F61]" />
            <span>{booking.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Budget: ₹{booking.budget}</span>
          </div>
          {type === 'upcoming' && booking.status === 'confirmed' && (
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Modify</Button>
              <Button size="sm" variant="destructive">Cancel</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF5E6]">
      <Navbar userType="customer" userName={user?.user_metadata?.name || 'User'} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2E3A59] mb-8">My Bookings</h1>
          
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="bg-white border border-slate-200">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#FF6F61] data-[state=active]:text-white">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-[#FF6F61] data-[state=active]:text-white">
                Past ({pastBookings.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {loading ? (
                <div className="text-center py-8">Loading your bookings...</div>
              ) : upcomingBookings.length > 0 ? (
                upcomingBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} type="upcoming" />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-slate-600 mb-4">No upcoming bookings</p>
                    <Button onClick={() => window.location.href = '/user/discovery'}>
                      Browse Restaurants
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastBookings.length > 0 ? (
                pastBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} type="past" />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-slate-600">No past bookings</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyBookings;
