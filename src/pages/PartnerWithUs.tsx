
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Handshake, 
  Building, 
  Users, 
  TrendingUp, 
  Star,
  Upload,
  MapPin,
  Phone,
  Mail,
  Clock,
  IndianRupee,
  Camera,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PartnerWithUs: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    capacity: '',
    venueType: '',
    pricing: '',
    amenities: [],
    description: '',
    experience: '',
    operatingHours: '',
    terms: false
  });

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
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Build Your Brand",
      description: "Showcase your venue with professional photos and customer reviews"
    },
    {
      icon: <Building className="h-8 w-8 text-blue-500" />,
      title: "Management Tools",
      description: "Use our dashboard to manage bookings, analytics, and customer communication"
    }
  ];

  const partnerFeatures = [
    "Free professional photography of your venue",
    "Dedicated account manager for support",
    "Advanced booking management system",
    "Real-time analytics and reporting",
    "Customer review management",
    "Marketing and promotional support",
    "Mobile app for on-the-go management",
    "24/7 customer support"
  ];

  const amenitiesList = [
    'Air Conditioning',
    'Parking Facility',
    'Catering Kitchen',
    'Sound System',
    'Dance Floor',
    'Projector/Screen',
    'Bridal Room',
    'Garden Area',
    'Swimming Pool',
    'Gym/Fitness Center',
    'WiFi',
    'Valet Service'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner registration form submitted:', formData);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your interest! We will review your application and contact you within 24 hours.');
      navigate('/owner/dashboard');
    }, 1000);
  };

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
              Join India's fastest-growing platform for premium dining and event venues
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
                <Card key={index} className="card-luxury text-center">
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

          {/* Registration Form */}
          <Tabs defaultValue="business-info" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="business-info">Business Information</TabsTrigger>
              <TabsTrigger value="venue-details">Venue Details</TabsTrigger>
              <TabsTrigger value="features">Features & Pricing</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              {/* Business Information Tab */}
              <TabsContent value="business-info">
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C] flex items-center">
                      <Building className="h-5 w-5 mr-2 text-[#8B0000]" />
                      Business Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select 
                          value={formData.businessType} 
                          onValueChange={(value) => handleInputChange('businessType', value)}
                        >
                          <SelectTrigger className="border-[#D4AF37]">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="banquet">Banquet Hall</SelectItem>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="resort">Resort</SelectItem>
                            <SelectItem value="farmhouse">Farmhouse</SelectItem>
                            <SelectItem value="garden">Garden Venue</SelectItem>
                            <SelectItem value="both">Restaurant + Banquet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          placeholder="Enter your business name"
                          className="border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="ownerName">Owner/Manager Name</Label>
                        <Input
                          id="ownerName"
                          value={formData.ownerName}
                          onChange={(e) => handleInputChange('ownerName', e.target.value)}
                          placeholder="Enter your full name"
                          className="border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Years in Business</Label>
                        <Select 
                          value={formData.experience} 
                          onValueChange={(value) => handleInputChange('experience', value)}
                        >
                          <SelectTrigger className="border-[#D4AF37]">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="more-than-10">More than 10 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Business Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="business@example.com"
                            className="pl-10 border-[#D4AF37]"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Contact Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+91 98765 43210"
                            className="pl-10 border-[#D4AF37]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Complete Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter complete address with landmarks"
                          className="pl-10 border-[#D4AF37]"
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Select 
                          value={formData.city} 
                          onValueChange={(value) => handleInputChange('city', value)}
                        >
                          <SelectTrigger className="border-[#D4AF37]">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="bangalore">Bangalore</SelectItem>
                            <SelectItem value="pune">Pune</SelectItem>
                            <SelectItem value="hyderabad">Hyderabad</SelectItem>
                            <SelectItem value="chennai">Chennai</SelectItem>
                            <SelectItem value="kolkata">Kolkata</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="State"
                          className="border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          placeholder="400001"
                          className="border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Venue Details Tab */}
              <TabsContent value="venue-details">
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C] flex items-center">
                      <Building className="h-5 w-5 mr-2 text-[#8B0000]" />
                      Venue Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="venueType">Venue Type</Label>
                        <Select 
                          value={formData.venueType} 
                          onValueChange={(value) => handleInputChange('venueType', value)}
                        >
                          <SelectTrigger className="border-[#D4AF37]">
                            <SelectValue placeholder="Select venue type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="indoor">Indoor Hall</SelectItem>
                            <SelectItem value="outdoor">Outdoor Garden</SelectItem>
                            <SelectItem value="rooftop">Rooftop</SelectItem>
                            <SelectItem value="poolside">Poolside</SelectItem>
                            <SelectItem value="beachfront">Beachfront</SelectItem>
                            <SelectItem value="mixed">Indoor + Outdoor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="capacity">Maximum Capacity</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                          <Input
                            id="capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={(e) => handleInputChange('capacity', e.target.value)}
                            placeholder="e.g., 500"
                            className="pl-10 border-[#D4AF37]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="operatingHours">Operating Hours</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                        <Input
                          id="operatingHours"
                          value={formData.operatingHours}
                          onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                          placeholder="e.g., 9:00 AM - 11:00 PM"
                          className="pl-10 border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Venue Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your venue, unique features, ambiance, and what makes it special..."
                        className="border-[#D4AF37]"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Available Amenities</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        {amenitiesList.map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={amenity}
                              checked={formData.amenities.includes(amenity)}
                              onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                            />
                            <label htmlFor={amenity} className="text-sm">{amenity}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Upload Venue Photos</Label>
                      <div className="border-2 border-dashed border-[#D4AF37] rounded-lg p-8 text-center">
                        <Camera className="h-12 w-12 mx-auto text-[#8B0000] mb-4" />
                        <p className="text-[#2F2F2F] mb-2">Upload high-quality photos of your venue</p>
                        <p className="text-sm text-[#2F2F2F] mb-4">
                          Minimum 5 photos required (Interior, Exterior, Seating, Kitchen, etc.)
                        </p>
                        <Button type="button" variant="outline" className="border-[#8B0000] text-[#8B0000]">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Photos
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Features & Pricing Tab */}
              <TabsContent value="features">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="card-luxury">
                    <CardHeader>
                      <CardTitle className="text-[#0C0C0C] flex items-center">
                        <IndianRupee className="h-5 w-5 mr-2 text-[#8B0000]" />
                        Pricing Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="pricing">Base Package Price</Label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                          <Input
                            id="pricing"
                            type="number"
                            value={formData.pricing}
                            onChange={(e) => handleInputChange('pricing', e.target.value)}
                            placeholder="e.g., 50000"
                            className="pl-10 border-[#D4AF37]"
                          />
                        </div>
                        <p className="text-sm text-[#2F2F2F] mt-1">
                          Base price for standard package (per event)
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.terms}
                          onCheckedChange={(checked) => handleInputChange('terms', checked)}
                        />
                        <label htmlFor="terms" className="text-sm">
                          I agree to the Terms & Conditions and Privacy Policy
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                        disabled={!formData.terms}
                      >
                        Submit Partnership Application
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-luxury">
                    <CardHeader>
                      <CardTitle className="text-[#0C0C0C] flex items-center">
                        <Star className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        What You Get
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {partnerFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-[#D4AF37]/10 rounded-lg">
                        <h4 className="font-semibold text-[#0C0C0C] mb-2">Commission Structure</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Platform Fee:</span>
                            <span className="font-semibold">8-12%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payment Processing:</span>
                            <span className="font-semibold">2-3%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Marketing Support:</span>
                            <span className="font-semibold text-green-600">Free</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnerWithUs;
