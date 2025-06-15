
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Star,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotificationPanel: React.FC = () => {
  const { toast } = useToast();

  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Request',
      message: 'Wedding reception for 150 guests on July 15th',
      time: '5 minutes ago',
      priority: 'high',
      icon: AlertCircle,
      color: 'text-red-500'
    },
    {
      id: 2,
      type: 'review',
      title: 'New 5-Star Review',
      message: 'Amazing service and food quality!',
      time: '2 hours ago',
      priority: 'medium',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      id: 3,
      type: 'message',
      title: 'Customer Message',
      message: 'Question about dietary restrictions',
      time: '4 hours ago',
      priority: 'medium',
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Corporate event for 25 people',
      time: '1 day ago',
      priority: 'low',
      icon: CheckCircle,
      color: 'text-green-500'
    }
  ];

  const handleMarkAsRead = (notificationId: number) => {
    toast({
      title: "Notification",
      description: "Notification marked as read.",
    });
  };

  const handleViewAll = () => {
    toast({
      title: "All Notifications",
      description: "Complete notification center would open here.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Recent Notifications
          </CardTitle>
          <Badge variant="outline" className="bg-[#8B0000] text-[#FFF5E1]">
            {notifications.filter(n => n.priority === 'high').length} urgent
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <IconComponent className={`h-5 w-5 mt-0.5 ${notification.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-[#0C0C0C] truncate">
                    {notification.title}
                  </h4>
                  <Badge className={getPriorityColor(notification.priority)}>
                    {notification.priority}
                  </Badge>
                </div>
                <p className="text-sm text-[#2F2F2F] mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {notification.time}
                  </span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-xs h-6 px-2"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 border-t">
          <Button 
            variant="outline" 
            className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]"
            onClick={handleViewAll}
          >
            View All Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;
