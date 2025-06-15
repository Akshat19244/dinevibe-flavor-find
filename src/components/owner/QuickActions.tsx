
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  BarChart3, 
  Plus, 
  Settings, 
  Users,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsProps {
  onAnalyticsClick: () => void;
  onBookingsClick: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAnalyticsClick, onBookingsClick }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddEvent = () => {
    navigate('/owner/upload-event');
  };

  const handleSettings = () => {
    navigate('/owner/settings');
  };

  const handleMessages = () => {
    toast({
      title: "Messages",
      description: "Customer messaging system would open here.",
    });
  };

  const handleViewCustomers = () => {
    toast({
      title: "Customer Management",
      description: "Customer database and management tools would open here.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={onBookingsClick}
          className="w-full justify-start bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Manage Bookings
        </Button>
        
        <Button 
          onClick={onAnalyticsClick}
          variant="outline" 
          className="w-full justify-start border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          View Analytics
        </Button>
        
        <Button 
          onClick={handleAddEvent}
          variant="outline" 
          className="w-full justify-start border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Event
        </Button>
        
        <Button 
          onClick={handleMessages}
          variant="outline" 
          className="w-full justify-start border-[#2F2F2F] text-[#2F2F2F] hover:bg-[#2F2F2F] hover:text-[#FFF5E1]"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Customer Messages
        </Button>
        
        <Button 
          onClick={handleViewCustomers}
          variant="outline" 
          className="w-full justify-start"
        >
          <Users className="h-4 w-4 mr-2" />
          View Customers
        </Button>
        
        <Button 
          onClick={handleSettings}
          variant="outline" 
          className="w-full justify-start"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
