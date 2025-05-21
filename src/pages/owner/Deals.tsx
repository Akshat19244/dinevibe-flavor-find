
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash,
  Edit,
  Percent,
  Tag,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getRestaurantsByOwner } from '@/lib/api/restaurants';
import { useToast } from '@/components/ui/use-toast';
import { Restaurant } from '@/lib/api/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SystemSelect } from '@/components/ui/system-select';
import { format, addDays } from 'date-fns';

interface Deal {
  id: string;
  title: string;
  type: string;
  description: string;
  terms: string;
  validUntil: Date;
  discount: number;
  isActive: boolean;
  restaurantId: string;
  createdAt: Date;
}

const OwnerDeals: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New deal form state
  const [newDeal, setNewDeal] = useState({
    title: '',
    type: 'discount',
    description: '',
    terms: '',
    validUntil: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
    discount: 10,
    restaurantId: '',
  });

  useEffect(() => {
    // Load restaurants owned by the current user
    const fetchRestaurants = async () => {
      if (user) {
        try {
          const restaurantData = await getRestaurantsByOwner(user.id);
          setRestaurants(restaurantData);
          
          if (restaurantData.length > 0) {
            setSelectedRestaurant(restaurantData[0].id);
            setNewDeal(prev => ({ ...prev, restaurantId: restaurantData[0].id }));
            
            // In a real app, you would fetch deals for this restaurant
            // For now, let's use mock data
            setDeals(generateMockDeals(restaurantData[0].id));
          }
        } catch (error) {
          console.error('Error fetching restaurant data:', error);
          toast({
            title: 'Error',
            description: 'Failed to load your restaurant data.',
            variant: 'destructive',
          });
        }
      }
      setLoading(false);
    };

    fetchRestaurants();
  }, [user, toast]);

  // Generate some mock deals for demo purposes
  const generateMockDeals = (restaurantId: string): Deal[] => {
    return [
      {
        id: '1',
        title: '20% Off on Weekdays',
        type: 'discount',
        description: 'Get 20% off on your total bill from Monday to Thursday.',
        terms: 'Valid for dine-in only. Not valid with other promotions.',
        validUntil: addDays(new Date(), 60),
        discount: 20,
        isActive: true,
        restaurantId,
        createdAt: new Date()
      },
      {
        id: '2',
        title: 'Buy One Get One Free Appetizers',
        type: 'bogo',
        description: 'Order any appetizer and get another one free.',
        terms: 'Of equal or lesser value. Valid on weekends only.',
        validUntil: addDays(new Date(), 45),
        discount: 100,
        isActive: true,
        restaurantId,
        createdAt: new Date()
      },
      {
        id: '3',
        title: 'Free Dessert with Main Course',
        type: 'freebie',
        description: 'Get a free dessert with any main course order.',
        terms: 'One dessert per table, up to $10 value.',
        validUntil: addDays(new Date(), -10),
        discount: 0,
        isActive: false,
        restaurantId,
        createdAt: new Date()
      }
    ];
  };

  const handleRestaurantChange = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
    setNewDeal(prev => ({ ...prev, restaurantId }));
    
    // In a real app, you would fetch deals for this restaurant
    setDeals(generateMockDeals(restaurantId));
  };
  
  const handleCreateDeal = () => {
    // Validate form
    if (!newDeal.title || !newDeal.description || !newDeal.terms || !newDeal.validUntil) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would be a database insert
    const createdDeal: Deal = {
      id: `new-${Date.now()}`,
      title: newDeal.title,
      type: newDeal.type,
      description: newDeal.description,
      terms: newDeal.terms,
      validUntil: new Date(newDeal.validUntil),
      discount: newDeal.discount,
      isActive: true,
      restaurantId: newDeal.restaurantId,
      createdAt: new Date()
    };
    
    setDeals(prev => [createdDeal, ...prev]);
    
    // Reset form
    setNewDeal({
      title: '',
      type: 'discount',
      description: '',
      terms: '',
      validUntil: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
      discount: 10,
      restaurantId: selectedRestaurant,
    });
    
    // Close dialog
    setIsDialogOpen(false);
    
    toast({
      title: "Deal Created",
      description: "Your deal has been created successfully.",
    });
  };
  
  const handleToggleActive = (dealId: string, isActive: boolean) => {
    setDeals(prev => 
      prev.map(deal => 
        deal.id === dealId ? { ...deal, isActive } : deal
      )
    );
    
    toast({
      title: isActive ? "Deal Activated" : "Deal Deactivated",
      description: `The deal has been ${isActive ? 'activated' : 'deactivated'} successfully.`,
    });
  };
  
  const handleDeleteDeal = (dealId: string) => {
    setDeals(prev => prev.filter(deal => deal.id !== dealId));
    
    toast({
      title: "Deal Deleted",
      description: "The deal has been deleted successfully.",
    });
  };
  
  // Filter deals based on active tab
  const filteredDeals = activeTab === 'active' 
    ? deals.filter(deal => deal.isActive && new Date(deal.validUntil) >= new Date())
    : deals.filter(deal => !deal.isActive || new Date(deal.validUntil) < new Date());
  
  const dealTypeOptions = [
    { value: 'discount', label: 'Percentage Discount' },
    { value: 'bogo', label: 'Buy One Get One' },
    { value: 'freebie', label: 'Free Item' },
    { value: 'fixed', label: 'Fixed Amount Off' },
    { value: 'happy-hour', label: 'Happy Hour' },
    { value: 'group', label: 'Group Discount' },
  ];
  
  // Get human readable type label
  const getDealTypeLabel = (type: string) => {
    const option = dealTypeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName={user?.user_metadata?.name || 'Restaurant Owner'} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Manage Restaurant Deals</h1>
            <p className="text-white text-opacity-90">
              Create and manage special offers, discounts, and promotions
            </p>
          </div>
        </div>
        
        {/* Content section */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-10">
              <p>Loading your restaurant deals...</p>
            </div>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-4">No Restaurants Found</h2>
              <p className="text-gray-600 mb-6">
                You need to register a restaurant before you can create deals.
              </p>
              <Button asChild className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                <Link to="/owner/register-restaurant">Register Your Restaurant</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Restaurant selector */}
              {restaurants.length > 1 && (
                <div className="mb-6 max-w-md">
                  <Label htmlFor="restaurant-select" className="mb-2 block">Select Restaurant</Label>
                  <SystemSelect
                    value={selectedRestaurant}
                    onValueChange={handleRestaurantChange}
                    options={restaurants.map(r => ({ value: r.id, label: r.name }))}
                    placeholder="Select a restaurant"
                    className="w-full"
                  />
                </div>
              )}
              
              {/* Create deal button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Restaurant Deals</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Deal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Deal</DialogTitle>
                      <DialogDescription>
                        Add a new promotion or special offer for your restaurant
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="deal-title">Deal Title</Label>
                        <Input 
                          id="deal-title" 
                          placeholder="e.g., '20% Off Weekday Lunch'" 
                          value={newDeal.title}
                          onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="deal-type">Deal Type</Label>
                        <SystemSelect
                          value={newDeal.type}
                          onValueChange={(value) => setNewDeal({...newDeal, type: value})}
                          options={dealTypeOptions}
                          placeholder="Select deal type"
                          className="w-full"
                        />
                      </div>
                      
                      {(newDeal.type === 'discount' || newDeal.type === 'fixed') && (
                        <div className="space-y-2">
                          <Label htmlFor="deal-discount">
                            {newDeal.type === 'discount' ? 'Discount Percentage (%)' : 'Amount Off ($)'}
                          </Label>
                          <Input 
                            id="deal-discount" 
                            type="number"
                            min="1"
                            max={newDeal.type === 'discount' ? "100" : "1000"}
                            value={newDeal.discount}
                            onChange={(e) => setNewDeal({...newDeal, discount: Number(e.target.value)})}
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="deal-description">Description</Label>
                        <Textarea 
                          id="deal-description" 
                          placeholder="Describe the deal details"
                          value={newDeal.description}
                          onChange={(e) => setNewDeal({...newDeal, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="deal-terms">Terms & Conditions</Label>
                        <Textarea 
                          id="deal-terms" 
                          placeholder="Any restrictions or terms for this deal"
                          value={newDeal.terms}
                          onChange={(e) => setNewDeal({...newDeal, terms: e.target.value})}
                          rows={2}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="deal-validity">Valid Until</Label>
                        <Input 
                          id="deal-validity" 
                          type="date"
                          value={newDeal.validUntil}
                          onChange={(e) => setNewDeal({...newDeal, validUntil: e.target.value})}
                          min={format(new Date(), 'yyyy-MM-dd')}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCreateDeal}
                        className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                      >
                        Create Deal
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Deals tabs and list */}
              <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="active">Active Deals</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive/Expired</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-6">
                  {filteredDeals.length === 0 ? (
                    <div className="text-center py-8">
                      <h3 className="text-xl font-semibold mb-2">No {activeTab} deals found</h3>
                      <p className="text-gray-600 mb-4">
                        {activeTab === 'active' 
                          ? "You don't have any active deals at the moment." 
                          : "You don't have any inactive or expired deals."
                        }
                      </p>
                      {activeTab === 'active' && (
                        <Button 
                          onClick={() => setIsDialogOpen(true)} 
                          className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                        >
                          Create Your First Deal
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredDeals.map((deal) => {
                        const isExpired = new Date(deal.validUntil) < new Date();
                        
                        return (
                          <Card key={deal.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardHeader className="bg-gray-50 dark:bg-gray-800">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-xl">{deal.title}</CardTitle>
                                <Badge className={
                                  isExpired 
                                    ? "bg-red-500 text-white" 
                                    : deal.isActive 
                                    ? "bg-green-500 text-white" 
                                    : "bg-gray-500 text-white"
                                }>
                                  {isExpired ? "Expired" : deal.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="flex items-center text-gray-600">
                                  <Tag className="h-4 w-4 mr-2 text-dineVibe-primary" />
                                  <span>{getDealTypeLabel(deal.type)}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-2 text-dineVibe-primary" />
                                  <span>
                                    Valid until {format(new Date(deal.validUntil), 'MMM dd, yyyy')}
                                  </span>
                                </div>
                                
                                {deal.type === 'discount' && (
                                  <div className="flex items-center text-gray-600">
                                    <Percent className="h-4 w-4 mr-2 text-dineVibe-primary" />
                                    <span>{deal.discount}% off</span>
                                  </div>
                                )}
                                
                                <div>
                                  <p className="mb-2">{deal.description}</p>
                                  <p className="text-sm text-gray-600 italic">{deal.terms}</p>
                                </div>
                                
                                <div className="pt-4 flex justify-end space-x-2">
                                  {!isExpired && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleToggleActive(deal.id, !deal.isActive)}
                                    >
                                      {deal.isActive ? "Deactivate" : "Activate"}
                                    </Button>
                                  )}
                                  
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteDeal(deal.id)}
                                  >
                                    <Trash className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDeals;
