
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="terms">
          <AccordionTrigger className="text-xs text-gray-500 pl-6 py-1 hover:no-underline">
            View full terms and conditions
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-500 pl-6">
            <ul className="list-disc pl-4 space-y-1">
              <li>Cancellations made less than 24 hours before the reservation may incur a fee.</li>
              <li>No-shows may be subject to a charge of up to 25% of the estimated bill.</li>
              <li>For groups larger than 8, please contact the restaurant directly.</li>
              <li>Special requests are subject to availability and cannot be guaranteed.</li>
              <li>The restaurant reserves the right to limit dining time during peak hours.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TermsAgreement;
