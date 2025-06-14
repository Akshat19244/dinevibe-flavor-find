
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, MapPin, Calendar, Users, TrendingUp, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CommunityPost {
  id: string;
  title: string;
  image: string;
  eventType: string;
  tags: string[];
  date: string;
  location: string;
  venue: string;
  venueId: string;
  type: 'event' | 'deal' | 'announcement';
  likes: number;
  isLiked: boolean;
}

const CommunityPanel: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'events' | 'deals' | 'announcements'>('all');

  // Sample data - would come from API in real implementation
  useEffect(() => {
    const samplePosts: CommunityPost[] = [
      {
        id: '1',
        title: 'Rooftop Wedding Reception at Royal Garden Palace',
        image: 'https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=400',
        eventType: 'Wedding Reception',
        tags: ['#Rooftop', '#Wedding', '#LiveMusic', '#Garden'],
        date: '2024-03-15',
        location: 'Mumbai',
        venue: 'Royal Garden Palace',
        venueId: 'venue-1',
        type: 'event',
        likes: 124,
        isLiked: false
      },
      {
        id: '2',
        title: '50% Off on Weekend Bookings - Limited Time!',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400',
        eventType: 'Special Offer',
        tags: ['#Weekend', '#Discount', '#FamilyDining'],
        date: '2024-03-20',
        location: 'Delhi',
        venue: 'The Royal Banquet',
        venueId: 'venue-2',
        type: 'deal',
        likes: 89,
        isLiked: true
      },
      {
        id: '3',
        title: 'New Safety Protocols and Enhanced Services',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400',
        eventType: 'Platform Update',
        tags: ['#Safety', '#Enhancement', '#CustomerCare'],
        date: '2024-03-18',
        location: 'All Cities',
        venue: 'DineVibe Team',
        venueId: 'admin',
        type: 'announcement',
        likes: 67,
        isLiked: false
      }
    ];
    setPosts(samplePosts);
  }, []);

  const filteredPosts = posts.filter(post => 
    activeFilter === 'all' || post.type === activeFilter.slice(0, -1)
  );

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-[#8B0000] text-[#FFF5E1]';
      case 'deal': return 'bg-[#D4AF37] text-[#0C0C0C]';
      case 'announcement': return 'bg-blue-600 text-white';
      default: return 'bg-[#2F2F2F] text-[#FFF5E1]';
    }
  };

  return (
    <div className="w-full bg-[#FFF5E1] py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-[#8B0000]" />
            <h2 className="text-3xl font-bold text-[#0C0C0C]">Happening Around You</h2>
          </div>
          <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
            <Bell className="h-4 w-4 mr-2" />
            Get Notified
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-6">
          {['all', 'events', 'deals', 'announcements'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              className={activeFilter === filter 
                ? 'bg-[#8B0000] text-[#FFF5E1]' 
                : 'border-[#2F2F2F] text-[#2F2F2F]'
              }
              onClick={() => setActiveFilter(filter as any)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-[#D4AF37] overflow-hidden">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-4 left-4 ${getPostTypeColor(post.type)}`}>
                  {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </Badge>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`bg-white/90 hover:bg-white ${post.isLiked ? 'text-red-500' : 'text-[#2F2F2F]'}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="ml-1 text-xs">{post.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-[#2F2F2F]"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-[#0C0C0C] mb-2 line-clamp-2">{post.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-[#2F2F2F] text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{post.venue}, {post.location}</span>
                  </div>
                  <div className="flex items-center text-[#2F2F2F] text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-[#D4AF37] text-[#8B0000]">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs border-[#2F2F2F] text-[#2F2F2F]">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <Link to={post.venueId === 'admin' ? '/admin/dashboard' : `/venue/${post.venueId}`}>
                  <Button className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                    {post.type === 'deal' ? 'View Deal' : post.type === 'announcement' ? 'Learn More' : 'View Venue'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 mx-auto mb-4 text-[#D4AF37]" />
            <h3 className="text-xl font-semibold text-[#0C0C0C] mb-2">No posts yet</h3>
            <p className="text-[#2F2F2F]">Be the first to share something amazing!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPanel;
