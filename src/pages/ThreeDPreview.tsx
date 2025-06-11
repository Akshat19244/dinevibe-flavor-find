
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, RotateCcw, ZoomIn, ZoomOut, Move, Camera, Maximize } from 'lucide-react';

const ThreeDPreview: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedLayout, setSelectedLayout] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const venues = [
    { value: 'royal-garden', label: 'Royal Garden Palace', type: 'Garden Venue' },
    { value: 'grand-banquet', label: 'Grand Banquet Hall', type: 'Banquet Hall' },
    { value: 'luxury-resort', label: 'Luxury Resort', type: 'Resort' },
    { value: 'heritage-hotel', label: 'Heritage Hotel', type: 'Hotel' }
  ];

  const layouts = [
    { value: 'wedding', label: 'Wedding Setup' },
    { value: 'conference', label: 'Conference Layout' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'corporate', label: 'Corporate Event' }
  ];

  const controls = [
    { icon: RotateCcw, label: 'Rotate View' },
    { icon: ZoomIn, label: 'Zoom In' },
    { icon: ZoomOut, label: 'Zoom Out' },
    { icon: Move, label: 'Move Around' },
    { icon: Camera, label: 'Screenshot' },
    { icon: Maximize, label: 'Fullscreen' }
  ];

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
              Experience your event venue in immersive 3D before booking
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Venue Selection */}
          <Card className="card-luxury mb-8">
            <CardHeader>
              <CardTitle className="text-[#0C0C0C]">Select Venue & Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                  <SelectTrigger className="border-[#D4AF37]">
                    <SelectValue placeholder="Choose a venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.map((venue) => (
                      <SelectItem key={venue.value} value={venue.value}>
                        {venue.label} ({venue.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedLayout} onValueChange={setSelectedLayout}>
                  <SelectTrigger className="border-[#D4AF37]">
                    <SelectValue placeholder="Select layout style" />
                  </SelectTrigger>
                  <SelectContent>
                    {layouts.map((layout) => (
                      <SelectItem key={layout.value} value={layout.value}>
                        {layout.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button className="btn-primary">
                  Load 3D Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 3D Viewer */}
            <div className="lg:col-span-3">
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C] flex items-center justify-between">
                    <span>3D Venue Walkthrough</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-gradient-to-br from-[#2F2F2F] to-[#0C0C0C] rounded-lg aspect-video flex items-center justify-center overflow-hidden">
                    {/* 3D Viewer Placeholder */}
                    <div className="text-center text-[#FFF5E1]">
                      <Eye className="h-16 w-16 mx-auto mb-4 text-[#D4AF37]" />
                      <h3 className="text-xl font-semibold mb-2">Interactive 3D Preview</h3>
                      <p className="text-[#FFF5E1]/80">
                        {selectedVenue ? 
                          `Loading ${venues.find(v => v.value === selectedVenue)?.label}...` : 
                          'Select a venue to start the 3D preview'
                        }
                      </p>
                    </div>
                    
                    {/* Sample 3D Environment */}
                    {selectedVenue && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/20 to-transparent">
                        <div className="absolute bottom-4 left-4 text-[#FFF5E1]">
                          <div className="bg-[#0C0C0C]/70 p-3 rounded">
                            <p className="text-sm font-medium">
                              {venues.find(v => v.value === selectedVenue)?.label}
                            </p>
                            <p className="text-xs text-[#D4AF37]">
                              {layouts.find(l => l.value === selectedLayout)?.label || 'Default Layout'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Control Bar */}
                  <div className="flex items-center justify-center space-x-2 mt-4 p-3 bg-[#2F2F2F]/10 rounded-lg">
                    {controls.map((control, index) => (
                      <Button key={index} variant="ghost" size="sm" className="text-[#2F2F2F] hover:text-[#8B0000]">
                        <control.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Venue Information */}
            <div className="space-y-6">
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C] text-lg">Venue Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#8B0000] mb-2">Capacity</h4>
                    <p className="text-[#0C0C0C]">200-500 Guests</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#8B0000] mb-2">Features</h4>
                    <ul className="text-sm text-[#2F2F2F] space-y-1">
                      <li>• Premium Sound System</li>
                      <li>• Professional Lighting</li>
                      <li>• Climate Control</li>
                      <li>• Garden Access</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#8B0000] mb-2">Price Range</h4>
                    <p className="text-[#0C0C0C] font-semibold">₹80,000 - ₹2,00,000</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C] text-lg">Layout Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {layouts.map((layout) => (
                    <Button 
                      key={layout.value}
                      variant={selectedLayout === layout.value ? "default" : "outline"}
                      className={`w-full justify-start ${
                        selectedLayout === layout.value 
                          ? 'btn-primary' 
                          : 'border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]'
                      }`}
                      onClick={() => setSelectedLayout(layout.value)}
                    >
                      {layout.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C] text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full btn-primary">
                    Book This Venue
                  </Button>
                  <Button variant="outline" className="w-full border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]">
                    Request Quote
                  </Button>
                  <Button className="w-full btn-secondary">
                    Save to Favorites
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-[#0C0C0C] text-center">3D Preview Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="h-8 w-8 text-[#FFF5E1]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0C0C0C] mb-2">Virtual Walkthrough</h3>
                    <p className="text-[#2F2F2F]">Experience the venue as if you're actually there</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                      <RotateCcw className="h-8 w-8 text-[#0C0C0C]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0C0C0C] mb-2">Interactive Controls</h3>
                    <p className="text-[#2F2F2F]">Rotate, zoom, and explore every angle</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-[#FFF5E1]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0C0C0C] mb-2">Save & Share</h3>
                    <p className="text-[#2F2F2F]">Capture views and share with your team</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThreeDPreview;
