
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SystemSelect } from '@/components/ui/system-select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sparkles, 
  Palette, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Eye,
  Wand2
} from 'lucide-react';
import { eventPlanningAI, EventRequirements, EventPlan } from '@/lib/ai/eventPlanningAI';
import { useToast } from '@/components/ui/use-toast';

const EventPlanningAssistant: React.FC = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<EventPlan | null>(null);
  const [requirements, setRequirements] = useState<EventRequirements>({
    eventType: 'birthday',
    budget: 50000,
    guestCount: 50,
    preferredColors: ['#FF69B4', '#FFD700'],
    style: 'floral',
    venueType: 'banquet_hall',
    duration: 4,
    specialRequests: ''
  });

  const eventTypeOptions = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'baby_shower', label: 'Baby Shower' },
    { value: 'reception', label: 'Reception' }
  ];

  const styleOptions = [
    { value: 'royal', label: 'Royal Elegance' },
    { value: 'floral', label: 'Garden Paradise' },
    { value: 'bollywood', label: 'Bollywood Glamour' },
    { value: 'minimal', label: 'Modern Minimal' },
    { value: 'vintage', label: 'Vintage Charm' },
    { value: 'modern', label: 'Contemporary Chic' }
  ];

  const venueTypeOptions = [
    { value: 'indoor', label: 'Indoor Venue' },
    { value: 'outdoor', label: 'Outdoor Venue' },
    { value: 'garden', label: 'Garden Setting' },
    { value: 'banquet_hall', label: 'Banquet Hall' }
  ];

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const plan = eventPlanningAI.generateEventPlan(requirements);
      setGeneratedPlan(plan);
      
      toast({
        title: "Event Plan Generated! ✨",
        description: `Your ${requirements.eventType} plan is ready with ${Math.round(plan.confidence * 100)}% confidence.`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate event plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPlan = () => {
    if (!generatedPlan) return;
    
    toast({
      title: "Downloading Plan",
      description: "Your detailed event plan PDF is being prepared...",
    });
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            DineVibe AI Event Designer
          </CardTitle>
          <p className="text-muted-foreground">
            Tell us about your event and we'll create a complete plan with 3D visualization
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Event Type</Label>
              <SystemSelect
                value={requirements.eventType}
                onValueChange={(value) => setRequirements({...requirements, eventType: value as any})}
                options={eventTypeOptions}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Style Theme</Label>
              <SystemSelect
                value={requirements.style}
                onValueChange={(value) => setRequirements({...requirements, style: value as any})}
                options={styleOptions}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Guest Count
              </Label>
              <Input
                type="number"
                min="10"
                max="500"
                value={requirements.guestCount}
                onChange={(e) => setRequirements({...requirements, guestCount: parseInt(e.target.value) || 50})}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget (INR)
              </Label>
              <Input
                type="number"
                min="10000"
                max="1000000"
                step="5000"
                value={requirements.budget}
                onChange={(e) => setRequirements({...requirements, budget: parseInt(e.target.value) || 50000})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Venue Type</Label>
              <SystemSelect
                value={requirements.venueType}
                onValueChange={(value) => setRequirements({...requirements, venueType: value as any})}
                options={venueTypeOptions}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Duration (hours)
              </Label>
              <Input
                type="number"
                min="2"
                max="12"
                value={requirements.duration}
                onChange={(e) => setRequirements({...requirements, duration: parseInt(e.target.value) || 4})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Special Requests (Optional)</Label>
            <Textarea
              placeholder="Any specific requirements, dietary restrictions, or special arrangements..."
              value={requirements.specialRequests}
              onChange={(e) => setRequirements({...requirements, specialRequests: e.target.value})}
              className="min-h-[80px]"
            />
          </div>
          
          <Button 
            onClick={handleGeneratePlan}
            disabled={isGenerating}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generating Your Perfect Event...
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

      {generatedPlan && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                {generatedPlan.theme.name}
              </CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {Math.round(generatedPlan.confidence * 100)}% Match
              </Badge>
            </div>
            <p className="text-muted-foreground">{generatedPlan.theme.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Colors */}
            <div>
              <h4 className="font-semibold mb-2">Color Palette</h4>
              <div className="flex gap-2">
                {generatedPlan.theme.colorPalette.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(generatedPlan.totalCost)}
                </div>
                <div className="text-sm text-muted-foreground">Total Cost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(generatedPlan.savings)}
                </div>
                <div className="text-sm text-muted-foreground">You Save</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(generatedPlan.catering.estimatedCostPerPerson)}
                </div>
                <div className="text-sm text-muted-foreground">Per Person</div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-3">Recommended Services</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {generatedPlan.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <div className="font-medium capitalize">{service.type.replace('_', ' ')}</div>
                      <div className="text-sm text-muted-foreground">{service.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(service.cost)}</div>
                      {service.recommended && (
                        <Badge variant="secondary" className="text-xs">Recommended</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleDownloadPlan} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Plan
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Eye className="h-4 w-4 mr-2" />
                View 3D Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventPlanningAssistant;
