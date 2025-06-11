
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Utensils, 
  Music, 
  Camera, 
  Flower,
  Car,
  Users,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PartnerWithUs: React.FC = () => {
  const { toast } = useToast();
  const [selectedPartnerType, setSelectedPartnerType] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    city: '',
    experience: '',
    description: '',
    services: []
  });

  const partnerTypes = [
    {
      type: 'restaurant',
      title: 'Restaurant Owner',
      icon: Utensils,
      description: 'List your restaurant and reach food enthusiasts',
      benefits: ['Increased bookings', 'Customer insights', 'Marketing support', 'Commission-based']
    },
    {
      type: 'banquet',
      title: 'Banquet Hall Owner',
      icon: Building2,
      description: 'Showcase your venue for events and celebrations',
      benefits: ['Event bookings', 'Premium listing', 'Event planning support', 'Higher visibility']
    },
    {
      type: 'caterer',
      title: 'Catering Service',
      icon: Utensils,
      description: 'Provide catering services for events',
      benefits: ['Event partnerships', 'Bulk orders', 'Direct client access', 'Flexible pricing']
    },
    {
      type: 'decorator',
      title: 'Event Decorator',
      icon: Flower,
      description: 'Offer decoration services for special occasions',
      benefits: ['Event collaborations', 'Creative showcase', 'Client matching', 'Portfolio building']
    },
    {
      type: 'dj',
      title: 'DJ / Music Service',
      icon: Music,
      description: 'Provide music and entertainment for events',
      benefits: ['Event bookings', 'Equipment rental', 'Performance showcasing', 'Regular gigs']
    },
    {
      type: 'photographer',
      title: 'Event Photographer',
      icon: Camera,
      description: 'Capture memorable moments at events',
      benefits: ['Event assignments', 'Portfolio display', 'Client referrals', 'Package deals']
    }
  ];

  const handlePartnerSelect = (type) => {
    setSelectedPartnerType(type);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and contact you within 2-3 business days.",
    });
    
    // Reset form
    setFormData({
      businessName: '',
      ownerName: '',
      email: '',
      phone: '',
      city: '',
      experience: '',
      description: '',
      services: []
    });
    setSelectedPartnerType('');
  };

  const PartnerTypeCard = ({ partner }) => (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        selectedPartnerType === partner.type 
          ? 'ring-2 ring-[#FF6F61] bg-[#FF6F61]/5' 
          : 'hover:ring-1 hover:ring-slate-300'
      }`}
      onClick={() => handlePartnerSelect(partner.type)}
    >
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-[#FF6F61]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <partner.icon className="h-8 w-8 text-[#FF6F61]" />
        </div>
        <CardTitle className="text-lg text-[#2E3A59]">{partner.title}</CardTitle>
        <p className="text-slate-600 text-sm">{partner.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {partner.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-slate-600">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const ApplicationForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#2E3A59]">
          Apply as {partnerTypes.find(p => p.type === selectedPartnerType)?.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Enter business name"
            />
          </div>
          <div>
            <Label htmlFor="ownerName">Owner Name *</Label>
            <Input
              id="ownerName"
              value={formData.ownerName}
              onChange={(e) => handleInputChange('ownerName', e.target.value)}
              placeholder="Enter owner name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="business@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Mumbai, Delhi, Bangalore..."
            />
          </div>
          <div>
            <Label htmlFor="experience">Years of Experience *</Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              placeholder="5 years"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Business Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Tell us about your business, specialties, and what makes you unique..."
            className="h-24"
          />
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setSelectedPartnerType('')}
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#FF6F61] hover:bg-[#FF6F61]/90"
          >
            Submit Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF5E6]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#2E3A59] to-[#FF6F61] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Partner With DineVibe</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Join our growing network of restaurants, venues, and service providers. 
              Grow your business with India's premier dining and event platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">50K+ Active Users</h3>
                <p className="text-white/80 text-sm">Large customer base seeking quality services</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <TrendingUp className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">30% Revenue Boost</h3>
                <p className="text-white/80 text-sm">Average increase in partner revenue</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Star className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">4.8/5 Partner Rating</h3>
                <p className="text-white/80 text-sm">High satisfaction among our partners</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {!selectedPartnerType ? (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#2E3A59] mb-4">Choose Your Partnership Type</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Select the category that best describes your business. We offer tailored solutions 
                  for each partner type to maximize your success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {partnerTypes.map((partner, index) => (
                  <PartnerTypeCard key={index} partner={partner} />
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <ApplicationForm />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnerWithUs;
