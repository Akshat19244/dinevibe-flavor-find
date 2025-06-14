
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SupportForm from '@/components/support/SupportForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Headphones,
  MessageCircle
} from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1] mb-4">
              <MessageCircle className="inline mr-3 h-12 w-12 text-[#D4AF37]" />
              Contact DineVibe
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              Have questions? Need support? We're here to help you create amazing dining experiences.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-[#D4AF37] hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Mail className="h-12 w-12 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold text-[#0C0C0C] mb-2">Email Support</h3>
                <p className="text-sm text-[#2F2F2F] mb-3">
                  Get in touch via email for detailed inquiries
                </p>
                <a 
                  href="mailto:dinevibe29@gmail.com" 
                  className="text-[#8B0000] hover:underline font-medium"
                >
                  dinevibe29@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center border-[#D4AF37] hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Phone className="h-12 w-12 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold text-[#0C0C0C] mb-2">Phone Support</h3>
                <p className="text-sm text-[#2F2F2F] mb-3">
                  Call us for immediate assistance
                </p>
                <a 
                  href="tel:+919904960670" 
                  className="text-[#8B0000] hover:underline font-medium"
                >
                  +91 9904960670
                </a>
              </CardContent>
            </Card>

            <Card className="text-center border-[#D4AF37] hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold text-[#0C0C0C] mb-2">Response Time</h3>
                <p className="text-sm text-[#2F2F2F] mb-3">
                  We respond within 24 hours
                </p>
                <span className="text-[#8B0000] font-medium">
                  Mon - Sun: 24/7 Support
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Support Form */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0C0C0C] mb-4">
                Send us a Message
              </h2>
              <p className="text-lg text-[#2F2F2F] max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible. 
                Your inquiry will be sent directly to our support team.
              </p>
            </div>
            <SupportForm />
          </div>

          {/* FAQ Section */}
          <Card className="border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#0C0C0C] flex items-center justify-center">
                <Headphones className="h-6 w-6 mr-2 text-[#8B0000]" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#0C0C0C] mb-2">How do I make a reservation?</h4>
                    <p className="text-sm text-[#2F2F2F]">
                      Use our AI dining experience or browse venues on the dining page. Select your preferred venue, date, and time to book instantly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0C0C0C] mb-2">How can I partner with DineVibe?</h4>
                    <p className="text-sm text-[#2F2F2F]">
                      Visit our "Partner With Us" page to register your venue. Upload photos, menu images, and business details to get started.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0C0C0C] mb-2">Is there a booking fee?</h4>
                    <p className="text-sm text-[#2F2F2F]">
                      No, DineVibe doesn't charge users any booking fees. You only pay the venue directly for your dining or event.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#0C0C0C] mb-2">How does the AI assistant work?</h4>
                    <p className="text-sm text-[#2F2F2F]">
                      Our AI assistant helps you find venues, plan events, and answer questions. It's context-aware and adapts to the page you're on.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0C0C0C] mb-2">Can I cancel my booking?</h4>
                    <p className="text-sm text-[#2F2F2F]">
                      Cancellation policies vary by venue. Check your booking confirmation email or contact the venue directly for their specific policy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0C0C0C] mb-2">How do I track my booking?</h4>
                    <p className="text-sm text-[#2F2F2F]">
                      Use your booking token or check your user dashboard to track reservation status and communicate with venue owners.
                    </p>
                  </div>
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
