
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="text-center px-4 max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-[#8B0000] mb-4">404</h1>
            <h2 className="text-3xl font-bold text-[#0C0C0C] mb-4">Page Not Found</h2>
            <p className="text-xl text-[#2F2F2F] mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="bg-white border border-[#D4AF37] rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-[#0C0C0C] mb-4">What can you do?</h3>
            <ul className="text-left space-y-2 text-[#2F2F2F]">
              <li>• Check the URL for any typos</li>
              <li>• Go back to the previous page</li>
              <li>• Visit our homepage</li>
              <li>• Explore our dining options</li>
              <li>• Plan a new event</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              className="border-[#2F2F2F] text-[#2F2F2F] hover:bg-[#2F2F2F] hover:text-[#FFF5E1]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Link to="/">
              <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <Link to="/discovery">
              <Button 
                variant="outline" 
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Restaurants
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#2F2F2F] mb-4">Still need help?</p>
            <Link to="/contact">
              <Button variant="ghost" className="text-[#8B0000] hover:bg-[#8B0000]/10">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
