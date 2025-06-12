
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  Sparkles,
  ArrowRight,
  ChefHat,
  Camera,
  Music
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventPlanner: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    guestCount: '',
    budget: '',
    location: '',
    date: '',
    time: '',
    theme: '',
    specialRequests: ''
  });

  const eventTypes = [
    { value: 'wedding', label: 'Wedding', icon: <Sparkles className="h-4 w-4" /> },
    { value: 'birthday', label: 'Birthday Party', icon: <Calendar className="h-4 w-4" /> },
    { value: 'corporate', label: 'Corporate Event', icon: <Users className="h-4 w-4" /> },
    { value: 'anniversary', label: 'Anniversary', icon: <Sparkles className="h-4 w-4" /> },
    { value: 'reception', label: 'Reception', icon: <ChefHat className="h-4 w-4" /> },
    { value: 'conference', label: 'Conference', icon: <Users className="h-4 w-4" /> }
  ];

  const themes = [
    'Royal Elegance', 'Garden Paradise', 'Modern Minimalist', 'Vintage Classic',
    'Bohemian Chic', 'Industrial Modern', 'Tropical Paradise', 'Winter Wonderland'
  ];

  const budgetRanges = [
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000 - ₹5,00,000',
    '₹5,00,000+'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.eventType || !formData.guestCount || !formData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Event Plan Created!",
      description: "We're finding the perfect venues for your event.",
    });

    navigate('/booking-confirmation', { state: { eventData: formData } });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-[#0C0C0C] mb-4">What type of event are you planning?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {eventTypes.map((type) => (
            <Button
              key={type.value}
              variant={formData.eventType === type.value ? "default" : "outline"}
              className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                formData.eventType === type.value 
                  ? 'bg-[#8B0000] text-[#FFF5E1]' 
                  : 'border-[#D4AF37] text-[#0C0C0C] hover:bg-[#D4AF37]/10'
              }`}
              onClick={() => handleInputChange('eventType', type.value)}
            >
              {type.icon}
              <span>{type.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="guestCount">Number of Guests *</Label>
          <Input
            id="guestCount"
            type="number"
            placeholder="e.g. 50"
            value={formData.guestCount}
            onChange={(e) => handleInputChange('guestCount', e.target.value)}
            className="border-[#D4AF37]"
          />
        </div>

        <div>
          <Label htmlFor="budget">Budget Range *</Label>
          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
            <SelectTrigger className="border-[#D4AF37]">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="location">Preferred Location</Label>
          <Input
            id="location"
            placeholder="e.g. Mumbai, Delhi"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="border-[#D4AF37]"
          />
        </div>

        <div>
          <Label htmlFor="date">Event Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="border-[#D4AF37]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="time">Preferred Time</Label>
          <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
            <SelectTrigger className="border-[#D4AF37]">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
              <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
              <SelectItem value="night">Night (8 PM - 12 AM)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="theme">Theme Preference</Label>
          <Select value={formData.theme} onValueChange={(value) => handleInputChange('theme', value)}>
            <SelectTrigger className="border-[#D4AF37]">
              <SelectValue placeholder="Choose a theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme} value={theme}>{theme}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="specialRequests">Special Requests or Requirements</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any specific requirements, dietary restrictions, accessibility needs, etc."
          value={formData.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          className="border-[#D4AF37] min-h-[120px]"
        />
      </div>

      <div className="bg-[#D4AF37]/10 p-6 rounded-lg">
        <h4 className="font-semibold text-[#0C0C0C] mb-4">Event Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Event Type:</span>
            <Badge className="bg-[#8B0000] text-[#FFF5E1]">
              {eventTypes.find(t => t.value === formData.eventType)?.label || 'Not selected'}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Guests:</span>
            <span>{formData.guestCount || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span>Budget:</span>
            <span>{formData.budget || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span>Location:</span>
            <span>{formData.location || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{formData.date || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span>Theme:</span>
            <span>{formData.theme || 'Not specified'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#FFF5E1] mb-4">
              <Sparkles className="inline mr-3 h-8 w-8 text-[#D4AF37]" />
              Event Planner
            </h1>
            <p className="text-xl text-[#FFF5E1]/90">
              Let us help you plan the perfect event
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step 
                      ? 'bg-[#8B0000] text-[#FFF5E1]' 
                      : 'bg-[#2F2F2F]/20 text-[#2F2F2F]'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 ml-4 ${
                      currentStep > step ? 'bg-[#8B0000]' : 'bg-[#2F2F2F]/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-4xl mx-auto border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-[#0C0C0C]">
                Step {currentStep} of 3: {
                  currentStep === 1 ? 'Event Details' :
                  currentStep === 2 ? 'Date & Preferences' :
                  'Review & Submit'
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-[#2F2F2F] text-[#2F2F2F]"
                >
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#0C0C0C]"
                  >
                    Create Event Plan
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventPlanner;
