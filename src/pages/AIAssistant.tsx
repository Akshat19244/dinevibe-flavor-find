
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Brain, Calendar, Wand2, MessageSquare } from 'lucide-react';
import RealtimeEventPlanner from '@/components/ai/RealtimeEventPlanner';

const AIAssistant: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1] mb-4">
              <Sparkles className="inline mr-3 h-12 w-12 text-[#D4AF37]" />
              DineVibe AI Assistant
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              Your intelligent dining and event planning companion powered by advanced AI
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="event-planner" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="event-planner" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Event Planner
              </TabsTrigger>
              <TabsTrigger value="dining-assistant" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Dining Assistant
              </TabsTrigger>
              <TabsTrigger value="chat-support" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat Support
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="event-planner">
              <RealtimeEventPlanner />
            </TabsContent>
            
            <TabsContent value="dining-assistant">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-[#8B0000]" />
                    Smart Restaurant Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2F2F2F] mb-4">
                    Get personalized dining recommendations based on your preferences, location, and mood.
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-[#D4AF37] rounded-lg">
                        <h4 className="font-semibold text-[#8B0000] mb-2">Today's Recommendations</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• The Royal Feast - Perfect for date nights</li>
                          <li>• Spice Symphony - Great for family dinners</li>
                          <li>• Coastal Breeze - Ideal for seafood lovers</li>
                        </ul>
                      </div>
                      <div className="p-4 border border-[#D4AF37] rounded-lg">
                        <h4 className="font-semibold text-[#8B0000] mb-2">Trending Cuisines</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Continental cuisine trending today</li>
                          <li>• Italian restaurants with 20% off</li>
                          <li>• New Asian fusion spots nearby</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chat-support">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-[#8B0000]" />
                    AI Chat Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-[#2F2F2F]/5 rounded-lg p-4 mb-4">
                    <div className="space-y-4">
                      <div className="bg-[#D4AF37]/20 p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">
                          Hello! I'm your DineVibe AI assistant. How can I help you today? 
                          I can assist with restaurant recommendations, event planning, or answer any questions about our platform.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Type your message here..."
                      className="flex-1 p-3 border border-[#D4AF37] rounded-lg"
                    />
                    <button className="bg-[#8B0000] text-[#FFF5E1] px-6 py-3 rounded-lg hover:bg-[#660000] transition-colors">
                      Send
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAssistant;
