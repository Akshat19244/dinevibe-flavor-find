
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, BarChart3, Users, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionsProps {
  onAnalyticsClick: () => void;
  onBookingsClick: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAnalyticsClick, onBookingsClick }) => {
  return (
    <Card className="card-luxury">
      <CardHeader>
        <CardTitle className="text-[#0C0C0C]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/owner/upload-event">
            <Button variant="outline" className="w-full border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]">
              <Camera className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]"
            onClick={onAnalyticsClick}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-[#2F2F2F] text-[#2F2F2F] hover:bg-[#2F2F2F] hover:text-[#FFF5E1]"
            onClick={onBookingsClick}
          >
            <Users className="h-4 w-4 mr-2" />
            Manage Bookings
          </Button>
          <Link to="/owner/settings">
            <Button variant="outline" className="w-full border-[#2F2F2F] text-[#2F2F2F] hover:bg-[#2F2F2F] hover:text-[#FFF5E1]">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
