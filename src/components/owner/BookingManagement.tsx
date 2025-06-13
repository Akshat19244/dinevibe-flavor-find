
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingManagement: React.FC = () => {
  const { toast } = useToast();
  const [bookings] = useState([
    {
      id: 'BK001',
      token: 'DV12345ABCDE',
      customerName: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      eventType: 'Wedding Reception',
      date: '2024-07-15',
      time: '18:00',
      guests: 150,
      status: 'pending',
      specialRequests: 'Vegetarian menu required, outdoor seating preferred',
      aiSummary: 'Traditional Indian wedding reception for 150 guests. Customer prefers vegetarian cuisine with outdoor ambiance. Budget-conscious but willing to pay premium for quality service.',
      submittedAt: '2024-06-14T10:30:00Z',
      estimatedRevenue: 125000
    },
    {
      id: 'BK002',
      token: 'DV67890FGHIJ',
      customerName: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 87654 32109',
      eventType: 'Corporate Meeting',
      date: '2024-07-18',
      time: '14:00',
      guests: 25,
      status: 'confirmed',
      specialRequests: 'AV equipment needed, light refreshments',
      aiSummary: 'Professional corporate meeting requiring modern facilities. Client emphasizes punctuality and quality service. Repeat customer with high satisfaction history.',
      submittedAt: '2024-06-13T15:45:00Z',
      estimatedRevenue: 35000
    },
    {
      id: 'BK003',
      token: 'DV11111KKKKK',
      customerName: 'Anjali Gupta',
      email: 'anjali@example.com',
      phone: '+91 76543 21098',
      eventType: 'Birthday Party',
      date: '2024-07-20',
      time: '19:30',
      guests: 40,
      status: 'confirmed',
      specialRequests: 'Birthday cake arrangement, decoration in pink theme',
      aiSummary: 'Intimate birthday celebration with focus on decoration and ambiance. Customer values attention to detail and personalized service.',
      submittedAt: '2024-06-12T09:15:00Z',
      estimatedRevenue: 28000
    }
  ]);

  const handleStatusUpdate = (bookingId: string, newStatus: 'confirmed' | 'declined') => {
    toast({
      title: `Booking ${newStatus}`,
      description: `Booking ${bookingId} has been ${newStatus}. Customer will be notified.`,
    });
  };

  const downloadGuestList = (bookingId: string) => {
    toast({
      title: "Download Started",
      description: "Guest list is being prepared for download.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const allBookings = bookings;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0C0C0C]">Booking Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({confirmedBookings.length})</TabsTrigger>
          <TabsTrigger value="all">All Bookings ({allBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingBookings.map((booking) => (
            <Card key={booking.id} className="border-[#D4AF37] border-l-4">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#0C0C0C]">{booking.customerName}</h3>
                    <p className="text-[#8B0000] font-medium">{booking.eventType}</p>
                    <p className="text-sm text-[#2F2F2F]">Token: {booking.token}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <span className="text-lg font-bold text-[#8B0000]">
                      {formatCurrency(booking.estimatedRevenue)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-[#8B0000]" />
                    {booking.date}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-[#8B0000]" />
                    {booking.time}
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-[#8B0000]" />
                    {booking.guests} guests
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-[#8B0000]" />
                    {booking.phone}
                  </div>
                </div>

                <div className="bg-[#FFF5E1] p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-[#0C0C0C] mb-2">AI Summary:</h4>
                  <p className="text-sm text-[#2F2F2F]">{booking.aiSummary}</p>
                </div>

                {booking.specialRequests && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#0C0C0C] mb-2">Special Requests:</h4>
                    <p className="text-sm text-[#2F2F2F]">{booking.specialRequests}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Confirm
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-500 text-red-500 hover:bg-red-50"
                    onClick={() => handleStatusUpdate(booking.id, 'declined')}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#2F2F2F] text-[#2F2F2F]">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-[#8B0000] text-[#8B0000]"
                    onClick={() => downloadGuestList(booking.id)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Guest List
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          {confirmedBookings.map((booking) => (
            <Card key={booking.id} className="border-green-200 border-l-4">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#0C0C0C]">{booking.customerName}</h3>
                    <p className="text-[#8B0000] font-medium">{booking.eventType}</p>
                    <p className="text-sm text-[#2F2F2F]">Token: {booking.token}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(booking.estimatedRevenue)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-[#8B0000]" />
                    {booking.date}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-[#8B0000]" />
                    {booking.time}
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-[#8B0000]" />
                    {booking.guests} guests
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-[#8B0000]" />
                    {booking.email}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message Customer
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#2F2F2F] text-[#2F2F2F]">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-[#8B0000] text-[#8B0000]"
                    onClick={() => downloadGuestList(booking.id)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {allBookings.map((booking) => (
            <Card key={booking.id} className="border-[#2F2F2F]/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-[#0C0C0C]">{booking.customerName}</h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <span>{booking.eventType}</span>
                      <span>{booking.date} at {booking.time}</span>
                      <span>{booking.guests} guests</span>
                      <span className="font-medium text-[#8B0000]">
                        {formatCurrency(booking.estimatedRevenue)}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-[#8B0000] text-[#8B0000] ml-4">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingManagement;
