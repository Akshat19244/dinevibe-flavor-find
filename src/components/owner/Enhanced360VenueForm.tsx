
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUpload from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';
import { 
  Camera, 
  FileText, 
  Star,
  MapPin,
  Phone,
  Mail,
  Upload,
  CheckCircle,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VenueFormData {
  restaurantType: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  capacity: string;
  description: string;
  googleReviewUrl: string;
  menuImages: File[];
  businessDocuments: File[];
  venuePhotos: {
    entrance: File[];
    seating: File[];
    kitchen: File[];
    washrooms: File[];
    ambience: File[];
    stage?: File[];
    lighting?: File[];
    buffet?: File[];
    decorated?: File[];
  };
}

const Enhanced360VenueForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<VenueFormData>({
    restaurantType: '',
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    capacity: '',
    description: '',
    googleReviewUrl: '',
    menuImages: [],
    businessDocuments: [],
    venuePhotos: {
      entrance: [],
      seating: [],
      kitchen: [],
      washrooms: [],
      ambience: [],
      stage: [],
      lighting: [],
      buffet: [],
      decorated: []
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVenuePhotosChange = (category: string, files: File[]) => {
    setFormData(prev => ({
      ...prev,
      venuePhotos: {
        ...prev.venuePhotos,
        [category]: files
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.restaurantType && formData.businessName && formData.ownerName);
      case 2:
        return !!(formData.email && formData.phone && formData.address && formData.city);
      case 3:
        return formData.menuImages.length > 0 && formData.businessDocuments.length > 0;
      case 4:
        const requiredPhotos = ['entrance', 'seating', 'washrooms', 'ambience'];
        const banquetPhotos = ['stage', 'lighting', 'buffet'];
        
        const hasRequiredPhotos = requiredPhotos.every(
          category => formData.venuePhotos[category as keyof typeof formData.venuePhotos].length > 0
        );
        
        if (formData.restaurantType === 'banquet' || formData.restaurantType === 'both') {
          const hasBanquetPhotos = banquetPhotos.some(
            category => formData.venuePhotos[category as keyof typeof formData.venuePhotos]?.length > 0
          );
          return hasRequiredPhotos && hasBanquetPhotos;
        }
        
        return hasRequiredPhotos;
      case 5:
        return !!formData.googleReviewUrl;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      toast({
        title: "Validation Error",
        description: "Please complete all required steps.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission and processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Registration Successful!",
        description: "Your venue has been registered. Processing 360° tour generation...",
      });
      
      // Navigate to owner dashboard
      navigate('/owner/dashboard');
      
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPhotoRequirements = () => {
    const base = ['Entrance', 'Seating Area', 'Washrooms', 'Ambience'];
    if (formData.restaurantType === 'restaurant') {
      return [...base, 'Kitchen View'];
    } else if (formData.restaurantType === 'banquet') {
      return [...base, 'Stage Area', 'Lighting Setup', 'Buffet Zone'];
    } else if (formData.restaurantType === 'both') {
      return [...base, 'Kitchen View', 'Stage Area', 'Lighting Setup', 'Buffet Zone', 'Decorated Setup'];
    }
    return base;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-[#D4AF37]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#0C0C0C] flex items-center">
            <Camera className="h-6 w-6 mr-3 text-[#8B0000]" />
            Register Your Venue - 360° Experience Ready
          </CardTitle>
          
          {/* Progress Indicator */}
          <div className="flex items-center space-x-2 mt-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep 
                    ? 'bg-[#8B0000] text-[#FFF5E1]' 
                    : 'bg-[#2F2F2F]/20 text-[#2F2F2F]'
                }`}>
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 5 && <div className={`w-8 h-1 ${step < currentStep ? 'bg-[#8B0000]' : 'bg-[#2F2F2F]/20'}`} />}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Business Type & Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0C0C0C]">Business Information</h3>
              
              <div>
                <Label htmlFor="restaurantType">Restaurant Type *</Label>
                <Select 
                  value={formData.restaurantType} 
                  onValueChange={(value) => handleInputChange('restaurantType', value)}
                >
                  <SelectTrigger className="border-[#D4AF37]">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant Only</SelectItem>
                    <SelectItem value="banquet">Banquet Hall Only</SelectItem>
                    <SelectItem value="both">Restaurant + Banquet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Enter your business name"
                    className="border-[#D4AF37]"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerName">Owner/Manager Name *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="Enter your full name"
                    className="border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact & Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0C0C0C]">Contact & Location Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Business Email *</Label>
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
                  <Label htmlFor="phone">Contact Number *</Label>
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
                <Label htmlFor="address">Complete Address *</Label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city">City *</Label>
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
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="capacity">Maximum Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="e.g., 500"
                    className="border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Menu & Documents */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0C0C0C]">Menu & Business Documents</h3>
              
              <div>
                <Label>Menu Images * (Required for pricing calculation)</Label>
                <FileUpload
                  onFilesChange={(files) => handleInputChange('menuImages', files)}
                  acceptedTypes={['image/*']}
                  maxFiles={10}
                  maxSizeMB={5}
                  label="Upload Menu Images"
                  description="Upload clear, high-quality images of your menu. Our AI will extract pricing information for automatic cost calculations."
                />
                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Why menu images are important:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Automatic price calculation for customer filtering</li>
                        <li>Better search ranking and visibility</li>
                        <li>Helps customers make informed decisions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label>Business Documents *</Label>
                <FileUpload
                  onFilesChange={(files) => handleInputChange('businessDocuments', files)}
                  acceptedTypes={['image/*', '.pdf', '.doc', '.docx']}
                  maxFiles={5}
                  maxSizeMB={10}
                  label="Upload Business Documents"
                  description="Business license, food safety certificate, permits, etc."
                />
              </div>
            </div>
          )}

          {/* Step 4: 360° Photo Requirements */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#0C0C0C]">360° Virtual Tour Photos</h3>
                <p className="text-[#2F2F2F] mt-2">
                  These photos will be used to generate a virtual 360° tour for your venue, helping customers explore before booking.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getPhotoRequirements().map((category) => {
                  const key = category.toLowerCase().replace(/\s+/g, '').replace('area', '').replace('view', '').replace('setup', '');
                  return (
                    <div key={category}>
                      <Label>{category} *</Label>
                      <FileUpload
                        onFilesChange={(files) => handleVenuePhotosChange(key, files)}
                        acceptedTypes={['image/*']}
                        maxFiles={5}
                        maxSizeMB={5}
                        label={`Upload ${category} Photos`}
                        description={`High-quality photos of ${category.toLowerCase()}`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]">
                <h4 className="font-semibold text-[#0C0C0C] mb-2">Photography Tips for Best 360° Results:</h4>
                <ul className="text-sm text-[#2F2F2F] space-y-1">
                  <li>• Take photos from multiple angles of each area</li>
                  <li>• Ensure good lighting - avoid dark or poorly lit shots</li>
                  <li>• Include wide shots to show the full space</li>
                  <li>• Capture unique features and decorative elements</li>
                  <li>• Show different table arrangements/setups if possible</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 5: Reviews & Final Submission */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0C0C0C]">Reviews & Final Details</h3>
              
              <div>
                <Label htmlFor="googleReviewUrl">Google Review URL or Screenshot *</Label>
                <Input
                  id="googleReviewUrl"
                  value={formData.googleReviewUrl}
                  onChange={(e) => handleInputChange('googleReviewUrl', e.target.value)}
                  placeholder="Paste your Google Business review URL"
                  className="border-[#D4AF37]"
                />
                <p className="text-sm text-[#2F2F2F] mt-1">
                  If your rating is 4.0 or above, your venue will be auto-published to our discovery platform
                </p>
              </div>

              <div>
                <Label htmlFor="description">Venue Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your venue's unique features, ambiance, and specialties..."
                  className="border-[#D4AF37]"
                  rows={4}
                />
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">What happens after submission:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ Your venue registration will be processed within 24 hours</li>
                  <li>✓ 360° virtual tour will be generated from your photos</li>
                  <li>✓ Menu pricing will be automatically extracted and configured</li>
                  <li>✓ You'll be redirected to your dashboard with live metrics</li>
                  <li>✓ Auto-approval for venues with 4.0+ ratings</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-[#2F2F2F] text-[#2F2F2F]"
            >
              Previous
            </Button>
            
            {currentStep < 5 ? (
              <Button
                onClick={nextStep}
                className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
              >
                {isSubmitting ? 'Processing...' : 'Complete Registration'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Enhanced360VenueForm;
