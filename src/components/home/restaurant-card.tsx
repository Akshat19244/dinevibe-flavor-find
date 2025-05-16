
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  location: string;
  isNew?: boolean;
  hasDeals?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisine,
  rating,
  priceRange,
  location,
  isNew = false,
  hasDeals = false,
}) => {
  return (
    <Card className="overflow-hidden hover-scale h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          {isNew && (
            <Badge className="bg-dineVibe-primary">New</Badge>
          )}
          {hasDeals && (
            <Badge className="bg-dineVibe-accent">Deals</Badge>
          )}
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mb-2">
          <span>{cuisine}</span>
          <span className="mx-2">•</span>
          <span>{priceRange}</span>
        </div>
        
        <div className="flex items-start text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3 pb-3">
        <div className="w-full flex justify-between items-center">
          <span className="text-xs text-gray-500">1.5 miles away</span>
          <span className="text-sm font-medium text-dineVibe-primary hover:underline cursor-pointer">
            View Details
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
