
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getUserProfile } from '@/lib/api/users';
import { getUpcomingUserReservations, getPastUserReservations } from '@/lib/api/reservations';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingsList from '@/components/user/BookingsList';
import { CalendarPlus } from 'lucide-react';

const Bookings: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [upcomingReservations, setUpcomingReservations] = useState<any[]>([]);
  const [pastReservations, setPastReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  
  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Load user profile
        const profile = await getUserProfile(user.id);
        setUserProfile(profile);
        
        // Load upcoming and past reservations
        const upcoming = await getUpcomingUserReservations(user.id);
        const past = await getPastUserReservations(user.id);
        
        setUpcomingReservations(upcoming);
        setPastReservations(past);
      } catch (error) {
        console.error('Error loading bookings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your bookings. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, navigate, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="user" userName={userProfile?.name || 'User'} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">My Bookings</h1>
              <p className="text-gray-500">View and manage all your restaurant reservations</p>
            </div>
            
            <Button className="mt-4 md:mt-0" onClick={() => navigate('/user/make-reservation')}>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Make New Reservation
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">
                Upcoming Reservations
                {upcomingReservations.length > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {upcomingReservations.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="past">
                Past Reservations
                {pastReservations.length > 0 && (
                  <span className="ml-2 bg-gray-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {pastReservations.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <BookingsList 
                reservations={upcomingReservations} 
                type="upcoming" 
                isLoading={isLoading} 
              />
              
              {!isLoading && upcomingReservations.length === 0 && (
                <Card className="text-center py-12">
                  <h3 className="text-xl font-medium mb-4">No Upcoming Reservations</h3>
                  <p className="text-gray-500 mb-6">
                    You don't have any upcoming reservations yet. 
                    Plan your next dining experience now!
                  </p>
                  <Button onClick={() => navigate('/user/make-reservation')}>
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Make a Reservation
                  </Button>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              <BookingsList 
                reservations={pastReservations} 
                type="past" 
                isLoading={isLoading} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bookings;
