import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info } from 'lucide-react';

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
  const commonDietaryOptions = [
    "None", 
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut Allergy",
    "Shellfish Allergy",
    "Halal",
    "Kosher",
    "Other (please specify)"
  ];

  const handleDietarySelect = (value: string) => {
    if (value === "None") {
      onChange('dietaryRestrictions', '');
    } else if (value === "Other (please specify)") {
      // Keep the current value and let user edit
    } else {
      // If there's existing text, append; otherwise set directly
      const currentText = dietaryRestrictions.trim();
      if (currentText && !currentText.includes(value)) {
        onChange('dietaryRestrictions', `${currentText}, ${value}`);
      } else if (!currentText) {
        onChange('dietaryRestrictions', value);
      }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Additional Requests</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <Textarea 
            id="specialRequests" 
            placeholder="Any special requests for your reservation? (e.g., seating preference, occasion details, high chair needed)"
            value={specialRequests}
            onChange={(e) => onChange('specialRequests', e.target.value)}
            rows={3}
            className="resize-y"
          />
          <p className="text-xs text-gray-500">
            Let us know about any special accommodations or preferences for your visit.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
            <Select onValueChange={handleDietarySelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select common dietary restrictions" />
              </SelectTrigger>
              <SelectContent>
                {commonDietaryOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Textarea 
              id="dietaryRestrictions" 
              placeholder="Describe any food allergies or dietary restrictions (e.g., vegetarian, gluten-free, nut allergy)"
              value={dietaryRestrictions}
              onChange={(e) => onChange('dietaryRestrictions', e.target.value)}
              rows={2}
              className="resize-y"
            />
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md flex items-start space-x-2">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
            <p className="text-xs text-blue-600 dark:text-blue-300">
              While we'll do our best to accommodate all dietary needs, please contact the restaurant directly for severe allergies or complex requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalRequestsForm;
