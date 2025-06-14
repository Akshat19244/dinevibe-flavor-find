
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  MapPin, 
  Star, 
  Camera,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Building,
  Users,
  DollarSign
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { requestLocationPermission, LocationInfo } from '@/lib/services/locationService';

interface VenueFormData {
  name: string;
  type: 'restaurant' | 'banquet' | 'both';
  email: string;
  phone: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  rating: number;
  googleReviewUrl: string;
  services: string[];
  ambienceType: string[];
  guestCapacity: number;
  priceRangeMin: number;
  priceRangeMax: number;
}

const VenueRegistrationForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  
  const [formData, setFormData] = useState<VenueFormData>({
    name: '',
    type: 'restaurant',
    email: '',
    phone: '',
    address: '',
    latitude: null,
    longitude: null,
    rating: 0,
    googleReviewUrl: '',
    services: [],
    ambienceType: [],
    guestCapacity: 50,
    priceRangeMin: 500,
    priceRangeMax: 2000,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    menuImages: [] as File[],
    venueImages: [] as File[],
    banquetImages: [] as File[]
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const serviceOptions = [
    'WiFi', 'Air Conditioning', 'Parking', 'Valet Service', 'Live Music',
    'DJ Services', 'Catering', 'Photography', 'Decoration', 'Bar Service'
  ];

  const ambienceOptions = [
    'Rooftop', 'Garden', 'Indoor', 'Poolside', 'Beachside', 'Terrace',
    'Private Dining', 'Open Air', 'Luxury', 'Casual', 'Romantic', 'Family Friendly'
  ];

  useEffect(() => {
    // Auto-detect location on component mount
    handleLocationDetection();
  }, []);

  const handleLocationDetection = async () => {
    setIsLoadingLocation(true);
    try {
      const location = await requestLocationPermission();
      setLocationInfo(location);
      setFormData(prev => ({
        ...prev,
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        address: location.address
      }));
      toast({
        title: "Location Detected",
        description: "Your location has been automatically detected and filled in the form.",
      });
    } catch (error) {
      console.error('Location detection failed:', error);
      toast({
        title: "Location Detection Failed",
        description: "Please enter your address manually.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'services' | 'ambienceType', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleFileUpload = (category: keyof typeof uploadedFiles, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prev => ({
        ...prev,
        [category]: [...prev[category], ...fileArray]
      }));
    }
  };

  const uploadFilesToStorage = async (): Promise<{ [key: string]: string[] }> => {
    const uploadPromises: Promise<string>[] = [];
    const fileCategories: { [key: string]: File[] } = {
      menu: uploadedFiles.menuImages,
      venue: uploadedFiles.venueImages,
      banquet: uploadedFiles.banquetImages
    };

    const uploadedUrls: { [key: string]: string[] } = {
      menu_images: [],
      venue_images: [],
      banquet_images: []
    };

    for (const [category, files] of Object.entries(fileCategories)) {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user?.id}/${category}/${Date.now()}.${fileExt}`;
        
        const uploadPromise = supabase.storage
          .from('venue-images')
          .upload(fileName, file)
          .then(({ data, error }) => {
            if (error) throw error;
            const { data: urlData } = supabase.storage
              .from('venue-images')
              .getPublicUrl(fileName);
            return urlData.publicUrl;
          });
        
        uploadPromises.push(uploadPromise);
        
        try {
          const url = await uploadPromise;
          uploadedUrls[`${category}_images`].push(url);
        } catch (error) {
          console.error(`Failed to upload ${category} file:`, error);
        }
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to register your venue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload files first
      const uploadedUrls = await uploadFilesToStorage();
      
      // Check if venue should be auto-approved (rating >= 4.0)
      const isAutoApproved = formData.rating >= 4.0;
      
      // Insert venue data
      const venueData = {
        owner_id: user.id,
        name: formData.name,
        type: formData.type,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        rating: formData.rating,
        google_review_url: formData.googleReviewUrl,
        services: formData.services,
        ambience_type: formData.ambienceType,
        guest_capacity: formData.guestCapacity,
        price_range_min: formData.priceRangeMin,
        price_range_max: formData.priceRangeMax,
        menu_images: uploadedUrls.menu_images,
        venue_images: uploadedUrls.venue_images,
        banquet_images: uploadedUrls.banquet_images,
        has_360_preview: true, // Since we're generating from uploaded images
        is_approved: isAutoApproved,
        auto_approved: isAutoApproved
      };

      const { error } = await supabase
        .from('venues')
        .insert([venueData]);

      if (error) throw error;

      toast({
        title: "Venue Registered Successfully!",
        description: isAutoApproved 
          ? "Your venue has been auto-approved and is now live on DineVibe!"
          : "Your venue is under review. You'll be notified once approved.",
      });

      // Redirect to owner dashboard
      navigate('/owner/dashboard');
      
    } catch (error) {
      console.error('Error registering venue:', error);
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building className="h-12 w-12 mx-auto mb-4 text-[#8B0000]" />
              <h3 className="text-xl font-bold text-[#0C0C0C]">Basic Information</h3>
              <p className="text-[#2F2F2F]">Tell us about your venue</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Venue Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Venue Type *</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded-md focus:border-[#8B0000] focus:outline-none"
                >
                  <option value="restaurant">Restaurant</option>
                  <option value="banquet">Banquet Hall</option>
                  <option value="both">Both</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="flex space-x-2">
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your venue address"
                  className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                />
                <Button
                  type="button"
                  onClick={handleLocationDetection}
                  disabled={isLoadingLocation}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#0C0C0C]"
                >
                  {isLoadingLocation ? 'Detecting...' : <MapPin className="h-4 w-4" />}
                </Button>
              </div>
              {locationInfo && (
                <p className="text-sm text-green-600">
                  ✓ Location detected: {locationInfo.city}, {locationInfo.state}
                </p>
              )}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Star className="h-12 w-12 mx-auto mb-4 text-[#8B0000]" />
              <h3 className="text-xl font-bold text-[#0C0C0C]">Rating & Reviews</h3>
              <p className="text-[#2F2F2F]">Help us verify your venue quality</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Current Rating (1-5) *</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                />
                {formData.rating >= 4.0 && (
                  <p className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Your venue will be auto-approved!
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="googleReviewUrl">Google Reviews URL</Label>
                <Input
                  id="googleReviewUrl"
                  name="googleReviewUrl"
                  type="url"
                  value={formData.googleReviewUrl}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Camera className="h-12 w-12 mx-auto mb-4 text-[#8B0000]" />
              <h3 className="text-xl font-bold text-[#0C0C0C]">Upload Images</h3>
              <p className="text-[#2F2F2F]">These will be used to generate your 360° virtual tour</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Menu Images (Required) *</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('menuImages', e.target.files)}
                  className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                />
                <p className="text-sm text-[#2F2F2F]">Upload clear photos of your menu pages</p>
                {uploadedFiles.menuImages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.menuImages.map((file, index) => (
                      <Badge key={index} variant="outline" className="border-green-500 text-green-700">
                        {file.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {(formData.type === 'restaurant' || formData.type === 'both') && (
                <div className="space-y-2">
                  <Label>Restaurant Images</Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload('venueImages', e.target.files)}
                    className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                  />
                  <p className="text-sm text-[#2F2F2F]">Entrance, seating area, kitchen view, ambience</p>
                  {uploadedFiles.venueImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.venueImages.map((file, index) => (
                        <Badge key={index} variant="outline" className="border-blue-500 text-blue-700">
                          {file.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {(formData.type === 'banquet' || formData.type === 'both') && (
                <div className="space-y-2">
                  <Label>Banquet Hall Images</Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload('banquetImages', e.target.files)}
                    className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                  />
                  <p className="text-sm text-[#2F2F2F]">Stage, entry, lighting, buffet zone, decorated setup</p>
                  {uploadedFiles.banquetImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.banquetImages.map((file, index) => (
                        <Badge key={index} variant="outline" className="border-purple-500 text-purple-700">
                          {file.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-[#8B0000]" />
              <h3 className="text-xl font-bold text-[#0C0C0C]">Services & Capacity</h3>
              <p className="text-[#2F2F2F]">Final details about your venue</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Services Offered</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('services', service, checked as boolean)
                          }
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Ambience Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {ambienceOptions.map((ambience) => (
                      <label key={ambience} className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.ambienceType.includes(ambience)}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('ambienceType', ambience, checked as boolean)
                          }
                        />
                        <span className="text-sm">{ambience}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guestCapacity">Guest Capacity *</Label>
                  <Input
                    id="guestCapacity"
                    name="guestCapacity"
                    type="number"
                    min="1"
                    value={formData.guestCapacity}
                    onChange={handleInputChange}
                    className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Price Range (per person)</Label>
                  <div className="flex space-x-2">
                    <Input
                      name="priceRangeMin"
                      type="number"
                      placeholder="Min ₹"
                      value={formData.priceRangeMin}
                      onChange={handleInputChange}
                      className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                    />
                    <Input
                      name="priceRangeMax"
                      type="number"
                      placeholder="Max ₹"
                      value={formData.priceRangeMax}
                      onChange={handleInputChange}
                      className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto border-[#D4AF37]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0C0C0C] text-center">
          Register Your Venue with DineVibe
        </CardTitle>
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-center text-[#2F2F2F]">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      </CardHeader>
      
      <CardContent>
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="border-[#D4AF37] text-[#8B0000]"
          >
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || uploadedFiles.menuImages.length === 0}
              className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueRegistrationForm;
