
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Heart, 
  Users, 
  IndianRupee, 
  Calendar,
  MapPin,
  Star,
  Bot,
  Lightbulb,
  Eye,
  Music,
  Utensils
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DiningPreferences {
  occasion: string;
  diningType: string;
  budget: string;
  guests: number;
  foodPreference: string;
  wantsLiveMusic: boolean;
  wantsDecorations: boolean;
  specialRequests: string;
  date: string;
  time: string;
}

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  priceRange: string;
  location: string;
  cuisine: string;
  features: string[];
  has360View: boolean;
  aiTip: string;
  minPricePerGuest: number;
  maxPricePerGuest: number;
}

const AIDiningExperience: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<DiningPreferences>({
    occasion: '',
    diningType: '',
    budget: '',
    guests: 2,
    foodPreference: '',
    wantsLiveMusic: false,
    wantsDecorations: false,
    specialRequests: '',
    date: '',
    time: ''
  });

  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  // Sample restaurant data
  const restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Skyline Rooftop',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400',
      rating: 4.8,
      priceRange: '₹2,000-4,000',
      location: 'Bandra, Mumbai',
      cuisine: 'Multi-Cuisine',
      features: ['Rooftop', 'Live Music', 'City Views'],
      has360View: true,
      aiTip: 'Most booked for anniversary dinners',
      minPricePerGuest: 2000,
      maxPricePerGuest: 4000
    },
    {
      id: '2',
      name: 'Garden Paradise',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400',
      rating: 4.6,
      priceRange: '₹1,500-3,000',
      location: 'CP, Delhi',
      cuisine: 'Indian & Continental',
      features: ['Garden Setting', 'Family Friendly', 'Outdoor Seating'],
      has360View: true,
      aiTip: 'Perfect for family gatherings',
      minPricePerGuest: 1500,
      maxPricePerGuest: 3000
    },
    {
      id: '3',
      name: 'Elegant Indoors',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=400',
      rating: 4.7,
      priceRange: '₹2,500-5,000',
      location: 'Koramangala, Bangalore',
      cuisine: 'Fine Dining',
      features: ['Private Booths', 'Intimate Setting', 'Premium Service'],
      has360View: false,
      aiTip: 'Ideal for date nights',
      minPricePerGuest: 2500,
      maxPricePerGuest: 5000
    }
  ];

  const updatePreferences = (field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateAISuggestions = () => {
    const suggestions = [];
    
    if (preferences.occasion === 'anniversary' && preferences.diningType === 'rooftop') {
      suggestions.push("Would you like to add live music with your rooftop dinner?");
      suggestions.push("This place offers complimentary dessert for anniversary bookings.");
    }
    
    if (preferences.occasion === 'date-night') {
      suggestions.push("Consider booking a private booth for more intimacy.");
      suggestions.push("Candle-lit tables are available on request.");
    }
    
    if (preferences.guests > 6) {
      suggestions.push("Large group bookings get 10% off on weekdays.");
      suggestions.push("Would you like a separate section for your group?");
    }
    
    if (preferences.diningType === 'rooftop') {
      suggestions.push("Weather backup plans are available for rooftop bookings.");
    }
    
    setAiSuggestions(suggestions);
  };

  const filterRestaurants = () => {
    if (!preferences.budget || !preferences.guests) {
      setFilteredRestaurants(restaurants);
      return;
    }

    const [minBudget, maxBudget] = preferences.budget.split('-').map(b => parseInt(b.replace(/[₹,]/g, '')));
    const totalMinBudget = minBudget * preferences.guests;
    const totalMaxBudget = maxBudget * preferences.guests;

    const filtered = restaurants.filter(restaurant => {
      const restaurantMinTotal = restaurant.minPricePerGuest * preferences.guests;
      const restaurantMaxTotal = restaurant.maxPricePerGuest * preferences.guests;
      
      // Check if budget ranges overlap
      const budgetMatch = restaurantMinTotal <= totalMaxBudget && restaurantMaxTotal >= totalMinBudget;
      
      // Check dining type
      let typeMatch = true;
      if (preferences.diningType) {
        const hasFeature = restaurant.features.some(feature => 
          feature.toLowerCase().includes(preferences.diningType.toLowerCase())
        );
        typeMatch = hasFeature;
      }
      
      // Rating filter (≥ 4.0)
      const ratingMatch = restaurant.rating >= 4.0;
      
      return budgetMatch && typeMatch && ratingMatch;
    });

    // Sort by: closest match, highest rating, most viewed
    filtered.sort((a, b) => {
      // Prioritize exact feature matches
      const aFeatureMatch = a.features.some(f => f.toLowerCase().includes(preferences.diningType.toLowerCase()));
      const bFeatureMatch = b.features.some(f => f.toLowerCase().includes(preferences.diningType.toLowerCase()));
      
      if (aFeatureMatch && !bFeatureMatch) return -1;
      if (!aFeatureMatch && bFeatureMatch) return 1;
      
      // Then by rating
      return b.rating - a.rating;
    });

    setFilteredRestaurants(filtered);
  };

  useEffect(() => {
    if (currentStep >= 4) {
      generateAISuggestions();
      filterRestaurants();
    }
  }, [preferences, currentStep]);

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleBooking = (restaurantId: string) => {
    navigate('/booking-form', { 
      state: { 
        restaurant: restaurants.find(r => r.id === restaurantId),
        preferences 
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0C0C0C] mb-2">
              AI-Powered Dining Experience
            </h1>
            <p className="text-[#2F2F2F]">
              Let our AI assistant help you find the perfect dining venue
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="border-[#D4AF37]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-[#8B0000]" />
                    Step {currentStep} of 5
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Occasion Type */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Select Your Occasion</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { value: 'date-night', label: 'Date Night', icon: '💕' },
                          { value: 'family-gathering', label: 'Family Gathering', icon: '👨‍👩‍👧‍👦' },
                          { value: 'anniversary', label: 'Anniversary', icon: '💖' },
                          { value: 'rooftop-dinner', label: 'Rooftop Dinner', icon: '🌃' },
                          { value: 'friends-party', label: 'Friends Party', icon: '🎉' },
                          { value: 'business-meeting', label: 'Business Meeting', icon: '💼' }
                        ].map((occasion) => (
                          <Button
                            key={occasion.value}
                            variant={preferences.occasion === occasion.value ? 'default' : 'outline'}
                            className={`h-20 flex flex-col items-center justify-center ${
                              preferences.occasion === occasion.value 
                                ? 'bg-[#8B0000] text-[#FFF5E1]' 
                                : 'border-[#D4AF37] text-[#2F2F2F]'
                            }`}
                            onClick={() => updatePreferences('occasion', occasion.value)}
                          >
                            <span className="text-2xl mb-1">{occasion.icon}</span>
                            <span className="text-xs text-center">{occasion.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Dining Type */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Select Dining Type</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { value: 'rooftop', label: 'Rooftop', icon: '🏙️' },
                          { value: 'indoor', label: 'Indoor', icon: '🏠' },
                          { value: 'private-booth', label: 'Private Booth', icon: '🛋️' },
                          { value: 'themed', label: 'Themed', icon: '🎭' },
                          { value: 'poolside', label: 'Poolside', icon: '🏊‍♂️' },
                          { value: 'garden', label: 'Garden', icon: '🌿' }
                        ].map((type) => (
                          <Button
                            key={type.value}
                            variant={preferences.diningType === type.value ? 'default' : 'outline'}
                            className={`h-20 flex flex-col items-center justify-center ${
                              preferences.diningType === type.value 
                                ? 'bg-[#8B0000] text-[#FFF5E1]' 
                                : 'border-[#D4AF37] text-[#2F2F2F]'
                            }`}
                            onClick={() => updatePreferences('diningType', type.value)}
                          >
                            <span className="text-2xl mb-1">{type.icon}</span>
                            <span className="text-xs text-center">{type.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Budget & Guests */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Budget & Guest Count</h3>
                      
                      <div>
                        <Label>Budget Range (per person)</Label>
                        <Select 
                          value={preferences.budget} 
                          onValueChange={(value) => updatePreferences('budget', value)}
                        >
                          <SelectTrigger className="border-[#D4AF37]">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                            <SelectItem value="2000-3000">₹2,000 - ₹3,000</SelectItem>
                            <SelectItem value="3000-5000">₹3,000 - ₹5,000</SelectItem>
                            <SelectItem value="5000-8000">₹5,000 - ₹8,000</SelectItem>
                            <SelectItem value="8000-15000">₹8,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Number of Guests</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updatePreferences('guests', Math.max(1, preferences.guests - 1))}
                            className="border-[#D4AF37]"
                          >
                            -
                          </Button>
                          <span className="text-xl font-semibold w-12 text-center">{preferences.guests}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updatePreferences('guests', preferences.guests + 1)}
                            className="border-[#D4AF37]"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Date</Label>
                          <Input
                            type="date"
                            value={preferences.date}
                            onChange={(e) => updatePreferences('date', e.target.value)}
                            className="border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <Label>Preferred Time</Label>
                          <Select 
                            value={preferences.time} 
                            onValueChange={(value) => updatePreferences('time', value)}
                          >
                            <SelectTrigger className="border-[#D4AF37]">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lunch">Lunch (12:00 - 3:00 PM)</SelectItem>
                              <SelectItem value="evening">Evening (6:00 - 8:00 PM)</SelectItem>
                              <SelectItem value="dinner">Dinner (8:00 - 11:00 PM)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Preferences */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Menu & Preferences</h3>
                      
                      <div>
                        <Label>Food Preference</Label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          {['Vegetarian', 'Non-Vegetarian', 'Both'].map((pref) => (
                            <Button
                              key={pref}
                              variant={preferences.foodPreference === pref ? 'default' : 'outline'}
                              className={preferences.foodPreference === pref 
                                ? 'bg-[#8B0000] text-[#FFF5E1]' 
                                : 'border-[#D4AF37] text-[#2F2F2F]'
                              }
                              onClick={() => updatePreferences('foodPreference', pref)}
                            >
                              {pref}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="liveMusic"
                            checked={preferences.wantsLiveMusic}
                            onCheckedChange={(checked) => updatePreferences('wantsLiveMusic', checked)}
                          />
                          <label htmlFor="liveMusic" className="flex items-center">
                            <Music className="h-4 w-4 mr-2" />
                            Live Music
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="decorations"
                            checked={preferences.wantsDecorations}
                            onCheckedChange={(checked) => updatePreferences('wantsDecorations', checked)}
                          />
                          <label htmlFor="decorations" className="flex items-center">
                            <Heart className="h-4 w-4 mr-2" />
                            Special Decorations
                          </label>
                        </div>
                      </div>

                      <div>
                        <Label>Special Requests</Label>
                        <Textarea
                          value={preferences.specialRequests}
                          onChange={(e) => updatePreferences('specialRequests', e.target.value)}
                          placeholder="Any special requests or dietary restrictions..."
                          className="border-[#D4AF37]"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Restaurant Selection */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Recommended Restaurants</h3>
                      
                      {filteredRestaurants.length > 0 ? (
                        <div className="space-y-4">
                          {filteredRestaurants.map((restaurant) => (
                            <Card key={restaurant.id} className="border-[#D4AF37] hover:shadow-lg transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-4">
                                  <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                  />
                                  <div className="flex-grow">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h4 className="text-lg font-semibold text-[#0C0C0C]">{restaurant.name}</h4>
                                        <div className="flex items-center space-x-2 mt-1">
                                          <div className="flex items-center">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium ml-1">{restaurant.rating}</span>
                                          </div>
                                          <span className="text-[#2F2F2F]">•</span>
                                          <span className="text-sm text-[#2F2F2F]">{restaurant.cuisine}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                          <MapPin className="h-4 w-4 text-[#2F2F2F]" />
                                          <span className="text-sm text-[#2F2F2F] ml-1">{restaurant.location}</span>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-lg font-bold text-[#8B0000]">{restaurant.priceRange}</div>
                                        <div className="text-sm text-[#2F2F2F]">per person</div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 mt-3">
                                      {restaurant.features.map((feature, index) => (
                                        <Badge key={index} variant="outline" className="border-[#D4AF37] text-[#8B0000]">
                                          {feature}
                                        </Badge>
                                      ))}
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-4">
                                      <div className="flex items-center space-x-2 text-sm text-blue-600">
                                        <Lightbulb className="h-4 w-4" />
                                        <span>{restaurant.aiTip}</span>
                                      </div>
                                      <div className="flex space-x-2">
                                        {restaurant.has360View && (
                                          <Button variant="outline" size="sm" className="border-[#D4AF37] text-[#D4AF37]">
                                            <Eye className="h-4 w-4 mr-1" />
                                            360° View
                                          </Button>
                                        )}
                                        <Button 
                                          size="sm" 
                                          className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                                          onClick={() => handleBooking(restaurant.id)}
                                        >
                                          Book Now
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-[#2F2F2F]">No restaurants match your criteria. Try adjusting your preferences.</p>
                          <Button 
                            variant="outline" 
                            className="mt-4 border-[#D4AF37] text-[#D4AF37]"
                            onClick={() => setCurrentStep(1)}
                          >
                            Start Over
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation */}
                  {currentStep < 5 && (
                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="border-[#2F2F2F] text-[#2F2F2F]"
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                      >
                        Next Step
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Assistant Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-[#D4AF37] sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#0C0C0C]">
                    <Bot className="h-5 w-5 mr-2 text-blue-600" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current Selection Summary */}
                  <div>
                    <h4 className="font-semibold text-[#0C0C0C] mb-2">Your Selection:</h4>
                    <div className="space-y-2 text-sm">
                      {preferences.occasion && (
                        <div className="flex justify-between">
                          <span className="text-[#2F2F2F]">Occasion:</span>
                          <span className="font-medium capitalize">{preferences.occasion.replace('-', ' ')}</span>
                        </div>
                      )}
                      {preferences.diningType && (
                        <div className="flex justify-between">
                          <span className="text-[#2F2F2F]">Type:</span>
                          <span className="font-medium capitalize">{preferences.diningType.replace('-', ' ')}</span>
                        </div>
                      )}
                      {preferences.budget && (
                        <div className="flex justify-between">
                          <span className="text-[#2F2F2F]">Budget:</span>
                          <span className="font-medium">₹{preferences.budget.replace('-', ' - ₹')}</span>
                        </div>
                      )}
                      {preferences.guests > 0 && (
                        <div className="flex justify-between">
                          <span className="text-[#2F2F2F]">Guests:</span>
                          <span className="font-medium">{preferences.guests}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  {aiSuggestions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#0C0C0C] mb-2">💡 AI Suggestions:</h4>
                      <div className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Stats */}
                  {currentStep === 5 && filteredRestaurants.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#0C0C0C] mb-2">Quick Stats:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#2F2F2F]">Restaurants found:</span>
                          <span className="font-medium">{filteredRestaurants.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#2F2F2F]">With 360° views:</span>
                          <span className="font-medium">{filteredRestaurants.filter(r => r.has360View).length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#2F2F2F]">Average rating:</span>
                          <span className="font-medium">
                            {(filteredRestaurants.reduce((sum, r) => sum + r.rating, 0) / filteredRestaurants.length).toFixed(1)}⭐
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDiningExperience;
