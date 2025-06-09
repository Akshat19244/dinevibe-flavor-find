
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MapPin, Star, Clock, Users, Utensils } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: string;
  waitTime: number;
  image: string;
  specialties: string[];
  distance: string;
}

interface UserPreferences {
  cuisinePreferences: string[];
  budgetRange: { min: number; max: number };
  locationPreferences: string[];
  diningStyle: string;
}

interface SmartRecommendationsProps {
  userPreferences: UserPreferences;
  context?: {
    isSpecialOccasion?: boolean;
    groupSize?: number;
  };
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  userPreferences,
  context = {}
}) => {
  const [recommendations, setRecommendations] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock AI-generated recommendations
  useEffect(() => {
    const generateRecommendations = () => {
      const mockRestaurants: Restaurant[] = [
        {
          id: '1',
          name: 'Bella Italia Ristorante',
          cuisine: 'Italian',
          location: 'Bandra West, Mumbai',
          rating: 4.7,
          priceRange: '₹₹₹',
          waitTime: 15,
          image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1000',
          specialties: ['Authentic Pasta', 'Wood-fired Pizza', 'Tiramisu'],
          distance: '1.2 km'
        },
        {
          id: '2',
          name: 'Spice Garden',
          cuisine: 'Indian',
          location: 'Juhu, Mumbai',
          rating: 4.5,
          priceRange: '₹₹',
          waitTime: 8,
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000',
          specialties: ['Butter Chicken', 'Biryani', 'Naan Bread'],
          distance: '2.1 km'
        },
        {
          id: '3',
          name: 'Sakura Sushi',
          cuisine: 'Japanese',
          location: 'Lower Parel, Mumbai',
          rating: 4.6,
          priceRange: '₹₹₹₹',
          waitTime: 25,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1000',
          specialties: ['Fresh Sashimi', 'Dragon Roll', 'Miso Soup'],
          distance: '3.5 km'
        }
      ];

      // Simulate AI processing delay
      setTimeout(() => {
        setRecommendations(mockRestaurants);
        setIsLoading(false);
      }, 1500);
    };

    generateRecommendations();
  }, [userPreferences]);

  const getWaitTimeColor = (minutes: number) => {
    if (minutes <= 10) return 'text-green-600';
    if (minutes <= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 animate-pulse text-blue-600" />
            AI is finding perfect restaurants for you...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-slate-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          AI-Powered Recommendations
        </CardTitle>
        <p className="text-slate-600 text-sm">
          Based on your preferences: {userPreferences.cuisinePreferences.join(', ')} • 
          {userPreferences.diningStyle} dining • Group of {context.groupSize || 2}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((restaurant, index) => (
            <div key={restaurant.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{restaurant.cuisine}</Badge>
                        <span className="text-sm text-slate-600">{restaurant.priceRange}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      #{index + 1} AI Pick
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {restaurant.location} • {restaurant.distance}
                    </div>
                    <div className={`flex items-center gap-1 ${getWaitTimeColor(restaurant.waitTime)}`}>
                      <Clock className="h-4 w-4" />
                      {restaurant.waitTime} min wait
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Utensils className="h-4 w-4 text-slate-500" />
                    <div className="text-sm text-slate-600">
                      {restaurant.specialties.join(' • ')}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Book Table
                    </Button>
                    <Button size="sm" variant="outline">
                      <Sparkles className="h-4 w-4 mr-1" />
                      3D Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">AI Insight</span>
          </div>
          <p className="text-sm text-blue-700">
            Based on your dining history and current preferences, these restaurants have a 94% match rate. 
            Bella Italia is perfect for your Italian craving and has the shortest wait time right now.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRecommendations;
