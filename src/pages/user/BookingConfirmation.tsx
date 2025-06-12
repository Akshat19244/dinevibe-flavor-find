
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  Star,
  Phone,
  Mail,
  ArrowRight,
  Download
} from 'lucide-react';

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const [eventData, setEventData] = useState<any>(null);
  const [recommendedVenues, setRecommendedVenues] = useState([]);

  useEffect(() => {
    // Get event data from navigation state
    if (location.state?.eventData) {
      setEventData(location.state.eventData);
      
      // Simulate finding recommended venues based on event data
      const venues = [
        {
          id: '1',
          name: 'The Royal Palace',
          image: 'https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=800',
          rating: 4.9,
          price: '₹1,25,000',
          location: 'Mumbai Central',
          capacity: '200-500 guests',
          features: ['Royal Decor', 'Premium Catering', 'Valet Parking', 'Live Music Setup']
        },
        {
          id: '2',
          name: 'Garden Paradise',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
          rating: 4.7,
          price: '₹85,000',
          location: 'Delhi NCR',
          capacity: '100-300 guests',
          features: ['Garden Setting', 'Natural Ambiance', 'Outdoor Setup', 'Photography Areas']
        },
        {
          id: '3',
          name: 'Modern Events Hub',
          image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800',
          rating: 4.8,
          price: '₹95,000',
          location: 'Bangalore',
          capacity: '150-400 guests',
          features: ['Modern Design', 'Tech Setup', 'AC Banquet', 'Premium Service']
        }
      ];
      setRecommendedVenues(venues);
    }
  }, [location.state]);

  if (!eventData) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-[#0C0C0C] mb-4">No Event Data Found</h2>
              <p className="text-[#2F2F2F] mb-6">Please start by planning your event.</p>
              <Link to="/event-planner">
                <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                  Plan New Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#FFF5E1]">
                Event Plan Created!
              </h1>
            </div>
            <p className="text-xl text-[#FFF5E1]/90">
              We've found the perfect venues for your {eventData.eventType} event
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Event Summary */}
          <Card className="mb-8 border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-[#0C0C0C]">Your Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-[#8B0000]" />
                  <div>
                    <p className="font-semibold text-[#0C0C0C]">Date & Time</p>
                    <p className="text-[#2F2F2F]">{eventData.date || 'Flexible'}</p>
                    <p className="text-[#2F2F2F]">{eventData.time || 'Flexible'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-[#8B0000]" />
                  <div>
                    <p className="font-semibold text-[#0C0C0C]">Guest Count</p>
                    <p className="text-[#2F2F2F]">{eventData.guestCount} people</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-6 w-6 text-[#8B0000]" />
                  <div>
                    <p className="font-semibold text-[#0C0C0C]">Budget</p>
                    <p className="text-[#2F2F2F]">{eventData.budget}</p>
                  </div>
                </div>
              </div>
              
              {eventData.location && (
                <div className="mt-4 flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-[#8B0000]" />
                  <div>
                    <p className="font-semibold text-[#0C0C0C]">Preferred Location</p>
                    <p className="text-[#2F2F2F]">{eventData.location}</p>
                  </div>
                </div>
              )}
              
              {eventData.theme && (
                <div className="mt-4">
                  <p className="font-semibold text-[#0C0C0C] mb-2">Theme</p>
                  <Badge className="bg-[#D4AF37] text-[#0C0C0C]">{eventData.theme}</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Venues */}
          <h2 className="text-2xl font-bold text-[#0C0C0C] mb-6">Recommended Venues</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {recommendedVenues.map((venue: any) => (
              <Card key={venue.id} className="border-[#D4AF37] hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{venue.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#0C0C0C] mb-2">{venue.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-[#2F2F2F]">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{venue.location}</span>
                    </div>
                    <div className="flex items-center text-[#2F2F2F]">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{venue.capacity}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-[#0C0C0C] mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {venue.features.slice(0, 2).map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {venue.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{venue.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#8B0000]">{venue.price}</div>
                    <div className="space-x-2">
                      <Link to="/3d-preview">
                        <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                          View 3D
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Steps */}
          <Card className="border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-[#0C0C0C]">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#8B0000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-[#8B0000]" />
                  </div>
                  <h3 className="font-semibold text-[#0C0C0C] mb-2">Contact Venues</h3>
                  <p className="text-sm text-[#2F2F2F] mb-4">
                    Our team will contact you within 24 hours to discuss venue availability and pricing.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-semibold text-[#0C0C0C] mb-2">Schedule Visit</h3>
                  <p className="text-sm text-[#2F2F2F] mb-4">
                    Book site visits to your shortlisted venues and finalize your choice.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#8B0000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-[#8B0000]" />
                  </div>
                  <h3 className="font-semibold text-[#0C0C0C] mb-2">Confirm Booking</h3>
                  <p className="text-sm text-[#2F2F2F] mb-4">
                    Complete your booking with advance payment and detailed planning.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mt-8">
                <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                  <Download className="h-4 w-4 mr-2" />
                  Download Event Plan
                </Button>
                <Link to="/user/my-bookings">
                  <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                    View My Bookings
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
