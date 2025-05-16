
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, Calendar, Tag, Percent, Star, TicketCheck } from 'lucide-react';

// Sample data for deals
const allDeals = [
  {
    id: 'd1',
    type: 'happy-hour',
    title: '2-for-1 Cocktails',
    restaurantName: 'Urban Spirits',
    imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    validUntil: new Date('2025-06-30'),
    location: '123 Downtown Ave, City Center',
    description: 'Enjoy our signature cocktails with a 2-for-1, every day from 4-7pm.',
    terms: 'Valid on all signature cocktails. One redemption per customer per day.',
    rating: 4.7,
    claimed: 243,
    isPopular: true,
  },
  {
    id: 'd2',
    type: 'discount',
    title: '30% Off Your Bill',
    restaurantName: 'Sapore Italian',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    validUntil: new Date('2025-06-20'),
    location: '456 Pasta Lane, Little Italy',
    description: 'Enjoy 30% off your total bill when dining in Monday-Wednesday.',
    terms: 'Valid for dine-in only. Not valid with other promotions. Excludes drinks.',
    rating: 4.5,
    claimed: 187,
    isNew: true,
  },
  {
    id: 'd3',
    type: 'voucher',
    title: 'Free Dessert with Main Course',
    restaurantName: 'Sweet Delights Cafe',
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1257&q=80',
    validUntil: new Date('2025-07-15'),
    location: '789 Sugar St, West End',
    description: 'Receive a complimentary dessert when you order any main course.',
    terms: 'One free dessert per table. Valid for desserts up to $10 value.',
    rating: 4.3,
    claimed: 156,
  },
  {
    id: 'd4',
    type: 'group',
    title: 'Group Discount: 20% Off for 6+',
    restaurantName: 'The Gathering Table',
    imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    validUntil: new Date('2025-08-31'),
    location: '101 Friendship Road, Riverside',
    description: 'Groups of 6 or more receive 20% off their entire food bill.',
    terms: 'Reservation required. Valid for dine-in only. Mention offer when booking.',
    rating: 4.6,
    claimed: 92,
    isPopular: true,
  },
  {
    id: 'd5',
    type: 'happy-hour',
    title: 'Wine Wednesday: Half-Price Bottles',
    restaurantName: 'The Cellar Door',
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    validUntil: new Date('2025-09-30'),
    location: '222 Vine Street, North District',
    description: 'Every Wednesday, enjoy 50% off all bottles of wine.',
    terms: 'Valid only on Wednesdays. Not valid with other promotions.',
    rating: 4.8,
    claimed: 317,
    isPopular: true,
  },
  {
    id: 'd6',
    type: 'discount',
    title: '15% Off First Order',
    restaurantName: 'Fresh Bites',
    imageUrl: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    validUntil: new Date('2025-12-31'),
    location: '333 Green St, East Side',
    description: 'New customers receive 15% off their first order.',
    terms: 'Valid for first-time customers only. Available for dine-in or takeout.',
    rating: 4.2,
    claimed: 78,
    isNew: true,
  },
];

const Deals: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter deals based on active tab
  const filteredDeals = activeTab === 'all' 
    ? allDeals 
    : allDeals.filter(deal => deal.type === activeTab);
  
  // Calculate days remaining until deal expires
  const getDaysRemaining = (validUntil: Date) => {
    const today = new Date();
    const diffTime = validUntil.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Format the date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName="John" />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Exclusive Dining Deals</h1>
            <p className="text-white text-opacity-90">
              Discover special offers and promotions at top restaurants
            </p>
          </div>
        </div>
        
        {/* Deals section */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Deals</TabsTrigger>
                <TabsTrigger value="happy-hour">Happy Hours</TabsTrigger>
                <TabsTrigger value="discount">Discounts</TabsTrigger>
                <TabsTrigger value="voucher">Vouchers</TabsTrigger>
                <TabsTrigger value="group">Group Offers</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((deal) => {
                  const daysRemaining = getDaysRemaining(deal.validUntil);
                  
                  return (
                    <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={deal.imageUrl} 
                          alt={deal.title} 
                          className="w-full h-48 object-cover"
                        />
                        
                        {/* Deal badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {deal.isNew && (
                            <Badge className="bg-dineVibe-accent text-white">
                              New Deal
                            </Badge>
                          )}
                          {deal.isPopular && (
                            <Badge className="bg-dineVibe-primary text-white">
                              Popular
                            </Badge>
                          )}
                        </div>
                        
                        {/* Time remaining badge */}
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-black bg-opacity-75 text-white">
                            <Clock className="h-3 w-3 mr-1" />
                            {daysRemaining} days left
                          </Badge>
                        </div>
                        
                        {/* Restaurant name overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                          <h3 className="text-white font-medium">{deal.restaurantName}</h3>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-2">{deal.title}</h2>
                        
                        <div className="mb-3 space-y-2">
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-dineVibe-primary" />
                            <span>{deal.location}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-dineVibe-primary" />
                            <span>Valid until {formatDate(deal.validUntil)}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600 text-sm">
                            <Tag className="h-4 w-4 mr-2 text-dineVibe-primary" />
                            <span>{deal.type.charAt(0).toUpperCase() + deal.type.slice(1)}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{deal.description}</p>
                        
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-gray-700">{deal.rating}</span>
                          </div>
                          
                          <div className="text-sm text-gray-600">
                            <TicketCheck className="h-4 w-4 inline mr-1" />
                            {deal.claimed} claimed
                          </div>
                        </div>
                        
                        <Button className="w-full bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                          <Percent className="h-4 w-4 mr-2" />
                          Claim Deal
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {filteredDeals.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-4">No deals found</h2>
                  <p className="text-gray-600 mb-6">Try selecting a different category</p>
                  <Button onClick={() => setActiveTab('all')}>
                    View All Deals
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;
