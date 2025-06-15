
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  MessageCircle,
  User,
  Headphones,
  Settings,
  BarChart3,
  Calendar,
  Users,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdvancedAIAssistant, UserContext, AIResponse } from '@/lib/ai/assistantCore';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'admin';
  timestamp: Date;
  actions?: Array<{
    type: string;
    description: string;
    data: any;
  }>;
  needsConfirmation?: boolean;
}

interface AdvancedAIAssistantProps {
  onHandoverToAdmin?: () => void;
}

const AdvancedAIAssistantComponent: React.FC<AdvancedAIAssistantProps> = ({ onHandoverToAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user } = useAuth();

  const aiAssistant = new AdvancedAIAssistant({
    userId: user?.id,
    userType: getUserType(),
    currentPage: location.pathname,
    permissions: getUserPermissions()
  });

  function getUserType(): 'user' | 'owner' | 'admin' {
    if (user?.user_metadata?.role === 'admin') return 'admin';
    if (user?.user_metadata?.role === 'owner') return 'owner';
    return 'user';
  }

  function getUserPermissions(): string[] {
    const userType = getUserType();
    switch (userType) {
      case 'admin':
        return ['manage_users', 'approve_venues', 'system_admin', 'generate_reports'];
      case 'owner':
        return ['manage_venue', 'view_analytics', 'handle_bookings'];
      default:
        return ['make_booking', 'view_venues'];
    }
  }

  const getContextualSuggestions = () => {
    const userType = getUserType();
    const path = location.pathname;

    if (userType === 'admin') {
      return [
        'Generate system report',
        'Check system status', 
        'Show pending venue approvals',
        'User management overview'
      ];
    } else if (userType === 'owner') {
      if (path.includes('/owner')) {
        return [
          'Show my booking analytics',
          'Check pending bookings',
          'Update venue availability',
          'View revenue report'
        ];
      }
      return ['Manage my venues', 'View booking requests', 'Check analytics'];
    } else {
      if (path === '/') {
        return ['Find venues near me', 'Plan an event', 'Book a table'];
      } else if (path.includes('/dining')) {
        return ['Book a table for tonight', 'Find Italian restaurants', 'Check availability'];
      } else if (path.includes('/events')) {
        return ['Plan birthday party for 30 people', 'Find wedding venues', 'Corporate event spaces'];
      }
      return ['Book a venue', 'Find restaurants', 'Plan an event'];
    }
  };

  const getWelcomeMessage = () => {
    const userType = getUserType();
    const userName = user?.user_metadata?.name || 'there';
    
    if (userType === 'admin') {
      return `Hello ${userName}! I'm your advanced AI admin assistant. I can help you manage the platform, generate reports, approve venues, monitor system health, and handle user management tasks. What would you like me to help you with?`;
    } else if (userType === 'owner') {
      return `Welcome back ${userName}! I'm here to help you manage your venue business. I can assist with booking management, analytics insights, customer communications, and business optimization. How can I help grow your business today?`;
    } else {
      return `Hi ${userName}! I'm your intelligent DineVibe assistant. I can help you find perfect venues, make bookings, plan events, and discover great dining experiences. What are you looking for today?`;
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        text: getWelcomeMessage(),
        sender: 'ai',
        timestamp: new Date()
      }]);
    }
  }, [user, location.pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response: AIResponse = await aiAssistant.processRequest(inputValue);
      
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.response,
          sender: 'ai',
          timestamp: new Date(),
          actions: response.actions,
          needsConfirmation: response.needsConfirmation
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      console.error('AI Assistant Error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I encountered an error processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: any) => {
    const actionMessage = `Executing: ${action.description}`;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: actionMessage,
      sender: 'user',
      timestamp: new Date()
    }]);

    // Simulate action execution
    setTimeout(() => {
      let responseText = '';
      
      switch (action.type) {
        case 'generate_report':
          responseText = '📊 System report generated successfully! The report has been saved to your dashboard and sent to your email.';
          break;
        case 'check_availability':
          responseText = '✅ Availability checked! I found 3 venues available for your requested date. Would you like me to show you the options?';
          break;
        case 'view_pending_bookings':
          responseText = '📋 Here are your pending bookings:\n\n• **Birthday Party** - 25 guests, Tomorrow 7 PM\n• **Corporate Event** - 50 guests, Next Friday\n• **Anniversary** - 15 guests, This Weekend\n\nWould you like me to help you respond to any of these?';
          break;
        default:
          responseText = `✅ Action "${action.description}" completed successfully!`;
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      }]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
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
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          <CardHeader className="pb-3 bg-[#8B0000] text-[#FFF5E1] rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <CardTitle className="text-sm">Advanced AI Assistant</CardTitle>
                <Badge variant="outline" className="text-xs border-[#D4AF37] text-[#D4AF37]">
                  {getUserType()}
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
            <CardContent className="p-0 flex flex-col h-[536px]">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 m-2">
                  <TabsTrigger value="chat" className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="actions" className="flex items-center gap-1">
                    <Settings className="h-3 w-3" />
                    Actions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id}>
                          <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-lg p-3 ${
                              message.sender === 'user'
                                ? 'bg-[#8B0000] text-[#FFF5E1]'
                                : 'bg-[#2F2F2F] text-[#FFF5E1]'
                            }`}>
                              <div className="flex items-start space-x-2">
                                {message.sender !== 'user' && (
                                  <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                  <span className="text-xs opacity-70 mt-1 block">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          {message.actions && message.actions.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.actions.map((action, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleActionClick(action)}
                                  className="w-full text-left justify-start border-[#D4AF37] text-[#8B0000] hover:bg-[#D4AF37]/10"
                                >
                                  {message.needsConfirmation ? (
                                    <AlertCircle className="h-3 w-3 mr-2" />
                                  ) : (
                                    <CheckCircle className="h-3 w-3 mr-2" />
                                  )}
                                  {action.description}
                                </Button>
                              ))}
                            </div>
                          )}
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
                </TabsContent>

                <TabsContent value="actions" className="flex-1 p-4 space-y-4">
                  <div className="space-y-3">
                    {getUserType() === 'admin' && (
                      <>
                        <Button
                          onClick={() => handleSuggestionClick('Generate comprehensive system report')}
                          className="w-full justify-start bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Generate System Report
                        </Button>
                        <Button
                          onClick={() => handleSuggestionClick('Show system status and health metrics')}
                          variant="outline"
                          className="w-full justify-start border-[#D4AF37] text-[#8B0000]"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          System Status
                        </Button>
                        <Button
                          onClick={() => handleSuggestionClick('Show pending venue approvals')}
                          variant="outline"
                          className="w-full justify-start border-[#D4AF37] text-[#8B0000]"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Pending Approvals
                        </Button>
                      </>
                    )}

                    {getUserType() === 'owner' && (
                      <>
                        <Button
                          onClick={() => handleSuggestionClick('Show my venue analytics and performance')}
                          className="w-full justify-start bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </Button>
                        <Button
                          onClick={() => handleSuggestionClick('Check my pending booking requests')}
                          variant="outline"
                          className="w-full justify-start border-[#D4AF37] text-[#8B0000]"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Pending Bookings
                        </Button>
                      </>
                    )}

                    {getUserType() === 'user' && (
                      <>
                        <Button
                          onClick={() => handleSuggestionClick('Find venues for my event')}
                          className="w-full justify-start bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Find Venues
                        </Button>
                        <Button
                          onClick={() => handleSuggestionClick('Help me plan an event')}
                          variant="outline"
                          className="w-full justify-start border-[#D4AF37] text-[#8B0000]"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Plan Event
                        </Button>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};

export default AdvancedAIAssistantComponent;
