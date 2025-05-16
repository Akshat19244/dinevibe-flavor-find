
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send the form data to a server
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond as soon as possible.",
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-dineVibe-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-secondary py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
            <p className="text-white text-opacity-90">
              Get in touch with our team for any questions or assistance
            </p>
          </div>
        </div>
        
        {/* Contact information */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6 text-dineVibe-text">Get In Touch</h2>
              <div className="space-y-8">
                <Card className="bg-card border-none shadow-lg overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-dineVibe-primary/20 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-dineVibe-text">Phone</h3>
                        <p className="text-dineVibe-text/70">9904960670</p>
                        <p className="text-dineVibe-text/70">6355781137</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-none shadow-lg overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-dineVibe-primary/20 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-dineVibe-text">Email</h3>
                        <p className="text-dineVibe-text/70">info@dinevibe.com</p>
                        <p className="text-dineVibe-text/70">support@dinevibe.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-none shadow-lg overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-dineVibe-primary/20 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-dineVibe-text">Location</h3>
                        <p className="text-dineVibe-text/70">Ahmedabad, Gujarat</p>
                        <p className="text-dineVibe-text/70">India</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-none shadow-lg overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-dineVibe-primary/20 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-dineVibe-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-dineVibe-text">Instagram</h3>
                        <a 
                          href="https://www.instagram.com/dinevibe56/?hl=en" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-dineVibe-primary hover:underline"
                        >
                          @dinevibe56
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="bg-card border-none shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-dineVibe-text">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          required
                          className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                          className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter message subject"
                        required
                        className="bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message here..."
                        required
                        className="min-h-[150px] bg-dineVibe-dark/50 border-gray-700 focus:border-dineVibe-primary"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Map placeholder */}
              <div className="mt-8 rounded-lg overflow-hidden h-[300px] bg-card flex items-center justify-center">
                <div className="text-center">
                  <p className="text-dineVibe-text/70 mb-2">Map view will be integrated here</p>
                  <p className="text-dineVibe-text font-medium">Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
