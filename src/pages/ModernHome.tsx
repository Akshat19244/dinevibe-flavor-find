import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  Search,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Heart,
  Zap,
  Shield,
  Trophy,
  Building2,
  Camera,
  Music,
  Utensils
} from 'lucide-react';

const ModernHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    eventType: '',
    location: '',
    guests: '',
    date: ''
  });

  const eventTypes = [
    { icon: Heart, label: 'Wedding', color: 'from-pink-500 to-rose-500' },
    { icon: Trophy, label: 'Corporate', color: 'from-blue-500 to-indigo-500' },
    { icon: Calendar, label: 'Birthday', color: 'from-purple-500 to-violet-500' },
    { icon: Users, label: 'Conference', color: 'from-green-500 to-emerald-500' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Instant Query System',
      description: 'Get responses from multiple vendors in minutes',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Verified Vendors',
      description: 'All vendors are verified and rated by real customers',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Star,
      title: 'AI Recommendations',
      description: 'Smart suggestions based on your preferences',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: CheckCircle,
      title: 'Seamless Booking',
      description: 'Complete your booking in just a few clicks',
      color: 'from-blue-400 to-cyan-500'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Events Planned', icon: Calendar },
    { value: '2,500+', label: 'Verified Vendors', icon: Building2 },
    { value: '98%', label: 'Success Rate', icon: Trophy },
    { value: '4.9/5', label: 'Average Rating', icon: Star },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Bride',
      content: 'EventHub made planning my dream wedding effortless. Got 5 venue options within hours!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Event Manager',
      content: 'The query system is brilliant. Saved us weeks of back-and-forth with vendors.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Emily Davis',
      role: 'Corporate Planner',
      content: 'Best platform for corporate events. The vendor responses are always professional.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    }
  ];

  const handleQuickSearch = () => {
    const params = new URLSearchParams();
    if (searchData.eventType) params.set('type', searchData.eventType);
    if (searchData.location) params.set('location', searchData.location);
    if (searchData.guests) params.set('guests', searchData.guests);
    if (searchData.date) params.set('date', searchData.date);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Plan or Provide - One Place for All Your Events</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Plan Your Event in Minutes
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed">
              Connect with verified vendors, get instant quotes, and book your perfect event. 
              <br className="hidden md:block" />
              From weddings to conferences - we've got you covered.
            </p>

            {/* Quick Search */}
            <Card className="max-w-4xl mx-auto mb-12 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Event Type</label>
                    <Input 
                      placeholder="Wedding, Corporate..."
                      value={searchData.eventType}
                      onChange={(e) => setSearchData({ ...searchData, eventType: e.target.value })}
                      className="h-12 border-slate-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Location</label>
                    <Input 
                      placeholder="City, Area..."
                      value={searchData.location}
                      onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                      className="h-12 border-slate-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Guests</label>
                    <Input 
                      placeholder="50, 100, 500..."
                      value={searchData.guests}
                      onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
                      className="h-12 border-slate-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Date</label>
                    <Input 
                      type="date"
                      value={searchData.date}
                      onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                      className="h-12 border-slate-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleQuickSearch}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg text-lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find Perfect Venues
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Event Type Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {eventTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(`/search?type=${type.label.toLowerCase()}`)}
                    className={`
                      p-6 rounded-2xl bg-gradient-to-br ${type.color} text-white 
                      hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl
                      group
                    `}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Why Choose EventHub?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our revolutionary platform makes event planning effortless with cutting-edge technology and verified vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get your perfect event planned in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Share Your Requirements',
                description: 'Tell us about your event type, location, budget, and preferences. Our smart form makes it quick and easy.',
                icon: Calendar
              },
              {
                step: '02',
                title: 'Get Instant Responses',
                description: 'Receive quotes and proposals from verified vendors within hours. Compare options and choose the best fit.',
                icon: Zap
              },
              {
                step: '03',
                title: 'Book & Celebrate',
                description: 'Finalize your booking with just a few clicks. Track progress and enjoy your perfectly planned event.',
                icon: CheckCircle
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust EventHub for their special moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-slate-800">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Plan Your Dream Event?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers and vendors. Start planning your perfect event today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/auth/signup">
              <Button className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg text-lg h-auto">
                <Calendar className="w-5 h-5 mr-2" />
                Start Planning Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/auth/signup?type=vendor">
              <Button variant="outline" className="px-12 py-4 border-white text-white hover:bg-white hover:text-slate-800 font-semibold rounded-xl text-lg h-auto">
                <Building2 className="w-5 h-5 mr-2" />
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernHomePage;