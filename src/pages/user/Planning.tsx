
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { SystemSelect } from '@/components/ui/system-select';
import { TimePicker } from '@/components/ui/time-picker';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users, DollarSign, MapPin, Search, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Planning: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');
  
  // Form state
  const [planningData, setPlanningData] = useState({
    location: '',
    date: formattedToday,
    time: '19:00',
    guests: '2',
    budget: 'medium',
    cuisinePreference: '',
    isSpecialEvent: false,
    needsDecoration: false,
    eventType: 'casual',
    dietaryRestrictions: [] as string[],
    includeDrinks: true,
    seatingPreference: 'any',
  });

  const budgetOptions = [
    { value: 'low', label: 'Budget-friendly ($)' },
    { value: 'medium', label: 'Moderate ($$)' },
    { value: 'high', label: 'Premium ($$$)' },
    { value: 'luxury', label: 'Luxury ($$$$)' },
  ];
  
  const cuisineOptions = [
    { value: 'any', label: 'Any Cuisine' },
    { value: 'italian', label: 'Italian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'indian', label: 'Indian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'thai', label: 'Thai' },
    { value: 'american', label: 'American' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'lebanese', label: 'Lebanese' },
  ];
  
  const eventTypeOptions = [
    { value: 'casual', label: 'Casual Dining' },
    { value: 'birthday', label: 'Birthday Celebration' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'business', label: 'Business Meal' },
    { value: 'date', label: 'Romantic Date' },
    { value: 'family', label: 'Family Gathering' },
    { value: 'other', label: 'Other Event' },
  ];
  
  const seatingOptions = [
    { value: 'any', label: 'Any Seating' },
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'private', label: 'Private Room' },
    { value: 'bar', label: 'Bar Seating' },
  ];
  
  const dietaryRestrictions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'nut-free', label: 'Nut-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!planningData.location || !planningData.date || !planningData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // If all validation passes, redirect to reservation page with form data as query params
    const queryParams = new URLSearchParams({
      location: planningData.location,
      date: planningData.date,
      time: planningData.time,
      guests: planningData.guests,
      budget: planningData.budget,
      event: planningData.isSpecialEvent ? planningData.eventType : 'casual',
      decor: planningData.needsDecoration ? 'true' : 'false',
    });
    
    if (planningData.cuisinePreference) {
      queryParams.append('cuisine', planningData.cuisinePreference);
    }
    
    if (planningData.dietaryRestrictions.length > 0) {
      queryParams.append('dietary', planningData.dietaryRestrictions.join(','));
    }
    
    // Redirect to the make reservation page
    navigate(`/user/make-reservation?${queryParams.toString()}`);
    
    toast({
      title: "Planning Submitted",
      description: "Finding the perfect restaurants for your occasion...",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName={user?.user_metadata?.name || 'User'} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Plan Your Perfect Dining Experience</h1>
            <p className="text-white text-opacity-90">
              Tell us what you're looking for and we'll find the perfect restaurant for your occasion
            </p>
          </div>
        </div>
        
        {/* Planning form */}
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  {/* Location, Date & Time section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          Location
                        </Label>
                        <Input 
                          id="location" 
                          placeholder="City, neighborhood, or area"
                          value={planningData.location}
                          onChange={(e) => setPlanningData({ ...planningData, location: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          Date
                        </Label>
                        <Input 
                          id="date" 
                          type="date"
                          value={planningData.date}
                          onChange={(e) => setPlanningData({ ...planningData, date: e.target.value })}
                          min={formattedToday}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time" className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          Time
                        </Label>
                        <TimePicker
                          value={planningData.time}
                          onChange={(time) => setPlanningData({ ...planningData, time })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="guests" className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          Number of Guests
                        </Label>
                        <Input 
                          id="guests" 
                          type="number"
                          min="1"
                          max="50"
                          value={planningData.guests}
                          onChange={(e) => setPlanningData({ ...planningData, guests: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Preferences section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          Budget Range
                        </Label>
                        <SystemSelect 
                          value={planningData.budget}
                          onValueChange={(value) => setPlanningData({ ...planningData, budget: value })}
                          options={budgetOptions}
                          placeholder="Select budget range"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cuisine" className="flex items-center">
                          <Filter className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          Cuisine Preference
                        </Label>
                        <SystemSelect 
                          value={planningData.cuisinePreference}
                          onValueChange={(value) => setPlanningData({ ...planningData, cuisinePreference: value })}
                          options={cuisineOptions}
                          placeholder="Select cuisine (optional)"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="seating" className="flex items-center">
                          Seating Preference
                        </Label>
                        <SystemSelect 
                          value={planningData.seatingPreference}
                          onValueChange={(value) => setPlanningData({ ...planningData, seatingPreference: value })}
                          options={seatingOptions}
                          placeholder="Select seating preference"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="mb-2 block">Dietary Restrictions</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {dietaryRestrictions.map((item) => (
                            <div key={item.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`dietary-${item.id}`}
                                checked={planningData.dietaryRestrictions.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setPlanningData({
                                      ...planningData,
                                      dietaryRestrictions: [...planningData.dietaryRestrictions, item.id]
                                    });
                                  } else {
                                    setPlanningData({
                                      ...planningData,
                                      dietaryRestrictions: planningData.dietaryRestrictions.filter(
                                        (id) => id !== item.id
                                      )
                                    });
                                  }
                                }}
                              />
                              <Label 
                                htmlFor={`dietary-${item.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {item.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Special Event section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Special Requests</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="special-event" className="cursor-pointer">
                          Is this a special event?
                        </Label>
                        <Switch 
                          id="special-event"
                          checked={planningData.isSpecialEvent} 
                          onCheckedChange={(checked) => setPlanningData({
                            ...planningData,
                            isSpecialEvent: checked
                          })}
                        />
                      </div>
                      
                      {planningData.isSpecialEvent && (
                        <div className="space-y-3 pl-6 border-l-2 border-dineVibe-primary/20">
                          <Label htmlFor="event-type">Event Type</Label>
                          <SystemSelect 
                            value={planningData.eventType}
                            onValueChange={(value) => setPlanningData({ ...planningData, eventType: value })}
                            options={eventTypeOptions}
                            placeholder="Select event type"
                          />
                          
                          <div className="flex items-center space-x-2 mt-4">
                            <Checkbox 
                              id="needs-decoration"
                              checked={planningData.needsDecoration}
                              onCheckedChange={(checked) => 
                                setPlanningData({
                                  ...planningData,
                                  needsDecoration: !!checked
                                })
                              }
                            />
                            <Label 
                              htmlFor="needs-decoration" 
                              className="text-sm font-medium cursor-pointer"
                            >
                              Need special decoration or setup
                            </Label>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-4">
                        <Label htmlFor="include-drinks" className="cursor-pointer">
                          Include drinks and beverages
                        </Label>
                        <Switch 
                          id="include-drinks"
                          checked={planningData.includeDrinks} 
                          onCheckedChange={(checked) => setPlanningData({
                            ...planningData,
                            includeDrinks: checked
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                    size="lg"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Matching Restaurants
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

export default Planning;
