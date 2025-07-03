import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { createQueryRequest } from '@/services/queryService';
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar, 
  IndianRupee,
  Sparkles,
  Building2,
  Utensils,
  Music,
  Camera,
  Wifi,
  Car,
  Shield,
  Zap,
  ArrowRight,
  Filter,
  CheckCircle
} from 'lucide-react';

const EnhancedSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [searchData, setSearchData] = useState({
    eventType: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    guestCount: searchParams.get('guests') || '',
    eventDate: searchParams.get('date') || '',
    budgetMin: '',
    budgetMax: '',
    eventTime: '',
    specialRequirements: ''
  });

  const [prerequisites, setPrerequisites] = useState<string[]>([]);

  const eventTypes = [
    'Wedding', 'Corporate Event', 'Birthday Party', 'Conference', 
    'Anniversary', 'Baby Shower', 'Engagement', 'Product Launch',
    'Team Building', 'Seminar', 'Workshop', 'Networking Event'
  ];

  const prerequisiteOptions = [
    // Venue Setup
    { category: 'Venue Setup', options: [
      { id: 'indoor_only', label: 'Indoor Only', icon: Building2 },
      { id: 'open_lawn', label: 'Open Lawn', icon: Building2 },
      { id: 'ac_banquet', label: 'AC Banquet Hall', icon: Building2 },
      { id: 'dj_setup', label: 'DJ Setup Available', icon: Music }
    ]},
    
    // Catering
    { category: 'Catering', options: [
      { id: 'pure_veg', label: 'Pure Vegetarian', icon: Utensils },
      { id: 'jain_food', label: 'Jain Food', icon: Utensils },
      { id: 'multi_cuisine', label: 'Multi-Cuisine', icon: Utensils },
      { id: 'live_counters', label: 'Live Cooking Counters', icon: Utensils }
    ]},
    
    // Event Type Needs
    { category: 'Event Setup', options: [
      { id: 'stage_setup', label: 'Stage Setup', icon: Camera },
      { id: 'flower_decoration', label: 'Flower Decoration', icon: Sparkles },
      { id: 'led_screens', label: 'LED Screens', icon: Camera },
      { id: 'sound_system', label: 'Professional Sound System', icon: Music }
    ]},
    
    // Tech Requirements
    { category: 'Technology', options: [
      { id: 'wifi', label: 'High-Speed Wi-Fi', icon: Wifi },
      { id: 'drone_coverage', label: 'Drone Coverage Allowed', icon: Camera },
      { id: 'charging_stations', label: 'Phone Charging Stations', icon: Zap },
      { id: 'live_streaming', label: 'Live Streaming Setup', icon: Camera }
    ]},
    
    // Accessibility & Safety
    { category: 'Accessibility & Safety', options: [
      { id: 'wheelchair_access', label: 'Wheelchair Accessible', icon: Shield },
      { id: 'parking_space', label: 'Ample Parking', icon: Car },
      { id: 'fire_license', label: 'Fire Safety Licensed', icon: Shield },
      { id: 'security', label: 'Security Personnel', icon: Shield }
    ]}
  ];

  const budgetRanges = [
    { label: 'Under ₹50,000', min: 0, max: 50000 },
    { label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
    { label: '₹1,00,000 - ₹2,50,000', min: 100000, max: 250000 },
    { label: '₹2,50,000 - ₹5,00,000', min: 250000, max: 500000 },
    { label: '₹5,00,000 - ₹10,00,000', min: 500000, max: 1000000 },
    { label: 'Above ₹10,00,000', min: 1000000, max: null }
  ];

  const handlePrerequisiteChange = (prerequisiteId: string, checked: boolean) => {
    if (checked) {
      setPrerequisites([...prerequisites, prerequisiteId]);
    } else {
      setPrerequisites(prerequisites.filter(id => id !== prerequisiteId));
    }
  };

  const handleSubmitQuery = async () => {
    if (!searchData.eventType || !searchData.location || !searchData.guestCount || !searchData.eventDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields to create your query.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const queryRequest = await createQueryRequest({
        event_type: searchData.eventType,
        location: searchData.location,
        guest_count: parseInt(searchData.guestCount),
        budget_min: searchData.budgetMin ? parseInt(searchData.budgetMin) : undefined,
        budget_max: searchData.budgetMax ? parseInt(searchData.budgetMax) : undefined,
        event_date: searchData.eventDate,
        event_time: searchData.eventTime || undefined,
        special_requirements: [
          ...prerequisites,
          searchData.specialRequirements
        ].filter(Boolean).join(', ')
      });

      toast({
        title: 'Query Created Successfully!',
        description: `Your query token is ${queryRequest.query_token}. Vendors will respond within 24 hours.`
      });

      navigate(`/user/query-status/${queryRequest.query_token}`);
    } catch (error) {
      toast({
        title: 'Failed to Create Query',
        description: 'Please try again or contact support.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Event Venue
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tell us about your event and get instant quotes from verified vendors
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Basic Information */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Search className="w-6 h-6 text-blue-600" />
                Event Details
              </CardTitle>
              <CardDescription>
                Share the basic information about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Event Type *</Label>
                  <Select 
                    value={searchData.eventType} 
                    onValueChange={(value) => setSearchData({ ...searchData, eventType: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      placeholder="City, Area, Venue Name"
                      value={searchData.location}
                      onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                      className="pl-11 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Number of Guests *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      type="number"
                      placeholder="e.g., 100"
                      value={searchData.guestCount}
                      onChange={(e) => setSearchData({ ...searchData, guestCount: e.target.value })}
                      className="pl-11 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Event Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      type="date"
                      value={searchData.eventDate}
                      onChange={(e) => setSearchData({ ...searchData, eventDate: e.target.value })}
                      className="pl-11 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Event Time (Optional)</Label>
                  <Input 
                    type="time"
                    value={searchData.eventTime}
                    onChange={(e) => setSearchData({ ...searchData, eventTime: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Budget Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        type="number"
                        placeholder="Min budget"
                        value={searchData.budgetMin}
                        onChange={(e) => setSearchData({ ...searchData, budgetMin: e.target.value })}
                        className="pl-9 h-12"
                      />
                    </div>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        type="number"
                        placeholder="Max budget"
                        value={searchData.budgetMax}
                        onChange={(e) => setSearchData({ ...searchData, budgetMax: e.target.value })}
                        className="pl-9 h-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Budget Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Or choose a budget range:</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {budgetRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchData({
                        ...searchData,
                        budgetMin: range.min.toString(),
                        budgetMax: range.max?.toString() || ''
                      })}
                      className="p-3 text-sm border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Filter className="w-6 h-6 text-purple-600" />
                Event Requirements
              </CardTitle>
              <CardDescription>
                Select specific requirements for your event (optional but recommended)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {prerequisiteOptions.map((category) => (
                <div key={category.category} className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-800 border-b border-slate-200 pb-2">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.options.map((option) => {
                      const Icon = option.icon;
                      const isSelected = prerequisites.includes(option.id);
                      
                      return (
                        <div
                          key={option.id}
                          className={`
                            flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                            ${isSelected 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }
                          `}
                          onClick={() => handlePrerequisiteChange(option.id, !isSelected)}
                        >
                          <Checkbox 
                            checked={isSelected}
                            onChange={() => {}}
                            className="pointer-events-none"
                          />
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
                          <span className={`font-medium ${isSelected ? 'text-blue-800' : 'text-slate-700'}`}>
                            {option.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Additional Requirements */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="w-6 h-6 text-green-600" />
                Additional Requirements
              </CardTitle>
              <CardDescription>
                Any specific requirements or special requests for your event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Tell us about any specific requirements, decorations, special arrangements, dietary restrictions, or other details that would help vendors provide better quotes..."
                value={searchData.specialRequirements}
                onChange={(e) => setSearchData({ ...searchData, specialRequirements: e.target.value })}
                className="min-h-32 resize-none"
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Quotes?</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Submit your requirements and get responses from verified vendors within 24 hours
              </p>
              
              {/* Selected Requirements Summary */}
              {prerequisites.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-blue-100 mb-3">Selected Requirements:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {prerequisites.slice(0, 8).map((prereq) => {
                      const option = prerequisiteOptions
                        .flatMap(cat => cat.options)
                        .find(opt => opt.id === prereq);
                      return (
                        <Badge key={prereq} variant="secondary" className="bg-white/20 text-white border-white/30">
                          {option?.label}
                        </Badge>
                      );
                    })}
                    {prerequisites.length > 8 && (
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        +{prerequisites.length - 8} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <Button 
                onClick={handleSubmitQuery}
                disabled={loading}
                className="px-12 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl shadow-lg text-lg h-auto"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Creating Query...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Send Query to Vendors
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
              
              <p className="text-xs text-blue-100 mt-4">
                You'll receive a unique query token to track responses
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearchPage;