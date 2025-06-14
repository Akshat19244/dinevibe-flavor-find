
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  Utensils,
  Calendar,
  Users,
  Star
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C0C0C] text-[#FFF5E1] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Utensils className="h-8 w-8 text-[#D4AF37]" />
              <span className="text-2xl font-bold">DineVibe</span>
            </div>
            <p className="text-[#FFF5E1]/80">
              India's premier platform for discovering exceptional dining experiences and planning memorable events with AI-powered recommendations.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#D4AF37]">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/discovery" className="block text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Discover Venues</span>
                </div>
              </Link>
              <Link to="/dining" className="block text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">
                <div className="flex items-center space-x-2">
                  <Utensils className="h-4 w-4" />
                  <span>Dining</span>
                </div>
              </Link>
              <Link to="/events" className="block text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Events</span>
                </div>
              </Link>
              <Link to="/ai-assistant" className="block text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4" />
                  <span>AI Assistant</span>
                </div>
              </Link>
            </div>
          </div>

          {/* For Business */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#D4AF37]">For Business</h3>
            <div className="space-y-2">
              <Link to="/partner-with-us" className="block text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">
                Partner With Us
              </Link>
              <Link to="/owner/dashboard" className="block text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">
                Owner Dashboard
              </Link>
              <Link to="/owner/register-venue" className="block text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">
                Register Venue
              </Link>
              <Link to="/owner/analytics" className="block text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">
                Analytics
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#D4AF37]">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#D4AF37]" />
                <div>
                  <p className="text-sm text-[#FFF5E1]/60">Email</p>
                  <a 
                    href="mailto:dinevibe29@gmail.com" 
                    className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors"
                  >
                    dinevibe29@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#D4AF37]" />
                <div>
                  <p className="text-sm text-[#FFF5E1]/60">Phone</p>
                  <a 
                    href="tel:+919904960670" 
                    className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors"
                  >
                    +91 9904960670
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#D4AF37]" />
                <div>
                  <p className="text-sm text-[#FFF5E1]/60">Location</p>
                  <p className="text-[#FFF5E1]">India</p>
                </div>
              </div>
            </div>
            <Link to="/contact">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#0C0C0C] w-full">
                Get Support
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#FFF5E1]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#FFF5E1]/60 text-sm text-center md:text-left">
              © {currentYear} DineVibe. All rights reserved. Crafted with ❤️ for extraordinary dining experiences.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-[#FFF5E1]/60 hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#FFF5E1]/60 hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-[#FFF5E1]/60 hover:text-[#D4AF37] transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
