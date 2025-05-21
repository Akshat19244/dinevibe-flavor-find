
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InfoCircle } from 'lucide-react';

interface ContactFormProps {
  name: string;
  phone: string;
  email: string;
  onChange: (field: string, value: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  name, 
  phone, 
  email, 
  onChange 
}) => {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Simple validation for phone format
    return phone.length >= 10;
  };

  const isEmailValid = !email || validateEmail(email);
  const isPhoneValid = !phone || validatePhone(phone);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input 
            id="name" 
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <div>
            <Input 
              id="phone" 
              value={phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="e.g., +1 (555) 123-4567"
              required
              className={!isPhoneValid && phone ? "border-red-400" : ""}
            />
            {!isPhoneValid && phone && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <InfoCircle className="h-3 w-3 mr-1" />
                Please enter a valid phone number
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">Email *</Label>
          <div>
            <Input 
              id="email" 
              type="email"
              value={email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="your.email@example.com"
              required
              className={!isEmailValid && email ? "border-red-400" : ""}
            />
            {!isEmailValid && email && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <InfoCircle className="h-3 w-3 mr-1" />
                Please enter a valid email address
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
