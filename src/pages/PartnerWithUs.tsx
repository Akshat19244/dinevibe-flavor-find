
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VenueRegistrationForm from '@/components/venue/VenueRegistrationForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Handshake, 
  Building, 
  Users, 
  TrendingUp, 
  Star,
  CheckCircle,
  Camera,
  Bot,
  BarChart3
} from 'lucide-react';

const PartnerWithUs: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-[#8B0000]" />,
      title: "Increase Your Revenue",
      description: "Connect with more customers and boost your bookings by up to 300%"
    },
    {
      icon: <Users className="h-8 w-8 text-[#D4AF37]" />,
      title: "Expand Customer Base",
      description: "Reach verified customers actively looking for premium venues"
    },
    {
      icon: <Camera className="h-8 w-8 text-yellow-500" />,
      title: "360° Virtual Tours",
      description: "Showcase your venue with immersive 360° tours generated from your photos"
    },
    {
      icon: <Bot className="h-8 w-8 text-blue-500" />,
      title: "AI-Powered Matching",
      description: "Our AI connects you with customers based on their preferences and your offerings"
    }
  ];

  const partnerFeatures = [
    "Free 360° virtual tour generation from your photos",
    "AI-powered menu price extraction and optimization",
    "Automatic venue approval for 4.0+ rated venues",
    "Real-time dashboard with live booking metrics",
    "Advanced customer matching algorithms",
    "Integrated communication platform",
    "Dynamic pricing recommendations",
    "Performance analytics and insights"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1] mb-4">
              <Handshake className="inline mr-3 h-12 w-12 text-[#D4AF37]" />
              Partner With DineVibe
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              Join India's fastest-growing platform for premium dining and event venues with AI-powered 360° experiences
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0C0C0C] text-center mb-8">
              Why Partner With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center border-[#D4AF37] hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-[#0C0C0C] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#2F2F2F]">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* What You Get Section */}
          <div className="mb-12">
            <Card className="border-[#D4AF37]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#0C0C0C] flex items-center justify-center">
                  <Star className="h-6 w-6 mr-2 text-[#D4AF37]" />
                  What You Get as a Partner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {partnerFeatures.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {partnerFeatures.slice(4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-[#8B0000]/10 to-[#D4AF37]/10 rounded-lg">
                  <h4 className="font-semibold text-[#0C0C0C] mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-[#8B0000]" />
                    Live Dashboard Metrics (Available Immediately)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#8B0000]">0</div>
                      <div className="text-sm text-[#2F2F2F]">Total Bookings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#8B0000]">0</div>
                      <div className="text-sm text-[#2F2F2F]">Upcoming Events</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#8B0000]">0</div>
                      <div className="text-sm text-[#2F2F2F]">Dining Reservations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#8B0000]">0</div>
                      <div className="text-sm text-[#2F2F2F]">Pending Messages</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#2F2F2F] mt-4 text-center">
                    Metrics update in real-time as customers interact with your venue
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <VenueRegistrationForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnerWithUs;
