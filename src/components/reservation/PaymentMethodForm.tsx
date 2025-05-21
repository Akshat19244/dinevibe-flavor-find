
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Info } from 'lucide-react';

interface PaymentMethodFormProps {
  paymentMethod: string;
  onChange: (value: string) => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  paymentMethod,
  onChange
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
      <RadioGroup 
        value={paymentMethod}
        onValueChange={onChange}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pay-at-venue" id="pay-at-venue" />
          <Label htmlFor="pay-at-venue" className="flex items-center cursor-pointer">
            Pay at Restaurant
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credit-card" id="credit-card" />
          <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
            <CreditCard className="h-4 w-4 mr-2" />
            Credit/Debit Card
          </Label>
        </div>
      </RadioGroup>
      
      {paymentMethod === 'credit-card' && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          <p className="text-sm flex items-start">
            <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-400" />
            In a production app, you would see a secure payment form here. For this demo, we're simulating the payment flow.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodForm;
