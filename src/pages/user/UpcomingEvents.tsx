
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Sample data for upcoming events
const upcomingEvents = [
  {
    id: 'e1',
    name: 'Italian Wine Tasting',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    restaurantName: 'Bella Vita',
    date: new Date('2025-06-10T19:00:00'),
    location: '123 Vine Street, Wine District',
    attendees: 24,
    maxCapacity: 30,
    description: 'Join us for an evening of Italian wine exploration, featuring varieties from Tuscany and Sicily. Our sommelier will guide you through the tasting while you enjoy paired antipasti.',
    price: 45,
    tags: ['Wine', 'Italian', 'Tasting'],
  },
  {
    id: 'e2',
    name: 'Sushi Making Masterclass',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    restaurantName: 'Sakura House',
    date: new Date('2025-06-15T18:30:00'),
    location: '456 Ocean Avenue, East Side',
    attendees: 12,
    maxCapacity: 15,
    description: 'Learn the art of sushi making from our expert chef. This hands-on class will teach you to prepare perfect rice, slice fish properly, and roll beautiful maki. Take home your creations and a starter kit.',
    price: 75,
    tags: ['Sushi', 'Japanese', 'Cooking Class'],
  },
  {
    id: 'e3',
    name: 'Farm-to-Table Dinner',
    imageUrl: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    restaurantName: 'Harvest Garden',
    date: new Date('2025-06-20T19:30:00'),
    location: '789 Rural Route, Countryside',
    attendees: 35,
    maxCapacity: 40,
    description: 'Experience our seasonal five-course dinner featuring ingredients harvested from our own gardens that morning. Tour the farm before dinner and meet the farmers who grew your food.',
    price: 95,
    tags: ['Organic', 'Local', 'Seasonal'],
  },
];

// Function to calculate days remaining
const getDaysRemaining = (eventDate: Date) => {
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Function to format the date
const formatEventDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Function to format the time
const formatEventTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const UpcomingEvents: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName="John" />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Your Upcoming Events</h1>
            <p className="text-white text-opacity-90">
              Get ready for these exciting culinary experiences
            </p>
          </div>
        </div>
        
        {/* Events list */}
        <div className="container mx-auto px-4 py-8">
          {upcomingEvents.length > 0 ? (
            <div className="space-y-6">
              {upcomingEvents.map((event) => {
                const daysRemaining = getDaysRemaining(event.date);
                
                return (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="relative h-48 md:h-full">
                          <img 
                            src={event.imageUrl} 
                            alt={event.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-dineVibe-primary text-white font-semibold py-1">
                              {daysRemaining} days left
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="col-span-2 p-6">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
                              <p className="text-gray-700 mb-4">{event.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-5 w-5 mr-2 text-dineVibe-primary" />
                                  <span>{formatEventDate(event.date)}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-5 w-5 mr-2 text-dineVibe-primary" />
                                  <span>{formatEventTime(event.date)}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                  <MapPin className="h-5 w-5 mr-2 text-dineVibe-primary" />
                                  <span>{event.location}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                  <Users className="h-5 w-5 mr-2 text-dineVibe-primary" />
                                  <span>{event.attendees} of {event.maxCapacity} attending</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {event.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="bg-gray-100">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-sm text-gray-500">Hosted by</span>
                                <h3 className="font-medium">{event.restaurantName}</h3>
                              </div>
                              
                              <Button className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                                View Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">You don't have any upcoming events</h2>
              <p className="text-gray-600 mb-6">Explore our events section to find exciting culinary experiences</p>
              <Button className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                Discover Events
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UpcomingEvents;
