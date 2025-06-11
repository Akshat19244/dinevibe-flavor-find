
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Users, Calendar, Sparkles, Eye, ChefHat } from 'lucide-react';

const Home: React.FC = () => {
  const topRestaurants = [
    {
      id: '1',
      name: 'The Royal Feast',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=400',
      cuisine: 'Multi-Cuisine',
      rating: 4.8,
      location: 'Mumbai',
      price: '₹₹₹₹'
    },
    {
      id: '2',
      name: 'Spice Symphony',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=400',
      cuisine: 'Indian',
      rating: 4.6,
      location: 'Delhi',
      price: '₹₹₹'
    },
    {
      id: '3',
      name: 'Golden Terrace',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=400',
      cuisine: 'Continental',
      rating: 4.7,
      location: 'Bangalore',
      price: '₹₹₹₹'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="hero-gradient min-h-[80vh] flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-[#FFF5E1] mb-6 animate-fade-in">
              Luxury Dining & 
              <span className="text-[#D4AF37]"> Events</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#FFF5E1]/90 mb-8 animate-slide-in">
              Experience premium dining and create unforgettable events with AI-powered planning
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/dining">
                <Button className="btn-primary text-lg px-8 py-4">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Book Your Table
                </Button>
              </Link>
              <Link to="/events">
                <Button className="btn-secondary text-lg px-8 py-4">
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan Event
                </Button>
              </Link>
              <Link to="/discovery">
                <Button variant="outline" className="text-[#FFF5E1] border-[#FFF5E1] hover:bg-[#FFF5E1] hover:text-[#0C0C0C] text-lg px-8 py-4">
                  <Eye className="mr-2 h-5 w-5" />
                  Explore Venues
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Top Rated Restaurants */}
        <section className="py-16 bg-[#FFF5E1]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0C0C0C] mb-4">Top Rated Restaurants</h2>
              <p className="text-lg text-[#2F2F2F] max-w-2xl mx-auto">
                Discover premium restaurants with ratings above 4.5 stars - personally verified and guest approved
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="card-luxury overflow-hidden">
                  <div className="relative">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#8B0000] text-[#FFF5E1] px-2 py-1 rounded-full text-sm font-semibold">
                      {restaurant.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">{restaurant.name}</CardTitle>
                    <div className="flex items-center justify-between">
                      <span className="text-[#2F2F2F]">{restaurant.cuisine}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-[#D4AF37] fill-current" />
                        <span className="ml-1 font-semibold">{restaurant.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#2F2F2F] mb-4">{restaurant.location}</p>
                    <Link to={`/restaurant/${restaurant.id}`}>
                      <Button className="w-full btn-primary">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/discovery">
                <Button className="btn-secondary">View All Restaurants</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Assistant Preview */}
        <section className="py-16 bg-[#0C0C0C]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-[#FFF5E1] mb-6">AI-Powered Event Planning</h2>
                <p className="text-lg text-[#FFF5E1]/80 mb-8">
                  Let our advanced AI assistant help you plan the perfect event. From venue selection to menu curation, 
                  get personalized recommendations based on your preferences, budget, and guest count.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                    <span className="text-[#FFF5E1]">Smart venue matching based on your requirements</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-[#D4AF37]" />
                    <span className="text-[#FFF5E1]">Optimized for guest count and budget</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-[#D4AF37]" />
                    <span className="text-[#FFF5E1]">Real-time availability and instant booking</span>
                  </div>
                </div>
                <Link to="/ai-assistant">
                  <Button className="btn-secondary">Try AI Assistant</Button>
                </Link>
              </div>
              <div className="relative">
                <div className="bg-[#2F2F2F] rounded-lg p-6 border border-[#D4AF37]">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] font-semibold">AI Assistant</span>
                  </div>
                  <p className="text-[#FFF5E1] text-sm">
                    "Based on your requirements for a wedding with 150 guests and a budget of ₹5,00,000, 
                    I recommend The Royal Gardens venue with their premium package..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Search */}
        <section className="py-16 bg-[#FFF5E1]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0C0C0C] mb-4">Find Your Perfect Experience</h2>
              <p className="text-lg text-[#2F2F2F]">Quick access to our most popular categories</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link to="/dining" className="card-luxury p-6 text-center">
                <ChefHat className="h-12 w-12 text-[#8B0000] mx-auto mb-4" />
                <h3 className="font-semibold text-[#0C0C0C] mb-2">Fine Dining</h3>
                <p className="text-sm text-[#2F2F2F]">Premium restaurants</p>
              </Link>
              <Link to="/events" className="card-luxury p-6 text-center">
                <Calendar className="h-12 w-12 text-[#8B0000] mx-auto mb-4" />
                <h3 className="font-semibold text-[#0C0C0C] mb-2">Events</h3>
                <p className="text-sm text-[#2F2F2F]">Banquet halls</p>
              </Link>
              <Link to="/ai-assistant" className="card-luxury p-6 text-center">
                <Sparkles className="h-12 w-12 text-[#8B0000] mx-auto mb-4" />
                <h3 className="font-semibold text-[#0C0C0C] mb-2">AI Assistant</h3>
                <p className="text-sm text-[#2F2F2F]">Smart planning</p>
              </Link>
              <Link to="/3d-preview" className="card-luxury p-6 text-center">
                <Eye className="h-12 w-12 text-[#8B0000] mx-auto mb-4" />
                <h3 className="font-semibold text-[#0C0C0C] mb-2">3D Preview</h3>
                <p className="text-sm text-[#2F2F2F]">Virtual tours</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#8B0000] to-[#D4AF37]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-[#FFF5E1] mb-4">Ready to Create Magic?</h2>
            <p className="text-xl text-[#FFF5E1]/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust DineVibe for their perfect dining and event experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discovery">
                <Button className="bg-[#FFF5E1] text-[#0C0C0C] hover:bg-[#FFF5E1]/90 px-8 py-3">
                  Explore Venues
                </Button>
              </Link>
              <Link to="/partner-with-us">
                <Button variant="outline" className="border-[#FFF5E1] text-[#FFF5E1] hover:bg-[#FFF5E1] hover:text-[#0C0C0C] px-8 py-3">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
