
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Download, Send, Bot, User, Calendar, Users, IndianRupee, MapPin } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [eventType, setEventType] = useState('');
  const [budget, setBudget] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [preferences, setPreferences] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'bot',
      message: "Hello! I'm your AI Event Planning Assistant. I'll help you create the perfect event plan. Let's start by telling me about your event!"
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const eventTypeOptions = [
    { value: 'wedding', label: 'Wedding Ceremony' },
    { value: 'birthday', label: 'Birthday Celebration' },
    { value: 'anniversary', label: 'Anniversary Party' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'conference', label: 'Business Conference' },
    { value: 'custom', label: 'Custom Event' }
  ];

  const samplePlan = {
    venue: "Royal Garden Palace",
    catering: "Premium Multi-Cuisine Menu",
    decoration: "Elegant Floral Theme",
    entertainment: "Live Music Band",
    photography: "Professional Photography Team",
    totalCost: "₹2,50,000",
    timeline: "6 hours event duration"
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    setChatMessages(prev => [...prev, {
      type: 'user',
      message: currentMessage
    }]);

    setIsGenerating(true);
    setCurrentMessage('');

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'bot',
        message: `Based on your ${eventType || 'event'} requirements, I recommend: \n\n🏛️ Venue: ${samplePlan.venue}\n🍽️ Catering: ${samplePlan.catering}\n🎨 Decoration: ${samplePlan.decoration}\n🎵 Entertainment: ${samplePlan.entertainment}\n📸 Photography: ${samplePlan.photography}\n\n💰 Estimated Total: ${samplePlan.totalCost}\n\nWould you like me to create a detailed plan for download?`
      }]);
      setIsGenerating(false);
    }, 2000);
  };

  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'bot',
        message: "Perfect! I've generated a comprehensive event plan based on your requirements. Here's your personalized event summary:"
      }]);
      setIsGenerating(false);
    }, 1500);
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
              AI Event Planning Assistant
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              Get personalized event recommendations powered by advanced artificial intelligence
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Event Details Form */}
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C] flex items-center">
                  <Bot className="mr-2 h-6 w-6 text-[#8B0000]" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Event Type</label>
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger className="border-[#D4AF37]">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                    <Input 
                      type="number"
                      placeholder="Enter guest count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="pl-10 border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Budget Range</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-[#2F2F2F]" />
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="pl-10 border-[#D4AF37]">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="1l-3l">₹1,00,000 - ₹3,00,000</SelectItem>
                        <SelectItem value="3l-5l">₹3,00,000 - ₹5,00,000</SelectItem>
                        <SelectItem value="5l+">₹5,00,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Special Preferences</label>
                  <Textarea 
                    placeholder="Describe your theme, cuisine preferences, special requirements..."
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    className="border-[#D4AF37] min-h-[100px]"
                  />
                </div>

                <Button 
                  onClick={generatePlan}
                  className="w-full btn-primary"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AI Chat Interface */}
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C] flex items-center">
                  <Sparkles className="mr-2 h-6 w-6 text-[#D4AF37]" />
                  AI Assistant Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 h-96 overflow-y-auto mb-4 p-4 bg-[#2F2F2F]/5 rounded-lg">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-[#8B0000] text-[#FFF5E1]' 
                          : 'bg-[#D4AF37]/20 text-[#0C0C0C]'
                      }`}>
                        <div className="flex items-center space-x-2 mb-1">
                          {msg.type === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">
                            {msg.type === 'user' ? 'You' : 'AI Assistant'}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-line">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="bg-[#D4AF37]/20 text-[#0C0C0C] p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="h-4 w-4 animate-spin" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Input 
                    placeholder="Ask me anything about your event..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="border-[#D4AF37]"
                  />
                  <Button onClick={handleSendMessage} className="btn-primary">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generated Plan Preview */}
          <Card className="card-luxury mt-8">
            <CardHeader>
              <CardTitle className="text-[#0C0C0C] flex items-center justify-between">
                <span>
                  <Calendar className="mr-2 h-6 w-6 text-[#8B0000] inline" />
                  Your AI-Generated Event Plan
                </span>
                <Button className="btn-secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#8B0000]">Venue Selection</h4>
                  <p className="text-[#0C0C0C]">{samplePlan.venue}</p>
                  <div className="flex items-center text-sm text-[#2F2F2F]">
                    <MapPin className="h-4 w-4 mr-1" />
                    Premium Location
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#8B0000]">Catering & Menu</h4>
                  <p className="text-[#0C0C0C]">{samplePlan.catering}</p>
                  <div className="text-sm text-[#2F2F2F]">
                    Customized based on guest preferences
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#8B0000]">Decoration Theme</h4>
                  <p className="text-[#0C0C0C]">{samplePlan.decoration}</p>
                  <div className="text-sm text-[#2F2F2F]">
                    Professional setup included
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#8B0000]">Entertainment</h4>
                  <p className="text-[#0C0C0C]">{samplePlan.entertainment}</p>
                  <div className="text-sm text-[#2F2F2F]">
                    Professional artists
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#8B0000]">Photography</h4>
                  <p className="text-[#0C0C0C]">{samplePlan.photography}</p>
                  <div className="text-sm text-[#2F2F2F]">
                    High-quality coverage
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#8B0000]">Total Investment</h4>
                  <p className="text-2xl font-bold text-[#D4AF37]">{samplePlan.totalCost}</p>
                  <div className="text-sm text-[#2F2F2F]">
                    {samplePlan.timeline}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#D4AF37]/30">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="btn-primary flex-1">
                    Book This Plan
                  </Button>
                  <Button variant="outline" className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]">
                    Customize Further
                  </Button>
                  <Button className="btn-secondary">
                    Share Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAssistant;
