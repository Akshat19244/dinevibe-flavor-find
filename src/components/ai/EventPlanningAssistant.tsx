
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Wand2, Download, Eye, Sparkles, Calendar, Users, DollarSign } from 'lucide-react';
import { eventPlanningAI, EventRequirements, EventPlan } from '@/lib/ai/eventPlanningAI';
import Preview3D from '@/components/ui/3d-preview';

const EventPlanningAssistant: React.FC = () => {
  const [requirements, setRequirements] = useState<Partial<EventRequirements>>({
    eventType: 'wedding',
    budget: 100000,
    guestCount: 50,
    preferredColors: ['gold', 'red'],
    style: 'royal',
    venueType: 'banquet_hall',
    duration: 4
  });
  
  const [generatedPlan, setGeneratedPlan] = useState<EventPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePlan = async () => {
    if (!requirements.eventType || !requirements.budget || !requirements.guestCount) {
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const plan = eventPlanningAI.generateEventPlan(requirements as EventRequirements);
      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Requirements Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600" />
            DineVibe AI Event Designer
          </CardTitle>
          <p className="text-slate-600">
            Describe your perfect event and let our AI create a complete plan with 3D preview
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventType">Event Type</Label>
              <Select value={requirements.eventType} onValueChange={(value) => 
                setRequirements(prev => ({ ...prev, eventType: value as any }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="birthday">Birthday Party</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="baby_shower">Baby Shower</SelectItem>
                  <SelectItem value="reception">Reception</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budget">Budget (₹)</Label>
              <Input
                type="number"
                value={requirements.budget}
                onChange={(e) => setRequirements(prev => ({ 
                  ...prev, 
                  budget: parseInt(e.target.value) || 0 
                }))}
                placeholder="Enter budget in rupees"
              />
            </div>

            <div>
              <Label htmlFor="guestCount">Guest Count</Label>
              <Input
                type="number"
                value={requirements.guestCount}
                onChange={(e) => setRequirements(prev => ({ 
                  ...prev, 
                  guestCount: parseInt(e.target.value) || 0 
                }))}
                placeholder="Number of guests"
              />
            </div>

            <div>
              <Label htmlFor="style">Theme Style</Label>
              <Select value={requirements.style} onValueChange={(value) => 
                setRequirements(prev => ({ ...prev, style: value as any }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="royal">Royal Elegance</SelectItem>
                  <SelectItem value="floral">Garden Paradise</SelectItem>
                  <SelectItem value="bollywood">Bollywood Glamour</SelectItem>
                  <SelectItem value="minimal">Modern Minimal</SelectItem>
                  <SelectItem value="vintage">Vintage Charm</SelectItem>
                  <SelectItem value="modern">Contemporary Chic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="venueType">Venue Type</Label>
              <Select value={requirements.venueType} onValueChange={(value) => 
                setRequirements(prev => ({ ...prev, venueType: value as any }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select venue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banquet_hall">Banquet Hall</SelectItem>
                  <SelectItem value="garden">Garden/Outdoor</SelectItem>
                  <SelectItem value="indoor">Indoor Space</SelectItem>
                  <SelectItem value="outdoor">Party Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input
                type="number"
                value={requirements.duration}
                onChange={(e) => setRequirements(prev => ({ 
                  ...prev, 
                  duration: parseInt(e.target.value) || 0 
                }))}
                placeholder="Event duration"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              value={requirements.specialRequests || ''}
              onChange={(e) => setRequirements(prev => ({ 
                ...prev, 
                specialRequests: e.target.value 
              }))}
              placeholder="Any special requirements or preferences..."
              rows={3}
            />
          </div>

          <Button 
            onClick={handleGeneratePlan} 
            disabled={isGenerating}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                AI is designing your event...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate AI Event Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Plan */}
      {generatedPlan && (
        <div className="space-y-6">
          {/* Plan Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold-500" />
                  {generatedPlan.theme.name} Event Plan
                </span>
                <Badge variant="secondary">
                  {Math.round(generatedPlan.confidence * 100)}% match
                </Badge>
              </CardTitle>
              <p className="text-slate-600">{generatedPlan.theme.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold">{formatCurrency(generatedPlan.totalCost)}</div>
                    <div className="text-sm text-slate-500">Total Cost</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">{requirements.guestCount} guests</div>
                    <div className="text-sm text-slate-500">Capacity</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-semibold">{requirements.duration} hours</div>
                    <div className="text-sm text-slate-500">Duration</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {generatedPlan.theme.colorPalette.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 3D Preview */}
          <Preview3D
            title="3D Event Preview"
            imageUrl="https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=1000"
            description="AI-generated 3D preview of your event setup"
          />

          {/* Detailed Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Decoration Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Decoration & Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Lighting</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {generatedPlan.decoration.lighting.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Flowers & Decor</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {generatedPlan.decoration.flowers.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Estimated Cost:</span>
                    <span className="font-medium">{formatCurrency(generatedPlan.decoration.estimatedCost)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Catering Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Catering & Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Menu ({generatedPlan.catering.menuType})</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {generatedPlan.catering.courses.map((course, index) => (
                      <li key={index}>• {course}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Beverages</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {generatedPlan.catering.beverages.map((beverage, index) => (
                      <li key={index}>• {beverage}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Per Person:</span>
                    <span className="font-medium">{formatCurrency(generatedPlan.catering.estimatedCostPerPerson)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              Book 3D Preview
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download PDF Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPlanningAssistant;
