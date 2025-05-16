
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dineVibe-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-secondary py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">DineVibe Features</h1>
            <p className="text-white text-opacity-90">
              Discover what makes DineVibe the ultimate dining experience platform
            </p>
          </div>
        </div>
        
        {/* Features content */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dineVibe-text mb-4">
              The Complete Dining Experience Platform
            </h2>
            <p className="text-xl text-dineVibe-text/80 max-w-3xl mx-auto">
              DineVibe connects food lovers with exceptional dining experiences and helps restaurants 
              showcase their unique offerings through our innovative platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-card border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-3 bg-gradient-to-r from-dineVibe-primary to-dineVibe-secondary"></div>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-dineVibe-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-dineVibe-text">Find Your Flavor, Feel Your Vibe</h3>
                <p className="text-dineVibe-text/80 mb-4">
                  Our event-based discovery system lets you find dining experiences that match not just your 
                  taste in food, but the atmosphere and vibe you're looking for. Whether it's a romantic date, 
                  family gathering, or corporate event, we help you find the perfect match.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="bg-card border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-3 bg-gradient-to-r from-dineVibe-secondary to-dineVibe-primary"></div>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-dineVibe-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-dineVibe-text">Personalized Event Planning</h3>
                <p className="text-dineVibe-text/80 mb-4">
                  Our reservation system allows you to specify details like budget, group size, 
                  special dish requests, and decoration preferences. We take care of communicating 
                  these details to the restaurant, ensuring your event is tailored to your exact needs.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="bg-card border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-3 bg-gradient-to-r from-dineVibe-primary to-dineVibe-secondary"></div>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-dineVibe-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-dineVibe-text">Restaurant Uploaded Deals</h3>
                <p className="text-dineVibe-text/80 mb-4">
                  Restaurants can upload special deals, promotions, and time-limited offers 
                  directly to our platform. Users get access to exclusive discounts and 
                  special menu items not available to the general public.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 4 */}
            <Card className="bg-card border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-3 bg-gradient-to-r from-dineVibe-secondary to-dineVibe-primary"></div>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-dineVibe-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-dineVibe-text">Token-based Booking Confirmation</h3>
                <p className="text-dineVibe-text/80 mb-4">
                  After booking, you'll receive a digital token containing all your reservation details. 
                  This token can be presented at the restaurant, ensuring a smooth check-in process 
                  and verification of your specific requests.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 5 */}
            <Card className="bg-card border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-3 bg-gradient-to-r from-dineVibe-primary to-dineVibe-secondary"></div>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-dineVibe-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-dineVibe-text">Restaurant Dashboard</h3>
                <p className="text-dineVibe-text/80 mb-4">
                  Restaurant owners have access to a powerful dashboard where they can manage their listings, 
                  upload events, track bookings, and communicate with customers. It's a complete restaurant 
                  management solution designed to enhance customer engagement.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 6 */}
            <Card className="bg-card border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-3 bg-gradient-to-r from-dineVibe-secondary to-dineVibe-primary"></div>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-dineVibe-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-dineVibe-text">Google Sign-In Integration</h3>
                <p className="text-dineVibe-text/80 mb-4">
                  Quick and secure login with your Google account makes registration and signing in effortless. 
                  Your profile information is safely stored and helps us personalize your dining recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-dineVibe-text mb-6">Ready to Experience DineVibe?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/user/discovery">
                <Button size="lg" className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                  Explore Restaurants
                </Button>
              </Link>
              <Link to="/user/reservation">
                <Button size="lg" variant="outline" className="border-dineVibe-primary text-dineVibe-primary hover:bg-dineVibe-primary/10">
                  Make a Reservation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
