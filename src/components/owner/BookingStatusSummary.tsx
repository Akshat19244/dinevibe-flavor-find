
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsData {
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  upcomingEvents: number;
}

interface BookingStatusSummaryProps {
  stats: StatsData;
}

const BookingStatusSummary: React.FC<BookingStatusSummaryProps> = ({ stats }) => {
  return (
    <Card className="card-luxury">
      <CardHeader>
        <CardTitle className="text-[#0C0C0C]">Booking Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Confirmed</span>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">{stats.confirmedBookings}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Pending</span>
            <div className="flex items-center space-x-2">
              <Badge className="bg-yellow-100 text-yellow-800">{stats.pendingBookings}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Cancelled</span>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-100 text-red-800">{stats.cancelledBookings}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Upcoming Events</span>
            <div className="flex items-center space-x-2">
              <Badge className="bg-[#D4AF37] text-[#0C0C0C]">{stats.upcomingEvents}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingStatusSummary;
