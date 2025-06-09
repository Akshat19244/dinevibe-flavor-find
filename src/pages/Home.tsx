
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import HeroSection from '@/components/home/hero-section';
import FeaturedSection from '@/components/home/featured-section';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  // Mock featured restaurants data with ratings > 4.2
  const featuredRestaurants = [
    {
      id: '1',
      name: 'Bella Italia Ristorante',
      imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1000',
      cuisine: 'Italian',
      rating: 4.7,
      priceRange: '₹₹₹',
      location: 'Bandra West',
      isNew: false,
      hasDeals: true,
      waitTime: 15
    },
    {
      id: '2',
      name: 'Spice Garden',
      imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000',
      cuisine: 'Indian',
      rating: 4.5,
      priceRange: '₹₹',
      location: 'Juhu',
      isNew: true,
      hasDeals: false,
      waitTime: 8
    },
    {
      id: '3',
      name: 'Sakura Sushi',
      imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1000',
      cuisine: 'Japanese',
      rating: 4.6,
      priceRange: '₹₹₹₹',
      location: 'Lower Parel',
      isNew: false,
      hasDeals: false,
      waitTime: 25
    },
    {
      id: '4',
      name: 'The Royal Feast',
      imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000',
      cuisine: 'Multi-Cuisine',
      rating: 4.8,
      priceRange: '₹₹₹₹',
      location: 'Andheri East',
      isNew: false,
      hasDeals: true,
      waitTime: 0
    }
  ];

  const trendingEvents = [
    {
      id: 'wedding1',
      name: 'Royal Wedding Package',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=1000',
      cuisine: 'Wedding Planning',
      rating: 4.9,
      priceRange: '₹₹₹₹',
      location: 'Multiple Venues',
      isNew: true,
      hasDeals: true
    },
    {
      id: 'reception1',
      name: 'Garden Reception Setup',
      imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1000',
      cuisine: 'Reception Planning',
      rating: 4.7,
      priceRange: '₹₹₹',
      location: 'Garden Venues',
      isNew: false,
      hasDeals: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        userType={user ? (user.user_metadata?.userType || 'customer') : null}
        userName={user?.user_metadata?.name}
      />
      
      <main className="flex-grow">
        <HeroSection />
        
        <div className="bg-slate-900 text-white">
          <FeaturedSection
            title="Top Rated Restaurants"
            subtitle="Discover restaurants with ratings above 4.2 stars"
            viewAllLink="/user/discovery"
            restaurants={featuredRestaurants}
          />
          
          <FeaturedSection
            title="Trending Events"
            subtitle="Popular event planning packages curated by our AI"
            viewAllLink="/user/planning"
            restaurants={trendingEvents}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
