
import React from 'react';
import RestaurantCard from './restaurant-card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink: string;
  restaurants: Array<{
    id: string;
    name: string;
    imageUrl: string;
    cuisine: string;
    rating: number;
    priceRange: string;
    location: string;
    isNew?: boolean;
    hasDeals?: boolean;
  }>;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  subtitle,
  viewAllLink,
  restaurants,
}) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
          <Link to={viewAllLink} className="mt-4 md:mt-0">
            <Button variant="ghost" className="text-dineVibe-primary">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
