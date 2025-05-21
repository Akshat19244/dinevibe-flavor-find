
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { createRestaurant, uploadRestaurantImage, uploadMenuImages } from '@/lib/api/restaurants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { TimePickerInput } from '@/components/ui/time-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, UploadCloud, Clock, DollarSign, MapPin, Users, Utensils, BadgeInfo } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormData {
  name: string;
  description: string;
  cuisine: string;
  location: string;
  price_range: string;
  seating_capacity: number;
  staff_size: number;
  opening_time: string;
  closing_time: string;
  manager_name: string;
  manager_contact: string;
  features: {
    has_ac: boolean;
    has_parking: boolean;
    has_wifi: boolean;
    has_live_music: boolean;
    is_veg_only: boolean;
    accepts_cards: boolean;
    allows_booking: boolean;
    is_fine_dining: boolean;
  };
  offers_decoration: boolean;
  budget_range: {
    min: number;
    max: number;
  };
}

const CUISINE_OPTIONS = [
  'American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 
  'Korean', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Thai', 
  'Vietnamese', 'Fusion', 'Seafood', 'Steakhouse', 'Vegetarian', 
  'Vegan', 'Bakery', 'Café', 'Buffet', 'Other'
];

const PRICE_RANGE_OPTIONS = [
  '$', '$$', '$$$', '$$$$'
];

const RestaurantRegistrationForm: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form state
  const initialFormData: FormData = {
    name: '',
    description: '',
    cuisine: '',
    location: '',
    price_range: '$$',
    seating_capacity: 50,
    staff_size: 10,
    opening_time: '10:00',
    closing_time: '22:00',
    manager_name: '',
    manager_contact: '',
    features: {
      has_ac: false,
      has_parking: false,
      has_wifi: false,
      has_live_music: false,
      is_veg_only: false,
      accepts_cards: true,
      allows_booking: true,
      is_fine_dining: false
    },
    offers_decoration: false,
    budget_range: {
      min: 100,
      max: 500
    }
  };
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurantImages, setRestaurantImages] = useState<File[]>([]);
  const [menuImages, setMenuImages] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentTab, setCurrentTab] = useState('basic');
  
  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle number input changes
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    setFormData((prev) => ({ ...prev, [name]: numValue }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle feature toggles
  const handleFeatureChange = (feature: keyof FormData['features'], value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: value }
    }));
  };
  
  // Handle decoration toggle
  const handleDecorationToggle = (value: boolean) => {
    setFormData((prev) => ({ ...prev, offers_decoration: value }));
  };
  
  // Handle budget range changes
  const handleBudgetChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData((prev) => ({
      ...prev,
      budget_range: { ...prev.budget_range, [type]: numValue }
    }));
  };
  
  // Handle restaurant image upload
  const handleRestaurantImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setRestaurantImages(fileList);
    }
  };
  
  // Handle menu image upload
  const handleMenuImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setMenuImages(fileList);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to register a restaurant.',
        variant: 'destructive'
      });
      return;
    }
    
    // Validate form
    if (!formData.name || !formData.description || !formData.cuisine || !formData.location) {
      toast({
        title: 'Required Fields Missing',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    setUploadProgress(10);
    
    try {
      // Upload restaurant images
      let restaurantImageUrls: string[] = [];
      if (restaurantImages.length > 0) {
        setUploadProgress(20);
        const uploadPromises = restaurantImages.map(image => uploadRestaurantImage(image));
        restaurantImageUrls = await Promise.all(uploadPromises);
        setUploadProgress(40);
      }
      
      // Upload menu images
      let menuImageUrls: string[] = [];
      if (menuImages.length > 0) {
        setUploadProgress(60);
        menuImageUrls = await uploadMenuImages(menuImages);
        setUploadProgress(80);
      }
      
      // Prepare restaurant data
      const restaurantData = {
        owner_id: user.id,
        name: formData.name,
        description: formData.description,
        cuisine: formData.cuisine,
        location: formData.location,
        price_range: formData.price_range,
        images: restaurantImageUrls,
        menu_images: menuImageUrls,
        seating_capacity: formData.seating_capacity,
        staff_size: formData.staff_size,
        offers_decoration: formData.offers_decoration,
        budget_range: formData.budget_range,
        manager_details: {
          name: formData.manager_name,
          contact: formData.manager_contact,
          opening_hours: {
            open: formData.opening_time,
            close: formData.closing_time
          },
          features: formData.features
        },
        is_approved: false // Requires admin approval
      };
      
      setUploadProgress(90);
      
      // Create restaurant in database
      await createRestaurant(restaurantData);
      
      setUploadProgress(100);
      
      toast({
        title: 'Registration Successful!',
        description: 'Your restaurant has been registered and is pending approval.',
      });
      
      // Redirect to owner dashboard
      navigate('/owner/dashboard');
      
    } catch (error) {
      console.error('Error registering restaurant:', error);
      toast({
        title: 'Registration Failed',
        description: 'There was an error registering your restaurant. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Register Your Restaurant</CardTitle>
        <CardDescription>
          Fill in the details below to register your restaurant. Your submission will be reviewed by our admins.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>
            
            {/* Basic Information */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name*</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter restaurant name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cuisine">Cuisine Type*</Label>
                  <Select
                    value={formData.cuisine}
                    onValueChange={(value) => handleSelectChange('cuisine', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      {CUISINE_OPTIONS.map((cuisine) => (
                        <SelectItem key={cuisine} value={cuisine}>
                          {cuisine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description*</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your restaurant, specialties, and unique features"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location*</Label>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Full address"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price_range">Price Range</Label>
                  <Select
                    value={formData.price_range}
                    onValueChange={(value) => handleSelectChange('price_range', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRICE_RANGE_OPTIONS.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range} {range === '$' ? '(Budget)' : range === '$$' ? '(Moderate)' : 
                            range === '$$$' ? '(Expensive)' : '(Fine Dining)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget_min">Average Price Per Person</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="budget_min"
                      type="number"
                      placeholder="Min"
                      value={formData.budget_range.min}
                      onChange={(e) => handleBudgetChange('min', e.target.value)}
                      min={0}
                      className="w-full"
                    />
                    <span>to</span>
                    <Input
                      id="budget_max"
                      type="number"
                      placeholder="Max"
                      value={formData.budget_range.max}
                      onChange={(e) => handleBudgetChange('max', e.target.value)}
                      min={0}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end md:col-span-2 pt-4">
                  <Button type="button" onClick={() => setCurrentTab('details')}>
                    Next: Restaurant Details
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Restaurant Details */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="seating_capacity">Seating Capacity</Label>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground mr-2" />
                    <Input
                      id="seating_capacity"
                      name="seating_capacity"
                      type="number"
                      min={1}
                      placeholder="Number of seats"
                      value={formData.seating_capacity}
                      onChange={handleNumberChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="staff_size">Staff Size</Label>
                  <Input
                    id="staff_size"
                    name="staff_size"
                    type="number"
                    min={1}
                    placeholder="Number of staff"
                    value={formData.staff_size}
                    onChange={handleNumberChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="opening_time">Opening Hours</Label>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <Input
                      id="opening_time"
                      name="opening_time"
                      type="time"
                      value={formData.opening_time}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="closing_time">Closing Hours</Label>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <Input
                      id="closing_time"
                      name="closing_time"
                      type="time"
                      value={formData.closing_time}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manager_name">Manager Name</Label>
                  <Input
                    id="manager_name"
                    name="manager_name"
                    placeholder="Enter manager's name"
                    value={formData.manager_name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manager_contact">Manager Contact</Label>
                  <Input
                    id="manager_contact"
                    name="manager_contact"
                    placeholder="Enter manager's contact"
                    value={formData.manager_contact}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="offers_decoration">Offers Decoration Services</Label>
                    <Switch
                      id="offers_decoration"
                      checked={formData.offers_decoration}
                      onCheckedChange={handleDecorationToggle}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable if you offer decoration for special events like birthdays, anniversaries, etc.
                  </p>
                </div>
                
                <div className="flex justify-between md:col-span-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentTab('basic')}>
                    Previous: Basic Info
                  </Button>
                  <Button type="button" onClick={() => setCurrentTab('features')}>
                    Next: Features
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Restaurant Features */}
            <TabsContent value="features" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Restaurant Features</h3>
                <p className="text-sm text-muted-foreground">
                  Select all the features and amenities that your restaurant offers.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_ac"
                      checked={formData.features.has_ac}
                      onCheckedChange={(checked) => handleFeatureChange('has_ac', checked as boolean)}
                    />
                    <Label htmlFor="has_ac">Air Conditioning</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_parking"
                      checked={formData.features.has_parking}
                      onCheckedChange={(checked) => handleFeatureChange('has_parking', checked as boolean)}
                    />
                    <Label htmlFor="has_parking">Parking Available</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_wifi"
                      checked={formData.features.has_wifi}
                      onCheckedChange={(checked) => handleFeatureChange('has_wifi', checked as boolean)}
                    />
                    <Label htmlFor="has_wifi">Free WiFi</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_live_music"
                      checked={formData.features.has_live_music}
                      onCheckedChange={(checked) => handleFeatureChange('has_live_music', checked as boolean)}
                    />
                    <Label htmlFor="has_live_music">Live Music</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_veg_only"
                      checked={formData.features.is_veg_only}
                      onCheckedChange={(checked) => handleFeatureChange('is_veg_only', checked as boolean)}
                    />
                    <Label htmlFor="is_veg_only">Vegetarian Only</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accepts_cards"
                      checked={formData.features.accepts_cards}
                      onCheckedChange={(checked) => handleFeatureChange('accepts_cards', checked as boolean)}
                    />
                    <Label htmlFor="accepts_cards">Accepts Credit Cards</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allows_booking"
                      checked={formData.features.allows_booking}
                      onCheckedChange={(checked) => handleFeatureChange('allows_booking', checked as boolean)}
                    />
                    <Label htmlFor="allows_booking">Allows Bookings</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_fine_dining"
                      checked={formData.features.is_fine_dining}
                      onCheckedChange={(checked) => handleFeatureChange('is_fine_dining', checked as boolean)}
                    />
                    <Label htmlFor="is_fine_dining">Fine Dining</Label>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentTab('details')}>
                    Previous: Restaurant Details
                  </Button>
                  <Button type="button" onClick={() => setCurrentTab('media')}>
                    Next: Upload Media
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Media Upload */}
            <TabsContent value="media" className="space-y-6">
              <Alert className="bg-blue-50 border-blue-200">
                <BadgeInfo className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  High-quality images of your restaurant and menu will help attract more customers.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-images">Restaurant Images</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <UploadCloud className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Upload images of your restaurant (interior/exterior)
                    </p>
                    <label className="mt-4 inline-block">
                      <Button type="button" variant="outline">
                        Select Photos
                      </Button>
                      <Input
                        id="restaurant-images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleRestaurantImageChange}
                      />
                    </label>
                    {restaurantImages.length > 0 && (
                      <p className="mt-2 text-sm">
                        {restaurantImages.length} image(s) selected
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="menu-images">Menu Photos</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Utensils className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Upload images of your menu (PDF or images)
                    </p>
                    <label className="mt-4 inline-block">
                      <Button type="button" variant="outline">
                        Select Menu
                      </Button>
                      <Input
                        id="menu-images"
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        className="sr-only"
                        onChange={handleMenuImageChange}
                      />
                    </label>
                    {menuImages.length > 0 && (
                      <p className="mt-2 text-sm">
                        {menuImages.length} menu file(s) selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setCurrentTab('features')}>
                  Previous: Features
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Submit Restaurant'}
                </Button>
              </div>
              
              {isSubmitting && (
                <div className="space-y-2">
                  <p className="text-sm text-center">
                    {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  );
};

export default RestaurantRegistrationForm;
