
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimePicker } from '@/components/ui/time-picker';
import { SystemSelect } from '@/components/ui/system-select';
import { useToast } from '@/components/ui/use-toast';
import { createRestaurant, uploadRestaurantImage, uploadMenuImages } from '@/lib/api/restaurants';
import { Building, MapPin, Clock, Phone, Upload, Users, FileText, Check, X } from 'lucide-react';

const RegisterRestaurant: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Restaurant form state
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    description: '',
    location: '',
    cuisine: '',
    phone: '',
    email: '',
    openingTime: '09:00',
    closingTime: '22:00',
    seatingCapacity: '50',
    offersDecoration: false,
    priceRange: 'moderate',
  });
  
  const [managerDetails, setManagerDetails] = useState({
    name: '',
    phone: '',
    email: '',
  });
  
  const [features, setFeatures] = useState({
    hasParking: false,
    isWheelchairAccessible: false,
    hasWifi: false,
    acceptsReservations: true,
    hasCatering: false,
    hasOutdoorSeating: false,
    hasLiveMusic: false,
    servesAlcohol: false,
    isVegetarianFriendly: false,
    isVeganFriendly: false,
  });
  
  // Images state
  const [restaurantImages, setRestaurantImages] = useState<File[]>([]);
  const [menuImages, setMenuImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewMenuImages, setPreviewMenuImages] = useState<string[]>([]);
  
  // Form state
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Options for form selects
  const cuisineOptions = [
    { value: 'italian', label: 'Italian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'indian', label: 'Indian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'thai', label: 'Thai' },
    { value: 'american', label: 'American' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'lebanese', label: 'Lebanese' },
    { value: 'fusion', label: 'Fusion' },
    { value: 'other', label: 'Other' },
  ];
  
  const priceRangeOptions = [
    { value: 'budget', label: 'Budget ($)' },
    { value: 'moderate', label: 'Moderate ($$)' },
    { value: 'high-end', label: 'High-End ($$$)' },
    { value: 'luxury', label: 'Luxury ($$$$)' },
  ];
  
  // Set initial manager details from user data
  useEffect(() => {
    if (user) {
      setManagerDetails({
        name: user.user_metadata?.name || '',
        phone: user.user_metadata?.phone || '',
        email: user.email || '',
      });
    }
  }, [user]);
  
  // Handle restaurant image selection
  const handleRestaurantImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const selectedFiles: File[] = Array.from(files);
    setRestaurantImages(prev => [...prev, ...selectedFiles]);
    
    // Create previews
    const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };
  
  // Handle menu image selection
  const handleMenuImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const selectedFiles: File[] = Array.from(files);
    setMenuImages(prev => [...prev, ...selectedFiles]);
    
    // Create previews
    const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
    setPreviewMenuImages(prev => [...prev, ...newPreviews]);
  };
  
  // Remove restaurant image
  const removeRestaurantImage = (index: number) => {
    const newImages = [...restaurantImages];
    newImages.splice(index, 1);
    setRestaurantImages(newImages);
    
    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };
  
  // Remove menu image
  const removeMenuImage = (index: number) => {
    const newImages = [...menuImages];
    newImages.splice(index, 1);
    setMenuImages(newImages);
    
    const newPreviews = [...previewMenuImages];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewMenuImages(newPreviews);
  };
  
  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to register a restaurant.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate required fields
    if (!restaurantData.name || !restaurantData.description || !restaurantData.location || !restaurantData.cuisine) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload restaurant images
      const imageUrls: string[] = [];
      
      if (restaurantImages.length > 0) {
        for (const image of restaurantImages) {
          try {
            const imageUrl = await uploadRestaurantImage(image);
            imageUrls.push(imageUrl);
          } catch (error) {
            console.error('Error uploading restaurant image:', error);
          }
        }
      }
      
      // Upload menu images
      const menuImageUrls: string[] = [];
      
      if (menuImages.length > 0) {
        try {
          const uploadedMenuUrls = await uploadMenuImages(menuImages);
          menuImageUrls.push(...uploadedMenuUrls);
        } catch (error) {
          console.error('Error uploading menu images:', error);
        }
      }
      
      // Format price range for database
      const priceMultiplier = {
        'budget': { min: 10, max: 30 },
        'moderate': { min: 30, max: 60 },
        'high-end': { min: 60, max: 100 },
        'luxury': { min: 100, max: 200 },
      };
      
      const selectedPriceRange = restaurantData.priceRange as keyof typeof priceMultiplier;
      const budgetRange = {
        min: priceMultiplier[selectedPriceRange].min,
        max: priceMultiplier[selectedPriceRange].max,
      };
      
      // Prepare complete restaurant data
      const newRestaurant = {
        name: restaurantData.name,
        description: restaurantData.description,
        location: restaurantData.location,
        cuisine: restaurantData.cuisine,
        seating_capacity: parseInt(restaurantData.seatingCapacity),
        offers_decoration: restaurantData.offersDecoration,
        images: imageUrls,
        menu_images: menuImageUrls,
        owner_id: user.id,
        price_range: restaurantData.priceRange,
        budget_range: budgetRange,
        manager_details: {
          name: managerDetails.name,
          phone: managerDetails.phone,
          email: managerDetails.email,
          opening_time: restaurantData.openingTime,
          closing_time: restaurantData.closingTime,
        },
        features: features,
        is_approved: false,
      };
      
      // Create the restaurant in the database
      const createdRestaurant = await createRestaurant(newRestaurant);
      
      toast({
        title: "Restaurant Registered",
        description: "Your restaurant has been registered successfully and is pending approval.",
      });
      
      // Navigate to the dashboard
      setTimeout(() => {
        navigate('/owner/dashboard');
      }, 1000);
      
    } catch (error: any) {
      console.error('Error registering restaurant:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register your restaurant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Move to the next tab
  const nextTab = () => {
    if (activeTab === 'basic') setActiveTab('details');
    else if (activeTab === 'details') setActiveTab('images');
    else if (activeTab === 'images') setActiveTab('features');
  };
  
  // Move to the previous tab
  const prevTab = () => {
    if (activeTab === 'features') setActiveTab('images');
    else if (activeTab === 'images') setActiveTab('details');
    else if (activeTab === 'details') setActiveTab('basic');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName={user?.user_metadata?.name || 'Restaurant Owner'} />
      
      <main className="flex-grow py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Restaurant Registration</CardTitle>
              <CardDescription>
                Register your restaurant to start receiving bookings and reach new customers
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="basic" disabled={isSubmitting}>
                    <Building className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Basic Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="details" disabled={isSubmitting}>
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Details</span>
                  </TabsTrigger>
                  <TabsTrigger value="images" disabled={isSubmitting}>
                    <Upload className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Images</span>
                  </TabsTrigger>
                  <TabsTrigger value="features" disabled={isSubmitting}>
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Features</span>
                  </TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleSubmit}>
                  {/* Basic Info Tab */}
                  <TabsContent value="basic" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-name">Restaurant Name *</Label>
                        <Input
                          id="restaurant-name"
                          placeholder="Enter restaurant name"
                          value={restaurantData.name}
                          onChange={(e) => setRestaurantData({...restaurantData, name: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cuisine">Cuisine Type *</Label>
                        <SystemSelect
                          value={restaurantData.cuisine}
                          onValueChange={(value) => setRestaurantData({...restaurantData, cuisine: value})}
                          options={cuisineOptions}
                          placeholder="Select cuisine type"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your restaurant"
                          value={restaurantData.description}
                          onChange={(e) => setRestaurantData({...restaurantData, description: e.target.value})}
                          rows={4}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="location">Location/Address *</Label>
                        <Textarea
                          id="location"
                          placeholder="Full address of your restaurant"
                          value={restaurantData.location}
                          onChange={(e) => setRestaurantData({...restaurantData, location: e.target.value})}
                          rows={2}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={nextTab}
                        className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                      >
                        Continue
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Details Tab */}
                  <TabsContent value="details" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Manager Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="manager-name">Manager Name</Label>
                          <Input
                            id="manager-name"
                            placeholder="Manager's full name"
                            value={managerDetails.name}
                            onChange={(e) => setManagerDetails({...managerDetails, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="manager-phone">Manager Phone</Label>
                          <Input
                            id="manager-phone"
                            placeholder="Contact phone number"
                            value={managerDetails.phone}
                            onChange={(e) => setManagerDetails({...managerDetails, phone: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="manager-email">Manager Email</Label>
                          <Input
                            id="manager-email"
                            type="email"
                            placeholder="Contact email"
                            value={managerDetails.email}
                            onChange={(e) => setManagerDetails({...managerDetails, email: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Restaurant Operating Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="opening-time">Opening Time</Label>
                          <TimePicker
                            value={restaurantData.openingTime}
                            onChange={(time) => setRestaurantData({...restaurantData, openingTime: time})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="closing-time">Closing Time</Label>
                          <TimePicker
                            value={restaurantData.closingTime}
                            onChange={(time) => setRestaurantData({...restaurantData, closingTime: time})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="seating-capacity">Seating Capacity</Label>
                          <Input
                            id="seating-capacity"
                            type="number"
                            placeholder="Maximum number of guests"
                            value={restaurantData.seatingCapacity}
                            onChange={(e) => setRestaurantData({...restaurantData, seatingCapacity: e.target.value})}
                            min="1"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="price-range">Price Range</Label>
                          <SystemSelect
                            value={restaurantData.priceRange}
                            onValueChange={(value) => setRestaurantData({...restaurantData, priceRange: value})}
                            options={priceRangeOptions}
                            placeholder="Select price range"
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="offers-decoration" className="cursor-pointer">
                              Offers Special Decoration for Events
                            </Label>
                            <Switch 
                              id="offers-decoration"
                              checked={restaurantData.offersDecoration}
                              onCheckedChange={(checked) => setRestaurantData({
                                ...restaurantData,
                                offersDecoration: checked
                              })}
                            />
                          </div>
                          {restaurantData.offersDecoration && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Your restaurant will be shown for customers looking for decorated venues.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevTab}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={nextTab}
                        className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                      >
                        Continue
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Images Tab */}
                  <TabsContent value="images" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Restaurant Photos</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload photos of your restaurant (interior, exterior, ambiance)
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {previewImages.map((src, index) => (
                            <div key={index} className="relative rounded-md overflow-hidden aspect-square">
                              <img
                                src={src}
                                alt={`Restaurant preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                                onClick={() => removeRestaurantImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          
                          <label className="border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer aspect-square hover:bg-gray-50 dark:hover:bg-gray-900">
                            <div className="text-center p-4">
                              <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                              <p className="text-xs text-gray-500">Upload Photo</p>
                            </div>
                            <Input
                              id="restaurant-images"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              multiple
                              onChange={handleRestaurantImageChange}
                            />
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Menu Photos</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload photos of your menu or individual dishes
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {previewMenuImages.map((src, index) => (
                            <div key={index} className="relative rounded-md overflow-hidden aspect-square">
                              <img
                                src={src}
                                alt={`Menu preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                                onClick={() => removeMenuImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          
                          <label className="border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer aspect-square hover:bg-gray-50 dark:hover:bg-gray-900">
                            <div className="text-center p-4">
                              <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                              <p className="text-xs text-gray-500">Upload Menu</p>
                            </div>
                            <Input
                              id="menu-images"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              multiple
                              onChange={handleMenuImageChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevTab}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={nextTab}
                        className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                      >
                        Continue
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Features Tab */}
                  <TabsContent value="features" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Restaurant Features</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select the features that your restaurant offers
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="has-parking" className="cursor-pointer">
                            Parking Available
                          </Label>
                          <Switch 
                            id="has-parking"
                            checked={features.hasParking}
                            onCheckedChange={(checked) => setFeatures({...features, hasParking: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="wheelchair-accessible" className="cursor-pointer">
                            Wheelchair Accessible
                          </Label>
                          <Switch 
                            id="wheelchair-accessible"
                            checked={features.isWheelchairAccessible}
                            onCheckedChange={(checked) => setFeatures({...features, isWheelchairAccessible: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="has-wifi" className="cursor-pointer">
                            Free Wifi
                          </Label>
                          <Switch 
                            id="has-wifi"
                            checked={features.hasWifi}
                            onCheckedChange={(checked) => setFeatures({...features, hasWifi: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="accepts-reservations" className="cursor-pointer">
                            Accepts Reservations
                          </Label>
                          <Switch 
                            id="accepts-reservations"
                            checked={features.acceptsReservations}
                            onCheckedChange={(checked) => setFeatures({...features, acceptsReservations: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="has-catering" className="cursor-pointer">
                            Offers Catering
                          </Label>
                          <Switch 
                            id="has-catering"
                            checked={features.hasCatering}
                            onCheckedChange={(checked) => setFeatures({...features, hasCatering: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="outdoor-seating" className="cursor-pointer">
                            Outdoor Seating
                          </Label>
                          <Switch 
                            id="outdoor-seating"
                            checked={features.hasOutdoorSeating}
                            onCheckedChange={(checked) => setFeatures({...features, hasOutdoorSeating: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="live-music" className="cursor-pointer">
                            Live Music/Entertainment
                          </Label>
                          <Switch 
                            id="live-music"
                            checked={features.hasLiveMusic}
                            onCheckedChange={(checked) => setFeatures({...features, hasLiveMusic: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="serves-alcohol" className="cursor-pointer">
                            Serves Alcohol
                          </Label>
                          <Switch 
                            id="serves-alcohol"
                            checked={features.servesAlcohol}
                            onCheckedChange={(checked) => setFeatures({...features, servesAlcohol: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="vegetarian-friendly" className="cursor-pointer">
                            Vegetarian Friendly
                          </Label>
                          <Switch 
                            id="vegetarian-friendly"
                            checked={features.isVegetarianFriendly}
                            onCheckedChange={(checked) => setFeatures({...features, isVegetarianFriendly: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pr-4">
                          <Label htmlFor="vegan-friendly" className="cursor-pointer">
                            Vegan Friendly
                          </Label>
                          <Switch 
                            id="vegan-friendly"
                            checked={features.isVeganFriendly}
                            onCheckedChange={(checked) => setFeatures({...features, isVeganFriendly: checked})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevTab}
                      >
                        Back
                      </Button>
                      
                      <p className="text-sm text-gray-500 italic px-4 hidden md:block">
                        Your restaurant will be reviewed before being listed publicly.
                      </p>
                      
                      <Button
                        type="submit"
                        className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registering..." : "Register Restaurant"}
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-500 italic text-center md:hidden">
                      Your restaurant will be reviewed before being listed publicly.
                    </p>
                  </TabsContent>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterRestaurant;
