
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Restaurant } from '@/lib/api/types';
import { CalendarIcon, Clock, Users, MapPin, Phone, Info } from 'lucide-react';

interface ReservationSummaryProps {
  restaurant: Restaurant | null;
  reservationParams: {
    date: string;
    time: string;
    guests: number;
    event: string;
    decor: boolean;
  };
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  restaurant,
  reservationParams
}) => {
  const getEventTypeLabel = (eventType: string) => {
    switch (eventType) {
      case 'casual': return 'Casual Dining';
      case 'birthday': return 'Birthday Celebration';
      case 'anniversary': return 'Anniversary';
      case 'business': return 'Business Meeting';
      case 'date': return 'Romantic Date';
      case 'family': return 'Family Gathering';
      default: return 'Other Event';
    }
  };
  
  // Helper function to safely display contact information
  const getContactInfo = (): string => {
    if (
      restaurant?.manager_details && 
      typeof restaurant.manager_details === 'object' && 
      'contact' in restaurant.manager_details
    ) {
      return String(restaurant.manager_details.contact);
    }
    return 'Contact information not available';
  };
  
  return (
    <Card className="bg-gray-50 dark:bg-gray-900">
      <CardHeader>
        <div className="mb-2">
          {restaurant?.price_range && (
            <Badge className="mb-2">
              {restaurant.price_range === 'budget' && 'Budget-friendly ($)'}
              {restaurant.price_range === 'moderate' && 'Moderate ($$)'}
              {restaurant.price_range === 'high-end' && 'Premium ($$$)'}
              {restaurant.price_range === 'luxury' && 'Luxury ($$$$)'}
            </Badge>
          )}
          <CardTitle>{restaurant?.name || 'Restaurant'}</CardTitle>
          <CardDescription>{restaurant?.cuisine || 'Cuisine'}</CardDescription>
        </div>
        
        <div className="aspect-video w-full overflow-hidden rounded-md">
          <img 
            src={restaurant?.images?.[0] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3"} 
            alt={restaurant?.name || 'Restaurant'} 
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-semibold">Reservation Summary</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <CalendarIcon className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
              <span>
                {format(new Date(reservationParams.date), 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
              <span>{reservationParams.time}</span>
            </div>
            
            <div className="flex items-start">
              <Users className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
              <span>
                {reservationParams.guests} {reservationParams.guests === 1 ? 'guest' : 'guests'}
              </span>
            </div>
            
            <div className="flex items-start">
              <Info className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
              <span>{getEventTypeLabel(reservationParams.event)}</span>
            </div>
            
            {reservationParams.decor && (
              <div className="bg-dineVibe-accent/10 p-2 rounded-md text-dineVibe-accent">
                Special decoration requested
              </div>
            )}
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2">Restaurant Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
                <span>{restaurant?.location || 'Location not available'}</span>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-0.5 text-dineVibe-primary" />
                <span>{getContactInfo()}</span>
              </div>
              
              {restaurant?.description && (
                <p className="text-gray-600 mt-2">
                  {restaurant.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationSummary;
