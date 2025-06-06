
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Zap, Heart } from 'lucide-react';
import { smartRecommendationEngine, SmartRecommendation, UserPreferences } from '@/lib/ai/smartRecommendations';

interface SmartRecommendationsProps {
  userPreferences?: Partial<UserPreferences>;
  context?: {
    isSpecialOccasion?: boolean;
    groupSize: number;
  };
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  userPreferences = {},
  context = { groupSize: 2 }
}) => {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock restaurant data for demo
  const mockRestaurants = [
    {
      id: 'rest1',
      name: 'Bella Italia',
      cuisine: 'Italian',
      price_range: 'moderate',
      rating: 4.5,
      location: 'Downtown Mumbai',
      images: ['https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1170'],
      description: 'Authentic Italian cuisine in a romantic setting',
      offers_decoration: true,
      seating_capacity: 80
    },
    {
      id: 'rest2',
      name: 'Spice Garden',
      cuisine: 'Indian',
      price_range: 'budget',
      rating: 4.2,
      location: 'Bandra West',
      images: ['https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1074'],
      description: 'Traditional Indian flavors with modern presentation',
      offers_decoration: false,
      seating_capacity: 60
    },
    {
      id: 'rest3',
      name: 'Zen Sushi',
      cuisine: 'Japanese',
      price_range: 'premium',
      rating: 4.7,
      location: 'Juhu',
      images: ['https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1000'],
      description: 'Fresh sushi and Japanese cuisine in a zen atmosphere',
      offers_decoration: true,
      seating_capacity: 45
    },
    {
      id: 'rest4',
      name: 'Café Mocha',
      cuisine: 'Continental',
      price_range: 'budget',
      rating: 4.0,
      location: 'Powai',
      images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000'],
      description: 'Casual dining with great coffee and continental dishes',
      offers_decoration: false,
      seating_capacity: 35
    },
    {
      id: 'rest5',
      name: 'The Royal Feast',
      cuisine: 'Indian',
      price_range: 'luxury',
      rating: 4.8,
      location: 'South Mumbai',
      images: ['https://images.unsplash.com/photo-1552566842-2a35720d3421?q=80&w=1000'],
      description: 'Royal dining experience with traditional Indian cuisine',
      offers_decoration: true,
      seating_capacity: 120
    }
  ];

  const defaultPreferences: UserPreferences = {
    cuisinePreferences: ['italian', 'indian'],
    budgetRange: { min: 500, max: 2000 },
    locationPreferences: ['mumbai', 'downtown'],
    diningStyle: 'casual',
    previousBookings: [],
    dietaryRestrictions: [],
    averagePartySize: 2,
    ...userPreferences
  };

  useEffect(() => {
    const generateRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const recs = smartRecommendationEngine.generateRecommendations(
        defaultPreferences,
        mockRestaurants,
        {
          currentTime: new Date(),
          ...context
        }
      );
      
      setRecommendations(recs);
      setIsLoading(false);
    };

    generateRecommendations();
  }, [userPreferences, context]);

  const getPriceRangeDisplay = (priceRange: string) => {
    const ranges = {
      'budget': '₹₹',
      'moderate': '₹₹₹',
      'premium': '₹₹₹₹',
      'luxury': '₹₹₹₹₹'
    };
    return ranges[priceRange] || '₹₹₹';
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-50';
    if (score >= 0.6) return 'text-blue-600 bg-blue-50';
    if (score >= 0.4) return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold">AI is finding perfect matches...</h3>
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI-Powered Recommendations</h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {recommendations.length} matches found
        </Badge>
      </div>

      <div className="grid gap-4">
        {recommendations.map((rec, index) => (
          <Card 
            key={rec.restaurant.id} 
            className={`transition-all hover:shadow-lg cursor-pointer ${
              index === 0 ? 'ring-2 ring-primary/20 bg-primary/5' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={rec.restaurant.image}
                  alt={rec.restaurant.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg truncate">
                        {rec.restaurant.name}
                        {index === 0 && (
                          <Badge className="ml-2 bg-primary text-white">
                            <Heart className="h-3 w-3 mr-1" />
                            Top Pick
                          </Badge>
                        )}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{rec.restaurant.cuisine}</span>
                        <span>•</span>
                        <span>{getPriceRangeDisplay(rec.restaurant.priceRange)}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{rec.restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Badge className={`${getScoreColor(rec.score)} font-semibold`}>
                      {Math.round(rec.score * 100)}% match
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{rec.restaurant.location}</span>
                    {rec.waitTime !== undefined && (
                      <>
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3" />
                        <span>
                          {rec.waitTime === 0 ? 'Available now' : `~${rec.waitTime} min wait`}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-primary font-medium mb-2">
                    {rec.aiInsight}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {rec.reasons.slice(0, 3).map((reason, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>

                  {rec.specialOffers && rec.specialOffers.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-medium text-green-700 mb-1">Special Offers:</div>
                      {rec.specialOffers.map((offer, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs mr-1 bg-green-50 text-green-700">
                          {offer}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Book Now
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          🤖 Recommendations powered by DineVibe AI • Updated in real-time
        </p>
      </div>
    </div>
  );
};

export default SmartRecommendations;
