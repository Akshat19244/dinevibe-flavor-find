
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, AlertCircle, Info } from 'lucide-react';

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
        className="space-y-4"
      >
        <div className="flex items-start space-x-2 bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
          <RadioGroupItem value="pay-at-venue" id="pay-at-venue" className="mt-0.5" />
          <div className="space-y-1 w-full">
            <Label htmlFor="pay-at-venue" className="flex items-center cursor-pointer font-medium">
              <Wallet className="h-4 w-4 mr-2" />
              Pay at Restaurant
            </Label>
            <p className="text-xs text-gray-500">
              No payment information required now. You'll pay directly at the restaurant during your visit.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
          <RadioGroupItem value="credit-card" id="credit-card" className="mt-0.5" />
          <div className="space-y-1 w-full">
            <Label htmlFor="credit-card" className="flex items-center cursor-pointer font-medium">
              <CreditCard className="h-4 w-4 mr-2" />
              Credit/Debit Card
            </Label>
            <p className="text-xs text-gray-500">
              Securely store your payment details for faster checkout. We'll only charge you if you cancel after the free cancellation period.
            </p>
          
            {paymentMethod === 'credit-card' && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm flex items-start">
                  <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-400" />
                  <span>
                    In a production app, you would see a secure payment form here. For this demo, we're simulating the payment flow.
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </RadioGroup>
      
      <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-md flex items-start space-x-2">
        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
        <p className="text-xs text-yellow-700 dark:text-yellow-300">
          A valid credit card may be required to secure your reservation during peak times or for large groups. 
          Cancellations made less than 24 hours in advance may incur a fee.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodForm;
