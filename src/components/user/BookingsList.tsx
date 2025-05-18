
import React from 'react';
import { format, isPast } from 'date-fns';
import { Reservation } from '@/lib/api/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';

interface BookingsListProps {
  reservations: Reservation[];
  type: 'upcoming' | 'past';
  isLoading: boolean;
}

const BookingsList: React.FC<BookingsListProps> = ({ reservations, type, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-primary rounded-full" aria-hidden="true"></div>
        <p className="mt-2">Loading reservations...</p>
      </div>
    );
  }
  
  if (reservations.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-500">
          {type === 'upcoming' 
            ? 'You have no upcoming reservations.' 
            : 'You have no past reservations.'}
        </h3>
        {type === 'upcoming' && (
          <p className="mt-2 text-sm text-gray-400">
            Make a reservation to get started!
          </p>
        )}
      </div>
    );
  }
  
  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <Card key={reservation.id} className={`overflow-hidden ${isPast(new Date(reservation.booking_date)) ? 'bg-gray-50' : ''}`}>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Restaurant image or placeholder */}
              <div className="w-full md:w-1/4 h-32 md:h-auto bg-gray-200">
                {reservation.restaurants && reservation.restaurants.images && reservation.restaurants.images[0] ? (
                  <img 
                    src={reservation.restaurants.images[0]} 
                    alt={reservation.restaurants?.name || 'Restaurant'} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                    <span>No Image</span>
                  </div>
                )}
              </div>
              
              {/* Reservation details */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">
                      {reservation.event_type}
                      {' '}
                      {reservation.restaurants ? (
                        <span>at {reservation.restaurants.name}</span>
                      ) : (
                        <span>in {reservation.location}</span>
                      )}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{format(new Date(reservation.booking_date), 'PPP')}</span>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(reservation.status)}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{reservation.guest_count} guests</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{reservation.budget}</span>
                  </div>
                  
                  <div className="flex items-center text-sm col-span-2">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{reservation.restaurants?.location || reservation.location}</span>
                  </div>
                </div>
                
                {/* Optional details */}
                {(reservation.optional_dish || reservation.optional_decoration) && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    {reservation.optional_dish && (
                      <p className="text-sm"><span className="font-medium">Dish:</span> {reservation.optional_dish}</p>
                    )}
                    
                    {reservation.optional_decoration && (
                      <p className="text-sm"><span className="font-medium">Setup:</span> {reservation.optional_decoration}</p>
                    )}
                  </div>
                )}
                
                {/* Action buttons for upcoming reservations */}
                {type === 'upcoming' && (
                  <div className="mt-auto pt-3 flex justify-end gap-2">
                    <p className="text-xs text-gray-500 self-center">
                      Created on {format(new Date(reservation.created_at), 'PP')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsList;
