
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Calendar, Users, Utensils } from 'lucide-react';

interface ReservationFormProps {
  reservationData: any;
  setReservationData: (data: any) => void;
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
  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNavigateBack}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-blue-600" />
            Reservation Details
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Information</h3>
            
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={reservationData.name}
                onChange={(e) => setReservationData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={reservationData.phone}
                onChange={(e) => setReservationData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 9876543210"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={reservationData.email}
                onChange={(e) => setReservationData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Special Requests</h3>
            
            <div>
              <Label htmlFor="specialRequests">Special Occasions or Requests</Label>
              <Textarea
                id="specialRequests"
                value={reservationData.specialRequests}
                onChange={(e) => setReservationData(prev => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="Birthday celebration, anniversary, dietary restrictions, etc."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
              <Input
                id="dietaryRestrictions"
                value={reservationData.dietaryRestrictions}
                onChange={(e) => setReservationData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                placeholder="Vegetarian, Vegan, Gluten-free, etc."
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Payment Method</h3>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pay-at-venue"
                  checked={reservationData.paymentMethod === 'pay-at-venue'}
                  onChange={(e) => setReservationData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                />
                <span>Pay at Venue</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="advance-payment"
                  checked={reservationData.paymentMethod === 'advance-payment'}
                  onChange={(e) => setReservationData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                />
                <span>Advance Payment (₹200 booking fee)</span>
              </label>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={reservationData.agreeToTerms}
                onCheckedChange={(checked) => setReservationData(prev => ({ ...prev, agreeToTerms: checked }))}
              />
              <label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and 
                <a href="#" className="text-blue-600 hover:underline ml-1">Cancellation Policy</a>. 
                I understand that late arrivals (more than 15 minutes) may result in table reassignment.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3"
            disabled={!isFormValid()}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Confirm Reservation
          </Button>
          
          <p className="text-xs text-center text-slate-500">
            You will receive a confirmation SMS and email within 5 minutes
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;
