
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Wand2, Clock, Sparkles } from 'lucide-react';
import WaitTimePredictor from '@/components/ai/WaitTimePredictor';
import EventPlanningAssistant from '@/components/ai/EventPlanningAssistant';
import SmartRecommendations from '@/components/ai/SmartRecommendations';

const AIAssistant: React.FC = () => {
  const { user } = useAuth();

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
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Your intelligent dining and event planning companion. Powered by advanced AI to make every experience perfect.
              </p>
            </div>
          </div>
        </div>
        
        {/* AI Features */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
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
                  </ul>
                  <p className="mt-3">
                    Predictions are updated every 5 minutes with 85-95% accuracy.
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
