
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const CompleteProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be signed in to complete your profile.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          role,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Completed",
        description: "Your profile has been successfully updated.",
      });

      // Redirect based on user role
      if (role === 'owner') {
        navigate('/owner/dashboard');
      } else if (role === 'admin') {
        navigate('/control');
      } else {
        navigate('/user/discovery');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Profile Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <RadioGroup value={role} onValueChange={setRole} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="user" id="user" />
                      <Label htmlFor="user" className="cursor-pointer">Restaurant Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="owner" id="owner" />
                      <Label htmlFor="owner" className="cursor-pointer">Restaurant Owner</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-dineVibe-primary hover:bg-dineVibe-primary/90" 
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Complete Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompleteProfile;
