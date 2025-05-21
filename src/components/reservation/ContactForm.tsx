
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input 
            id="phone" 
            value={phone}
            onChange={(e) => onChange('phone', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
