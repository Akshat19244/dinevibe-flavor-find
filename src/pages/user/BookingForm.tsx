
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, Clock, MapPin, Phone, Mail, FileUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: '',
    venue: location.state?.venue || 'The Royal Banquet'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate booking token
    const token = `DV${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
    
    // Store booking data
    const bookingData = {
      ...formData,
      token,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    
    toast({
      title: "Booking Request Submitted!",
      description: `Your booking token is ${token}. Redirecting to confirmation...`,
    });
    
    setTimeout(() => {
      navigate('/booking-confirmation', { state: { booking: bookingData } });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-[#0C0C0C] py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#FFF5E1] mb-4">
              Complete Your Booking
            </h1>
            <p className="text-[#FFF5E1]/90">
              Fill in your details to secure your reservation at {formData.venue}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-[#D4AF37]">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C] flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#8B0000]" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="border-[#D4AF37] focus:border-[#8B0000]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="border-[#D4AF37] focus:border-[#8B0000]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                        className="border-[#D4AF37] focus:border-[#8B0000]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select value={formData.eventType} onValueChange={(value) => setFormData({...formData, eventType: value})}>
                        <SelectTrigger className="border-[#D4AF37] focus:border-[#8B0000]">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dining">Casual Dining</SelectItem>
                          <SelectItem value="romantic">Romantic Dinner</SelectItem>
                          <SelectItem value="business">Business Meeting</SelectItem>
                          <SelectItem value="celebration">Celebration</SelectItem>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="party">Party</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required
                        className="border-[#D4AF37] focus:border-[#8B0000]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time *</Label>
                      <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
                        <SelectTrigger className="border-[#D4AF37] focus:border-[#8B0000]">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="19:00">7:00 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="guests">Number of Guests *</Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})}
                        required
                        className="border-[#D4AF37] focus:border-[#8B0000]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                      placeholder="Any special requirements, dietary restrictions, or requests..."
                      className="border-[#D4AF37] focus:border-[#8B0000]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] py-3"
                  >
                    Submit Booking Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingForm;
