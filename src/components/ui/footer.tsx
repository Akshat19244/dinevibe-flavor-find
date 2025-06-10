
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DineVibe
              </span>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              India's premium dining and event platform, powered by AI technology for unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/user/featured-restaurants" className="block text-slate-300 hover:text-blue-400 transition-colors">
                Featured Restaurants
              </Link>
              <Link to="/user/trending-dishes" className="block text-slate-300 hover:text-blue-400 transition-colors">
                Trending Dishes
              </Link>
              <Link to="/user/curated-plans" className="block text-slate-300 hover:text-blue-400 transition-colors">
                Curated Plans
              </Link>
              <Link to="/user/event-planning" className="block text-slate-300 hover:text-blue-400 transition-colors">
                Event Planning
              </Link>
              <Link to="/3d-preview" className="block text-slate-300 hover:text-blue-400 transition-colors">
                3D Preview
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-slate-300 hover:text-blue-400 transition-colors">
                About Us
              </Link>
              <Link to="/our-story" className="block text-slate-300 hover:text-blue-400 transition-colors">
                Our Story
              </Link>
              <Link to="/media" className="block text-slate-300 hover:text-blue-400 transition-colors">
                Media & Press
              </Link>
              <Link to="/events" className="block text-slate-300 hover:text-blue-400 transition-colors">
                Events
              </Link>
              <Link to="/for-business" className="block text-slate-300 hover:text-blue-400 transition-colors">
                For Business
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <div className="flex items-center text-slate-300">
                <MapPin className="h-4 w-4 mr-2" />
                Mumbai, India
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="h-4 w-4 mr-2" />
                +91 99999 99999
              </div>
              <div className="flex items-center text-slate-300">
                <Mail className="h-4 w-4 mr-2" />
                hello@dinevibe.com
              </div>
            </div>
            <div className="text-slate-400 text-sm">
              © 2024 DineVibe. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
