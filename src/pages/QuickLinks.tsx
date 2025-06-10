
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Brain, 
  Clock, 
  MapPin, 
  Star,
  Utensils,
  Camera
} from 'lucide-react';

const QuickLinks: React.FC = () => {
  const quickActions = [
    {
      title: "Find Restaurants",
      description: "Discover top-rated restaurants in your area",
      icon: Search,
      link: "/user/discovery",
      color: "bg-blue-600"
    },
    {
      title: "Plan Events",
      description: "Organize weddings, parties, and celebrations",
      icon: Calendar,
      link: "/user/planning",
      color: "bg-purple-600"
    },
    {
      title: "AI Assistant",
      description: "Get AI-powered dining and event recommendations",
      icon: Brain,
      link: "/user/ai-assistant",
      color: "bg-green-600"
    },
    {
      title: "Check Wait Times",
      description: "Real-time restaurant availability and wait times",
      icon: Clock,
      link: "/user/discovery",
      color: "bg-orange-600"
    },
    {
      title: "My Bookings",
      description: "View and manage your reservations",
      icon: Calendar,
      link: "/user/bookings",
      color: "bg-indigo-600"
    },
    {
      title: "Deals & Offers",
      description: "Exclusive discounts and special offers",
      icon: Star,
      link: "/user/deals",
      color: "bg-yellow-600"
    }
  ];

  const popularCategories = [
    { name: "Fine Dining", count: "120+ restaurants" },
    { name: "Wedding Venues", count: "80+ venues" },
    { name: "Casual Dining", count: "200+ options" },
    { name: "Party Halls", count: "50+ halls" },
    { name: "Garden Venues", count: "30+ gardens" },
    { name: "Rooftop Restaurants", count: "45+ locations" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Quick Access to Everything
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Fast-track your dining and event planning with our most popular features
            </p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-slate-200">
                  <CardHeader>
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Popular Categories */}
          <div className="bg-slate-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6">Popular Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {popularCategories.map((category, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-semibold text-slate-800">{category.name}</h4>
                  <p className="text-sm text-slate-600">{category.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuickLinks;
