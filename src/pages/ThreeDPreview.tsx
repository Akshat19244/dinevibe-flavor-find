
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Preview3D from '@/components/ui/3d-preview';
import { 
  Camera, 
  Eye, 
  Upload, 
  Zap, 
  Clock, 
  CheckCircle,
  Play,
  Download,
  Maximize2,
  RotateCcw
} from 'lucide-react';

const ThreeDPreview: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string>('banquet');

  const supportedVenues = [
    {
      type: "Indoor Banquet Halls",
      description: "Air-conditioned halls perfect for weddings and receptions",
      capacity: "100-1000 guests",
      features: ["Professional lighting", "Sound systems", "Kitchen facilities", "Parking"],
      sampleImage: "https://images.unsplash.com/photo-1519167758481-83f29c2c47bf"
    },
    {
      type: "Open Garden Venues", 
      description: "Beautiful outdoor spaces for natural, airy celebrations",
      capacity: "50-500 guests",
      features: ["Natural lighting", "Landscaped gardens", "Weather contingency", "Outdoor bar"],
      sampleImage: "https://images.unsplash.com/photo-1464207687429-7505649dae38"
    },
    {
      type: "Rooftop Locations",
      description: "Spectacular city views for memorable events",
      capacity: "30-300 guests", 
      features: ["Panoramic views", "Sky dining", "Private access", "Sunset timing"],
      sampleImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      type: "Beach/Waterfront",
      description: "Seaside venues for romantic and unique celebrations",
      capacity: "20-200 guests",
      features: ["Ocean views", "Natural acoustics", "Tidal timing", "Coastal catering"],
      sampleImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b"
    }
  ];

  const techStack = [
    {
      name: "Gaussian Splatting",
      description: "Advanced 3D reconstruction from 2D images with photorealistic quality",
      accuracy: "92%",
      purpose: "Core 3D modeling engine"
    },
    {
      name: "Luma AI",
      description: "NeRF-based scene reconstruction for complex lighting and materials",
      accuracy: "89%", 
      purpose: "Lighting & texture optimization"
    },
    {
      name: "Nerfstudio",
      description: "Neural radiance fields for immersive walkthrough experiences",
      accuracy: "91%",
      purpose: "Interactive navigation"
    },
    {
      name: "Three.js",
      description: "WebGL-powered real-time rendering in the browser",
      accuracy: "95%",
      purpose: "Real-time visualization"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Photo Upload",
      description: "Upload 3-5 clear photos: front view, side angles, and top-down perspective",
      icon: Upload,
      requirements: ["High resolution (min 1080p)", "Good lighting", "Multiple angles", "Clear visibility"]
    },
    {
      step: 2, 
      title: "AI Processing",
      description: "Our AI analyzes spatial relationships, lighting, and architectural features",
      icon: Zap,
      requirements: ["Depth mapping", "Feature extraction", "Lighting analysis", "Scale calibration"]
    },
    {
      step: 3,
      title: "3D Generation", 
      description: "Advanced algorithms create a photorealistic 3D model with accurate proportions",
      icon: Eye,
      requirements: ["Geometry reconstruction", "Texture mapping", "Material properties", "Lighting setup"]
    },
    {
      step: 4,
      title: "Interactive Preview",
      description: "Experience your venue in immersive 3D with walkthrough capabilities",
      icon: Play,
      requirements: ["Real-time rendering", "Interactive controls", "Multiple viewpoints", "Export options"]
    }
  ];

  const demoVenues = {
    banquet: {
      title: "Crystal Palace Banquet Hall",
      description: "500-guest capacity with traditional Indian architecture",
      image: "https://images.unsplash.com/photo-1519167758481-83f29c2c47bf",
      features: ["Chandeliers", "Marble floors", "Gold accents", "Stage area"],
      accuracy: "94%"
    },
    garden: {
      title: "Serenity Garden Venue",
      description: "300-guest outdoor space with natural landscaping", 
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38",
      features: ["Lawn area", "Tree lighting", "Water features", "Gazebo"],
      accuracy: "91%"
    },
    rooftop: {
      title: "Skyline Rooftop Lounge",
      description: "200-guest rooftop with panoramic city views",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", 
      features: ["City skyline", "Glass railings", "LED lighting", "Bar area"],
      accuracy: "89%"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              3D Venue Preview Technology
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
              Revolutionary 3D modeling that transforms your venue photos into immersive virtual experiences. 
              See your event space before you book it.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <Badge className="bg-white/20 text-white">3-5 Photos Required</Badge>
              <Badge className="bg-white/20 text-white">89-95% Visual Accuracy</Badge>
              <Badge className="bg-white/20 text-white">Real-time Rendering</Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Interactive Demo */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Experience 3D Venue Previews</h2>
            <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="banquet">Banquet Hall</TabsTrigger>
                <TabsTrigger value="garden">Garden Venue</TabsTrigger>
                <TabsTrigger value="rooftop">Rooftop Space</TabsTrigger>
              </TabsList>
              
              {Object.entries(demoVenues).map(([key, venue]) => (
                <TabsContent key={key} value={key}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <Preview3D
                        title={`3D Preview: ${venue.title}`}
                        imageUrl={venue.image}
                        description={`${venue.description} - Generated with ${venue.accuracy} accuracy`}
                        onFullscreen={() => console.log(`Opening ${venue.title} in fullscreen`)}
                      />
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{venue.title}</h3>
                        <p className="text-slate-600 mb-4">{venue.description}</p>
                        <Badge className="bg-green-100 text-green-600 mb-4">
                          Visual Accuracy: {venue.accuracy}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Key Features Captured:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {venue.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Full Screen Tour
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">How 3D Preview Generation Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {process.map((step, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Step {step.step}</CardTitle>
                    <h3 className="font-semibold text-blue-600">{step.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{step.description}</p>
                    <div className="space-y-1">
                      {step.requirements.map((req, idx) => (
                        <div key={idx} className="text-xs text-slate-500 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Underlying Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                    <Badge className="bg-blue-100 text-blue-600 w-fit">
                      {tech.accuracy} accurate
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm mb-3">{tech.description}</p>
                    <div className="text-xs text-blue-600 font-medium">{tech.purpose}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Supported Venues */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Supported Venue Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportedVenues.map((venue, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={venue.sampleImage} 
                      alt={venue.type}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
                      {venue.capacity}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{venue.type}</h3>
                    <p className="text-slate-600 mb-4">{venue.description}</p>
                    <div className="space-y-2">
                      {venue.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Upload Demo */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Try 3D Preview Generation</h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Upload 3-5 photos of your venue and watch AI transform them into an immersive 3D experience. 
              Perfect for venue owners and event planners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                <Upload className="h-5 w-5 mr-2" />
                Upload Venue Photos
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo Video
              </Button>
            </div>
            <div className="mt-6 text-sm text-white/80">
              <p>Processing time: 2-5 minutes | Supported formats: JPG, PNG | Min resolution: 1080p</p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThreeDPreview;
