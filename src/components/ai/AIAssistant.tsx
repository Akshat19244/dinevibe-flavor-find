
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  MessageCircle,
  User,
  Headphones
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'admin';
  timestamp: Date;
  isTyping?: boolean;
}

interface AIAssistantProps {
  onHandoverToAdmin?: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onHandoverToAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHandoverOption, setShowHandoverOption] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Context-aware suggestions based on current page
  const getContextualSuggestions = () => {
    const path = location.pathname;
    if (path === '/') {
      return ['Find venues near me', 'Plan an event', 'Compare dining options'];
    } else if (path.includes('/dining')) {
      return ['Book a table', 'Filter by cuisine', 'Check availability'];
    } else if (path.includes('/partner')) {
      return ['How to register my venue', 'Upload menu photos', 'Dashboard features'];
    } else if (path.includes('/events')) {
      return ['Plan birthday party', 'Wedding venues', 'Corporate events'];
    } else if (path.includes('/owner')) {
      return ['Manage bookings', 'Update venue info', 'View analytics'];
    }
    return ['How can I help you?', 'Find venues', 'Make a booking'];
  };

  const getPageContext = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.includes('/dining')) return 'dining';
    if (path.includes('/partner')) return 'partner';
    if (path.includes('/events')) return 'events';
    if (path.includes('/owner')) return 'owner';
    if (path.includes('/admin')) return 'admin';
    return 'general';
  };

  // Initialize with welcome message
  useEffect(() => {
    const context = getPageContext();
    let welcomeMessage = '';
    
    switch (context) {
      case 'home':
        welcomeMessage = 'Welcome to DineVibe! I can help you find the perfect venue, plan events, or answer any questions.';
        break;
      case 'dining':
        welcomeMessage = 'Looking for the perfect dining experience? I can help you find restaurants, make reservations, and more!';
        break;
      case 'partner':
        welcomeMessage = 'Ready to partner with DineVibe? I can guide you through the registration process and answer any questions.';
        break;
      case 'events':
        welcomeMessage = 'Planning an event? I can help you find venues, plan details, and make your event memorable!';
        break;
      case 'owner':
        welcomeMessage = 'Managing your venue? I can help with bookings, analytics, uploads, and dashboard features.';
        break;
      default:
        welcomeMessage = 'Hi! I\'m your DineVibe AI assistant. How can I help you today?';
    }

    if (messages.length === 0) {
      setMessages([{
        id: '1',
        text: welcomeMessage,
        sender: 'ai',
        timestamp: new Date()
      }]);
    }
  }, [location.pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const context = getPageContext();
      let response = '';
      
      // Context-aware responses
      if (userMessage.toLowerCase().includes('book') || userMessage.toLowerCase().includes('reservation')) {
        response = context === 'dining' 
          ? 'Great! I can help you make a reservation. Please select your preferred date, time, and number of guests. Would you like me to show you available options?'
          : 'I can help you make a booking! Let me redirect you to our dining page where you can choose from our verified venues.';
      } else if (userMessage.toLowerCase().includes('venue') || userMessage.toLowerCase().includes('restaurant')) {
        response = 'I can help you find the perfect venue! What type of event are you planning? (Dining, Wedding, Corporate, Birthday, etc.)';
      } else if (userMessage.toLowerCase().includes('partner') || userMessage.toLowerCase().includes('register')) {
        response = 'Excellent! To partner with DineVibe, you\'ll need to register your venue. I can guide you through uploading photos, menu images, and setting up your profile. Shall we start?';
      } else if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
        response = 'Our pricing varies by venue and event type. I can help you filter venues by your budget range. What\'s your preferred budget per person?';
      } else if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('support')) {
        response = 'I\'m here to help! You can also connect with our human support team for more detailed assistance. Would you like me to transfer you to a human agent?';
        setShowHandoverOption(true);
      } else {
        response = 'I understand you\'re looking for assistance. Could you tell me more about what you\'d like to do? I can help with bookings, venue searches, event planning, or partner registration.';
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    simulateAIResponse(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleHandoverToAdmin = () => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: 'Connecting you to our support team. Please hold on...',
      sender: 'ai',
      timestamp: new Date()
    }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'Hello! This is DineVibe support. I\'m here to help you with any questions or issues. How can I assist you today?',
        sender: 'admin',
        timestamp: new Date()
      }]);
    }, 2000);
    
    setShowHandoverOption(false);
    onHandoverToAdmin?.();
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1] shadow-lg z-50 p-0"
          size="lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 w-96 bg-[#FFF5E1] border-[#D4AF37] shadow-xl z-50 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[500px]'
        }`}>
          <CardHeader className="pb-3 bg-[#8B0000] text-[#FFF5E1] rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <CardTitle className="text-sm">DineVibe Assistant</CardTitle>
                <Badge variant="outline" className="text-xs border-[#D4AF37] text-[#D4AF37]">
                  {getPageContext()}
                </Badge>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-6 w-6 p-0 text-[#FFF5E1] hover:bg-[#660000]"
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 text-[#FFF5E1] hover:bg-[#660000]"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[436px]">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-[#8B0000] text-[#FFF5E1]'
                          : message.sender === 'admin'
                          ? 'bg-[#D4AF37] text-[#0C0C0C]'
                          : 'bg-[#2F2F2F] text-[#FFF5E1]'
                      }`}>
                        <div className="flex items-start space-x-2">
                          {message.sender !== 'user' && (
                            <div className="flex-shrink-0">
                              {message.sender === 'admin' ? (
                                <Headphones className="h-4 w-4 mt-0.5" />
                              ) : (
                                <Bot className="h-4 w-4 mt-0.5" />
                              )}
                            </div>
                          )}
                          <div>
                            <p className="text-sm">{message.text}</p>
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-[#2F2F2F] text-[#FFF5E1] rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#FFF5E1] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[#FFF5E1] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-[#FFF5E1] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Suggestions */}
              <div className="p-3 border-t border-[#D4AF37]/20">
                <div className="flex flex-wrap gap-2 mb-3">
                  {getContextualSuggestions().map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-[#D4AF37] hover:text-[#0C0C0C] border-[#D4AF37] text-xs"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>

                {showHandoverOption && (
                  <Button
                    onClick={handleHandoverToAdmin}
                    className="w-full mb-3 bg-[#D4AF37] hover:bg-[#B8941F] text-[#0C0C0C] text-sm"
                    size="sm"
                  >
                    <Headphones className="h-4 w-4 mr-2" />
                    Connect to Human Support
                  </Button>
                )}

                {/* Input Area */}
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 border-[#D4AF37]/30 focus:border-[#8B0000]"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
