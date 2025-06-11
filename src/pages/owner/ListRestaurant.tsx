
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, MapPin, Phone, Clock, Users, Utensils } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ListRestaurant: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    restaurantName: '',
    description: '',
    address: '',
    city: '',
    cuisine: '',
    seatingCapacity: '',
    priceRange: '₹₹',
    phoneNumber: '',
    email: '',
    openingHours: {
      open: '09:00',
      close: '22:00'
    },
    features: [],
    menuImages: [],
    restaurantImages: []
  });

  const [currentStep, setCurrentStep] = useState(1);

  const cuisineOptions = [
    'North Indian', 'South Indian', 'Chinese', 'Italian', 'Continental',
    'Mexican', 'Thai', 'Japanese', 'Multi-Cuisine', 'Fast Food', 'Desserts'
  ];

  const featureOptions = [
    'Air Conditioning', 'Parking Available', 'WiFi', 'Live Music',
    'Outdoor Seating', 'Home Delivery', 'Takeaway', 'Bar Available',
    'Family Friendly', 'Pet Friendly', 'Wheelchair Accessible'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async () => {
    try {
      // In a real app, this would call the API to create the restaurant
      toast({
        title: "Application Submitted!",
        description: "Your restaurant listing is under review. We'll contact you within 24-48 hours.",
      });
      
      setTimeout(() => {
        navigate('/owner/dashboard');
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const BasicInfoStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#2E3A59]">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="restaurantName">Restaurant Name *</Label>
          <Input
            id="restaurantName"
            value={formData.restaurantName}
            onChange={(e) => handleInputChange('restaurantName', e.target.value)}
            placeholder="Enter restaurant name"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your restaurant"
            className="mt-1 h-24"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="address">Full Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Street address"
            />
          </div>
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="restaurant@example.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const BusinessDetailsStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#2E3A59]">Business Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Cuisine Type *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {cuisineOptions.map(cuisine => (
              <Button
                key={cuisine}
                variant={formData.cuisine === cuisine ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange('cuisine', cuisine)}
                className={formData.cuisine === cuisine ? "bg-[#FF6F61]" : ""}
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="seatingCapacity">Seating Capacity *</Label>
            <Input
              id="seatingCapacity"
              type="number"
              value={formData.seatingCapacity}
              onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
              placeholder="50"
            />
          </div>
          <div>
            <Label>Price Range *</Label>
            <div className="flex gap-2 mt-1">
              {['₹', '₹₹', '₹₹₹', '₹₹₹₹'].map(range => (
                <Button
                  key={range}
                  variant={formData.priceRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('priceRange', range)}
                  className={formData.priceRange === range ? "bg-[#FF6F61]" : ""}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label>Operating Hours *</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="openTime" className="text-sm">Opening Time</Label>
              <Input
                id="openTime"
                type="time"
                value={formData.openingHours.open}
                onChange={(e) => handleInputChange('openingHours', {
                  ...formData.openingHours,
                  open: e.target.value
                })}
              />
            </div>
            <div>
              <Label htmlFor="closeTime" className="text-sm">Closing Time</Label>
              <Input
                id="closeTime"
                type="time"
                value={formData.openingHours.close}
                onChange={(e) => handleInputChange('openingHours', {
                  ...formData.openingHours,
                  close: e.target.value
                })}
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Restaurant Features</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {featureOptions.map(feature => (
              <Button
                key={feature}
                variant={formData.features.includes(feature) ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeatureToggle(feature)}
                className={formData.features.includes(feature) ? "bg-[#FF6F61]" : ""}
              >
                {feature}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MediaUploadStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#2E3A59]">Upload Photos & Menu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Restaurant Photos *</Label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center mt-2">
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">Click to upload restaurant photos</p>
            <p className="text-sm text-slate-500">Upload 3-5 high-quality photos of your restaurant</p>
            <Button variant="outline" className="mt-4">
              Choose Files
            </Button>
          </div>
        </div>

        <div>
          <Label>Menu Images *</Label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center mt-2">
            <Utensils className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">Upload your menu</p>
            <p className="text-sm text-slate-500">Clear photos of your menu or PDF file</p>
            <Button variant="outline" className="mt-4">
              Choose Files
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF5E6]">
      <Navbar userType="business_owner" userName={user?.user_metadata?.name || 'Business Owner'} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2E3A59] mb-4">List Your Restaurant</h1>
            <p className="text-slate-600">Join DineVibe and reach thousands of food lovers</p>
            
            {/* Progress indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step ? 'bg-[#FF6F61] text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 ${
                        currentStep > step ? 'bg-[#FF6F61]' : 'bg-slate-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {currentStep === 1 && <BasicInfoStep />}
            {currentStep === 2 && <BusinessDetailsStep />}
            {currentStep === 3 && <MediaUploadStep />}

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-[#FF6F61] hover:bg-[#FF6F61]/90"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-[#FF6F61] hover:bg-[#FF6F61]/90"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListRestaurant;
