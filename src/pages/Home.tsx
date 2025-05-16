
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import HeroSection from '@/components/home/hero-section';
import FeaturedSection from '@/components/home/featured-section';
import EventCard from '@/components/home/event-card';
import DealCard from '@/components/home/deal-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, UtensilsCrossed, Award, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

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

// Sample data for hot deals
const hotDeals = [
  {
    id: '1',
    title: '2 for 1 Margaritas',
    imageUrl: 'https://images.unsplash.com/photo-1607446045710-d5a8fd0f13a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    discount: '2 for 1',
    restaurantName: 'El Cantina',
    validUntil: 'June 30, 2025',
    dealType: 'happy-hour' as const,
    description: 'Enjoy two margaritas for the price of one every Thursday and Friday between 5PM and 7PM.',
  },
  {
    id: '2',
    title: '20% Off Your First Order',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    discount: '20% OFF',
    restaurantName: 'Urban Spice Fusion',
    validUntil: 'July 15, 2025',
    dealType: 'discount' as const,
    description: 'Get 20% off your first order at Urban Spice Fusion. Valid for dine-in or takeout.',
    code: 'FIRSTORDER20',
  },
  {
    id: '3',
    title: 'Family Feast Combo',
    imageUrl: 'https://images.unsplash.com/photo-1559730098-2226c7880bd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    discount: 'SAVE $35',
    restaurantName: 'Sea & Smoke Grill',
    validUntil: 'August 1, 2025',
    dealType: 'combo' as const,
    description: 'Family feast with appetizers, 4 main courses, and dessert. Serves 4-6 people.',
  },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How DineVibe Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover, book, and enjoy the perfect dining experience in just a few simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-dineVibe-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-dineVibe-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Discover</h3>
                <p className="text-gray-600">
                  Browse restaurants and events that match your taste and preferences.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-dineVibe-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-dineVibe-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Book</h3>
                <p className="text-gray-600">
                  Reserve your table or event ticket in seconds with our easy booking system.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-dineVibe-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-dineVibe-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
                <p className="text-gray-600">
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
        <FeaturedSection
          title="Trending Restaurants"
          subtitle="Discover the most popular dining spots right now"
          viewAllLink="/user/discovery"
          restaurants={featuredRestaurants}
        />
        
        {/* Membership */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent opacity-90 z-0"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-[-1]" 
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1559305616-3f99cd43e353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80")',
              filter: 'brightness(0.4)'
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">DineVibe Membership</h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                Join our membership program for exclusive benefits, priority bookings, and special offers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-transform hover:transform hover:scale-105">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
                  <div className="text-3xl font-bold text-white mb-1">Free</div>
                  <p className="text-white/70">Forever</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-white">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>Access to all restaurants</span>
                  </li>
                  <li className="flex items-center text-white">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>Standard booking</span>
                  </li>
                  <li className="flex items-center text-white">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>Regular deals access</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-white text-dineVibe-primary hover:bg-white/90">
                  Current Plan
                </Button>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-dineVibe-primary shadow-lg transition-transform hover:transform hover:scale-105 relative">
                <div className="absolute top-0 right-0 bg-dineVibe-primary text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Silver</h3>
                  <div className="text-3xl font-bold text-gray-800 mb-1">₹99<span className="text-base font-medium">/month</span></div>
                  <p className="text-gray-500">Billed monthly</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>Priority bookings</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>10% off on select restaurants</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>Silver-exclusive deals</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                  Upgrade to Silver
                </Button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-transform hover:transform hover:scale-105">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Gold</h3>
                  <div className="text-3xl font-bold text-white mb-1">₹199<span className="text-base font-medium">/month</span></div>
                  <p className="text-white/70">Billed monthly</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-white">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>Everything in Silver</span>
                  </li>
                  <li className="flex items-center text-white">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>VIP event invitations</span>
                  </li>
                  <li className="flex items-center text-white">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>20% off on select restaurants</span>
                  </li>
                  <li className="flex items-center text-white">
                    <Award className="h-5 w-5 mr-2 text-dineVibe-primary" />
                    <span>Gold-exclusive perks & gifts</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-white text-dineVibe-primary hover:bg-white/90">
                  Upgrade to Gold
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upcoming Events */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
                <p className="text-gray-600">Don't miss out on these exciting culinary experiences</p>
              </div>
              <Link to="/user/upcoming" className="mt-4 md:mt-0">
                <Button variant="outline" className="border-dineVibe-primary text-dineVibe-primary">
                  View All Events <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Hot Deals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Hot Deals</h2>
                <p className="text-gray-600">Limited-time offers you don't want to miss</p>
              </div>
              <Link to="/user/deals" className="mt-4 md:mt-0">
                <Button variant="outline" className="border-dineVibe-accent text-dineVibe-accent">
                  View All Deals <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Dining Experience?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of food lovers who have discovered their favorite restaurants with DineVibe.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <Link to="/auth/signup">
                  <Button size="lg" className="bg-dineVibe-primary hover:bg-dineVibe-primary/90 px-8">
                    Sign Up Free
                  </Button>
                </Link>
                <Link to="/user/discovery">
                  <Button size="lg" variant="outline" className="border-dineVibe-primary text-dineVibe-primary px-8">
                    Explore Restaurants
                  </Button>
                </Link>
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
