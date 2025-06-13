
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  Mail,
  Download,
  Share2,
  QrCode
} from 'lucide-react';

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const booking = location.state?.booking || JSON.parse(localStorage.getItem('currentBooking') || '{}');

  if (!booking.token) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0C0C0C] mb-4">No booking found</h2>
            <Link to="/dining">
              <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                Start New Booking
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
          <div className="container mx-auto px-4 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-white" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-white/90">
              Your reservation has been submitted successfully
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-[#D4AF37] mb-8">
              <CardHeader className="bg-[#8B0000] text-[#FFF5E1]">
                <CardTitle className="text-center">
                  Booking Token: {booking.token}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Venue:</span>
                    <span>{booking.venue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Guest Name:</span>
                    <span>{booking.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Event Type:</span>
                    <Badge className="bg-[#D4AF37] text-[#0C0C0C]">
                      {booking.eventType}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Date:</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {booking.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Time:</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {booking.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Guests:</span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {booking.guests}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Pending Confirmation
                    </Badge>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="mt-6 p-4 bg-[#FFF5E1] rounded-lg border border-[#D4AF37]">
                    <h4 className="font-medium mb-2">Special Requests:</h4>
                    <p className="text-sm text-[#2F2F2F]">{booking.specialRequests}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                <QrCode className="h-4 w-4 mr-2" />
                Show QR Code
              </Button>
              <Button variant="outline" className="border-[#2F2F2F] text-[#2F2F2F]">
                <Share2 className="h-4 w-4 mr-2" />
                Share Booking
              </Button>
            </div>

            <Card className="border-[#D4AF37]">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C]">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#8B0000] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <p>The venue owner will review your booking request within 2-4 hours</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#8B0000] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <p>You'll receive an email and SMS confirmation once approved</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#8B0000] text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <p>Present your booking token when you arrive at the venue</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Link to="/user/my-bookings">
                <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] mr-4">
                  View My Bookings
                </Button>
              </Link>
              <Link to="/dining">
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                  Book Another Table
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
