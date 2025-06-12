
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthFormWrapper from '@/components/auth/auth-form-wrapper';
import { Sparkles, ChefHat, Building } from 'lucide-react';

const Auth: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  
  const authTitle = type === 'login' ? 'Welcome Back to DineVibe' : 'Join the DineVibe Experience';
  const authDescription = type === 'login' 
    ? 'Sign in to continue your culinary journey with premium dining and exclusive events'
    : 'Create your account and discover India\'s finest restaurants and luxury event venues';
  
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#0C0C0C] to-[#2F2F2F] py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-12 w-12 text-[#D4AF37] mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#FFF5E1]">
                {authTitle}
              </h1>
            </div>
            <p className="text-xl text-[#FFF5E1]/90 max-w-3xl mx-auto">
              {authDescription}
            </p>
          </div>
        </div>

        {/* Main Auth Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left Side - Features */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#0C0C0C] mb-6">
                    Why Choose DineVibe?
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#8B0000]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <ChefHat className="h-6 w-6 text-[#8B0000]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#0C0C0C] mb-2">Premium Dining</h3>
                        <p className="text-[#2F2F2F]">
                          Access to India's finest restaurants with exclusive reservations and special deals
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Building className="h-6 w-6 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#0C0C0C] mb-2">Luxury Venues</h3>
                        <p className="text-[#2F2F2F]">
                          Book premium banquet halls and event spaces with 3D previews
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#8B0000]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-6 w-6 text-[#8B0000]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#0C0C0C] mb-2">AI Event Planning</h3>
                        <p className="text-[#2F2F2F]">
                          Intelligent event planning with personalized recommendations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8B0000]">50K+</div>
                    <div className="text-sm text-[#2F2F2F]">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#D4AF37]">2.5K+</div>
                    <div className="text-sm text-[#2F2F2F]">Partner Venues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8B0000]">75K+</div>
                    <div className="text-sm text-[#2F2F2F]">Events Hosted</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Auth Form */}
              <div className="w-full max-w-md mx-auto">
                <AuthFormWrapper defaultTab={type === 'login' ? 'login' : 'signup'} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-[#8B0000] to-[#660000] py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-[#FFF5E1] mb-4">
              Ready to Experience Luxury Dining?
            </h3>
            <p className="text-[#FFF5E1]/90 mb-6">
              Join thousands of food enthusiasts and event planners who trust DineVibe
            </p>
            <div className="flex items-center justify-center space-x-2 text-[#FFF5E1]/80">
              <span>✓ Exclusive Access</span>
              <span>•</span>
              <span>✓ Premium Support</span>
              <span>•</span>
              <span>✓ Best Prices</span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
