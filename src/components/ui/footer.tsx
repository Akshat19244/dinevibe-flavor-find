import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2E3A59] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FF6F61] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="text-xl font-bold">DineVibe</span>
            </div>
            <p className="text-white/80 text-sm">
              India's premier platform for dining experiences and event planning. 
              Connecting food lovers with amazing restaurants and venues.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-[#FF6F61] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#FF6F61] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#FF6F61] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#FF6F61] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#FF6F61]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/events" className="text-white/80 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/for-business" className="text-white/80 hover:text-white transition-colors">For Business</Link></li>
              <li><Link to="/partner-with-us" className="text-white/80 hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link to="/3d-preview" className="text-white/80 hover:text-white transition-colors">3D Preview</Link></li>
              <li><Link to="/media" className="text-white/80 hover:text-white transition-colors">Media</Link></li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="font-semibold mb-4 text-[#FF6F61]">For Users</h3>
            <ul className="space-y-2">
              <li><Link to="/user/discovery" className="text-white/80 hover:text-white transition-colors">Discover Restaurants</Link></li>
              <li><Link to="/user/featured-restaurants" className="text-white/80 hover:text-white transition-colors">Featured Restaurants</Link></li>
              <li><Link to="/user/trending-dishes" className="text-white/80 hover:text-white transition-colors">Trending Dishes</Link></li>
              <li><Link to="/user/curated-plans" className="text-white/80 hover:text-white transition-colors">Curated Plans</Link></li>
              <li><Link to="/user/event-planning" className="text-white/80 hover:text-white transition-colors">Event Planning</Link></li>
              <li><Link to="/user/ai-assistant" className="text-white/80 hover:text-white transition-colors">AI Assistant</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-[#FF6F61]">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-[#FF6F61]" />
                <span className="text-white/80 text-sm">123 Food Street, Mumbai, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#FF6F61]" />
                <span className="text-white/80 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#FF6F61]" />
                <span className="text-white/80 text-sm">info@dinevibe.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2024 DineVibe. All rights reserved. | 
            <Link to="/privacy" className="hover:text-[#FF6F61] ml-1">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-[#FF6F61] ml-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
