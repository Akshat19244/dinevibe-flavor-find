
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface TermsAgreementProps {
  agreeToTerms: boolean;
  onChange: (checked: boolean) => void;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({
  agreeToTerms,
  onChange
}) => {
  return (
    <div className="pt-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={agreeToTerms}
          onCheckedChange={(checked) => onChange(!!checked)}
          required
        />
        <Label 
          htmlFor="terms" 
          className="text-sm font-medium cursor-pointer"
        >
          I agree to the booking terms and cancellation policy
        </Label>
      </div>
      
      <p className="text-xs text-gray-500 mt-2 pl-6">
        Cancellations made less than 24 hours before the reservation may incur a fee.
        No-shows may be subject to a charge of up to 25% of the estimated bill.
      </p>
    </div>
  );
};

export default TermsAgreement;
