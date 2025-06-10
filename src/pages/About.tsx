
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  Shield, 
  Users, 
  Award, 
  Sparkles,
  Target,
  Globe
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make prioritizes exceptional customer experiences and satisfaction."
    },
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Leveraging cutting-edge AI to revolutionize how people discover and plan dining experiences."
    },
    {
      icon: Shield,
      title: "Trust & Quality",
      description: "Rigorous verification processes ensure only premium venues and authentic reviews."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Creating meaningful connections between diners, venues, and celebration moments."
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "DineVibe Launch",
      description: "Founded with a vision to transform India's dining and event industry"
    },
    {
      year: "2024 Q2",
      title: "AI Integration",
      description: "Introduced AI-powered wait time predictions and event planning assistance"
    },
    {
      year: "2024 Q3",
      title: "3D Technology",
      description: "Revolutionary 3D venue preview system using advanced AI modeling"
    },
    {
      year: "2024 Q4",
      title: "Premium Network",
      description: "Growing network of verified premium restaurants and event venues"
    }
  ];

  const team = [
    {
      role: "Founders",
      description: "Passionate entrepreneurs with backgrounds in hospitality, technology, and customer experience"
    },
    {
      role: "AI Engineers",
      description: "Machine learning experts developing predictive algorithms and 3D modeling systems"
    },
    {
      role: "Hospitality Experts",
      description: "Industry veterans ensuring authentic venue partnerships and quality standards"
    },
    {
      role: "Product Team",
      description: "User experience designers and developers crafting intuitive, beautiful interfaces"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              About DineVibe
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're revolutionizing how India experiences dining and celebrations through AI-powered technology and premium venue curation.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Mission Section */}
          <section className="mb-16 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-8">
                To create India's most trusted platform for premium dining and event experiences, 
                where every meal is memorable and every celebration is extraordinary. We believe 
                technology should enhance human connections, not replace them.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-slate-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-slate-600">Premium Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                  <div className="text-slate-600">Events Planned</div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Journey Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {milestone.year}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-slate-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">Technology That Transforms</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our cutting-edge AI and 3D technology stack creates unprecedented experiences 
                in the hospitality industry.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
                  <p className="text-slate-600 text-sm">Machine learning algorithms analyze preferences, reviews, and behavior patterns</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">3D Venue Modeling</h3>
                  <p className="text-slate-600 text-sm">Advanced photogrammetry and Gaussian Splatting for immersive previews</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Smart Predictions</h3>
                  <p className="text-slate-600 text-sm">Real-time wait times, optimal booking slots, and crowd pattern analysis</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{member.role}</h3>
                    <p className="text-slate-600">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
              <p className="text-lg mb-6 text-white/90">
                Whether you're a food lover, event planner, or venue owner, 
                become part of India's premium dining revolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                    Get Started
                  </Button>
                </Link>
                <Link to="/for-business">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
