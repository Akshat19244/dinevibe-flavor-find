
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Users,
  CreditCard,
  MapPin,
  UtensilsCrossed,
  PartyPopper,
  Calendar
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Reservation: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [guests, setGuests] = useState('2');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [specialDish, setSpecialDish] = useState('');
  const [decoration, setDecoration] = useState('');
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // List of event types
  const eventTypes = [
    'Birthday', 
    'Anniversary', 
    'Corporate', 
    'Dating', 
    'Family Gathering', 
    'Graduation', 
    'Casual Dining'
  ];
  
  // Locations in Ahmedabad
  const locations = [
    'Navrangpura',
    'Bodakdev',
    'Thaltej',
    'Satellite',
    'Vastrapur',
    'Bopal',
    'SG Highway',
    'CG Road',
    'Paldi',
    'Gurukul'
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create a reservation
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      toast({
        title: "Reservation Created Successfully!",
        description: "Your booking request has been sent to the restaurant.",
      });
      
      // In a full implementation, we would save reservation to database and redirect to confirmation
      navigate('/user/bookings');
    } catch (error) {
      toast({
        title: "Error Creating Reservation",
        description: "There was a problem creating your reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-dineVibe-background">
      <Navbar userType="customer" userName="John" />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-secondary py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Make a Reservation</h1>
            <p className="text-white text-opacity-90">
              Book your special dining experience with us
            </p>
          </div>
        </div>
        
        {/* Reservation form */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-card border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Reservation Details</CardTitle>
                  <CardDescription>Fill in the details to make your reservation</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary"
                      />
                    </div>
                    
                    {/* Number of Guests */}
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <div className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-dineVibe-primary" />
                        <Select
                          value={guests}
                          onValueChange={setGuests}
                        >
                          <SelectTrigger className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary">
                            <SelectValue placeholder="Select number of guests" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gray-700">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'Person' : 'People'}
                              </SelectItem>
                            ))}
                            <SelectItem value="more">10+ People</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Budget */}
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Per Person (₹)</Label>
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-dineVibe-primary" />
                        <Select
                          value={budget}
                          onValueChange={setBudget}
                        >
                          <SelectTrigger className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary">
                            <SelectValue placeholder="Select your budget" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gray-700">
                            <SelectItem value="budget">Under ₹500</SelectItem>
                            <SelectItem value="mid">₹500 - ₹1000</SelectItem>
                            <SelectItem value="premium">₹1000 - ₹2000</SelectItem>
                            <SelectItem value="luxury">Above ₹2000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Date */}
                    <div className="space-y-2">
                      <Label htmlFor="date">Reservation Date</Label>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-dineVibe-primary" />
                        <Input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                          className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary"
                        />
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-dineVibe-primary" />
                        <Select
                          value={location}
                          onValueChange={setLocation}
                        >
                          <SelectTrigger className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary">
                            <SelectValue placeholder="Select area in Ahmedabad" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gray-700">
                            {locations.map((loc) => (
                              <SelectItem key={loc} value={loc}>
                                {loc}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Event Type */}
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type</Label>
                      <div className="flex items-center">
                        <PartyPopper className="mr-2 h-5 w-5 text-dineVibe-primary" />
                        <Select
                          value={eventType}
                          onValueChange={setEventType}
                        >
                          <SelectTrigger className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-gray-700">
                            {eventTypes.map((type) => (
                              <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Special Dish Request */}
                    <div className="space-y-2">
                      <Label htmlFor="specialDish">Special Dish Request (Optional)</Label>
                      <div className="flex items-center">
                        <UtensilsCrossed className="mr-2 h-5 w-5 text-dineVibe-primary" />
                        <Input
                          id="specialDish"
                          placeholder="Any special dish requests?"
                          value={specialDish}
                          onChange={(e) => setSpecialDish(e.target.value)}
                          className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary"
                        />
                      </div>
                    </div>
                    
                    {/* Decoration */}
                    <div className="space-y-2">
                      <Label htmlFor="decoration">Decoration Preferences (Optional)</Label>
                      <Textarea
                        id="decoration"
                        placeholder="Any specific decoration requirements?"
                        value={decoration}
                        onChange={(e) => setDecoration(e.target.value)}
                        className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Submit Reservation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Information card */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-dineVibe-primary to-dineVibe-secondary text-white border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Reservation Information</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">How it works</h3>
                    <ul className="space-y-2 list-disc list-inside text-white/90">
                      <li>Fill out the reservation form with your details</li>
                      <li>Restaurant receives your request and confirms availability</li>
                      <li>Receive a confirmation notification with your booking details</li>
                      <li>Present your booking token at the restaurant</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Special Requests</h3>
                    <p className="text-white/90">
                      Feel free to include any special requests for dishes or decorations. 
                      Our restaurant partners will do their best to accommodate your needs.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Cancellation Policy</h3>
                    <p className="text-white/90">
                      Reservations can be canceled or modified up to 24 hours before the scheduled time without charges.
                      Late cancellations may incur a fee depending on the restaurant's policy.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-sm text-white/80">
                      Need help with your reservation?
                    </p>
                    <p className="font-semibold">
                      Contact us at: 9904960670
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reservation;
