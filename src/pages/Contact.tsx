
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  HelpCircle,
  Send,
  User,
  Building,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Contact: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    priority: '',
    message: ''
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8 text-[#8B0000]" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      value: "+91 98765 43210",
      hours: "9:00 AM - 9:00 PM (Mon-Sun)",
      type: "call"
    },
    {
      icon: <Mail className="h-8 w-8 text-[#D4AF37]" />,
      title: "Email Support",
      description: "Get detailed help via email",
      value: "support@dinevibe.com",
      hours: "Response within 24 hours",
      type: "email"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      title: "Live Chat",
      description: "Instant help through chat",
      value: "Available on website",
      hours: "24/7 Available",
      type: "chat"
    },
    {
      icon: <MapPin className="h-8 w-8 text-green-500" />,
      title: "Office Visit",
      description: "Visit our Mumbai headquarters",
      value: "123 Luxury Square, Bandra",
      hours: "10:00 AM - 6:00 PM (Mon-Fri)",
      type: "location"
    }
  ];

  const supportCategories = [
    {
      icon: <User className="h-6 w-6 text-[#8B0000]" />,
      title: "For Customers",
      description: "Booking, payments, and general queries",
      topics: ["Booking Issues", "Payment Problems", "Event Planning", "Account Support"]
    },
    {
      icon: <Building className="h-6 w-6 text-[#D4AF37]" />,
      title: "For Partners",
      description: "Venue registration and business support",
      topics: ["Partnership Queries", "Dashboard Issues", "Analytics", "Revenue"]
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Technical Support",
      description: "Website, app, and technical assistance",
      topics: ["Website Issues", "Mobile App", "3D Preview", "AI Assistant"]
    },
    {
      icon: <Zap className="h-6 w-6 text-green-500" />,
      title: "Emergency Support",
      description: "Urgent event-related assistance",
      topics: ["Event Day Issues", "Last-minute Changes", "Vendor Problems", "Emergency Booking"]
    }
  ];

  const faqData = [
    {
      category: "General",
      question: "How do I book a venue through DineVibe?",
      answer: "To book a venue, browse our Discovery page, select your preferred venue, choose your date and package, and complete the booking process with payment. You'll receive instant confirmation."
    },
    {
      category: "General",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our encrypted payment gateway."
    },
    {
      category: "Booking",
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify bookings based on the venue's cancellation policy. Most venues allow free cancellation up to 48-72 hours before the event date."
    },
    {
      category: "Booking",
      question: "How does the AI Assistant help with event planning?",
      answer: "Our AI Assistant analyzes your preferences, guest count, budget, and theme to suggest personalized event plans, venue recommendations, and decoration ideas with downloadable plans."
    },
    {
      category: "Partnership",
      question: "How can I list my venue on DineVibe?",
      answer: "Visit our Partner With Us page, fill out the registration form with venue details, upload photos, and our team will review and activate your listing within 24-48 hours."
    },
    {
      category: "Partnership",
      question: "What commission does DineVibe charge?",
      answer: "Our commission ranges from 8-12% depending on the venue type and services. This includes marketing, customer support, payment processing, and analytics tools."
    },
    {
      category: "Technical",
      question: "Why isn't the 3D preview loading?",
      answer: "3D preview requires a modern browser with WebGL support. If it's not loading, try updating your browser, clearing cache, or using the static preview option."
    },
    {
      category: "Technical",
      question: "How do I access my booking history?",
      answer: "Log into your account and visit the 'My Bookings' section in your dashboard. You can view, download invoices, and manage all your past and upcoming bookings there."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for contacting us! We will respond within 24 hours.');
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      priority: '',
      message: ''
    });
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1] mb-4">
              <MessageSquare className="inline mr-3 h-12 w-12 text-[#D4AF37]" />
              Contact & Support
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              We're here to help you create unforgettable experiences
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="card-luxury text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {method.icon}
                  </div>
                  <h3 className="font-semibold text-[#0C0C0C] mb-2">{method.title}</h3>
                  <p className="text-sm text-[#2F2F2F] mb-3">{method.description}</p>
                  <p className="font-semibold text-[#8B0000] mb-2">{method.value}</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Clock className="h-3 w-3 text-[#2F2F2F]" />
                    <p className="text-xs text-[#2F2F2F]">{method.hours}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Support Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0C0C0C] text-center mb-8">
              How Can We Help You?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportCategories.map((category, index) => (
                <Card key={index} className="card-luxury">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      {category.icon}
                      <CardTitle className="text-[#0C0C0C] text-lg">{category.title}</CardTitle>
                    </div>
                    <p className="text-sm text-[#2F2F2F]">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.topics.map((topic, topicIndex) => (
                        <Badge 
                          key={topicIndex} 
                          variant="secondary" 
                          className="text-xs mr-1 mb-1"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="contact-form" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contact-form">Contact Form</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="live-support">Live Support</TabsTrigger>
            </TabsList>

            {/* Contact Form Tab */}
            <TabsContent value="contact-form">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Send us a Message</CardTitle>
                    <p className="text-[#2F2F2F]">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your name"
                            className="border-[#D4AF37]"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="your@email.com"
                            className="border-[#D4AF37]"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={contactForm.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+91 98765 43210"
                            className="border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select 
                            value={contactForm.category} 
                            onValueChange={(value) => handleInputChange('category', value)}
                          >
                            <SelectTrigger className="border-[#D4AF37]">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="booking">Booking Support</SelectItem>
                              <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                              <SelectItem value="technical">Technical Issue</SelectItem>
                              <SelectItem value="billing">Billing & Payments</SelectItem>
                              <SelectItem value="general">General Question</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="priority">Priority</Label>
                          <Select 
                            value={contactForm.priority} 
                            onValueChange={(value) => handleInputChange('priority', value)}
                          >
                            <SelectTrigger className="border-[#D4AF37]">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            value={contactForm.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            placeholder="Brief subject line"
                            className="border-[#D4AF37]"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Describe your question or issue in detail..."
                          className="border-[#D4AF37]"
                          rows={6}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {/* Office Information */}
                  <Card className="card-luxury">
                    <CardHeader>
                      <CardTitle className="text-[#0C0C0C]">Our Office</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-[#8B0000] mt-1" />
                          <div>
                            <p className="font-semibold">DineVibe Headquarters</p>
                            <p className="text-sm text-[#2F2F2F]">
                              123 Luxury Square, Bandra West<br />
                              Mumbai, Maharashtra 400050<br />
                              India
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Clock className="h-5 w-5 text-[#D4AF37] mt-1" />
                          <div>
                            <p className="font-semibold">Office Hours</p>
                            <p className="text-sm text-[#2F2F2F]">
                              Monday - Friday: 10:00 AM - 6:00 PM<br />
                              Saturday: 10:00 AM - 4:00 PM<br />
                              Sunday: Closed
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Response Times */}
                  <Card className="card-luxury">
                    <CardHeader>
                      <CardTitle className="text-[#0C0C0C]">Response Times</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Live Chat</span>
                          <Badge className="bg-green-100 text-green-800">Instant</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Phone Support</span>
                          <Badge className="bg-blue-100 text-blue-800">Immediate</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Email Support</span>
                          <Badge className="bg-yellow-100 text-yellow-800">24 hours</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Contact Form</span>
                          <Badge className="bg-yellow-100 text-yellow-800">24 hours</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C] flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-[#8B0000]" />
                    Frequently Asked Questions
                  </CardTitle>
                  <p className="text-[#2F2F2F]">
                    Find quick answers to common questions
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqData.map((faq, index) => (
                      <div key={index} className="border border-[#2F2F2F]/20 rounded-lg">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-[#2F2F2F]/5"
                        >
                          <div>
                            <Badge variant="secondary" className="mb-2 mr-2">
                              {faq.category}
                            </Badge>
                            <h4 className="font-semibold text-[#0C0C0C]">{faq.question}</h4>
                          </div>
                          {expandedFaq === index ? (
                            <ChevronUp className="h-5 w-5 text-[#2F2F2F]" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-[#2F2F2F]" />
                          )}
                        </button>
                        {expandedFaq === index && (
                          <div className="p-4 pt-0 border-t border-[#2F2F2F]/10">
                            <p className="text-[#2F2F2F]">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Live Support Tab */}
            <TabsContent value="live-support">
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">Live Support Chat</CardTitle>
                  <p className="text-[#2F2F2F]">
                    Get instant help from our support team
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-[#2F2F2F]/5 rounded-lg p-4 mb-4 flex flex-col justify-end">
                    <div className="space-y-4">
                      <div className="bg-[#D4AF37]/20 p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">
                          <strong>Support Agent:</strong> Hello! Welcome to DineVibe support. 
                          How can I help you today?
                        </p>
                        <p className="text-xs text-[#2F2F2F] mt-1">Just now</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Type your message here..."
                      className="flex-1 border-[#D4AF37]"
                    />
                    <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-[#2F2F2F] mt-2">
                    💡 <strong>Tip:</strong> For faster support, please include your booking ID or account email
                  </p>
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

export default Contact;
