
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Users, MapPin, Clock, DollarSign } from 'lucide-react';

// Mock reservation data - would come from Supabase in real implementation
interface Reservation {
  id: string;
  customerName: string;
  email: string;
  venueName: string;
  eventType: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
  location: string;
  created_at: string;
}

const ManageReservations: React.FC = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual Supabase call
      const mockReservations: Reservation[] = [
        {
          id: 'RES001',
          customerName: 'Sarah Johnson',
          email: 'sarah@example.com',
          venueName: 'Royal Garden Palace',
          eventType: 'Wedding Reception',
          date: '2024-06-18',
          time: '18:00',
          guests: 250,
          status: 'confirmed',
          amount: 125000,
          location: 'Mumbai',
          created_at: '2024-06-10'
        },
        {
          id: 'RES002',
          customerName: 'Michael Chen',
          email: 'michael@example.com',
          venueName: 'Grand Ballroom',
          eventType: 'Corporate Event',
          date: '2024-06-20',
          time: '19:00',
          guests: 80,
          status: 'pending',
          amount: 45000,
          location: 'Delhi',
          created_at: '2024-06-12'
        },
        {
          id: 'RES003',
          customerName: 'Priya Sharma',
          email: 'priya@example.com',
          venueName: 'Sunset Terrace',
          eventType: 'Birthday Party',
          date: '2024-06-22',
          time: '16:00',
          guests: 50,
          status: 'confirmed',
          amount: 28000,
          location: 'Bangalore',
          created_at: '2024-06-14'
        },
        {
          id: 'RES004',
          customerName: 'David Wilson',
          email: 'david@example.com',
          venueName: 'Heritage Hall',
          eventType: 'Anniversary',
          date: '2024-06-25',
          time: '17:30',
          guests: 120,
          status: 'cancelled',
          amount: 75000,
          location: 'Chennai',
          created_at: '2024-06-08'
        }
      ];
      setReservations(mockReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load reservation data.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(res => res.status === filter);

  const stats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    pending: reservations.filter(r => r.status === 'pending').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
    totalRevenue: reservations
      .filter(r => r.status === 'confirmed')
      .reduce((sum, r) => sum + r.amount, 0)
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservations Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage all platform reservations
            </p>
          </div>
          <Button variant="outline" onClick={fetchReservations} disabled={loading}>
            Refresh
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              <Users className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </Button>
          <Button 
            variant={filter === 'confirmed' ? 'default' : 'outline'} 
            onClick={() => setFilter('confirmed')}
          >
            Confirmed ({stats.confirmed})
          </Button>
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'} 
            onClick={() => setFilter('pending')}
          >
            Pending ({stats.pending})
          </Button>
          <Button 
            variant={filter === 'cancelled' ? 'default' : 'outline'} 
            onClick={() => setFilter('cancelled')}
          >
            Cancelled ({stats.cancelled})
          </Button>
        </div>

        {/* Reservations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reservations ({filteredReservations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="text-muted-foreground">Loading reservations...</div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{reservation.customerName}</div>
                          <div className="text-sm text-muted-foreground">{reservation.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{reservation.venueName}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {reservation.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{reservation.eventType}</TableCell>
                      <TableCell>
                        <div>
                          <div>{formatDate(reservation.date)}</div>
                          <div className="text-sm text-muted-foreground">{reservation.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>{reservation.guests}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(reservation.amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(reservation.status)}>
                          {reservation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(reservation.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ManageReservations;
