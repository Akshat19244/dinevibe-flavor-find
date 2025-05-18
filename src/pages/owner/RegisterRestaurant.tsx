
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { createRestaurant, uploadRestaurantImage, uploadMenuImages } from '@/lib/api/restaurants';
import { getUserProfile } from '@/lib/api/users';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, X, Check } from 'lucide-react';

const RegisterRestaurant: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [staffSize, setStaffSize] = useState<number>(0);
  const [managerName, setManagerName] = useState('');
  const [managerContact, setManagerContact] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [menuImages, setMenuImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedMenuFiles, setSelectedMenuFiles] = useState<File[]>([]);
  
  // Cuisines options
  const cuisineOptions = [
    'Italian', 'Chinese', 'Indian', 'American', 'Japanese', 
    'Mexican', 'Thai', 'Mediterranean', 'French', 'Korean',
    'Spanish', 'Greek', 'Middle Eastern', 'Vietnamese', 'Other'
  ];
  
  // Price range options
  const priceRangeOptions = [
    'Budget', 'Moderate', 'Expensive', 'Very Expensive'
  ];
  
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.id);
          setUserProfile(profile);
          
          // Pre-fill manager contact if user has one
          if (profile.contact_number) {
            setManagerContact(profile.contact_number);
          }
          
          setManagerName(profile.name || '');
          setManagerEmail(profile.email || '');
        } catch (error) {
          console.error('Error loading user profile:', error);
          toast({
            title: 'Error',
            description: 'Failed to load your profile information.',
            variant: 'destructive'
          });
        }
      }
    };
    
    loadUserProfile();
  }, [user, toast]);
  
  // Handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  // Handle menu image file selection
  const handleMenuFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedMenuFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  // Remove selected image
  const removeSelectedImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Remove selected menu image
  const removeSelectedMenuImage = (index: number) => {
    setSelectedMenuFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Upload images and return URLs
  const uploadImages = async () => {
    setUploadingImages(true);
    try {
      // Upload restaurant images
      if (selectedFiles.length > 0) {
        const imageUrls = await Promise.all(
          selectedFiles.map(file => uploadRestaurantImage(file))
        );
        setImages(imageUrls);
      }
      
      // Upload menu images
      if (selectedMenuFiles.length > 0) {
        const menuImageUrls = await uploadMenuImages(selectedMenuFiles);
        setMenuImages(menuImageUrls);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your images.',
        variant: 'destructive'
      });
    } finally {
      setUploadingImages(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be signed in to register a restaurant.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Upload images first if any are selected
      if (selectedFiles.length > 0 || selectedMenuFiles.length > 0) {
        await uploadImages();
      }
      
      // Create restaurant data object
      const restaurantData = {
        owner_id: user.id,
        name,
        description,
        location,
        cuisine,
        price_range: priceRange,
        staff_size: staffSize,
        images,
        menu_images: menuImages,
        manager_details: {
          name: managerName,
          email: managerEmail,
          contact: managerContact
        },
        is_approved: false
      };
      
      // Create restaurant in database
      await createRestaurant(restaurantData);
      
      toast({
        title: 'Restaurant Registered!',
        description: 'Your restaurant has been submitted for approval.',
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
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName={userProfile?.name || 'Owner'} />
      
      <main className="flex-grow py-8">
        <div className="container max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register Your Restaurant</CardTitle>
              <CardDescription>
                Please provide information about your restaurant. Your registration will be reviewed by our admin team.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Restaurant Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Restaurant Name*</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description*</Label>
                    <Textarea 
                      id="description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      rows={4} 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location*</Label>
                      <Input 
                        id="location" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="staffSize">Staff Size</Label>
                      <Input 
                        id="staffSize" 
                        type="number" 
                        min="0" 
                        value={staffSize.toString()} 
                        onChange={(e) => setStaffSize(parseInt(e.target.value) || 0)} 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cuisine">Cuisine Type*</Label>
                      <Select value={cuisine} onValueChange={setCuisine} required>
                        <SelectTrigger id="cuisine">
                          <SelectValue placeholder="Select cuisine type" />
                        </SelectTrigger>
                        <SelectContent>
                          {cuisineOptions.map(option => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="priceRange">Price Range*</Label>
                      <Select value={priceRange} onValueChange={setPriceRange} required>
                        <SelectTrigger id="priceRange">
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceRangeOptions.map(option => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {/* Manager Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Manager Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="managerName">Manager Name*</Label>
                      <Input 
                        id="managerName" 
                        value={managerName} 
                        onChange={(e) => setManagerName(e.target.value)} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="managerEmail">Manager Email*</Label>
                      <Input 
                        id="managerEmail" 
                        type="email" 
                        value={managerEmail} 
                        onChange={(e) => setManagerEmail(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="managerContact">Manager Contact Number*</Label>
                    <Input 
                      id="managerContact" 
                      value={managerContact} 
                      onChange={(e) => setManagerContact(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Restaurant Images</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="images">Restaurant Photos</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="images" 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleFileChange} 
                        className="w-full"
                      />
                    </div>
                    
                    {/* Preview of selected images */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium">Selected Images:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="relative">
                              <div className="h-20 w-20 rounded-md overflow-hidden border">
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={`Selected ${index + 1}`} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <button 
                                type="button"
                                onClick={() => removeSelectedImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 h-6 w-6 flex items-center justify-center"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="menuImages">Menu Images (Optional)</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="menuImages" 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleMenuFileChange} 
                        className="w-full"
                      />
                    </div>
                    
                    {/* Preview of selected menu images */}
                    {selectedMenuFiles.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium">Selected Menu Images:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedMenuFiles.map((file, index) => (
                            <div key={index} className="relative">
                              <div className="h-20 w-20 rounded-md overflow-hidden border">
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={`Menu ${index + 1}`} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <button 
                                type="button"
                                onClick={() => removeSelectedMenuImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 h-6 w-6 flex items-center justify-center"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isLoading || uploadingImages}
                  >
                    {(isLoading || uploadingImages) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Submitting...' : 'Register Restaurant'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterRestaurant;
