
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Camera, Star, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VenueRegistrationForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    cuisine: '',
    priceRange: '',
    seatingCapacity: '',
    staffSize: '',
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    reviewLink: '',
    specialFeatures: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [menuFiles, setMenuFiles] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleMenuUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMenuFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store registration data
    const registrationData = {
      ...formData,
      images: images.length,
      menuFiles: menuFiles.length,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    localStorage.setItem('venueRegistration', JSON.stringify(registrationData));
    
    toast({
      title: "Registration Submitted!",
      description: "Your venue registration is under review. You'll be notified within 24-48 hours.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-[#D4AF37]">
        <CardHeader className="bg-[#8B0000] text-[#FFF5E1]">
          <CardTitle className="text-2xl flex items-center">
            <MapPin className="h-6 w-6 mr-2" />
            Register Your Venue
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0C0C0C]">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Venue Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="border-[#D4AF37] focus:border-[#8B0000]"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                    className="border-[#D4AF37] focus:border-[#8B0000]"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows={4}
                  className="border-[#D4AF37] focus:border-[#8B0000]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="cuisine">Cuisine Type *</Label>
                  <Select value={formData.cuisine} onValueChange={(value) => setFormData({...formData, cuisine: value})}>
                    <SelectTrigger className="border-[#D4AF37] focus:border-[#8B0000]">
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="continental">Continental</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="multi-cuisine">Multi-Cuisine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priceRange">Price Range *</Label>
                  <Select value={formData.priceRange} onValueChange={(value) => setFormData({...formData, priceRange: value})}>
                    <SelectTrigger className="border-[#D4AF37] focus:border-[#8B0000]">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">₹500-1000</SelectItem>
                      <SelectItem value="mid-range">₹1000-2500</SelectItem>
                      <SelectItem value="premium">₹2500-5000</SelectItem>
                      <SelectItem value="luxury">₹5000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="seatingCapacity">Seating Capacity *</Label>
                  <Input
                    id="seatingCapacity"
                    type="number"
                    value={formData.seatingCapacity}
                    onChange={(e) => setFormData({...formData, seatingCapacity: e.target.value})}
                    required
                    className="border-[#D4AF37] focus:border-[#8B0000]"
                  />
                </div>
              </div>
            </div>

            {/* Manager Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0C0C0C]">Manager Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="managerName">Manager Name *</Label>
                  <Input
                    id="managerName"
                    value={formData.managerName}
                    onChange={(e) => setFormData({...formData, managerName: e.target.value})}
                    required
                    className="border-[#D4AF37] focus:border-[#8B0000]"
                  />
                </div>
                <div>
                  <Label htmlFor="managerPhone">Manager Phone *</Label>
                  <Input
                    id="managerPhone"
                    type="tel"
                    value={formData.managerPhone}
                    onChange={(e) => setFormData({...formData, managerPhone: e.target.value})}
                    required
                    className="border-[#D4AF37] focus:border-[#8B0000]"
                  />
                </div>
                <div>
                  <Label htmlFor="managerEmail">Manager Email *</Label>
                  <Input
                    id="managerEmail"
                    type="email"
                    value={formData.managerEmail}
                    onChange={(e) => setFormData({...formData, managerEmail: e.target.value})}
                    required
                    className="border-[#D4AF37] focus:border-[#8B0000]"
                  />
                </div>
              </div>
            </div>

            {/* Media Uploads */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#0C0C0C]">Media & Documentation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Venue Images *</Label>
                  <div className="border-2 border-dashed border-[#D4AF37] rounded-lg p-6 text-center">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-[#8B0000]" />
                    <p className="text-sm text-[#2F2F2F] mb-4">
                      Upload 6-10 high-quality images
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="venue-images"
                    />
                    <Label htmlFor="venue-images" className="cursor-pointer">
                      <Button type="button" variant="outline" className="border-[#8B0000] text-[#8B0000]">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Images
                      </Button>
                    </Label>
                    {images.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">{images.length} files selected</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Menu (PDF/Images) *</Label>
                  <div className="border-2 border-dashed border-[#D4AF37] rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-[#8B0000]" />
                    <p className="text-sm text-[#2F2F2F] mb-4">
                      Upload menu files
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,image/*"
                      onChange={handleMenuUpload}
                      className="hidden"
                      id="menu-files"
                    />
                    <Label htmlFor="menu-files" className="cursor-pointer">
                      <Button type="button" variant="outline" className="border-[#8B0000] text-[#8B0000]">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </Label>
                    {menuFiles.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">{menuFiles.length} files selected</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="reviewLink">Google Reviews Link</Label>
                <Input
                  id="reviewLink"
                  type="url"
                  value={formData.reviewLink}
                  onChange={(e) => setFormData({...formData, reviewLink: e.target.value})}
                  placeholder="https://g.page/your-venue/review"
                  className="border-[#D4AF37] focus:border-[#8B0000]"
                />
                <p className="text-xs text-[#2F2F2F] mt-1">
                  <Star className="h-3 w-3 inline mr-1" />
                  Venues with 4+ stars get auto-approval and priority listing
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] py-3"
            >
              Submit for Review
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueRegistrationForm;
