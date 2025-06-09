
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DineVibe
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              AI-powered dining and event platform with immersive 3D experiences. 
              Find your flavor, feel your vibe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/user/discovery" className="text-slate-400 hover:text-white transition-colors">Discover Restaurants</Link></li>
              <li><Link to="/user/planning" className="text-slate-400 hover:text-white transition-colors">Event Planning</Link></li>
              <li><Link to="/user/ai-assistant" className="text-slate-400 hover:text-white transition-colors">AI Assistant</Link></li>
              <li><Link to="/user/deals" className="text-slate-400 hover:text-white transition-colors">Deals & Offers</Link></li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Business</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/owner/register-restaurant" className="text-slate-400 hover:text-white transition-colors">List Your Restaurant</Link></li>
              <li><Link to="/owner/dashboard" className="text-slate-400 hover:text-white transition-colors">Owner Dashboard</Link></li>
              <li><Link to="/owner/analytics" className="text-slate-400 hover:text-white transition-colors">Analytics</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Partner With Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-slate-400">Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-slate-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-slate-400">hello@dinevibe.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 DineVibe. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/support" className="text-slate-400 hover:text-white text-sm transition-colors">
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
