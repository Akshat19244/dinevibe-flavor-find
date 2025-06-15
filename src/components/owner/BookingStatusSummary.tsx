
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingStatusSummaryProps {
  stats: {
    pendingBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
    upcomingEvents: number;
    totalBookings: number;
    monthlyRevenue: number;
  };
}

const BookingStatusSummary: React.FC<BookingStatusSummaryProps> = ({ stats }) => {
  const navigate = useNavigate();

  const handleViewBookings = () => {
    navigate('/owner/track-bookings');
  };

  const handleViewAnalytics = () => {
    navigate('/owner/analytics');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Booking Status Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-800">{stats.pendingBookings}</p>
              <p className="text-sm text-yellow-600">Pending</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-800">{stats.confirmedBookings}</p>
              <p className="text-sm text-green-600">Confirmed</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-red-50 border border-red-200">
            <XCircle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-800">{stats.cancelledBookings}</p>
              <p className="text-sm text-red-600">Cancelled</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <Clock className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-800">{stats.upcomingEvents}</p>
              <p className="text-sm text-blue-600">Upcoming</p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Total Bookings This Month</span>
            <span className="font-semibold text-[#8B0000]">{stats.totalBookings}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Monthly Revenue</span>
            <span className="font-semibold text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              ₹{stats.monthlyRevenue.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleViewBookings}
            className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
          >
            View All Bookings
          </Button>
          <Button 
            onClick={handleViewAnalytics}
            variant="outline" 
            className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]"
          >
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingStatusSummary;
