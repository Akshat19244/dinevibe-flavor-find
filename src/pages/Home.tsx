
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/hero-section';
import FeaturedSection from '@/components/home/featured-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Users, 
  Sparkles,
  ArrowRight,
  ChefHat,
  Building,
  Crown
} from 'lucide-react';

const Home: React.FC = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Royal Wedding Celebration",
      venue: "The Grand Palace",
      location: "Mumbai, Maharashtra",
      date: "2024-03-15",
      guests: 500,
      price: "₹8,00,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=800",
      theme: "Royal Elegance"
    },
    {
      id: 2,
      title: "Garden Birthday Party",
      venue: "Bloom Gardens",
      location: "Delhi, NCR",
      date: "2024-03-20",
      guests: 150,
      price: "₹1,50,000",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
      theme: "Garden Paradise"
    },
    {
      id: 3,
      title: "Corporate Conference",
      venue: "Business Hub",
      location: "Bangalore, Karnataka",
      date: "2024-03-25",
      guests: 300,
      price: "₹2,50,000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=800",
      theme: "Modern Professional"
    }
  ];

  const featuredRestaurants = [
    {
      id: "1",
      name: "The Royal Banquet",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
      cuisine: "Multi-Cuisine",
      rating: 4.8,
      priceRange: "₹2,000-5,000",
      location: "Mumbai Central",
      isNew: true,
      hasDeals: true
    },
    {
      id: "2",
      name: "Garden Paradise",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800",
      cuisine: "Indian & Continental",
      rating: 4.6,
      priceRange: "₹1,500-3,500",
      location: "Delhi NCR",
      hasDeals: true
    },
    {
      id: "3",
      name: "Modern Events Hub",
      imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800",
      cuisine: "International",
      rating: 4.7,
      priceRange: "₹3,000-6,000",
      location: "Bangalore",
      isNew: true
    }
  ];

  const quickStats = [
    { label: "Happy Customers", value: "50,000+", icon: <Users className="h-6 w-6" /> },
    { label: "Partner Venues", value: "2,500+", icon: <Building className="h-6 w-6" /> },
    { label: "Events Hosted", value: "75,000+", icon: <Calendar className="h-6 w-6" /> },
    { label: "Premium Experiences", value: "100%", icon: <Crown className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Quick Action Cards */}
        <section className="py-16 bg-[#FFF5E1]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 border-[#D4AF37] hover:border-[#8B0000]">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-[#8B0000] group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-[#0C0C0C] mb-2">Plan Your Event</h3>
                  <p className="text-[#2F2F2F] mb-4">
                    Use our AI-powered planner to create the perfect event experience
                  </p>
                  <Link to="/event-planner">
                    <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] w-full">
                      Start Planning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-[#D4AF37] hover:border-[#8B0000]">
                <CardContent className="p-8 text-center">
                  <Building className="h-12 w-12 mx-auto mb-4 text-[#8B0000] group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-[#0C0C0C] mb-2">Explore Venues</h3>
                  <p className="text-[#2F2F2F] mb-4">
                    Browse premium banquet halls and event venues with 3D previews
                  </p>
                  <Link to="/3d-preview">
                    <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#0C0C0C] w-full">
                      View in 3D
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-[#D4AF37] hover:border-[#8B0000]">
                <CardContent className="p-8 text-center">
                  <ChefHat className="h-12 w-12 mx-auto mb-4 text-[#8B0000] group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-[#0C0C0C] mb-2">Fine Dining</h3>
                  <p className="text-[#2F2F2F] mb-4">
                    Discover curated restaurants and book tables at premium locations
                  </p>
                  <Link to="/dining">
                    <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] w-full">
                      Book Table
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-[#0C0C0C]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4 text-[#D4AF37]">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-[#FFF5E1] mb-2">{stat.value}</div>
                  <div className="text-[#FFF5E1]/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-16 bg-[#FFF5E1]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C0C0C] mb-4">
                <Sparkles className="inline mr-3 h-8 w-8 text-[#D4AF37]" />
                Featured Event Packages
              </h2>
              <p className="text-xl text-[#2F2F2F] max-w-2xl mx-auto">
                Discover our most popular event packages, curated for memorable celebrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 border-[#D4AF37] overflow-hidden">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#8B0000] text-[#FFF5E1]">
                      {event.theme}
                    </Badge>
                    <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{event.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#0C0C0C] mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-[#2F2F2F]">
                        <Building className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                      <div className="flex items-center text-[#2F2F2F]">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center text-[#2F2F2F]">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.guests} guests</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-[#8B0000]">{event.price}</div>
                      <Link to="/event-planner">
                        <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#0C0C0C]">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/events">
                <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] px-8 py-3">
                  Explore All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <FeaturedSection 
          title="Featured Restaurants & Venues"
          subtitle="Discover the best venues for your events and celebrations"
          viewAllLink="/dining"
          restaurants={featuredRestaurants}
        />

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-[#8B0000] to-[#660000]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFF5E1] mb-4">
              Ready to Create Unforgettable Experiences?
            </h2>
            <p className="text-xl text-[#FFF5E1]/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust DineVibe for their special moments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/event-planner">
                <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#0C0C0C] px-8">
                  Plan My Event
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/partner-with-us">
                <Button size="lg" variant="outline" className="border-[#FFF5E1] text-[#FFF5E1] hover:bg-[#FFF5E1] hover:text-[#8B0000] px-8">
                  Partner With Us
                  <ArrowRight className="ml-2 h-5 w-5" />
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
