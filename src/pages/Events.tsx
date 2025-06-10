
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Calendar,
  MapPin,
  Users,
  Camera,
  Crown,
  Heart,
  Cake,
  Briefcase,
  Gift,
  Star,
  ArrowRight,
  Clock
} from 'lucide-react';

const Events: React.FC = () => {
  const eventTypes = [
    {
      type: "Weddings",
      icon: Crown,
      description: "Create your dream wedding with premium venues and personalized planning",
      packages: "Starting from ₹2,00,000",
      features: ["3D Venue Preview", "AI Theme Designer", "Complete Vendor Network", "Photography & Decor"],
      color: "bg-red-100 text-red-600",
      popular: true
    },
    {
      type: "Receptions",
      icon: Heart,
      description: "Elegant reception venues for your special celebration",
      packages: "Starting from ₹1,50,000",
      features: ["Banquet Halls", "Garden Venues", "Catering Services", "Entertainment Setup"],
      color: "bg-pink-100 text-pink-600",
      popular: true
    },
    {
      type: "Birthday Parties",
      icon: Cake,
      description: "Memorable birthday celebrations for all ages",
      packages: "Starting from ₹25,000",
      features: ["Theme Decorations", "Custom Cakes", "Entertainment", "Photography"],
      color: "bg-yellow-100 text-yellow-600",
      popular: false
    },
    {
      type: "Corporate Events",
      icon: Briefcase,
      description: "Professional venues for meetings, conferences, and team events",
      packages: "Starting from ₹50,000",
      features: ["Conference Facilities", "AV Equipment", "Catering", "Accommodation"],
      color: "bg-blue-100 text-blue-600",
      popular: false
    },
    {
      type: "Anniversary Celebrations",
      icon: Gift,
      description: "Romantic venues for milestone anniversary celebrations",
      packages: "Starting from ₹75,000",
      features: ["Intimate Settings", "Custom Menus", "Floral Arrangements", "Photography"],
      color: "bg-purple-100 text-purple-600",
      popular: false
    },
    {
      type: "Baby Showers",
      icon: Heart,
      description: "Adorable venues and themes for welcoming new life",
      packages: "Starting from ₹30,000",
      features: ["Themed Decorations", "Custom Catering", "Games & Activities", "Photography"],
      color: "bg-green-100 text-green-600",
      popular: false
    }
  ];

  const featuredVenues = [
    {
      name: "Royal Gardens Banquet",
      location: "Bandra West, Mumbai",
      capacity: "200-500 guests",
      rating: 4.8,
      price: "₹3,500/plate",
      image: "https://images.unsplash.com/photo-1519167758481-83f29c2c47bf",
      features: ["Garden Setting", "3D Preview Available", "In-house Catering"],
      available: "Next 3 months"
    },
    {
      name: "Crystal Palace Hotel",
      location: "Juhu, Mumbai",
      capacity: "100-300 guests",
      rating: 4.9,
      price: "₹4,200/plate",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38",
      features: ["AC Banquet Hall", "Parking Available", "Multiple Cuisines"],
      available: "Available Now"
    },
    {
      name: "Sunset Terrace",
      location: "Lower Parel, Mumbai",
      capacity: "50-150 guests",
      rating: 4.7,
      price: "₹2,800/plate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      features: ["Rooftop Setting", "City Views", "Open Bar Available"],
      available: "Next 6 weeks"
    }
  ];

  const planningSteps = [
    {
      step: 1,
      title: "Choose Event Type",
      description: "Select from weddings, receptions, parties, or corporate events"
    },
    {
      step: 2,
      title: "Pick Your Venue",
      description: "Browse venues with 3D previews, ratings, and real availability"
    },
    {
      step: 3,
      title: "AI Theme Design",
      description: "Our AI generates personalized themes, decor, and layout plans"
    },
    {
      step: 4,
      title: "Vendor Selection",
      description: "Choose from verified photographers, caterers, and decorators"
    },
    {
      step: 5,
      title: "Confirm & Pay",
      description: "Secure booking with flexible payment options and contracts"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Plan Perfect Events with AI
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              From intimate gatherings to grand celebrations, discover premium venues 
              and create unforgettable moments with our AI-powered event planning.
            </p>
            <Link to="/user/planning">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Start Planning Your Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Event Types */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Event Types We Specialize In</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventTypes.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 relative">
                  {event.popular && (
                    <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className={`w-12 h-12 ${event.color} rounded-lg flex items-center justify-center mb-4`}>
                      <event.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{event.type}</CardTitle>
                    <p className="text-slate-600">{event.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-lg font-semibold text-blue-600">{event.packages}</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {event.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/user/planning">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Plan {event.type}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Venues */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Event Venues</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredVenues.map((venue, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {venue.available}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{venue.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{venue.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{venue.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{venue.capacity}</span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {venue.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs mr-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">{venue.price}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Planning Process */}
          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">How Event Planning Works</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {planningSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Event Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Camera className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">3D Venue Previews</h3>
                  <p className="text-slate-600">Immersive 3D walkthroughs generated from just 3-5 venue photos</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Crown className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">AI Theme Designer</h3>
                  <p className="text-slate-600">Personalized themes, decor suggestions, and layout planning</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
                  <p className="text-slate-600">Optimal date suggestions based on venue availability and weather</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Ready to Plan Your Perfect Event?</h2>
                <p className="text-lg mb-6 text-white/90">
                  Join thousands of happy customers who've created unforgettable moments with DineVibe.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/user/planning">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                      Start Planning Now
                    </Button>
                  </Link>
                  <Link to="/user/ai-assistant">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Try AI Assistant
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
