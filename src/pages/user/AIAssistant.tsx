
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Wand2, Clock, Sparkles, Camera, Download, Play } from 'lucide-react';
import WaitTimePredictor from '@/components/ai/WaitTimePredictor';
import EventPlanningAssistant from '@/components/ai/EventPlanningAssistant';
import SmartRecommendations from '@/components/ai/SmartRecommendations';

const AIAssistant: React.FC = () => {
  const { user } = useAuth();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const aiCapabilities = [
    {
      title: "Smart Restaurant Recommendations",
      description: "AI analyzes your preferences, past orders, dietary restrictions, and current mood to suggest perfect dining options",
      features: [
        "Cuisine preference learning",
        "Budget-aware suggestions", 
        "Location optimization",
        "Real-time availability",
        "Weather-based recommendations"
      ],
      accuracy: "94%",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Event Theme & Decor Generation",
      description: "From a simple brief, AI creates complete event themes with decor, lighting, and layout suggestions",
      features: [
        "Custom theme creation",
        "Color palette optimization",
        "Lighting design",
        "Seating arrangements",
        "Photography angles"
      ],
      accuracy: "91%",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Menu Curation & Pairing",
      description: "AI suggests optimal menu combinations based on guest preferences, dietary needs, and event type",
      features: [
        "Dietary restriction handling",
        "Cultural preferences",
        "Seasonal ingredients",
        "Wine & beverage pairing",
        "Cost optimization"
      ],
      accuracy: "89%",
      color: "bg-green-100 text-green-600"
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: "Input Your Preferences",
      description: "Tell us about your event type, guest count, budget, and style preferences",
      icon: "📝"
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our AI processes thousands of successful events to understand your requirements",
      icon: "🧠"
    },
    {
      step: 3,
      title: "Theme Generation",
      description: "AI creates 3-5 unique theme options with visual mockups and decor suggestions",
      icon: "🎨"
    },
    {
      step: 4,
      title: "3D Visualization",
      description: "See your event come to life in 3D with realistic lighting and decor placement",
      icon: "👁️"
    },
    {
      step: 5,
      title: "PDF Plan & Quote",
      description: "Download comprehensive event plan with vendor contacts and pricing breakdown",
      icon: "📄"
    }
  ];

  const demoEvents = [
    {
      id: "royal-wedding",
      title: "Royal Wedding Theme",
      description: "500-guest wedding with traditional Indian royal aesthetics",
      image: "https://images.unsplash.com/photo-1519167758481-83f29c2c47bf",
      features: ["Gold & Maroon Color Scheme", "Traditional Decor", "Mandap Design", "Guest Seating"]
    },
    {
      id: "modern-reception", 
      title: "Modern Garden Reception",
      description: "200-guest outdoor reception with contemporary styling",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38",
      features: ["Minimalist Design", "String Lighting", "Natural Elements", "Photo Booth"]
    },
    {
      id: "corporate-launch",
      title: "Product Launch Event",
      description: "150-guest corporate event with tech-forward design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      features: ["LED Stage", "Interactive Displays", "Networking Zones", "Branding Elements"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName={user?.user_metadata?.name || 'User'} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="h-8 w-8" />
                <h1 className="text-4xl font-bold">DineVibe AI Assistant</h1>
              </div>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
                Your intelligent dining and event planning companion. Powered by advanced AI to make every experience perfect.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <Badge className="bg-white/20 text-white">94% Accuracy</Badge>
                <Badge className="bg-white/20 text-white">50K+ Events Analyzed</Badge>
                <Badge className="bg-white/20 text-white">Real-time Learning</Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Features */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="capabilities" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="capabilities" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Capabilities
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Smart Recommendations
              </TabsTrigger>
              <TabsTrigger value="wait-time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Wait Time Predictor
              </TabsTrigger>
              <TabsTrigger value="event-planning" className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                Event Designer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="capabilities" className="space-y-8">
              {/* AI Capabilities Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {aiCapabilities.map((capability, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 ${capability.color} rounded-lg flex items-center justify-center mb-4`}>
                        <Brain className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{capability.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Accuracy: {capability.accuracy}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">{capability.description}</p>
                      <ul className="space-y-2">
                        {capability.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <Sparkles className="h-3 w-3 text-blue-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Workflow */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">How AI Event Planning Works</CardTitle>
                  <p className="text-slate-600">From concept to execution in 5 intelligent steps</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {workflowSteps.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                          {step.icon}
                        </div>
                        <h3 className="font-semibold mb-2">Step {step.step}</h3>
                        <h4 className="text-sm font-medium text-blue-600 mb-2">{step.title}</h4>
                        <p className="text-xs text-slate-600">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Demo Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">AI-Generated Event Examples</CardTitle>
                  <p className="text-slate-600">See how our AI creates stunning event designs</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {demoEvents.map((event, index) => (
                      <div key={index} className="group cursor-pointer" onClick={() => setSelectedDemo(event.id)}>
                        <div className="relative overflow-hidden rounded-lg mb-4">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                              <Play className="h-4 w-4 mr-2" />
                              View Demo
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2">{event.title}</h3>
                        <p className="text-sm text-slate-600 mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {event.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Personalized Restaurant Recommendations
                  </CardTitle>
                  <p className="text-muted-foreground">
                    AI-curated suggestions based on your preferences, dining history, and current context
                  </p>
                </CardHeader>
                <CardContent>
                  <SmartRecommendations
                    userPreferences={{
                      cuisinePreferences: ['italian', 'indian', 'japanese'],
                      budgetRange: { min: 800, max: 2500 },
                      locationPreferences: ['mumbai', 'bandra'],
                      diningStyle: 'casual'
                    }}
                    context={{
                      isSpecialOccasion: false,
                      groupSize: 2
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="wait-time" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WaitTimePredictor
                  restaurantId="rest1"
                  restaurantName="Bella Italia"
                  capacity={80}
                  currentGuests={65}
                  averageDiningTime={75}
                />
                <WaitTimePredictor
                  restaurantId="rest2"
                  restaurantName="Spice Garden"
                  capacity={60}
                  currentGuests={25}
                  averageDiningTime={60}
                />
                <WaitTimePredictor
                  restaurantId="rest3"
                  restaurantName="Zen Sushi"
                  capacity={45}
                  currentGuests={40}
                  averageDiningTime={90}
                />
                <WaitTimePredictor
                  restaurantId="rest4"
                  restaurantName="The Royal Feast"
                  capacity={120}
                  currentGuests={95}
                  averageDiningTime={85}
                />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>How AI Wait Time Prediction Works</CardTitle>
                </CardHeader>
                <CardContent className="prose text-sm text-muted-foreground">
                  <p>
                    Our AI analyzes multiple factors to predict accurate wait times:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Current restaurant occupancy and table turnover rates</li>
                    <li>Historical dining patterns and peak hour analysis</li>
                    <li>Day of the week and seasonal trends</li>
                    <li>Average dining duration for different party sizes</li>
                    <li>Real-time booking data and reservation patterns</li>
                    <li>Weather conditions and local events impact</li>
                  </ul>
                  <p className="mt-3">
                    Predictions are updated every 5 minutes with 85-95% accuracy based on historical validation.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="event-planning">
              <EventPlanningAssistant />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAssistant;
