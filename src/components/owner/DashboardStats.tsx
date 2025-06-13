
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarClock, DollarSign, Star, TrendingUp } from 'lucide-react';

interface StatsData {
  totalBookings: number;
  monthlyRevenue: number;
  avgRating: number;
  totalReviews: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  upcomingEvents: number;
}

interface DashboardStatsProps {
  stats: StatsData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="card-luxury">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#2F2F2F]">Total Bookings</p>
              <h3 className="text-2xl font-bold text-[#0C0C0C]">{stats.totalBookings}</h3>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
            <div className="p-3 bg-[#8B0000]/10 rounded-full">
              <CalendarClock className="h-6 w-6 text-[#8B0000]" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-luxury">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#2F2F2F]">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-[#0C0C0C]">{formatCurrency(stats.monthlyRevenue)}</h3>
              <p className="text-xs text-green-600">+18% from last month</p>
            </div>
            <div className="p-3 bg-[#D4AF37]/10 rounded-full">
              <DollarSign className="h-6 w-6 text-[#D4AF37]" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-luxury">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#2F2F2F]">Average Rating</p>
              <h3 className="text-2xl font-bold text-[#0C0C0C]">{stats.avgRating}</h3>
              <p className="text-xs text-[#2F2F2F]">{stats.totalReviews} reviews</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-full">
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-luxury">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#2F2F2F]">Growth Rate</p>
              <h3 className="text-2xl font-bold text-[#0C0C0C]">+24%</h3>
              <p className="text-xs text-green-600">This quarter</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
