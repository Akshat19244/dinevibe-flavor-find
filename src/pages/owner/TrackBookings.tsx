
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Phone, 
  Mail,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  CalendarDays
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Sample booking data
const bookings = {
  upcoming: [
    {
      id: 'b1',
      customerName: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah@example.com',
      date: new Date('2025-05-20T19:30:00'),
      guests: 2,
      status: 'confirmed',
      specialRequests: 'Window table if possible',
      bookingCode: 'RES7891',
    },
    {
      id: 'b2',
      customerName: 'Michael Chen',
      phone: '+1 (555) 987-6543',
      email: 'michael@example.com',
      date: new Date('2025-05-20T20:00:00'),
      guests: 4,
      status: 'confirmed',
      specialRequests: 'Birthday celebration - bringing cake',
      bookingCode: 'RES4562',
    },
    {
      id: 'b3',
      customerName: 'Jessica Williams',
      phone: '+1 (555) 456-7890',
      email: 'jessica@example.com',
      date: new Date('2025-05-21T18:00:00'),
      guests: 6,
      status: 'pending',
      specialRequests: 'One vegan meal required',
      bookingCode: 'RES3314',
    }
  ],
  past: [
    {
      id: 'b4',
      customerName: 'Robert Smith',
      phone: '+1 (555) 222-3333',
      email: 'robert@example.com',
      date: new Date('2025-05-15T19:00:00'),
      guests: 2,
      status: 'completed',
      specialRequests: '',
      bookingCode: 'RES5678',
    },
    {
      id: 'b5',
      customerName: 'Emma Davis',
      phone: '+1 (555) 444-5555',
      email: 'emma@example.com',
      date: new Date('2025-05-14T20:30:00'),
      guests: 3,
      status: 'completed',
      specialRequests: 'Gluten-free options needed',
      bookingCode: 'RES9012',
    },
    {
      id: 'b6',
      customerName: 'David Wilson',
      phone: '+1 (555) 666-7777',
      email: 'david@example.com',
      date: new Date('2025-05-10T18:15:00'),
      guests: 5,
      status: 'cancelled',
      specialRequests: 'Outdoor seating requested',
      bookingCode: 'RES3456',
      cancellationReason: 'Weather concerns',
    }
  ]
};

const TrackBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Function to format the date
  const formatBookingDate = (date: Date) => {
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  // Function to format the time
  const formatBookingTime = (date: Date) => {
    return format(date, 'h:mm a');
  };
  
  // Handle view booking details
  const viewBookingDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };
  
  // Handle booking status change
  const updateBookingStatus = (id: string, newStatus: string) => {
    // This would update Firebase in a real implementation
    console.log(`Booking ${id} status changed to ${newStatus}`);
  };

  // Filter bookings based on search, date, and status
  const filterBookings = (bookingsList: any[]) => {
    return bookingsList.filter(booking => {
      // Filter by search query
      const searchMatches = !searchQuery || 
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by date
      const dateMatches = !selectedDate || 
        format(booking.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      
      // Filter by status
      const statusMatches = statusFilter === 'all' || booking.status === statusFilter;
      
      return searchMatches && dateMatches && statusMatches;
    });
  };

  const filteredUpcomingBookings = filterBookings(bookings.upcoming);
  const filteredPastBookings = filterBookings(bookings.past);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName="Restaurant Owner" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Track Bookings</h1>
            <p className="text-white text-opacity-90">
              Manage customer reservations and bookings
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full md:w-auto">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input 
                    placeholder="Search name, email, code..."
                    className="pl-9 w-full md:w-[200px] h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {selectedDate ? format(selectedDate, 'MMM d, yyyy') : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => setSelectedDate(date)}
                      initialFocus
                    />
                    {selectedDate && (
                      <div className="p-2 border-t border-gray-100 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedDate(undefined)}
                        >
                          Clear
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] h-9">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="upcoming" className="mt-0">
              {filteredUpcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-3 order-2 lg:order-1">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <CalendarDays className="h-5 w-5 mr-2" />
                            Today's Bookings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div>
                            <div className="text-3xl font-bold">
                              {filteredUpcomingBookings.length}
                            </div>
                            <div className="text-sm text-gray-500">reservations</div>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Confirmed</span>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {filteredUpcomingBookings.filter(b => b.status === 'confirmed').length}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Pending</span>
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                {filteredUpcomingBookings.filter(b => b.status === 'pending').length}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mt-6 text-center">
                            <Button variant="outline" className="text-sm w-full">
                              View Calendar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="lg:col-span-9 order-1 lg:order-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Upcoming Reservations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {filteredUpcomingBookings.map((booking) => (
                              <div 
                                key={booking.id}
                                className="flex flex-col md:flex-row justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                                onClick={() => viewBookingDetails(booking)}
                              >
                                <div className="flex-1 mb-2 md:mb-0">
                                  <div className="flex items-center">
                                    <span className="font-semibold text-lg">{booking.customerName}</span>
                                    <Badge 
                                      className={`ml-2 ${
                                        booking.status === 'confirmed' 
                                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                      }`}
                                    >
                                      {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                    </Badge>
                                  </div>
                                  <div className="text-gray-600 text-sm flex items-center">
                                    <span className="inline-block mr-4">
                                      <CalendarIcon className="h-4 w-4 inline mr-1" />
                                      {formatBookingDate(booking.date)}
                                    </span>
                                    <span className="inline-block">
                                      <Clock className="h-4 w-4 inline mr-1" />
                                      {formatBookingTime(booking.date)}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-600 text-sm mt-1">
                                    <div className="flex items-center mr-4">
                                      <Users className="h-4 w-4 mr-1" />
                                      {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                        {booking.bookingCode}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <div className="hidden md:flex flex-col items-end mr-4">
                                    <div className="flex items-center mb-1">
                                      <Phone className="h-4 w-4 mr-1 text-gray-500" />
                                      <span className="text-sm">{booking.phone}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Mail className="h-4 w-4 mr-1 text-gray-500" />
                                      <span className="text-sm">{booking.email}</span>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    <ChevronRight className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-4">No upcoming bookings found</h2>
                  <p className="text-gray-600 mb-2">
                    {searchQuery || selectedDate || statusFilter !== 'all' 
                      ? 'Try adjusting your search filters' 
                      : 'There are no upcoming reservations'}
                  </p>
                  {(searchQuery || selectedDate || statusFilter !== 'all') && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDate(undefined);
                        setStatusFilter('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              {filteredPastBookings.length > 0 ? (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Past Reservations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredPastBookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="flex flex-col md:flex-row justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                          onClick={() => viewBookingDetails(booking)}
                        >
                          <div className="flex-1 mb-2 md:mb-0">
                            <div className="flex items-center">
                              <span className="font-semibold text-lg">{booking.customerName}</span>
                              <Badge 
                                className={`ml-2 ${
                                  booking.status === 'completed' 
                                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                              >
                                {booking.status === 'completed' ? 'Completed' : 'Cancelled'}
                              </Badge>
                            </div>
                            <div className="text-gray-600 text-sm flex items-center">
                              <span className="inline-block mr-4">
                                <CalendarIcon className="h-4 w-4 inline mr-1" />
                                {formatBookingDate(booking.date)}
                              </span>
                              <span className="inline-block">
                                <Clock className="h-4 w-4 inline mr-1" />
                                {formatBookingTime(booking.date)}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mt-1">
                              <div className="flex items-center mr-4">
                                <Users className="h-4 w-4 mr-1" />
                                {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                  {booking.bookingCode}
                                </span>
                              </div>
                            </div>
                            {booking.cancellationReason && (
                              <div className="text-red-600 text-sm mt-1">
                                Reason: {booking.cancellationReason}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center">
                            <div className="hidden md:flex flex-col items-end mr-4">
                              <div className="flex items-center mb-1">
                                <Phone className="h-4 w-4 mr-1 text-gray-500" />
                                <span className="text-sm">{booking.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-1 text-gray-500" />
                                <span className="text-sm">{booking.email}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-4">No past bookings found</h2>
                  <p className="text-gray-600 mb-2">
                    {searchQuery || selectedDate || statusFilter !== 'all' 
                      ? 'Try adjusting your search filters' 
                      : 'There are no past reservations'}
                  </p>
                  {(searchQuery || selectedDate || statusFilter !== 'all') && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDate(undefined);
                        setStatusFilter('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reservation Details</DialogTitle>
            <DialogDescription>
              Booking code: {selectedBooking?.bookingCode}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm text-gray-500">Customer</h3>
                  <p className="font-medium">{selectedBooking.customerName}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Status</h3>
                  <Badge 
                    className={
                      selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedBooking.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Phone</h3>
                  <p className="font-medium">{selectedBooking.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Email</h3>
                  <p className="font-medium">{selectedBooking.email}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Date</h3>
                  <p className="font-medium">{formatBookingDate(selectedBooking.date)}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Time</h3>
                  <p className="font-medium">{formatBookingTime(selectedBooking.date)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Party Size</h3>
                  <p className="font-medium">{selectedBooking.guests} {selectedBooking.guests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>
              
              {selectedBooking.specialRequests && (
                <div>
                  <h3 className="text-sm text-gray-500">Special Requests</h3>
                  <p className="border rounded-md p-2 bg-gray-50">{selectedBooking.specialRequests}</p>
                </div>
              )}
              
              {selectedBooking.cancellationReason && (
                <div>
                  <h3 className="text-sm text-gray-500">Cancellation Reason</h3>
                  <p className="border rounded-md p-2 bg-red-50 text-red-800">{selectedBooking.cancellationReason}</p>
                </div>
              )}
              
              {(selectedBooking.status === 'confirmed' || selectedBooking.status === 'pending') && (
                <div className="space-y-2">
                  <h3 className="text-sm text-gray-500">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBooking.status === 'pending' && (
                      <Button 
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                      >
                        Confirm Reservation
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                    >
                      Cancel Reservation
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default TrackBookings;
