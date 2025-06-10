
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventPlanning: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEventType, setSelectedEventType] = useState('');

  const eventTypes = [
    {
      id: 'wedding',
      name: 'Wedding',
      description: 'Grand celebrations with full planning services',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=400',
      avgPrice: '₹2,50,000',
      duration: '1-2 days',
      popular: true
    },
    {
      id: 'reception',
      name: 'Reception',
      description: 'Elegant receptions for intimate gatherings',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400',
      avgPrice: '₹1,20,000',
      duration: '4-6 hours',
      popular: false
    },
    {
      id: 'birthday',
      name: 'Birthday Party',
      description: 'Fun birthday celebrations for all ages',
      image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=400',
      avgPrice: '₹25,000',
      duration: '3-4 hours',
      popular: true
    },
    {
      id: 'corporate',
      name: 'Corporate Event',
      description: 'Professional events and conferences',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
      avgPrice: '₹80,000',
      duration: '4-8 hours',
      popular: false
    },
    {
      id: 'baby-shower',
      name: 'Baby Shower',
      description: 'Gentle celebrations for expecting mothers',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400',
      avgPrice: '₹15,000',
      duration: '2-3 hours',
      popular: true
    },
    {
      id: 'anniversary',
      name: 'Anniversary',
      description: 'Romantic celebrations for special milestones',
      image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=400',
      avgPrice: '₹40,000',
      duration: '3-4 hours',
      popular: false
    }
  ];

  const planningSteps = [
    {
      step: 1,
      title: 'Choose Event Type',
      description: 'Select from weddings, parties, corporate events, and more'
    },
    {
      step: 2,
      title: 'Select Location & Venue',
      description: 'Browse verified venues with 3D previews'
    },
    {
      step: 3,
      title: 'Customize Theme & Services',
      description: 'AI-powered theme selection and service packages'
    },
    {
      step: 4,
      title: 'Review & Book',
      description: 'Final proposal with pricing and confirmation'
    }
  ];

  const handleEventTypeSelect = (eventType: string) => {
    setSelectedEventType(eventType);
    // Navigate to planning flow with event type
    navigate(`/user/planning?type=${eventType}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Event Planning
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Create unforgettable moments with our AI-powered event planning platform
            </p>
          </div>
        </div>

        {/* Planning Steps */}
        <div className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {planningSteps.map((step, index) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                  {index < planningSteps.length - 1 && (
                    <ArrowRight className="h-6 w-6 text-blue-600 mx-auto mt-4 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Types */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Event Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((eventType) => (
              <Card 
                key={eventType.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => handleEventTypeSelect(eventType.id)}
              >
                <div className="relative">
                  <img 
                    src={eventType.image} 
                    alt={eventType.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {eventType.popular && (
                    <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                      Popular
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{eventType.name}</CardTitle>
                  <p className="text-slate-600">{eventType.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">{eventType.avgPrice}</span>
                      <div className="flex items-center text-slate-600 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {eventType.duration}
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start Planning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-slate-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose DineVibe Events?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Design</h3>
                <p className="text-slate-300">Our AI creates personalized event themes and layouts</p>
              </div>
              <div>
                <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">3D Venue Previews</h3>
                <p className="text-slate-300">See your event space in immersive 3D before booking</p>
              </div>
              <div>
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Full Service Support</h3>
                <p className="text-slate-300">End-to-end planning with verified vendors</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventPlanning;
