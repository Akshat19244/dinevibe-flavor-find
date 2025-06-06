import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Brain } from 'lucide-react';
import SmartRecommendations from '@/components/ai/SmartRecommendations';

const Discovery: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Simulate fetching search results from an API
    const fetchSearchResults = async () => {
      // Replace this with your actual API call
      const mockResults = [
        { id: 1, name: 'Bella Italia', cuisine: 'Italian', location: 'Downtown' },
        { id: 2, name: 'Spice Garden', cuisine: 'Indian', location: 'Uptown' },
        { id: 3, name: 'Sushi Zen', cuisine: 'Japanese', location: 'Midtown' },
      ];
      setSearchResults(mockResults);
    };

    if (searchTerm) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName={user?.user_metadata?.name || 'User'} />

      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Discover Amazing Restaurants</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
                Find your perfect dining experience with AI-powered recommendations
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={() => navigate('/user/ai-assistant')}
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Try AI Assistant
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Recommendations Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <SmartRecommendations
              userPreferences={{
                cuisinePreferences: ['italian', 'indian'],
                budgetRange: { min: 500, max: 2000 },
                locationPreferences: ['mumbai'],
                diningStyle: 'casual'
              }}
              context={{ groupSize: 2 }}
            />
          </div>
          
          {/* Search section */}
          <div className="mb-8">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Search for restaurants, cuisines, or locations..."
                className="mr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button>
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Search results */}
          {searchTerm && searchResults.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((result) => (
                  <Card key={result.id}>
                    <CardContent>
                      <h3 className="text-xl font-semibold mb-2">{result.name}</h3>
                      <p className="text-gray-600">Cuisine: {result.cuisine}</p>
                      <p className="text-gray-600">Location: {result.location}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {searchTerm && searchResults.length === 0 && (
            <div className="text-center">
              <p className="text-gray-500">No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discovery;
