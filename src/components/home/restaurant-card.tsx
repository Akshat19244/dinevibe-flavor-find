
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  waitTime
}) => {
  return (
    <Link to={`/user/restaurant/${id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-slate-700 bg-slate-800 hover:scale-105">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && (
              <Badge className="bg-blue-600 text-white">New</Badge>
            )}
            {hasDeals && (
              <Badge className="bg-yellow-500 text-slate-900">Deals</Badge>
            )}
          </div>
          {waitTime !== undefined && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-slate-800/80 text-white">
                <Clock className="h-3 w-3 mr-1" />
                {waitTime === 0 ? 'Available' : `${waitTime}m wait`}
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-slate-300">{rating}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Utensils className="h-4 w-4" />
                <span>{cuisine}</span>
              </div>
              <span className="font-medium text-yellow-500">{priceRange}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
