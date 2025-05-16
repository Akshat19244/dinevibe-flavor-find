
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar as CalendarIcon, 
  PercentIcon, 
  Tags, 
  ImagePlus, 
  Gift, 
  Clock,
  Edit,
  Trash2,
  BadgePlus
} from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const OwnerDeals: React.FC = () => {
  // State for the new deal form
  const [dealTitle, setDealTitle] = useState('');
  const [dealDescription, setDealDescription] = useState('');
  const [dealType, setDealType] = useState('discount'); // discount, voucher, happy-hour
  const [discountValue, setDiscountValue] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [useLimit, setUseLimit] = useState('');
  const [dealImage, setDealImage] = useState<string | null>(null);
  const [terms, setTerms] = useState('');
  const [isActive, setIsActive] = useState(true);
  
  // Sample existing deals
  const [deals, setDeals] = useState([
    {
      id: 'd1',
      title: 'Happy Hour Special',
      description: '20% off on all beverages from 5 PM to 7 PM',
      type: 'happy-hour',
      discount: '20',
      startDate: new Date('2025-05-20'),
      endDate: new Date('2025-06-20'),
      useLimit: '100',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      terms: 'Valid only on weekdays. Cannot be combined with other offers.',
      active: true,
      redeemed: 24
    },
    {
      id: 'd2',
      title: 'Weekend Family Voucher',
      description: 'Free dessert with family meals for 4 or more people',
      type: 'voucher',
      discount: '',
      startDate: new Date('2025-05-25'),
      endDate: new Date('2025-06-30'),
      useLimit: '50',
      image: 'https://images.unsplash.com/photo-1559742811-822873691df8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      terms: 'Valid only on weekends. One voucher per table.',
      active: true,
      redeemed: 12
    },
  ]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload to Firebase Storage
      // For now, just create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setDealImage(imageUrl);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send data to Firebase
    const newDeal = {
      id: `d${deals.length + 1}`,
      title: dealTitle,
      description: dealDescription,
      type: dealType,
      discount: discountValue,
      startDate,
      endDate,
      useLimit,
      image: dealImage || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      terms,
      active: isActive,
      redeemed: 0
    };
    
    console.log("New deal:", newDeal);
    
    // Add to deals list
    // setDeals([...deals, newDeal]);
    
    // Show success message
    alert('Deal submitted successfully!');
    
    // Clear form (in a real implementation)
  };

  // Delete a deal
  const handleDeleteDeal = (id: string) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      setDeals(deals.filter(deal => deal.id !== id));
    }
  };

  // Toggle deal active status
  const toggleDealActive = (id: string) => {
    setDeals(deals.map(deal => 
      deal.id === id 
        ? { ...deal, active: !deal.active } 
        : deal
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName="Restaurant Owner" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Manage Deals</h1>
            <p className="text-white text-opacity-90">
              Create and track special offers for your restaurant
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="active">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="active">Active Deals</TabsTrigger>
                <TabsTrigger value="create">Create New Deal</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.length > 0 ? (
                  deals.map(deal => (
                    <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40">
                        <img 
                          src={deal.image} 
                          alt={deal.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 bg-white"
                            onClick={() => toggleDealActive(deal.id)}
                          >
                            <Switch 
                              checked={deal.active} 
                              className="scale-75"
                            />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 bg-white text-blue-500"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 bg-white text-red-500"
                            onClick={() => handleDeleteDeal(deal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {deal.type === 'discount' && (
                          <div className="absolute bottom-0 left-0 bg-red-500 text-white px-3 py-1">
                            {deal.discount}% OFF
                          </div>
                        )}
                        {deal.type === 'voucher' && (
                          <div className="absolute bottom-0 left-0 bg-blue-500 text-white px-3 py-1">
                            VOUCHER
                          </div>
                        )}
                        {deal.type === 'happy-hour' && (
                          <div className="absolute bottom-0 left-0 bg-purple-500 text-white px-3 py-1">
                            HAPPY HOUR
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="pt-4">
                        <h3 className="font-bold text-lg mb-1">{deal.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{deal.description}</p>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-600">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>Valid until</span>
                            </div>
                            <span className="font-medium">
                              {format(deal.endDate, 'MMM d, yyyy')}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-600">
                              <Tags className="h-4 w-4 mr-1" />
                              <span>Usage limit</span>
                            </div>
                            <span className="font-medium">
                              {deal.redeemed}/{deal.useLimit}
                            </span>
                          </div>
                        </div>
                        
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-sm w-full text-center mb-2",
                          deal.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        )}>
                          {deal.active ? 'Active' : 'Inactive'}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Gift className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No deals available</h2>
                    <p className="text-gray-600 mb-6">Create your first special offer to attract more customers</p>
                    <Button 
                      className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                      onClick={() => document.querySelector('[data-value="create"]')?.click()}
                    >
                      <BadgePlus className="mr-2 h-4 w-4" />
                      Create New Deal
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Deal Creation Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Deal Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Deal Title */}
                        <div className="space-y-2">
                          <Label htmlFor="deal-title">Deal Title</Label>
                          <Input 
                            id="deal-title" 
                            placeholder="e.g. Weekend Special Discount"
                            value={dealTitle}
                            onChange={(e) => setDealTitle(e.target.value)}
                            required
                          />
                        </div>
                        
                        {/* Deal Description */}
                        <div className="space-y-2">
                          <Label htmlFor="deal-description">Short Description</Label>
                          <Textarea 
                            id="deal-description" 
                            placeholder="Describe your deal briefly..."
                            value={dealDescription}
                            onChange={(e) => setDealDescription(e.target.value)}
                            required
                          />
                        </div>
                        
                        {/* Deal Type */}
                        <div className="space-y-2">
                          <Label htmlFor="deal-type">Deal Type</Label>
                          <Select 
                            value={dealType} 
                            onValueChange={setDealType}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select deal type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="discount">Percentage Discount</SelectItem>
                              <SelectItem value="voucher">Voucher/Coupon</SelectItem>
                              <SelectItem value="happy-hour">Happy Hour Special</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Discount Value - Show only for discount type */}
                        {dealType === 'discount' && (
                          <div className="space-y-2">
                            <Label htmlFor="discount-value">Discount Percentage (%)</Label>
                            <Input 
                              id="discount-value" 
                              type="number"
                              placeholder="e.g. 15"
                              value={discountValue}
                              onChange={(e) => setDiscountValue(e.target.value)}
                              required
                            />
                          </div>
                        )}
                        
                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {startDate ? format(startDate, "PPP") : <span>Select start date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={startDate}
                                  onSelect={setStartDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {endDate ? format(endDate, "PPP") : <span>Select end date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={endDate}
                                  onSelect={setEndDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        
                        {/* Usage Limit */}
                        <div className="space-y-2">
                          <Label htmlFor="use-limit">Usage Limit</Label>
                          <Input 
                            id="use-limit" 
                            type="number"
                            placeholder="Maximum number of redemptions"
                            value={useLimit}
                            onChange={(e) => setUseLimit(e.target.value)}
                            required
                          />
                        </div>
                        
                        {/* Terms and Conditions */}
                        <div className="space-y-2">
                          <Label htmlFor="terms">Terms & Conditions</Label>
                          <Textarea 
                            id="terms" 
                            placeholder="Any specific terms or restrictions..."
                            value={terms}
                            onChange={(e) => setTerms(e.target.value)}
                          />
                        </div>
                        
                        {/* Deal Image */}
                        <div className="space-y-2">
                          <Label htmlFor="deal-image">Deal Image</Label>
                          <div className="flex items-center space-x-4">
                            <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center w-full cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden">
                              <input 
                                id="deal-image" 
                                type="file" 
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                onChange={handleImageUpload}
                                accept="image/*"
                              />
                              <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-500">Click to upload deal image</span>
                              <span className="text-xs text-gray-400 mt-1">(Max size: 5MB, Format: JPG, PNG)</span>
                            </div>
                            
                            {dealImage && (
                              <div className="relative w-24 h-24">
                                <img 
                                  src={dealImage} 
                                  alt="Deal preview" 
                                  className="rounded-md w-full h-full object-cover"
                                />
                                <Button 
                                  variant="destructive" 
                                  size="icon" 
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                  onClick={() => setDealImage(null)}
                                >
                                  ×
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Active Status */}
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="active-status" 
                            checked={isActive}
                            onCheckedChange={setIsActive}
                          />
                          <Label htmlFor="active-status">Make this deal active immediately</Label>
                        </div>
                        
                        {/* Submit Button */}
                        <Button type="submit" className="w-full md:w-auto bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                          Create Deal
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Deal Preview */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Deal Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="relative rounded-lg overflow-hidden h-40 bg-gray-100">
                          {dealImage ? (
                            <img 
                              src={dealImage} 
                              alt={dealTitle || "Deal"} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                              <Gift className="h-12 w-12" />
                            </div>
                          )}
                          
                          {dealType === 'discount' && discountValue && (
                            <div className="absolute bottom-0 left-0 bg-red-500 text-white px-3 py-1">
                              {discountValue}% OFF
                            </div>
                          )}
                          {dealType === 'voucher' && (
                            <div className="absolute bottom-0 left-0 bg-blue-500 text-white px-3 py-1">
                              VOUCHER
                            </div>
                          )}
                          {dealType === 'happy-hour' && (
                            <div className="absolute bottom-0 left-0 bg-purple-500 text-white px-3 py-1">
                              HAPPY HOUR
                            </div>
                          )}
                        </div>
                        
                        <h3 className="font-bold text-lg">
                          {dealTitle || "Deal Title"}
                        </h3>
                        
                        <p className="text-gray-600 text-sm">
                          {dealDescription || "Deal description will appear here..."}
                        </p>
                        
                        <div className="space-y-2">
                          {(startDate && endDate) && (
                            <div className="flex items-center text-gray-600 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                Valid from {format(startDate, 'MMM d')} to {format(endDate, 'MMM d, yyyy')}
                              </span>
                            </div>
                          )}
                          
                          {useLimit && (
                            <div className="flex items-center text-gray-600 text-sm">
                              <Tags className="h-4 w-4 mr-1" />
                              <span>Limited to {useLimit} uses</span>
                            </div>
                          )}
                        </div>
                        
                        {terms && (
                          <div className="text-xs text-gray-500 border-t border-gray-200 pt-2 mt-2">
                            <span className="font-medium">Terms:</span> {terms}
                          </div>
                        )}
                        
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-sm w-full text-center",
                          isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        )}>
                          {isActive ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDeals;
