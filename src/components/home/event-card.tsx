
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  price?: string;
  category: string;
  spots?: number;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  imageUrl,
  date,
  time,
  location,
  price,
  category,
  spots,
}) => {
  return (
    <Card className="overflow-hidden hover-scale h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/70 to-transparent p-3">
          <Badge className="bg-dineVibe-accent">{category}</Badge>
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-dineVibe-primary" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-dineVibe-primary" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-start">
            <MapPin className="w-4 h-4 mr-2 text-dineVibe-primary flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 pb-4">
        <div className="w-full flex justify-between items-center">
          <div>
            {price ? (
              <span className="font-medium">{price}</span>
            ) : (
              <span className="text-green-600 font-medium">Free</span>
            )}
            {spots !== undefined && (
              <span className="text-sm text-gray-500 ml-2">{spots} spots left</span>
            )}
          </div>
          <Button size="sm" className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
            Book Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
