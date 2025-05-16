
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DealCardProps {
  id: string;
  title: string;
  imageUrl: string;
  discount: string;
  restaurantName: string;
  validUntil: string;
  dealType: 'happy-hour' | 'voucher' | 'combo' | 'discount';
  description: string;
  code?: string;
}

const DealCard: React.FC<DealCardProps> = ({
  id,
  title,
  imageUrl,
  discount,
  restaurantName,
  validUntil,
  dealType,
  description,
  code,
}) => {
  const dealTypeLabels = {
    'happy-hour': 'Happy Hour',
    'voucher': 'Voucher',
    'combo': 'Combo Deal',
    'discount': 'Discount',
  };
  
  const dealTypeColors = {
    'happy-hour': 'bg-blue-500',
    'voucher': 'bg-purple-500',
    'combo': 'bg-green-500',
    'discount': 'bg-dineVibe-primary',
  };
  
  return (
    <Card className="overflow-hidden hover-scale h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <Badge className={dealTypeColors[dealType]}>
            {dealTypeLabels[dealType]}
          </Badge>
        </div>
        <div className="absolute top-0 right-0 bg-dineVibe-primary text-white px-4 py-2 text-lg font-bold">
          {discount}
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">at {restaurantName}</p>
        
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-dineVibe-primary" />
            <span className="text-gray-600">Valid until {validUntil}</span>
          </div>
          
          {code && (
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-dineVibe-primary" />
              <span className="font-medium">Code: {code}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 pb-4">
        <Button className="w-full bg-dineVibe-accent hover:bg-dineVibe-accent/90">
          Claim Deal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DealCard;
