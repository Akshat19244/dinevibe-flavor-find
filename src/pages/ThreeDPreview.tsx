import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Maximize2, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Move3D, 
  Eye, 
  Camera,
  Download,
  Share,
  Settings,
  Play,
  Pause,
  Volume2,
  Calendar
} from 'lucide-react';

interface VenueLayout {
  id: string;
  name: string;
  type: string;
  capacity: number;
  theme: string;
  preview: string;
  model3d: string;
  features: string[];
  lighting: string[];
  decoration: string[];
}

const ThreeDPreview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState<string>('royal-garden');
  const [selectedTheme, setSelectedTheme] = useState<string>('royal');
  const [selectedLayout, setSelectedLayout] = useState<string>('banquet');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  const venues: VenueLayout[] = [
    {
      id: 'royal-garden',
      name: 'Royal Garden Palace',
      type: 'Banquet Hall with Garden',
      capacity: 500,
      theme: 'Royal Elegance',
      preview: 'https://images.unsplash.com/photo-1519167758481-83f29c2c47bf?q=80&w=800',
      model3d: '/models/royal-garden-hall.glb',
      features: ['Crystal Chandeliers', 'Garden View', 'Dance Floor', 'VIP Lounge'],
      lighting: ['Warm LED', 'Crystal Pendants', 'Garden Spotlights'],
      decoration: ['Gold Draping', 'Floral Centerpieces', 'Royal Carpet']
    },
    {
      id: 'modern-ballroom',
      name: 'Grand Modern Ballroom',
      type: 'Indoor Conference Hall',
      capacity: 300,
      theme: 'Modern Chic',
      preview: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=800',
      model3d: '/models/modern-ballroom.glb',
      features: ['LED Ceiling', 'Projection Screens', 'Sound System', 'Climate Control'],
      lighting: ['RGB LED', 'Track Lighting', 'Accent Spots'],
      decoration: ['Minimalist Design', 'Contemporary Art', 'Geometric Patterns']
    },
    {
      id: 'garden-pavilion',
      name: 'Riverside Garden Pavilion',
      type: 'Outdoor Garden Venue',
      capacity: 200,
      theme: 'Garden Paradise',
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
      model3d: '/models/garden-pavilion.glb',
      features: ['Waterfront View', 'Open Air', 'Natural Lighting', 'Photo Zone'],
      lighting: ['String Lights', 'Lanterns', 'Natural Sunlight'],
      decoration: ['Fresh Flowers', 'Greenery', 'Wooden Elements']
    }
  ];

  const themes = [
    { value: 'royal', label: 'Royal Elegance', colors: ['#FFD700', '#8B0000'] },
    { value: 'garden', label: 'Garden Paradise', colors: ['#90EE90', '#FFB6C1'] },
    { value: 'modern', label: 'Modern Chic', colors: ['#2F4F4F', '#C0C0C0'] },
    { value: 'vintage', label: 'Vintage Charm', colors: ['#DEB887', '#CD853F'] }
  ];

  const layouts = [
    { value: 'banquet', label: 'Banquet Style' },
    { value: 'conference', label: 'Conference Setup' },
    { value: 'cocktail', label: 'Cocktail Party' },
    { value: 'theater', label: 'Theater Style' }
  ];

  const currentVenue = venues.find(v => v.id === selectedVenue) || venues[0];

  const handle3DToggle = () => {
    setIs3DActive(!is3DActive);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleBookVenue = () => {
    navigate('/booking-form', {
      state: {
        venue: currentVenue.name,
        venueType: currentVenue.type,
        capacity: currentVenue.capacity,
        theme: selectedTheme,
        layout: selectedLayout
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1] mb-4">
              <Eye className="inline mr-3 h-12 w-12 text-[#D4AF37]" />
              3D Venue Preview
            </h1>
            <p className="text-xl text-[#FFF5E1]/90 max-w-2xl mx-auto">
              Experience your event venue in immersive 3D before you book
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Venue Configuration</span>
                <div className="flex space-x-2">
                  <Button
                    onClick={handle3DToggle}
                    className={`${is3DActive ? 'bg-[#8B0000]' : 'bg-[#2F2F2F]'} text-[#FFF5E1]`}
                  >
                    <Move3D className="h-4 w-4 mr-2" />
                    {is3DActive ? '3D View' : 'Enable 3D'}
                  </Button>
                  <Button
                    onClick={handleFullscreen}
                    variant="outline"
                    className="border-[#D4AF37]"
                  >
                    <Maximize2 className="h-4 w-4 mr-2" />
                    {isFullscreen ? 'Exit' : 'Fullscreen'}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Venue</label>
                  <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                    <SelectTrigger className="border-[#D4AF37]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue.id} value={venue.id}>
                          {venue.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Theme</label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger className="border-[#D4AF37]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          {theme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Layout</label>
                  <Select value={selectedLayout} onValueChange={setSelectedLayout}>
                    <SelectTrigger className="border-[#D4AF37]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {layouts.map((layout) => (
                        <SelectItem key={layout.value} value={layout.value}>
                          {layout.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end space-x-2">
                  <Button
                    onClick={() => setIsAutoRotate(!isAutoRotate)}
                    variant="outline"
                    className="border-[#8B0000] text-[#8B0000]"
                  >
                    {isAutoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 3D Viewer */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-video'}`}>
                    {/* 3D Viewer Container */}
                    <div className="relative w-full h-full bg-gradient-to-br from-[#2F2F2F] to-[#0C0C0C] flex items-center justify-center">
                      {is3DActive ? (
                        <div className="w-full h-full relative">
                          {/* Fallback 3D Preview */}
                          <img 
                            src={currentVenue.preview} 
                            alt={currentVenue.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold">{currentVenue.name}</h3>
                            <p className="text-sm opacity-90">{currentVenue.type}</p>
                          </div>
                          
                          {/* 3D Controls Overlay */}
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white">
                              <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white">
                              <ZoomOut className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white">
                              <Camera className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {/* Auto-rotate indicator */}
                          {isAutoRotate && (
                            <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                              <span className="text-sm">Auto Rotating</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center text-white p-8">
                          <Move3D className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <h3 className="text-xl font-semibold mb-2">3D Preview Available</h3>
                          <p className="text-white/80 mb-4">
                            Experience an immersive 3D walkthrough of {currentVenue.name}
                          </p>
                          <Button
                            onClick={handle3DToggle}
                            className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start 3D Preview
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-4">
                <Button 
                  onClick={handleBookVenue}
                  className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book This Venue
                </Button>
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                  <Download className="h-4 w-4 mr-2" />
                  Download Tour
                </Button>
                <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
                  <Share className="h-4 w-4 mr-2" />
                  Share Preview
                </Button>
                <Button variant="outline" className="border-[#2F2F2F] text-[#2F2F2F]">
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
            </div>

            {/* Venue Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">{currentVenue.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-[#D4AF37] text-[#0C0C0C]">{currentVenue.type}</Badge>
                    <Badge variant="secondary">Capacity: {currentVenue.capacity}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="features">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="lighting">Lighting</TabsTrigger>
                      <TabsTrigger value="decor">Decoration</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="features" className="space-y-2">
                      {currentVenue.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#8B0000] rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="lighting" className="space-y-2">
                      {currentVenue.lighting.map((light, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                          <span className="text-sm">{light}</span>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="decor" className="space-y-2">
                      {currentVenue.decoration.map((decor, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#2F2F2F] rounded-full" />
                          <span className="text-sm">{decor}</span>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Theme Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">Current Theme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        {themes.find(t => t.value === selectedTheme)?.label}
                      </h4>
                      <div className="flex space-x-2">
                        {themes.find(t => t.value === selectedTheme)?.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Layout Style</h4>
                      <p className="text-sm text-[#2F2F2F]">
                        {layouts.find(l => l.value === selectedLayout)?.label}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">Venue Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Area</span>
                      <span className="font-semibold">2,500 sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ceiling Height</span>
                      <span className="font-semibold">14 feet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Parking Spaces</span>
                      <span className="font-semibold">50 cars</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Setup Time</span>
                      <span className="font-semibold">4 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThreeDPreview;
