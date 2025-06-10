
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  ExternalLink,
  Play,
  Image,
  FileText,
  Award,
  Users,
  TrendingUp,
  Camera
} from 'lucide-react';

const Media: React.FC = () => {
  const pressReleases = [
    {
      title: "DineVibe Launches AI-Powered 3D Venue Preview Technology",
      date: "December 15, 2024",
      source: "TechCrunch India",
      excerpt: "Revolutionary 3D modeling technology transforms how customers preview event venues before booking...",
      link: "#",
      featured: true
    },
    {
      title: "Premium Dining Platform Secures Partnerships with Top Mumbai Restaurants",
      date: "December 10, 2024", 
      source: "Economic Times",
      excerpt: "DineVibe expands its network of verified premium restaurants, focusing on quality over quantity...",
      link: "#",
      featured: false
    },
    {
      title: "AI Wait Time Prediction Reduces Restaurant Queues by 40%",
      date: "December 5, 2024",
      source: "YourStory",
      excerpt: "Machine learning algorithms help customers avoid long waits and optimize their dining experience...",
      link: "#",
      featured: false
    },
    {
      title: "Wedding Industry Embraces Virtual Venue Tours",
      date: "November 28, 2024",
      source: "WeddingWire India",
      excerpt: "Couples can now experience their dream wedding venue in immersive 3D before making final decisions...",
      link: "#",
      featured: false
    }
  ];

  const mediaKit = [
    {
      type: "Logo Package",
      description: "High-resolution DineVibe logos in various formats",
      icon: Image,
      download: "dinevibe-logos.zip"
    },
    {
      type: "Press Kit",
      description: "Company fact sheet, executive bios, and key statistics",
      icon: FileText,
      download: "dinevibe-presskit.pdf"
    },
    {
      type: "Product Screenshots", 
      description: "High-quality app screenshots and feature images",
      icon: Camera,
      download: "dinevibe-screenshots.zip"
    }
  ];

  const eventGallery = [
    {
      title: "Royal Wedding at Crystal Palace",
      type: "Wedding",
      date: "December 2024",
      image: "https://images.unsplash.com/photo-1519167758481-83f29c2c47bf",
      description: "500-guest wedding featuring AI-designed royal theme"
    },
    {
      title: "Tech Startup Launch Event",
      type: "Corporate",
      date: "November 2024", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      description: "Product launch with modern venue styling"
    },
    {
      title: "Garden Reception Celebration",
      type: "Reception",
      date: "November 2024",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38",
      description: "Outdoor reception with floral theme design"
    },
    {
      title: "Intimate Birthday Party",
      type: "Birthday",
      date: "October 2024",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      description: "Personalized celebration for milestone birthday"
    },
    {
      title: "Corporate Annual Dinner",
      type: "Corporate",
      date: "October 2024",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
      description: "Elegant corporate event at premium hotel venue"
    },
    {
      title: "Baby Shower Celebration",
      type: "Baby Shower",
      date: "September 2024",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
      description: "Themed baby shower with custom decorations"
    }
  ];

  const stats = [
    { label: "Events Planned", value: "1,200+", icon: Calendar },
    { label: "Media Mentions", value: "50+", icon: FileText },
    { label: "Award Nominations", value: "5", icon: Award },
    { label: "Industry Partners", value: "500+", icon: Users }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Media & Press
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover DineVibe's journey, achievements, and the stories behind India's premium dining and event platform.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Stats Section */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Press Releases */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Latest Press Coverage</h2>
            <div className="space-y-6">
              {pressReleases.map((article, index) => (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${article.featured ? 'border-blue-500 border-2' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          {article.featured && (
                            <Badge className="bg-blue-600 text-white">Featured</Badge>
                          )}
                          <span className="text-sm text-slate-600">{article.date}</span>
                          <span className="text-sm text-blue-600 font-medium">{article.source}</span>
                        </div>
                        <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                        <p className="text-slate-600">{article.excerpt}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4 flex-shrink-0">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Read More
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Media Kit */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Media Kit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mediaKit.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{item.type}</h3>
                    <p className="text-slate-600 mb-4">{item.description}</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Download {item.download}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Event Gallery */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Event Gallery</h2>
            <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
              Showcasing successful events planned through DineVibe's platform, featuring our AI-designed themes and premium venue partnerships.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventGallery.map((event, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                        <Play className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{event.type}</Badge>
                      <span className="text-sm text-slate-600">{event.date}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-slate-600">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-slate-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              For press inquiries, interview requests, or additional information about DineVibe, 
              please contact our media relations team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Contact Media Team
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
            <div className="mt-6 text-sm text-slate-600">
              <p>Email: media@dinevibe.com | Phone: +91 99999 99999</p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Media;
