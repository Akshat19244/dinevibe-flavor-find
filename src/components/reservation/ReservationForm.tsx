
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from './ContactForm';
import AdditionalRequestsForm from './AdditionalRequestsForm';
import PaymentMethodForm from './PaymentMethodForm';
import TermsAgreement from './TermsAgreement';

interface ReservationFormProps {
  reservationData: {
    name: string;
    phone: string;
    email: string;
    specialRequests: string;
    dietaryRestrictions: string;
    agreeToTerms: boolean;
    paymentMethod: string;
  };
  setReservationData: React.Dispatch<React.SetStateAction<{
    name: string;
    phone: string;
    email: string;
    specialRequests: string;
    dietaryRestrictions: string;
    agreeToTerms: boolean;
    paymentMethod: string;
  }>>;
  isFormValid: () => boolean;
  handleSubmit: (e: React.FormEvent) => void;
  onNavigateBack: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  reservationData,
  setReservationData,
  isFormValid,
  handleSubmit,
  onNavigateBack
}) => {
  const handleFieldChange = (field: string, value: string) => {
    setReservationData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservation Details</CardTitle>
        <CardDescription>
          Fill in your information to complete the booking
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <ContactForm 
              name={reservationData.name}
              phone={reservationData.phone}
              email={reservationData.email}
              onChange={handleFieldChange}
            />
            
            <AdditionalRequestsForm
              specialRequests={reservationData.specialRequests}
              dietaryRestrictions={reservationData.dietaryRestrictions}
              onChange={handleFieldChange}
            />
            
            <PaymentMethodForm
              paymentMethod={reservationData.paymentMethod}
              onChange={(value) => handleFieldChange('paymentMethod', value)}
            />
            
            <TermsAgreement
              agreeToTerms={reservationData.agreeToTerms}
              onChange={(checked) => 
                setReservationData(prev => ({
                  ...prev,
                  agreeToTerms: checked
                }))
              }
            />
          </div>
          
          <CardFooter className="px-0 pt-6">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={onNavigateBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                disabled={!isFormValid()}
              >
                Confirm Reservation
              </Button>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;
