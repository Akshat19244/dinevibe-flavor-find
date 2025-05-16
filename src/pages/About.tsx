
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dineVibe-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-secondary py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">About DineVibe</h1>
            <p className="text-white text-opacity-90">
              Learn about our mission to connect food lovers with amazing restaurant experiences
            </p>
          </div>
        </div>
        
        {/* About content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-dineVibe-text">Our Story</h2>
              <div className="space-y-4 text-dineVibe-text/90">
                <p>
                  DineVibe was born from a simple idea: dining out should be more than just eating—it should be an experience to remember. 
                  Founded in 2023 in Ahmedabad, we set out to transform how people discover and book memorable dining experiences.
                </p>
                <p>
                  What started as a small project to connect local food enthusiasts with unique restaurant events has quickly grown 
                  into a comprehensive platform serving both diners and restaurant owners across the region.
                </p>
                <p>
                  Our platform specializes in event-based discovery, enabling users to find dining experiences based on special occasions, 
                  moods, or specific preferences, moving beyond the typical restaurant search experience.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-12 mb-6 text-dineVibe-text">Our Team</h2>
              <div className="space-y-4 text-dineVibe-text/90">
                <p>
                  DineVibe is powered by a passionate team of food lovers, tech enthusiasts, and hospitality experts who believe in 
                  the power of great food to bring people together.
                </p>
                <p>
                  Our diverse team works closely with restaurant partners to ensure that every experience listed on our platform 
                  meets our high standards for quality, value, and memorability.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-dineVibe-text">Our Mission</h2>
              <Card className="bg-card border-none shadow-lg mb-8">
                <CardContent className="p-6">
                  <p className="text-xl text-dineVibe-text/90 italic">
                    "To connect food lovers with extraordinary dining experiences that match their unique preferences, 
                    while helping restaurants showcase their creativity and build lasting relationships with customers."
                  </p>
                </CardContent>
              </Card>
              
              <h2 className="text-2xl font-bold mt-12 mb-6 text-dineVibe-text">What Makes Us Different</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-dineVibe-primary/20 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dineVibe-text">Experience-Focused</h3>
                    <p className="text-dineVibe-text/80">
                      We curate dining experiences based on occasions and preferences, not just cuisine or location.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dineVibe-primary/20 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dineVibe-text">Personalized Planning</h3>
                    <p className="text-dineVibe-text/80">
                      Our platform tailors recommendations based on your preferences and desired atmosphere.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dineVibe-primary/20 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dineVibe-text">Restaurant Partnership</h3>
                    <p className="text-dineVibe-text/80">
                      We work directly with restaurants to create exclusive events and offers for our users.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dineVibe-primary/20 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-dineVibe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dineVibe-text">Seamless Booking</h3>
                    <p className="text-dineVibe-text/80">
                      Our token-based reservation system makes booking and confirmation simple and reliable.
                    </p>
                  </div>
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

export default About;
