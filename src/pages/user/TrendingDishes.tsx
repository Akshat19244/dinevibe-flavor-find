
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, MapPin } from 'lucide-react';

const TrendingDishes: React.FC = () => {
  const trendingDishes = [
    {
      id: '1',
      name: 'Truffle Risotto',
      restaurant: 'Bella Italia Ristorante',
      location: 'Bandra West',
      price: '₹1,200',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=400',
      trending: true,
      category: 'Italian'
    },
    {
      id: '2',
      name: 'Butter Chicken',
      restaurant: 'Spice Garden',
      location: 'Juhu',
      price: '₹450',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=400',
      trending: true,
      category: 'Indian'
    },
    {
      id: '3',
      name: 'Dragon Roll Sushi',
      restaurant: 'Sakura Sushi',
      location: 'Lower Parel',
      price: '₹800',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=400',
      trending: false,
      category: 'Japanese'
    },
    {
      id: '4',
      name: 'Biryani Royal',
      restaurant: 'The Royal Feast',
      location: 'Andheri East',
      price: '₹650',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96a?q=80&w=400',
      trending: true,
      category: 'Indian'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Trending Dishes
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Most popular and highly-rated dishes from our partner restaurants
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {dish.trending && (
                    <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
                    {dish.category}
                  </Badge>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{dish.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{dish.price}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{dish.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-slate-800">{dish.restaurant}</p>
                    <div className="flex items-center text-slate-600 text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {dish.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrendingDishes;
