
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Wand2, Download, Eye, Sparkles, Calendar, Users, DollarSign, MapPin, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventPlan {
  eventType: string;
  guestCount: number;
  budget: number;
  theme: string;
  venue: string;
  catering: string;
  decoration: string;
  entertainment: string;
  totalCost: number;
  venueRecommendations: VenueRecommendation[];
}

interface VenueRecommendation {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  rating: number;
  image: string;
  features: string[];
}

const RealtimeEventPlanner: React.FC = () => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    eventType: '',
    guestCount: 0,
    budget: 0,
    theme: '',
    cuisine: '',
    venueType: '',
    specialRequests: ''
  });
  const [generatedPlan, setGeneratedPlan] = useState<EventPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const eventTypes = [
    { value: 'wedding', label: 'Wedding Ceremony', icon: '💒' },
    { value: 'birthday', label: 'Birthday Party', icon: '🎂' },
    { value: 'corporate', label: 'Corporate Event', icon: '🏢' },
    { value: 'anniversary', label: 'Anniversary', icon: '💕' },
    { value: 'conference', label: 'Conference', icon: '📊' },
    { value: 'reception', label: 'Reception Party', icon: '🥂' }
  ];

  const themes = [
    { value: 'royal', label: 'Royal Elegance', colors: ['#FFD700', '#8B0000'] },
    { value: 'garden', label: 'Garden Paradise', colors: ['#90EE90', '#FFB6C1'] },
    { value: 'modern', label: 'Modern Chic', colors: ['#2F4F4F', '#C0C0C0'] },
    { value: 'vintage', label: 'Vintage Charm', colors: ['#DEB887', '#CD853F'] },
    { value: 'bollywood', label: 'Bollywood Glamour', colors: ['#FF6347', '#FFD700'] }
  ];

  const generateAIPlan = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const plan: EventPlan = {
        eventType: eventData.eventType,
        guestCount: eventData.guestCount,
        budget: eventData.budget,
        theme: themes.find(t => t.value === eventData.theme)?.label || 'Custom',
        venue: getVenueRecommendation(),
        catering: getCateringRecommendation(),
        decoration: getDecorationRecommendation(),
        entertainment: getEntertainmentRecommendation(),
        totalCost: eventData.budget,
        venueRecommendations: getVenueRecommendations()
      };
      
      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 3000);
  };

  const getVenueRecommendation = () => {
    const venues = {
      wedding: 'Royal Garden Palace - Premium Banquet Hall',
      birthday: 'Celebration Lounge - Party Venue',
      corporate: 'Business Conference Center',
      anniversary: 'Romantic Garden Venue',
      conference: 'Executive Conference Hall',
      reception: 'Grand Reception Ballroom'
    };
    return venues[eventData.eventType as keyof typeof venues] || 'Premium Event Venue';
  };

  const getCateringRecommendation = () => {
    const budgetPerPerson = eventData.budget / eventData.guestCount;
    if (budgetPerPerson > 2000) return 'Premium Multi-Cuisine Buffet with Live Counters';
    if (budgetPerPerson > 1000) return 'Deluxe Buffet with Regional Specialties';
    return 'Standard Buffet with Popular Dishes';
  };

  const getDecorationRecommendation = () => {
    const decorations = {
      royal: 'Gold & Maroon Theme with Crystal Chandeliers',
      garden: 'Fresh Floral Arrangements with Fairy Lights',
      modern: 'Minimalist Design with LED Ambiance',
      vintage: 'Classic Decor with Antique Elements',
      bollywood: 'Vibrant Colors with Traditional Elements'
    };
    return decorations[eventData.theme as keyof typeof decorations] || 'Custom Theme Decoration';
  };

  const getEntertainmentRecommendation = () => {
    const entertainment = {
      wedding: 'Live Band + DJ + Traditional Performers',
      birthday: 'DJ + Photo Booth + Games',
      corporate: 'Professional MC + Award Ceremony Setup',
      anniversary: 'Live Musicians + Romantic Ambiance',
      conference: 'Professional AV Setup + Presentation Tools',
      reception: 'Live Band + Dance Floor + Light Show'
    };
    return entertainment[eventData.eventType as keyof typeof entertainment] || 'Custom Entertainment';
  };

  const getVenueRecommendations = (): VenueRecommendation[] => {
    return [
      {
        id: '1',
        name: 'Royal Garden Palace',
        location: 'Bandra West, Mumbai',
        capacity: 500,
        price: 150000,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=400',
        features: ['Garden Setting', 'AC Banquet', 'Parking', 'Catering Kitchen']
      },
      {
        id: '2',
        name: 'Grand Ballroom',
        location: 'Juhu, Mumbai',
        capacity: 300,
        price: 120000,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400',
        features: ['Indoor Hall', 'Modern AV', 'Bridal Room', 'Valet Parking']
      },
      {
        id: '3',
        name: 'Riverside Pavilion',
        location: 'Powai, Mumbai',
        capacity: 200,
        price: 80000,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
        features: ['Waterfront View', 'Outdoor Setup', 'Decoration Included', 'Photography Zone']
      }
    ];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    if (step === 4) generateAIPlan();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">AI Event Planning Wizard</h3>
            <Badge variant="secondary">Step {step} of 4</Badge>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded ${
                  s <= step ? 'bg-[#8B0000]' : 'bg-[#2F2F2F]/20'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Event Type */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#8B0000]" />
              What type of event are you planning?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {eventTypes.map((type) => (
                <div
                  key={type.value}
                  onClick={() => setEventData({...eventData, eventType: type.value})}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    eventData.eventType === type.value
                      ? 'border-[#8B0000] bg-[#8B0000]/10'
                      : 'border-[#2F2F2F]/20 hover:border-[#D4AF37]'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-medium">{type.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Guest Count & Budget */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#8B0000]" />
              Event Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="guestCount">Number of Guests</Label>
              <Input
                type="number"
                value={eventData.guestCount}
                onChange={(e) => setEventData({...eventData, guestCount: parseInt(e.target.value)})}
                placeholder="Enter guest count"
                className="border-[#D4AF37]"
              />
            </div>
            <div>
              <Label htmlFor="budget">Total Budget (₹)</Label>
              <Input
                type="number"
                value={eventData.budget}
                onChange={(e) => setEventData({...eventData, budget: parseInt(e.target.value)})}
                placeholder="Enter your budget"
                className="border-[#D4AF37]"
              />
            </div>
            <div>
              <Label htmlFor="venueType">Venue Preference</Label>
              <Select value={eventData.venueType} onValueChange={(value) => 
                setEventData({...eventData, venueType: value})
              }>
                <SelectTrigger className="border-[#D4AF37]">
                  <SelectValue placeholder="Select venue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banquet">Indoor Banquet Hall</SelectItem>
                  <SelectItem value="garden">Garden/Outdoor</SelectItem>
                  <SelectItem value="hotel">Hotel Conference Room</SelectItem>
                  <SelectItem value="resort">Resort/Farmhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Theme & Cuisine */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#8B0000]" />
              Theme & Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Theme</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {themes.map((theme) => (
                  <div
                    key={theme.value}
                    onClick={() => setEventData({...eventData, theme: theme.value})}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      eventData.theme === theme.value
                        ? 'border-[#8B0000] bg-[#8B0000]/10'
                        : 'border-[#2F2F2F]/20 hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="font-medium mb-2">{theme.label}</div>
                    <div className="flex space-x-2">
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="cuisine">Cuisine Preference</Label>
              <Select value={eventData.cuisine} onValueChange={(value) => 
                setEventData({...eventData, cuisine: value})
              }>
                <SelectTrigger className="border-[#D4AF37]">
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indian">Indian Traditional</SelectItem>
                  <SelectItem value="multi">Multi-Cuisine</SelectItem>
                  <SelectItem value="continental">Continental</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="custom">Custom Menu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                value={eventData.specialRequests}
                onChange={(e) => setEventData({...eventData, specialRequests: e.target.value})}
                placeholder="Any special requirements, dietary restrictions, or preferences..."
                className="border-[#D4AF37]"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review & Generate */}
      {step === 4 && !generatedPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-[#8B0000]" />
              Review Your Event Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Event Type</Label>
                  <p className="font-medium">{eventTypes.find(t => t.value === eventData.eventType)?.label}</p>
                </div>
                <div>
                  <Label>Guest Count</Label>
                  <p className="font-medium">{eventData.guestCount} guests</p>
                </div>
                <div>
                  <Label>Budget</Label>
                  <p className="font-medium">{formatCurrency(eventData.budget)}</p>
                </div>
                <div>
                  <Label>Theme</Label>
                  <p className="font-medium">{themes.find(t => t.value === eventData.theme)?.label}</p>
                </div>
              </div>
              {eventData.specialRequests && (
                <div>
                  <Label>Special Requests</Label>
                  <p className="text-sm text-[#2F2F2F]">{eventData.specialRequests}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      {!generatedPlan && (
        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={step === 1}
            variant="outline"
            className="border-[#8B0000] text-[#8B0000]"
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={
              (step === 1 && !eventData.eventType) ||
              (step === 2 && (!eventData.guestCount || !eventData.budget)) ||
              (step === 3 && !eventData.theme)
            }
            className="bg-[#8B0000] hover:bg-[#660000]"
          >
            {step === 4 ? (
              isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Generating AI Plan...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate AI Plan
                </>
              )
            ) : (
              'Next'
            )}
          </Button>
        </div>
      )}

      {/* Generated Plan */}
      {generatedPlan && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                  Your AI-Generated Event Plan
                </span>
                <Badge className="bg-[#D4AF37] text-[#0C0C0C]">
                  Ready to Book
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#8B0000] mb-2">Event Overview</h4>
                  <div className="space-y-2">
                    <p><strong>Theme:</strong> {generatedPlan.theme}</p>
                    <p><strong>Venue:</strong> {generatedPlan.venue}</p>
                    <p><strong>Catering:</strong> {generatedPlan.catering}</p>
                    <p><strong>Entertainment:</strong> {generatedPlan.entertainment}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-[#8B0000] mb-2">Investment Summary</h4>
                  <div className="space-y-2">
                    <p><strong>Total Budget:</strong> {formatCurrency(generatedPlan.totalCost)}</p>
                    <p><strong>Per Guest:</strong> {formatCurrency(generatedPlan.totalCost / eventData.guestCount)}</p>
                    <p><strong>Decoration:</strong> {generatedPlan.decoration}</p>
                  </div>
                </div>
              </div>

              {/* Venue Recommendations */}
              <div>
                <h4 className="font-semibold text-[#8B0000] mb-4">Recommended Venues</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {generatedPlan.venueRecommendations.map((venue) => (
                    <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={venue.image} 
                        alt={venue.name}
                        className="w-full h-32 object-cover"
                      />
                      <CardContent className="p-4">
                        <h5 className="font-semibold mb-1">{venue.name}</h5>
                        <div className="flex items-center gap-1 mb-2">
                          <MapPin className="h-3 w-3 text-[#2F2F2F]" />
                          <span className="text-sm text-[#2F2F2F]">{venue.location}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Capacity: {venue.capacity}</span>
                          <span className="font-semibold text-[#8B0000]">{formatCurrency(venue.price)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {venue.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/3d-preview" className="flex-1">
                  <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#0C0C0C]">
                    <Camera className="h-4 w-4 mr-2" />
                    View in 3D Preview
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1 border-[#8B0000] text-[#8B0000]">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Plan
                </Button>
                <Button className="flex-1 bg-[#8B0000] hover:bg-[#660000]">
                  Book This Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RealtimeEventPlanner;
