
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="text-center px-4">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent mb-6">404</h1>
          <h2 className="text-3xl font-bold mb-4 text-white">Page Not Found</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="space-x-4">
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Back to Home
              </Button>
            </Link>
            <Link to="/user/discovery">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Explore Restaurants
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
