
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Calendar, Utensils } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const HeroSection: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 theme-gradient opacity-90 z-0"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-20 h-20 bg-primary/15 rounded-full blur-xl"></div>
      </div>
      
      {/* Image background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-md border border-primary/20 rounded-full px-6 py-2 mb-8 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">
              AI-Powered Event & Dining Ecosystem
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 animate-fade-in-up stagger-1">
            Find Your Flavor,
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Feel Your Vibe
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-2">
            Experience the future of dining and events with our AI-powered platform. 
            From instant reservations to immersive 3D event planning, discover culinary adventures like never before.
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up stagger-3">
            <Link to="/user/discovery">
              <Button size="lg" className="bg-background/20 backdrop-blur-md text-foreground border border-primary/30 hover:bg-background/30 text-lg px-8 py-4 group">
                <Utensils className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Explore Restaurants
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/user/planning">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-foreground/20 text-foreground hover:bg-foreground/10 text-lg px-8 py-4 backdrop-blur-md group">
                <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Plan Events
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in-up stagger-4">
            <div className="glass-effect p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
              <p className="text-foreground/70 text-sm">Smart recommendations and instant planning</p>
            </div>
            
            <div className="glass-effect p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3D Previews</h3>
              <p className="text-foreground/70 text-sm">Immersive venue walkthroughs</p>
            </div>
            
            <div className="glass-effect p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Utensils className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-time</h3>
              <p className="text-foreground/70 text-sm">Live wait times and instant bookings</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path fill="hsl(var(--background))" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
