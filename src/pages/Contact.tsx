
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  HeadphonesIcon,
  Users,
  Building
} from 'lucide-react';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      value: "+91 1800-DINEVIBE",
      action: "Call Now"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Send us your questions and concerns",
      value: "support@dinevibe.com",
      action: "Send Email"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with our AI assistant instantly",
      value: "Available 24/7",
      action: "Start Chat"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Meet us at our headquarters",
      value: "Mumbai, Maharashtra",
      action: "Get Directions"
    }
  ];

  const faqItems = [
    {
      question: "How do I book an event venue?",
      answer: "You can book venues through our AI Assistant, browse our venue directory, or contact our support team for personalized assistance."
    },
    {
      question: "What is included in the venue booking?",
      answer: "Our venue packages typically include the space rental, basic decoration, seating arrangements, and coordination support. Additional services can be added."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can modify or cancel bookings based on our cancellation policy. Terms vary by venue and timing of the request."
    },
    {
      question: "Do you provide catering services?",
      answer: "Yes, we work with premium caterers and can arrange complete dining experiences. Menu options vary by venue and your preferences."
    },
    {
      question: "How does the payment process work?",
      answer: "We accept secure online payments through multiple methods. A booking advance is required, with the balance due before the event."
    },
    {
      question: "Can I see the venue before booking?",
      answer: "Absolutely! You can use our 3D Preview feature online or schedule an in-person visit through our support team."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
      
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1] mb-4">
              <HeadphonesIcon className="inline mr-3 h-12 w-12 text-[#D4AF37]" />
              Contact & Support
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              Get in touch with our expert team for any questions or assistance
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center border-[#D4AF37] hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4 text-[#8B0000]">
                    {method.icon}
                  </div>
                  <h3 className="font-semibold text-[#0C0C0C] mb-2">{method.title}</h3>
                  <p className="text-sm text-[#2F2F2F] mb-2">{method.description}</p>
                  <p className="font-medium text-[#8B0000] mb-3">{method.value}</p>
                  <Button size="sm" variant="outline" className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-[#D4AF37]">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C] flex items-center">
                  <Send className="h-5 w-5 mr-2 text-[#8B0000]" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="border-[#D4AF37]"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
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
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="border-[#D4AF37]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="booking">Booking Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief subject of your message"
                      className="border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      className="border-[#D4AF37] min-h-[120px]"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ & Business Hours */}
            <div className="space-y-6">
              {/* Business Hours */}
              <Card className="border-[#D4AF37]">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C] flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-[#8B0000]" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#2F2F2F]">Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2F2F2F]">Saturday</span>
                      <span className="font-semibold">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2F2F2F]">Sunday</span>
                      <span className="font-semibold">12:00 PM - 5:00 PM</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-[#2F2F2F]">Emergency Support</span>
                        <span className="font-semibold text-[#8B0000]">24/7 Available</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="border-[#D4AF37]">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqItems.slice(0, 4).map((faq, index) => (
                      <div key={index} className="border-b border-[#D4AF37]/20 pb-3 last:border-b-0">
                        <h4 className="font-semibold text-[#0C0C0C] mb-2">{faq.question}</h4>
                        <p className="text-sm text-[#2F2F2F]">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-[#8B0000] text-[#8B0000]">
                    View All FAQs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Office Locations */}
          <Card className="mt-12 border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-[#0C0C0C] flex items-center">
                <Building className="h-5 w-5 mr-2 text-[#8B0000]" />
                Our Offices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-[#0C0C0C] mb-2">Headquarters - Mumbai</h4>
                  <p className="text-sm text-[#2F2F2F]">
                    123 Business District,<br />
                    Bandra Kurla Complex,<br />
                    Mumbai - 400051
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-[#0C0C0C] mb-2">Delhi Office</h4>
                  <p className="text-sm text-[#2F2F2F]">
                    456 Connaught Place,<br />
                    New Delhi - 110001
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-[#0C0C0C] mb-2">Bangalore Office</h4>
                  <p className="text-sm text-[#2F2F2F]">
                    789 MG Road,<br />
                    Bangalore - 560001
                  </p>
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

export default Contact;
