
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

const NotificationPanel: React.FC = () => {
  return (
    <Card className="card-luxury">
      <CardHeader>
        <CardTitle className="text-[#0C0C0C] flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Recent Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-[#0C0C0C]">New booking request from Priya Sharma</p>
              <p className="text-xs text-[#2F2F2F]">Wedding reception for 150 guests on July 15th</p>
              <p className="text-xs text-[#2F2F2F]">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-[#0C0C0C]">Payment received for booking #BK002</p>
              <p className="text-xs text-[#2F2F2F]">₹35,000 from Rajesh Kumar</p>
              <p className="text-xs text-[#2F2F2F]">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-[#0C0C0C]">New review posted by Anjali Gupta</p>
              <p className="text-xs text-[#2F2F2F]">5-star rating with positive feedback</p>
              <p className="text-xs text-[#2F2F2F]">1 day ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;
