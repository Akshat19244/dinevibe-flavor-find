
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import HeroSection from '@/components/home/hero-section';
import { Button } from '@/components/ui/button';
import { ArrowRight, UtensilsCrossed, Calendar, Users, Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Home: React.FC = () => {
  // Sample data for featured restaurants
  const featuredRestaurants = [
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
  ];

  // Sample data for upcoming events
  const upcomingEvents = [
    {
      id: '1',
      title: 'Italian Wine Tasting Night',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      date: 'June 20, 2025',
      time: '7:00 PM - 10:00 PM',
      location: 'The Savory Plate, 123 Main St',
      price: '$45',
      category: 'Wine Tasting',
      spots: 8,
    },
    {
      id: '2',
      title: 'Summer BBQ Festival',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      date: 'July 4, 2025',
      time: '12:00 PM - 7:00 PM',
      location: 'Riverside Park, Anytown',
      price: '$25',
      category: 'Festival',
      spots: 120,
    },
    {
      id: '3',
      title: 'Sushi Making Masterclass',
      imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      date: 'June 15, 2025',
      time: '6:00 PM - 8:30 PM',
      location: 'Bamboo Garden, 101 Lotus Ln',
      price: '$60',
      category: 'Cooking Class',
      spots: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dineVibe-background">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* How It Works */}
        <section className="py-16 bg-dineVibe-dark bg-opacity-70">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-dineVibe-text">How DineVibe Works</h2>
              <p className="text-lg text-dineVibe-text/80 max-w-3xl mx-auto">
                Discover, book, and enjoy the perfect dining experience in just a few simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-dineVibe-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-dineVibe-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dineVibe-text">Discover</h3>
                <p className="text-dineVibe-text/70">
                  Browse restaurants and events that match your taste and preferences.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-dineVibe-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-dineVibe-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dineVibe-text">Book</h3>
                <p className="text-dineVibe-text/70">
                  Reserve your table or event ticket in seconds with our easy booking system.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-dineVibe-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-dineVibe-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dineVibe-text">Enjoy</h3>
                <p className="text-dineVibe-text/70">
                  Experience amazing food and events with friends and family.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/user/discovery">
                <Button className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                  Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Restaurants */}
        <section className="py-16 bg-dineVibe-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-dineVibe-text">Trending Restaurants</h2>
                <p className="text-dineVibe-text/80">Discover the most popular dining spots right now</p>
              </div>
              <Link to="/user/discovery" className="mt-4 md:mt-0">
                <Button variant="outline" className="border-dineVibe-primary text-dineVibe-primary">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRestaurants.map(restaurant => (
                <Card key={restaurant.id} className="bg-card border-none overflow-hidden hover-scale">
                  <div className="relative">
                    <img 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      className="h-48 w-full object-cover"
                    />
                    {restaurant.isNew && (
                      <div className="absolute top-2 left-2 bg-dineVibe-primary text-white text-xs font-semibold px-2 py-1 rounded">
                        NEW
                      </div>
                    )}
                    {restaurant.hasDeals && (
                      <div className="absolute top-2 right-2 bg-dineVibe-secondary text-dineVibe-dark text-xs font-semibold px-2 py-1 rounded">
                        DEALS
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 text-dineVibe-text">{restaurant.name}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-dineVibe-secondary mr-2">{restaurant.priceRange}</span>
                      <span className="text-dineVibe-text/70 text-sm">{restaurant.cuisine}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-dineVibe-secondary fill-dineVibe-secondary mr-1" />
                        <span className="text-dineVibe-text">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center text-dineVibe-text/70 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{restaurant.location.split(',')[0]}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Events */}
        <section className="py-16 bg-dineVibe-dark bg-opacity-70">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-dineVibe-text">Upcoming Events</h2>
                <p className="text-dineVibe-text/80">Don't miss out on these exciting culinary experiences</p>
              </div>
              <Link to="/user/upcoming" className="mt-4 md:mt-0">
                <Button variant="outline" className="border-dineVibe-secondary text-dineVibe-secondary">
                  View All Events <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="bg-card border-none overflow-hidden hover-scale">
                  <div className="relative">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded">
                      {event.spots} spots left
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <span className="inline-block bg-dineVibe-primary text-white text-xs px-2 py-1 rounded mb-2">
                        {event.category}
                      </span>
                      <h3 className="font-bold text-lg text-white">{event.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-dineVibe-primary">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <span className="font-semibold text-dineVibe-secondary">{event.price}</span>
                    </div>
                    <div className="text-sm text-dineVibe-text/70 mb-2">
                      <p>{event.time}</p>
                      <p>{event.location}</p>
                    </div>
                    <Button className="w-full mt-2 bg-dineVibe-secondary text-dineVibe-dark hover:bg-dineVibe-secondary/90">
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-dineVibe-primary to-dineVibe-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Find Your Perfect Dining Experience?</h2>
              <p className="text-lg text-white text-opacity-90 mb-8">
                Join thousands of food lovers who have discovered their favorite restaurants with DineVibe.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <Link to="/auth/signup">
                  <Button size="lg" className="bg-white text-dineVibe-primary hover:bg-white/90 px-8">
                    Sign Up Free
                  </Button>
                </Link>
                <Link to="/user/discovery">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                    Explore Restaurants
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-dineVibe-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-dineVibe-text">Contact Us</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card border-none text-center p-6">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-dineVibe-primary/20 mb-4">
                    <MapPin className="h-6 w-6 text-dineVibe-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-dineVibe-text">Location</h3>
                  <p className="text-dineVibe-text/70">Ahmedabad, Gujarat</p>
                </Card>
                
                <Card className="bg-card border-none text-center p-6">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-dineVibe-primary/20 mb-4">
                    <svg className="h-6 w-6 text-dineVibe-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                      <path fillRule="evenodd" d="M12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.905.333 4.14.63a5.876 5.876 0 00-2.142 1.368A5.855 5.855 0 00.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.368 2.142 5.868 5.868 0 002.142 1.368c.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.142-1.368 5.86 5.86 0 001.368-2.142c.296-.765.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.947-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.368-2.142A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.415 2.227.055 1.266.07 1.646.07 4.85 0 3.204-.015 3.585-.07 4.85-.055 1.17-.251 1.805-.415 2.227a3.81 3.81 0 01-.896 1.382 3.744 3.744 0 01-1.382.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM18.406 6.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-dineVibe-text">Instagram</h3>
                  <a href="https://instagram.com/DineVibe56" className="text-dineVibe-primary hover:underline">DineVibe56</a>
                </Card>
                
                <Card className="bg-card border-none text-center p-6">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-dineVibe-primary/20 mb-4">
                    <svg className="h-6 w-6 text-dineVibe-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-dineVibe-text">Phone</h3>
                  <p className="text-dineVibe-text/70">9904960670</p>
                  <p className="text-dineVibe-text/70">6355781137</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
