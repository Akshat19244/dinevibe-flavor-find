
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AdditionalRequestsFormProps {
  specialRequests: string;
  dietaryRestrictions: string;
  onChange: (field: string, value: string) => void;
}

const AdditionalRequestsForm: React.FC<AdditionalRequestsFormProps> = ({
  specialRequests,
  dietaryRestrictions,
  onChange
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Additional Requests</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <Textarea 
            id="specialRequests" 
            placeholder="Any special requests for your reservation? (e.g., seating preference, occasion details)"
            value={specialRequests}
            onChange={(e) => onChange('specialRequests', e.target.value)}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
          <Textarea 
            id="dietaryRestrictions" 
            placeholder="Any food allergies or dietary restrictions? (e.g., vegetarian, gluten-free, nut allergy)"
            value={dietaryRestrictions}
            onChange={(e) => onChange('dietaryRestrictions', e.target.value)}
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalRequestsForm;
