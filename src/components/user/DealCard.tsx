
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { claimDeal } from '@/lib/api/deals';
import { Deal } from '@/lib/api/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Loader2, Calendar, Clock, Percent, Tag, PartyPopper } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [claimed, setClaimed] = useState(false);
  
  // Format dates
  const validFrom = deal.valid_from ? format(new Date(deal.valid_from), 'PPP') : 'Now';
  const validUntil = deal.valid_until ? format(new Date(deal.valid_until), 'PPP') : 'Until further notice';
  
  const handleClaimDeal = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to claim this deal.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await claimDeal(deal.id, deal.restaurant_id);
      setClaimed(true);
      setShowDialog(true);
    } catch (error) {
      console.error('Error claiming deal:', error);
      toast({
        title: "Error",
        description: "Failed to claim the deal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Card className="h-full flex flex-col overflow-hidden">
        <div className="h-48 relative overflow-hidden">
          {/* Deal image */}
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt={deal.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {deal.is_new && (
              <Badge className="bg-blue-500">New</Badge>
            )}
            {deal.is_popular && (
              <Badge className="bg-orange-500">Popular</Badge>
            )}
            {deal.discount_percentage && (
              <Badge className="bg-green-500">{deal.discount_percentage}% Off</Badge>
            )}
          </div>
        </div>
        
        <CardHeader className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">{deal.title}</h3>
            <Badge variant="outline">{deal.type}</Badge>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {deal.restaurant_name || 'Restaurant Name'}
          </p>
          <p className="text-sm">{deal.description}</p>
        </CardHeader>
        
        <CardContent className="pb-0">
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>Valid from {validFrom} to {validUntil}</span>
            </div>
            {deal.terms && (
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-xs text-gray-500">{deal.terms}</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-4">
          <Button 
            className="w-full" 
            onClick={handleClaimDeal} 
            disabled={isLoading || claimed}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : claimed ? (
              <>
                <PartyPopper className="mr-2 h-4 w-4" />
                Claimed!
              </>
            ) : (
              'Claim Deal'
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription>
              You've successfully claimed the deal: {deal.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">{deal.title}</h3>
              <p className="mb-4">{deal.description}</p>
              
              {deal.discount_percentage && (
                <div className="flex justify-center mb-4">
                  <Badge className="bg-green-500 text-lg py-1 px-3">
                    <Percent className="mr-1 h-4 w-4" />
                    {deal.discount_percentage}% Off
                  </Badge>
                </div>
              )}
              
              <p className="text-sm">
                <span className="font-medium">Valid until:</span> {validUntil}
              </p>
              
              {deal.code && (
                <div className="mt-4">
                  <p className="text-xs mb-1">Use this code at the restaurant:</p>
                  <div className="bg-white border border-gray-200 rounded py-2 px-4 font-mono text-xl">
                    {deal.code}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)} className="sm:flex-1">
              Close
            </Button>
            <Button 
              onClick={() => {
                setShowDialog(false);
                navigate('/user/deals');
              }}
              className="sm:flex-1"
            >
              View My Deals
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DealCard;
