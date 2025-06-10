
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import HeroSection from '@/components/home/hero-section';
import FeaturedSection from '@/components/home/featured-section';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  // Top-rated restaurants (>4.2 stars) for homepage display
  const topRatedRestaurants = [
    {
      id: '1',
      name: 'Bella Italia Ristorante',
      imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1000',
      cuisine: 'Italian',
      rating: 4.7,
      priceRange: '₹₹₹',
      location: 'Bandra West, Mumbai',
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
      location: 'Juhu, Mumbai',
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
      location: 'Lower Parel, Mumbai',
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
      location: 'Andheri East, Mumbai',
      isNew: false,
      hasDeals: true,
      waitTime: 0
    },
    {
      id: '5',
      name: 'Mumbai Darbar',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000',
      cuisine: 'North Indian',
      rating: 4.4,
      priceRange: '₹₹₹',
      location: 'Colaba, Mumbai',
      isNew: false,
      hasDeals: true,
      waitTime: 12
    },
    {
      id: '6',
      name: 'Coastal Breeze',
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000',
      cuisine: 'Seafood',
      rating: 4.3,
      priceRange: '₹₹₹',
      location: 'Worli, Mumbai',
      isNew: true,
      hasDeals: false,
      waitTime: 5
    }
  ];

  // Filter only restaurants with rating > 4.2
  const premiumRestaurants = topRatedRestaurants.filter(restaurant => restaurant.rating > 4.2);

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
    },
    {
      id: 'corporate1',
      name: 'Corporate Event Packages',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
      cuisine: 'Corporate Events',
      rating: 4.6,
      priceRange: '₹₹₹',
      location: 'Business Hotels',
      isNew: false,
      hasDeals: true
    },
    {
      id: 'birthday1',
      name: 'Birthday Celebration Themes',
      imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1000',
      cuisine: 'Birthday Planning',
      rating: 4.5,
      priceRange: '₹₹',
      location: 'Party Venues',
      isNew: true,
      hasDeals: true
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
            subtitle="Discover premium restaurants with ratings above 4.2 stars - personally verified and customer approved"
            viewAllLink="/user/featured-restaurants"
            restaurants={premiumRestaurants}
          />
          
          <FeaturedSection
            title="Trending Events"
            subtitle="Popular event planning packages curated by our AI - from intimate gatherings to grand celebrations"
            viewAllLink="/user/event-planning"
            restaurants={trendingEvents}
          />
        </div>

        {/* Quick Access Section */}
        <div className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Quick Access</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link to="/user/featured-restaurants" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">🍽️</div>
                <h3 className="font-semibold">Featured Restaurants</h3>
              </Link>
              <Link to="/user/trending-dishes" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">🔥</div>
                <h3 className="font-semibold">Trending Dishes</h3>
              </Link>
              <Link to="/user/curated-plans" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">✨</div>
                <h3 className="font-semibold">Curated Plans</h3>
              </Link>
              <Link to="/user/event-planning" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">🎉</div>
                <h3 className="font-semibold">Event Planning</h3>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
