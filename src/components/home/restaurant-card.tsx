
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin } from 'lucide-react';

export interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  location: string;
  isNew?: boolean;
  hasDeals?: boolean;
  waitTime?: number;
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
  waitTime = 0
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {isNew && (
            <Badge className="bg-green-600 text-white">New</Badge>
          )}
          {hasDeals && (
            <Badge className="bg-orange-600 text-white">Deals</Badge>
          )}
        </div>
        {waitTime > 0 && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {waitTime}m
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-slate-600 text-sm">{cuisine}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-slate-600">({priceRange})</span>
            </div>
          </div>
          
          <div className="flex items-center text-slate-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
