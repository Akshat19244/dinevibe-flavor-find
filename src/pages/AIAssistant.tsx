
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Brain, Calendar, Wand2, MessageSquare, Send, Bot, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RealtimeEventPlanner from '@/components/ai/RealtimeEventPlanner';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your DineVibe AI assistant. I can help you plan events, suggest venues, recommend themes, and much more. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Birthday party planning
    if (lowerMessage.includes('birthday') && lowerMessage.includes('party')) {
      return `🎂 Great! I'd love to help you plan a birthday party. Based on your requirements, here are my suggestions:

**Venue Recommendations:**
• Garden Paradise Resort - Perfect for outdoor celebrations
• Royal Celebration Hall - Indoor venue with party decorations
• Skyline Banquet - Rooftop venue with city views

**Package Suggestions:**
• Budget-friendly package: ₹800-1,200 per person
• Premium package: ₹1,500-2,500 per person
• Luxury package: ₹3,000+ per person

**Theme Ideas:**
• Bollywood Theme with vibrant decorations
• Garden Party with fairy lights
• Royal Theme with gold and maroon

Would you like me to create a detailed plan for any of these options?`;
    }
    
    // Wedding planning
    if (lowerMessage.includes('wedding') || lowerMessage.includes('marriage')) {
      return `💒 Congratulations on your upcoming wedding! I'll help you create the perfect celebration:

**Venue Types:**
• Garden Wedding - Outdoor ceremony with natural beauty
• Banquet Hall - Traditional indoor celebration
• Resort Wedding - Multi-day celebration venue
• Heritage Venue - Royal palace or fort settings

**Popular Themes:**
• Royal Elegance (Red & Gold)
• Garden Paradise (Green & Pink)
• Modern Chic (Silver & White)
• Traditional Indian (Multiple vibrant colors)

**Budget Planning:**
• Economy: ₹50,000 - ₹1,50,000
• Mid-range: ₹2,00,000 - ₹5,00,000
• Premium: ₹6,00,000 - ₹15,00,000
• Luxury: ₹20,00,000+

Shall I help you plan based on your specific requirements?`;
    }
    
    // Theme suggestions
    if (lowerMessage.includes('theme') || lowerMessage.includes('decoration')) {
      return `🎨 Here are some trending event themes I can help you implement:

**Royal Themes:**
• Red & Gold Royal - Perfect for weddings and anniversaries
• Purple & Silver Royalty - Elegant and sophisticated
• Emerald Royal - Rich green with gold accents

**Modern Themes:**
• Minimalist Chic - Clean lines and neutral colors
• Industrial Modern - Exposed elements with warm lighting
• Bohemian Style - Natural textures and earthy tones

**Seasonal Themes:**
• Spring Garden - Fresh flowers and pastels
• Winter Wonderland - White and silver elegance
• Monsoon Magic - Rich blues and greens

Each theme includes matching decor, lighting, table settings, and floral arrangements. Which style appeals to you?`;
    }
    
    // Venue suggestions
    if (lowerMessage.includes('venue') || lowerMessage.includes('banquet') || lowerMessage.includes('hall')) {
      return `🏛️ I have access to premium venues across India. Here are some top recommendations:

**Delhi NCR:**
• The Royal Garden Palace - 500+ capacity, garden + indoor
• Grand Ballroom Gurgaon - Modern amenities, 300 capacity
• Heritage Manor - Historical venue, 200 capacity

**Mumbai:**
• Seaside Elegance - Ocean view, 400 capacity
• Metropolitan Banquet - City center, 600 capacity
• Garden Pavilion Bandra - Outdoor setting, 250 capacity

**Bangalore:**
• Tech Park Convention - Modern facilities, 800 capacity
• Palace Grounds - Traditional setting, 1000+ capacity
• Lakeside Resort - Scenic venue, 300 capacity

**Features to consider:**
• Parking availability
• Catering kitchen facilities
• Audio/visual equipment
• Accommodation options
• Transportation access

Would you like detailed information about venues in a specific city?`;
    }
    
    // Budget planning
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return `💰 Let me help you plan your event budget effectively:

**Budget Breakdown (per person):**
• Venue: 30-40% of total budget
• Catering: 35-45% of total budget
• Decoration: 10-15% of total budget
• Entertainment: 5-10% of total budget
• Photography: 5-8% of total budget
• Miscellaneous: 5-10% of total budget

**Sample Budget Plans:**
• Budget Event (₹800-1,500 per person): Basic venue, simple menu, minimal decor
• Mid-range (₹1,500-3,000 per person): Good venue, diverse menu, themed decor
• Premium (₹3,000-6,000 per person): Luxury venue, premium menu, elaborate decor
• Ultra-luxury (₹6,000+ per person): Heritage venues, gourmet cuisine, designer decor

**Money-saving tips:**
• Book during off-peak seasons
• Choose weekday events for better rates
• Opt for buffet instead of plated service
• Use seasonal flowers and decorations

What's your approximate budget range? I can create a detailed plan accordingly.`;
    }
    
    // Default response
    return `I understand you're looking for event planning assistance. I can help you with:

🎉 **Event Planning Services:**
• Birthday parties and celebrations
• Wedding planning and coordination
• Corporate events and conferences
• Anniversary celebrations
• Festival gatherings

🏛️ **Venue Selection:**
• Banquet halls and convention centers
• Garden and outdoor venues
• Heritage properties and palaces
• Hotels and resorts
• Rooftop and unique locations

🎨 **Complete Event Design:**
• Theme selection and decoration
• Catering menu planning
• Entertainment arrangements
• Photography and videography
• Transportation and logistics

Please share more details about your event - type, guest count, budget, preferred location, and date. I'll create a personalized plan for you!`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      toast({
        title: "AI Response Generated",
        description: "I've analyzed your request and provided personalized recommendations.",
      });
    }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

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
                Live AI Chat
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
                    Live AI Chat Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Chat Messages Container */}
                  <div className="h-96 bg-[#2F2F2F]/5 rounded-lg p-4 mb-4 overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-[#8B0000] text-[#FFF5E1] rounded-br-none'
                                : 'bg-[#D4AF37]/20 text-[#0C0C0C] rounded-bl-none'
                            }`}
                          >
                            <div className="flex items-start gap-2 mb-2">
                              {message.role === 'user' ? (
                                <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              ) : (
                                <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              )}
                              <span className="text-xs opacity-75">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                            <div className="whitespace-pre-wrap text-sm">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-[#D4AF37]/20 text-[#0C0C0C] p-3 rounded-lg rounded-bl-none max-w-[80%]">
                            <div className="flex items-center gap-2">
                              <Bot className="h-4 w-4" />
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-[#8B0000] rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-[#8B0000] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-[#8B0000] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                              <span className="text-xs text-[#2F2F2F]">AI is typing...</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={chatEndRef} />
                    </div>
                  </div>
                  
                  {/* Chat Input */}
                  <div className="flex space-x-2">
                    <Input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about event planning, venues, themes, budgets..."
                      className="flex-1 border-[#D4AF37] focus:ring-[#8B0000]"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-[#8B0000] text-[#FFF5E1] hover:bg-[#660000] px-6"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Quick Suggestions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInputValue("Plan a birthday party for 50 people under ₹50,000 in Delhi")}
                      className="text-xs border-[#D4AF37] text-[#8B0000] hover:bg-[#D4AF37]/10"
                    >
                      Birthday Party Planning
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInputValue("Show me banquet suggestions for a garden wedding in Mumbai")}
                      className="text-xs border-[#D4AF37] text-[#8B0000] hover:bg-[#D4AF37]/10"
                    >
                      Wedding Venues
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInputValue("I want a red-gold royal theme event")}
                      className="text-xs border-[#D4AF37] text-[#8B0000] hover:bg-[#D4AF37]/10"
                    >
                      Royal Theme
                    </Button>
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
