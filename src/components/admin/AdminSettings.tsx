
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getAdminRegistrationCode, updateAdminRegistrationCode } from '@/lib/api/admin-settings';
import { logAdminAction } from '@/lib/api/admin';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldCheck, Copy, RefreshCw, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [registrationCode, setRegistrationCode] = useState<string>('');
  const [newCode, setNewCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchAdminCode = async () => {
      try {
        const code = await getAdminRegistrationCode();
        if (code) {
          setRegistrationCode(code);
        }
      } catch (error) {
        console.error('Error fetching admin registration code:', error);
        toast({
          title: 'Error',
          description: 'Could not retrieve the admin registration code.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAdminCode();
  }, [toast]);
  
  const handleCopyCode = () => {
    if (registrationCode) {
      navigator.clipboard.writeText(registrationCode);
      toast({
        title: 'Copied!',
        description: 'Registration code copied to clipboard.',
      });
    }
  };
  
  const handleGenerateNewCode = () => {
    // Generate a secure random code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCode(code);
  };
  
  const handleUpdateCode = async () => {
    if (!newCode || newCode.length < 6) {
      toast({
        title: 'Invalid Code',
        description: 'Please generate a new code or enter a code at least 6 characters long.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsUpdating(true);
    try {
      await updateAdminRegistrationCode(newCode);
      
      // Log the admin action
      if (user) {
        await logAdminAction(
          user.id,
          'update_admin_code',
          'admin_settings',
          undefined,
          { code_updated: true }
        );
      }
      
      setRegistrationCode(newCode);
      setNewCode('');
      
      toast({
        title: 'Code Updated',
        description: 'The admin registration code has been updated successfully.',
      });
    } catch (error) {
      console.error('Error updating admin registration code:', error);
      toast({
        title: 'Update Failed',
        description: 'Could not update the registration code. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Admin Registration Code
        </CardTitle>
        <CardDescription>
          This code is required for new admin registrations. Keep it secure.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Alert className="bg-amber-50 border-amber-200 text-amber-800">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Share this code only with users who should have administrative access to the platform.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <Label htmlFor="current-code">Current Registration Code</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <div className="flex">
              <Input 
                id="current-code" 
                value={isCodeVisible ? registrationCode : '••••••••••'} 
                readOnly 
                className="font-mono"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsCodeVisible(!isCodeVisible)}
                className="ml-2"
              >
                {isCodeVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                    <line x1="2" x2="22" y1="2" y2="22"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyCode}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-md font-medium mb-2">Update Registration Code</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="new-code">New Registration Code</Label>
              <Input 
                id="new-code" 
                value={newCode} 
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Enter or generate new code"
                className="font-mono"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateNewCode}
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate
              </Button>
              <Button
                type="button"
                onClick={handleUpdateCode}
                disabled={isUpdating || !newCode}
                className="flex-1"
              >
                {isUpdating ? 'Updating...' : 'Update Code'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
