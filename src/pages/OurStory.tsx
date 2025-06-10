
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Lightbulb,
  Users,
  Rocket,
  Heart,
  Star,
  ArrowRight,
  Quote,
  Target,
  Award,
  Globe
} from 'lucide-react';

const OurStory: React.FC = () => {
  const timeline = [
    {
      year: "The Problem",
      title: "Dining & Event Planning Was Broken",
      description: "Finding quality restaurants meant endless scrolling through generic listings. Event planning required calling dozens of vendors, with no way to visualize the final result. Customers deserved better.",
      icon: Lightbulb,
      color: "bg-red-100 text-red-600"
    },
    {
      year: "The Vision",
      title: "Technology Meets Hospitality",
      description: "We envisioned a world where AI could predict perfect dining experiences and where 3D technology could let you walk through your dream venue before booking. Quality over quantity became our mantra.",
      icon: Target,
      color: "bg-blue-100 text-blue-600"
    },
    {
      year: "2024 Q1",
      title: "Building the Foundation",
      description: "Started with Mumbai's premium restaurants, focusing on verified quality. Every venue personally visited, every review authenticated. We believed that trust should be the foundation of hospitality.",
      icon: Users,
      color: "bg-green-100 text-green-600"
    },
    {
      year: "2024 Q2",
      title: "AI Integration Launch",
      description: "Introduced wait-time prediction algorithms and smart recommendations. Our AI learned from customer preferences, weather patterns, and historical data to create personalized experiences.",
      icon: Rocket,
      color: "bg-purple-100 text-purple-600"
    },
    {
      year: "2024 Q3",
      title: "3D Revolution",
      description: "Launched groundbreaking 3D venue preview technology. From just 3-5 photos, customers could walk through their event venue virtually. The response was overwhelming.",
      icon: Globe,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      year: "Today",
      title: "The Premium Standard",
      description: "DineVibe has become synonymous with quality dining and event experiences. Our community of discerning customers and verified venues continues to grow organically.",
      icon: Award,
      color: "bg-blue-100 text-blue-600"
    }
  ];

  const founders = [
    {
      quote: "Every meal should be memorable, every celebration extraordinary. Technology should enhance human connections, not replace them.",
      role: "Co-Founder & Vision"
    },
    {
      quote: "Quality over quantity. We'd rather have 100 exceptional restaurants than 10,000 mediocre ones. Our customers deserve the best.",
      role: "Co-Founder & Operations"
    },
    {
      quote: "AI isn't about replacing human judgment—it's about amplifying it. Our algorithms learn from real experiences to create better ones.",
      role: "Co-Founder & Technology"
    }
  ];

  const values = [
    {
      title: "Customer Obsession",
      description: "Every decision we make starts with asking: 'How does this create a better experience for our customers?'",
      icon: Heart
    },
    {
      title: "Quality First",
      description: "We believe in curation over aggregation. Every restaurant, every venue is personally verified and continuously monitored.",
      icon: Star
    },
    {
      title: "Innovation with Purpose",
      description: "Technology should solve real problems. Our AI and 3D innovations exist to create better experiences, not just impressive demos.",
      icon: Lightbulb
    },
    {
      title: "Trust & Transparency",
      description: "Authentic reviews, transparent pricing, verified venues. Trust is earned through consistent delivery of promises made.",
      icon: Award
    }
  ];

  const impact = [
    { metric: "50,000+", label: "Happy Customers", description: "Creating memorable experiences" },
    { metric: "500+", label: "Premium Venues", description: "Personally verified partners" },
    { metric: "1,200+", label: "Perfect Events", description: "AI-planned celebrations" },
    { metric: "₹15 Cr+", label: "Revenue Generated", description: "For our venue partners" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Our Story
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              The journey of transforming India's dining and event landscape through technology, 
              quality, and an unwavering commitment to exceptional experiences.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Mission Statement */}
          <section className="mb-16 text-center">
            <div className="max-w-4xl mx-auto">
              <Quote className="h-12 w-12 text-blue-600 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-light text-slate-700 italic mb-8">
                "We're not building another food delivery app or event marketplace. 
                We're crafting India's premium hospitality ecosystem where quality, 
                technology, and human connection create unforgettable experiences."
              </blockquote>
              <p className="text-lg text-slate-600">— The DineVibe Founding Team</p>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="max-w-6xl mx-auto">
              <div className="space-y-8">
                {timeline.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className={`w-16 h-16 ${milestone.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <milestone.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold">{milestone.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {milestone.year}
                        </span>
                      </div>
                      <p className="text-slate-600 text-lg leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Founder Quotes */}
          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">From Our Founders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {founders.map((founder, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-blue-600 mb-4" />
                    <blockquote className="text-slate-700 italic mb-4 leading-relaxed">
                      "{founder.quote}"
                    </blockquote>
                    <p className="text-sm font-medium text-blue-600">— {founder.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <value.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                        <p className="text-slate-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Impact */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impact.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.metric}</div>
                    <div className="font-medium mb-1">{stat.label}</div>
                    <div className="text-sm text-slate-600">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Philosophy */}
          <section className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-6">
              Technology should amplify human experiences, not diminish them. Every algorithm we write, 
              every feature we build, every partnership we forge is guided by one simple question: 
              "Does this create a more meaningful connection between people and places?"
            </p>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Heart className="h-5 w-5" />
              <span>Built with passion for exceptional experiences</span>
            </div>
          </section>

          {/* Future Vision */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-6">What's Next</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              We're just getting started. Our vision extends beyond Mumbai, beyond India. 
              We're building the global standard for premium hospitality experiences, 
              where every meal tells a story and every celebration becomes a cherished memory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/for-business">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Join Our Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/user/discovery">
                <Button size="lg" variant="outline">
                  Experience DineVibe
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OurStory;
