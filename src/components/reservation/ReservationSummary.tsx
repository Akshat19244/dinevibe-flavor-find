
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, MapPin, Star, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { Restaurant } from '@/lib/api/types';

interface ReservationSummaryProps {
  restaurant: Restaurant | null;
  reservationParams: {
    restaurant_id: string;
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
  if (!restaurant) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatEventType = (event: string) => {
    switch (event) {
      case 'casual': return 'Casual Dining';
      case 'romantic': return 'Romantic Dinner';
      case 'business': return 'Business Meeting';
      case 'celebration': return 'Celebration';
      default: return 'Dining Experience';
    }
  };

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'romantic': return '💕';
      case 'business': return '💼';
      case 'celebration': return '🎉';
      default: return '🍽️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Restaurant Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Reservation Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Restaurant Info */}
          <div>
            <h3 className="font-semibold text-lg">{restaurant.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">{restaurant.location}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.7 rating • {restaurant.cuisine}</span>
            </div>
          </div>

          {/* Restaurant Image */}
          {restaurant.images && restaurant.images[0] && (
            <img
              src={restaurant.images[0]}
              alt={restaurant.name}
              className="w-full h-32 object-cover rounded-lg"
            />
          )}

          {/* Reservation Details */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium">
                  {format(new Date(reservationParams.date), 'EEEE, MMMM d, yyyy')}
                </div>
                <div className="text-sm text-slate-600">Reservation Date</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium">{reservationParams.time}</div>
                <div className="text-sm text-slate-600">Arrival Time</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium">{reservationParams.guests} Guests</div>
                <div className="text-sm text-slate-600">Party Size</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg">{getEventIcon(reservationParams.event)}</span>
              <div>
                <div className="font-medium">{formatEventType(reservationParams.event)}</div>
                <div className="text-sm text-slate-600">Occasion Type</div>
              </div>
            </div>
          </div>

          {/* Special Services */}
          {reservationParams.decor && (
            <div className="pt-4 border-t">
              <Badge className="bg-purple-100 text-purple-800">
                ✨ Special Decoration Requested
              </Badge>
              <p className="text-sm text-slate-600 mt-1">
                Our team will prepare special table decoration for your occasion
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Table Reservation</span>
            <span>Free</span>
          </div>
          
          {reservationParams.decor && (
            <div className="flex justify-between">
              <span>Special Decoration</span>
              <span>₹500</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span>Service Charge</span>
            <span>₹50</span>
          </div>
          
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{reservationParams.decor ? '550' : '50'}</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-500">
            * Food and beverages will be charged separately as per menu
          </p>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-600">
          <p>• Please arrive within 15 minutes of your reservation time</p>
          <p>• Cancellation allowed up to 2 hours before reservation</p>
          <p>• Valid ID required for verification</p>
          <p>• Table will be held for 15 minutes past reservation time</p>
          {reservationParams.decor && (
            <p>• Special decoration setup requires 30 minutes advance notice</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationSummary;
