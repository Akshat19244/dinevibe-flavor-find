
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C0C0C] text-[#FFF5E1] border-t border-[#2F2F2F]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center">
                <span className="text-[#FFF5E1] font-bold text-lg">DV</span>
              </div>
              <span className="text-2xl font-bold">DineVibe</span>
            </div>
            <p className="text-[#FFF5E1]/80 text-sm">
              India's premier platform for luxury dining experiences and premium event planning. 
              Connecting discerning guests with exceptional restaurants and venues.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#D4AF37]">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/discovery" className="text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">Discovery</Link></li>
              <li><Link to="/dining" className="text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">Dining</Link></li>
              <li><Link to="/events" className="text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">Events</Link></li>
              <li><Link to="/ai-assistant" className="text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">AI Assistant</Link></li>
              <li><Link to="/3d-preview" className="text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">3D Preview</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="font-semibold mb-4 text-[#D4AF37]">For Business</h3>
            <ul className="space-y-2">
              <li><Link to="/partner-with-us" className="text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">Partner With Us</Link></li>
              <li><Link to="/owner/dashboard" className="text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">Owner Dashboard</Link></li>
              <li><Link to="/analytics" className="text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">Analytics</Link></li>
              <li><Link to="/contact" className="text-[#FFF5E1]/80 hover:text-[#D4AF37] transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-[#D4AF37]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-[#D4AF37]" />
                <span className="text-[#FFF5E1]/80 text-sm">123 Luxury Square, Mumbai, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-[#FFF5E1]/80 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-[#FFF5E1]/80 text-sm">hello@dinevibe.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2F2F2F] mt-8 pt-8 text-center">
          <p className="text-[#FFF5E1]/60 text-sm">
            © 2024 DineVibe. All rights reserved. | 
            <Link to="/privacy" className="hover:text-[#D4AF37] ml-1">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-[#D4AF37] ml-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
