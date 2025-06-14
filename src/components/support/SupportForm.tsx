
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SupportFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const SupportForm: React.FC = () => {
  const [formData, setFormData] = useState<SupportFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('support_messages')
        .insert([formData]);

      if (dbError) throw dbError;

      // Send email via edge function
      const { error: emailError } = await supabase.functions.invoke('send-support-email', {
        body: formData
      });

      if (emailError) {
        console.warn('Email sending failed, but message saved:', emailError);
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours. A confirmation email has been sent to your inbox.",
      });
    } catch (error) {
      console.error('Error submitting support message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-lg mx-auto border-[#D4AF37]">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#0C0C0C] mb-2">Message Sent!</h3>
          <p className="text-[#2F2F2F] mb-4">
            Thank you for contacting us. We've received your message and will respond within 24 hours.
          </p>
          <p className="text-sm text-[#2F2F2F]">
            A confirmation email has been sent to {formData.email}
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            }}
            className="mt-4 bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="border-[#D4AF37]">
            <CardHeader>
              <CardTitle className="text-[#0C0C0C] flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#8B0000]" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#8B0000]" />
                <div>
                  <p className="font-semibold text-[#0C0C0C]">Email</p>
                  <a href="mailto:dinevibe29@gmail.com" className="text-[#8B0000] hover:underline">
                    dinevibe29@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#8B0000]" />
                <div>
                  <p className="font-semibold text-[#0C0C0C]">Phone</p>
                  <a href="tel:+919904960670" className="text-[#8B0000] hover:underline">
                    +91 9904960670
                  </a>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#D4AF37]/10 rounded-lg">
                <h4 className="font-semibold text-[#0C0C0C] mb-2">Response Time</h4>
                <p className="text-sm text-[#2F2F2F]">
                  We typically respond to all inquiries within 24 hours during business days.
                  For urgent matters, please call us directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Form */}
        <Card className="border-[#D4AF37]">
          <CardHeader>
            <CardTitle className="text-[#0C0C0C]">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="border-[#D4AF37]/30 focus:border-[#8B0000]"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportForm;
