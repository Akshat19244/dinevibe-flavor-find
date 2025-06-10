
import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reservation' | 'event' | 'media' | 'admin';
  read: boolean;
  created_at: string;
}

const NotificationBell: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      subscribeToNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;
    
    // Mock notifications for demo
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Reservation Confirmed',
        message: 'Your table at Bella Italia has been confirmed for tonight at 7 PM',
        type: 'reservation',
        read: false,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Event Proposal Ready',
        message: 'Your wedding event proposal at Crystal Palace is ready for review',
        type: 'event',
        read: false,
        created_at: new Date().toISOString()
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  };

  const subscribeToNotifications = () => {
    // Real-time subscription would go here
    console.log('Subscribed to real-time notifications');
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative hover:bg-slate-800 text-slate-300"
        onClick={() => setShowPanel(!showPanel)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
            {unreadCount}
          </span>
        )}
      </Button>

      {showPanel && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto z-50 bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-white">Notifications</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowPanel(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-slate-400 text-center py-4">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    notification.read 
                      ? 'bg-slate-700 border-slate-600' 
                      : 'bg-blue-900/20 border-blue-500/30'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                  <p className="text-slate-300 text-xs mt-1">{notification.message}</p>
                  <p className="text-slate-500 text-xs mt-2">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationBell;
