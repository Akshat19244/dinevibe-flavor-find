import React, { useState, useEffect } from 'react';
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReservations, updateReservationStatus, type Reservation } from '@/services/supabaseService';
import { useAuth } from '@/contexts/AuthContext';
import ChatWindow from "@/components/chat/ChatWindow";
import { getConversationByBooking, createConversation } from "@/services/chatService";

const BookingManagement: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['owner-reservations'],
    queryFn: () => getReservations(),
    enabled: !!user
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: Reservation['status'] }) => 
      updateReservationStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['owner-reservations'] });
      toast({
        title: `Booking ${variables.status}`,
        description: `Booking has been ${variables.status}. Customer will be notified.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive"
      });
      console.error('Error updating booking status:', error);
    }
  });

  const handleStatusUpdate = (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    updateStatusMutation.mutate({ id: bookingId, status: newStatus });
  };

  const downloadGuestList = (bookingId: string) => {
    // Create a simple CSV download
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const csvContent = `Booking ID,Customer Name,Email,Phone,Event Type,Date,Guests,Status
${booking.id},${booking.guest_count || 0},${booking.budget},${booking.location},${booking.event_type},${booking.booking_date},${booking.guest_count},${booking.status}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-${bookingId}-details.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Booking details have been downloaded.",
    });
  };

  const sendMessage = (bookingId: string) => {
    // For now, just show a toast. In a real app, this would open a messaging interface
    toast({
      title: "Message Feature",
      description: "Messaging functionality would open here. This will be implemented with real-time chat.",
    });
  };

  const viewDetails = (bookingId: string) => {
    // For now, just show a toast. In a real app, this would open a detailed view
    toast({
      title: "Booking Details",
      description: "Detailed booking view would open here.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(numAmount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const allBookings = bookings;

  const [activeChat, setActiveChat] = useState<{
    conversationId: string;
    bookingId: string;
  } | null>(null);

  const openChatForBooking = async (booking: any) => {
    if (!user) return;
    // Try to find existing conversation for this booking
    let conversation = await getConversationByBooking(booking.id);
    if (!conversation) {
      // Create new conversation between customer and owner
      conversation = await createConversation(
        booking.id,
        booking.user_id, // customer_id
        user.id,         // owner_id (this owner)
        booking.location // using location as venue_name fallback
      );
    }
    setActiveChat({
      conversationId: conversation.id,
      bookingId: booking.id,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading bookings...</div>
      </div>
    );
  }

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
          {pendingBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No pending bookings at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            pendingBookings.map((booking) => (
              <Card key={booking.id} className="border-[#D4AF37] border-l-4">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#0C0C0C]">Booking #{booking.id.slice(-6)}</h3>
                      <p className="text-[#8B0000] font-medium">{booking.event_type}</p>
                      <p className="text-sm text-[#2F2F2F]">Location: {booking.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <span className="text-lg font-bold text-[#8B0000]">
                        {formatCurrency(booking.budget)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-[#8B0000]" />
                      {formatDate(booking.booking_date)}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-[#8B0000]" />
                      {booking.guest_count} guests
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-[#8B0000]" />
                      {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="bg-[#FFF5E1] p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#0C0C0C] mb-2">Booking Details:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><strong>Event:</strong> {booking.event_type}</p>
                      <p><strong>Budget:</strong> {formatCurrency(booking.budget)}</p>
                      <p><strong>Guests:</strong> {booking.guest_count}</p>
                      <p><strong>Location:</strong> {booking.location}</p>
                      {booking.optional_dish && <p><strong>Special Dish:</strong> {booking.optional_dish}</p>}
                      {booking.optional_decoration && <p><strong>Decoration:</strong> {booking.optional_decoration}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                      disabled={updateStatusMutation.isPending}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirm
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                      disabled={updateStatusMutation.isPending}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-[#D4AF37] text-[#D4AF37]"
                      onClick={() => sendMessage(booking.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-[#2F2F2F] text-[#2F2F2F]"
                      onClick={() => viewDetails(booking.id)}
                    >
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
                      Download Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-600"
                      onClick={() => openChatForBooking(booking)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          {confirmedBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No confirmed bookings yet.</p>
              </CardContent>
            </Card>
          ) : (
            confirmedBookings.map((booking) => (
              <Card key={booking.id} className="border-green-200 border-l-4">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#0C0C0C]">Booking #{booking.id.slice(-6)}</h3>
                      <p className="text-[#8B0000] font-medium">{booking.event_type}</p>
                      <p className="text-sm text-[#2F2F2F]">Location: {booking.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(booking.budget)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-[#8B0000]" />
                      {formatDate(booking.booking_date)}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-[#8B0000]" />
                      {booking.guest_count} guests
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-[#8B0000]" />
                      Confirmed
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-[#D4AF37] text-[#D4AF37]"
                      onClick={() => sendMessage(booking.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message Customer
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-[#2F2F2F] text-[#2F2F2F]"
                      onClick={() => viewDetails(booking.id)}
                    >
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
            ))
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {allBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No bookings found.</p>
              </CardContent>
            </Card>
          ) : (
            allBookings.map((booking) => (
              <Card key={booking.id} className="border-[#2F2F2F]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-[#0C0C0C]">Booking #{booking.id.slice(-6)}</h3>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <span>{booking.event_type}</span>
                        <span>{formatDate(booking.booking_date)}</span>
                        <span>{booking.guest_count} guests</span>
                        <span className="font-medium text-[#8B0000]">
                          {formatCurrency(booking.budget)}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-[#8B0000] text-[#8B0000] ml-4"
                      onClick={() => viewDetails(booking.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
      {activeChat && user && (
        <ChatWindow
          conversationId={activeChat.conversationId}
          currentUserId={user.id}
          userRole="owner"
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  );
};

export default BookingManagement;
