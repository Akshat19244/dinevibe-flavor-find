
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  Store, 
  Building, 
  Hotel, 
  TreePine, 
  TrendingUp, 
  Users, 
  DollarSign,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const ForBusiness: React.FC = () => {
  const businessTypes = [
    {
      type: "Restaurant Owner",
      icon: Store,
      description: "Join our network of premium restaurants",
      features: [
        "Real-time booking management",
        "AI-powered wait time predictions", 
        "Customer analytics dashboard",
        "Menu and pricing control",
        "Review and rating system"
      ],
      registerLink: "/auth?type=restaurant-owner"
    },
    {
      type: "Banquet Hall Owner",
      icon: Building,
      description: "List your banquet facilities for events",
      features: [
        "Event booking calendar",
        "3D venue preview generation",
        "Package and pricing management",
        "Vendor network integration",
        "Event planning assistance"
      ],
      registerLink: "/auth?type=banquet-owner"
    },
    {
      type: "Hotel Owner",
      icon: Hotel,
      description: "Showcase your hotel's dining and event spaces",
      features: [
        "Multiple venue management",
        "Accommodation + dining packages",
        "Corporate event bookings",
        "Premium listing priority",
        "Guest experience tracking"
      ],
      registerLink: "/auth?type=hotel-owner"
    },
    {
      type: "Garden/Outdoor Venue",
      icon: TreePine,
      description: "Perfect for outdoor weddings and celebrations",
      features: [
        "Weather-based booking system",
        "Outdoor event specialization",
        "Equipment and tent rentals",
        "Landscaping showcase",
        "Seasonal pricing options"
      ],
      registerLink: "/auth?type=garden-owner"
    }
  ];

  const benefits = [
    {
      title: "Increase Revenue",
      description: "Get 30-40% more bookings through our AI-powered recommendation system",
      icon: TrendingUp,
      stat: "₹2.5L+ avg monthly increase"
    },
    {
      title: "Expand Customer Base",
      description: "Reach customers actively looking for premium dining and event venues",
      icon: Users,
      stat: "50K+ active users"
    },
    {
      title: "Premium Commission",
      description: "Industry-leading revenue share with transparent pricing",
      icon: DollarSign,
      stat: "Only 8-12% commission"
    },
    {
      title: "Quality Assurance",
      description: "Maintain high standards with our verification and rating system",
      icon: Star,
      stat: "4.5+ star guarantee"
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
              Grow Your Business with DineVibe
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Join India's premium dining and event platform. Connect with customers who value quality experiences and are ready to pay for excellence.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Business Types */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Choose Your Business Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businessTypes.map((business, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <business.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{business.type}</CardTitle>
                        <p className="text-slate-600">{business.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {business.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={business.registerLink}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Register as {business.type}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Partner with DineVibe?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{benefit.description}</p>
                    <div className="text-2xl font-bold text-blue-600">{benefit.stat}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Registration Process */}
          <section className="bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Simple Registration Process</h2>
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="restaurant" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
                  <TabsTrigger value="banquet">Banquet</TabsTrigger>
                  <TabsTrigger value="hotel">Hotel</TabsTrigger>
                  <TabsTrigger value="garden">Garden</TabsTrigger>
                </TabsList>
                
                <TabsContent value="restaurant" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                      <h3 className="font-semibold mb-2">Basic Information</h3>
                      <p className="text-sm text-slate-600">Restaurant name, cuisine type, location, contact details</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                      <h3 className="font-semibold mb-2">Upload Documents</h3>
                      <p className="text-sm text-slate-600">FSSAI license, GST registration, venue photos, menu</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                      <h3 className="font-semibold mb-2">Go Live</h3>
                      <p className="text-sm text-slate-600">Verification (24-48 hrs) and start receiving bookings</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="banquet" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                      <h3 className="font-semibold mb-2">Venue Details</h3>
                      <p className="text-sm text-slate-600">Hall capacity, facilities, catering options, location</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                      <h3 className="font-semibold mb-2">3D Setup</h3>
                      <p className="text-sm text-slate-600">Upload 3-5 venue photos for AI-generated 3D preview</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                      <h3 className="font-semibold mb-2">Event Packages</h3>
                      <p className="text-sm text-slate-600">Set pricing for weddings, receptions, corporate events</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="hotel" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                      <h3 className="font-semibold mb-2">Hotel Registration</h3>
                      <p className="text-sm text-slate-600">Hotel details, star rating, multiple venue spaces</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                      <h3 className="font-semibold mb-2">Venue Portfolio</h3>
                      <p className="text-sm text-slate-600">Multiple dining areas, conference halls, banquet spaces</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                      <h3 className="font-semibold mb-2">Package Integration</h3>
                      <p className="text-sm text-slate-600">Room + dining combos, corporate packages</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="garden" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                      <h3 className="font-semibold mb-2">Outdoor Space</h3>
                      <p className="text-sm text-slate-600">Garden area, capacity, weather contingency plans</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                      <h3 className="font-semibold mb-2">Equipment & Services</h3>
                      <p className="text-sm text-slate-600">Tent rentals, sound systems, catering partnerships</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                      <h3 className="font-semibold mb-2">Seasonal Pricing</h3>
                      <p className="text-sm text-slate-600">Weather-based availability, seasonal packages</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForBusiness;
