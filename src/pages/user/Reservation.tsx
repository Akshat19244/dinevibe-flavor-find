
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
  Calendar,
  Download,
  Share2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Import Supabase client and functions
import { createReservation, getCurrentUser } from '@/lib/supabase';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  
  // Confirmation modal state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState<{
    id: string;
    name: string;
    guests: string;
    budget: string;
    location: string;
    eventType: string;
    date: string;
    specialDish?: string;
    decoration?: string;
  } | null>(null);
  
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
      // Check if user is logged in
      const user = await getCurrentUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to make a reservation.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        navigate('/auth/login');
        return;
      }
      
      // Create reservation in Supabase
      const reservationData = {
        user_id: user.id,
        restaurant_id: null, // Will be assigned by the admin or system later
        guest_count: parseInt(guests),
        budget,
        location,
        event_type: eventType,
        optional_dish: specialDish,
        optional_decoration: decoration,
        booking_date: date
      };
      
      const reservation = await createReservation(reservationData);
      
      // Show success confirmation
      setConfirmationDetails({
        id: reservation.id,
        name: fullName,
        guests,
        budget: getBudgetLabel(budget),
        location,
        eventType: eventType.charAt(0).toUpperCase() + eventType.slice(1),
        date,
        specialDish: specialDish || undefined,
        decoration: decoration || undefined
      });
      
      setShowConfirmation(true);
      
      toast({
        title: "Reservation Created Successfully!",
        description: "Your booking request has been sent.",
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: "Error Creating Reservation",
        description: "There was a problem creating your reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getBudgetLabel = (budgetValue: string) => {
    switch (budgetValue) {
      case 'budget':
        return 'Under ₹500';
      case 'mid':
        return '₹500 - ₹1000';
      case 'premium':
        return '₹1000 - ₹2000';
      case 'luxury':
        return 'Above ₹2000';
      default:
        return '';
    }
  };
  
  const handlePrintToken = () => {
    window.print();
  };
  
  const handleShareToken = () => {
    // In a real implementation, this could generate a shareable link
    toast({
      title: "Share Feature",
      description: "Sharing functionality will be implemented in the future.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-dineVibe-background">
      <Navbar userType="customer" userName={fullName.split(' ')[0] || "Guest"} />
      
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
      
      {/* Confirmation modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-card border-none text-dineVibe-text sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reservation Confirmed!</DialogTitle>
            <DialogDescription>
              Your booking has been successfully created. Please keep this token for your records.
            </DialogDescription>
          </DialogHeader>
          
          {confirmationDetails && (
            <div className="p-6 bg-dineVibe-dark/30 rounded-lg border border-gray-800 print:bg-white print:text-black">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-dineVibe-primary mb-1">DineVibe Reservation</h3>
                  <p className="text-sm text-dineVibe-text/70">Confirmation #{confirmationDetails.id.slice(0, 8)}</p>
                </div>
                <div className="bg-dineVibe-primary text-white text-xs font-semibold px-2 py-1 rounded">
                  CONFIRMED
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="font-medium">Guest Name:</span>
                  <span>{confirmationDetails.name}</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="font-medium">Number of Guests:</span>
                  <span>{confirmationDetails.guests}</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="font-medium">Event Type:</span>
                  <span>{confirmationDetails.eventType}</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="font-medium">Date:</span>
                  <span>{confirmationDetails.date}</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="font-medium">Location:</span>
                  <span>{confirmationDetails.location}</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="font-medium">Budget:</span>
                  <span>{confirmationDetails.budget}</span>
                </div>
                
                {confirmationDetails.specialDish && (
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="font-medium">Special Dish:</span>
                    <span>{confirmationDetails.specialDish}</span>
                  </div>
                )}
                
                {confirmationDetails.decoration && (
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="font-medium">Decoration:</span>
                    <span>{confirmationDetails.decoration}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 text-center text-sm text-dineVibe-text/70">
                <p>Please present this token at the restaurant.</p>
                <p>For any changes, please contact us at 9904960670.</p>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button 
              onClick={handlePrintToken} 
              className="flex-1 gap-2" 
              variant="outline"
            >
              <Download className="h-4 w-4" />
              Print Token
            </Button>
            <Button 
              onClick={handleShareToken} 
              className="flex-1 gap-2 bg-dineVibe-primary hover:bg-dineVibe-primary/90"
            >
              <Share2 className="h-4 w-4" />
              Share Token
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Reservation;
