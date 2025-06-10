
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, MapPin, Star } from 'lucide-react';

const CuratedPlans: React.FC = () => {
  const curatedPlans = [
    {
      id: '1',
      title: 'Romantic Date Night',
      description: 'Perfect evening for couples with candlelit dinner and dessert',
      venue: 'Bella Italia Ristorante',
      location: 'Bandra West',
      duration: '3 hours',
      groupSize: '2 people',
      price: '₹3,500',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=400',
      includes: ['3-course meal', 'Wine pairing', 'Dessert', 'Live music'],
      popular: true
    },
    {
      id: '2',
      title: 'Family Celebration Package',
      description: 'Perfect for birthdays and family gatherings',
      venue: 'The Royal Feast',
      location: 'Andheri East',
      duration: '4 hours',
      groupSize: '8-12 people',
      price: '₹8,000',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=400',
      includes: ['Buffet dinner', 'Cake', 'Decorations', 'Photo session'],
      popular: false
    },
    {
      id: '3',
      title: 'Business Lunch Deal',
      description: 'Professional setting for corporate meetings',
      venue: 'Sakura Sushi',
      location: 'Lower Parel',
      duration: '2 hours',
      groupSize: '4-6 people',
      price: '₹4,500',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=400',
      includes: ['Private dining', 'A/V setup', 'Premium menu', 'Service'],
      popular: true
    },
    {
      id: '4',
      title: 'Friends Night Out',
      description: 'Fun evening with friends, drinks and games',
      venue: 'Spice Garden',
      location: 'Juhu',
      duration: '5 hours',
      groupSize: '6-10 people',
      price: '₹6,200',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=400',
      includes: ['Group menu', 'Games area', 'DJ music', 'Unlimited drinks'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Curated Plans
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Specially designed dining experiences for every occasion
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {curatedPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3">
                    <img 
                      src={plan.image} 
                      alt={plan.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    {plan.popular && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{plan.title}</CardTitle>
                          <p className="text-slate-600 text-sm">{plan.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{plan.price}</div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm">{plan.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-slate-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {plan.venue}, {plan.location}
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {plan.duration}
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Users className="h-4 w-4 mr-2" />
                          {plan.groupSize}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Includes:</h4>
                        <div className="flex flex-wrap gap-1">
                          {plan.includes.map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Book This Plan
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CuratedPlans;
