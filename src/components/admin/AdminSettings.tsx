
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAdminSettings, updateAdminRegistrationCode, logAdminAction } from '@/lib/api/admin';
import { Loader2 } from 'lucide-react';
import { AdminSettings as AdminSettingsType } from '@/lib/api/types';

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminSettings, setAdminSettings] = useState<AdminSettingsType | null>(null);
  
  useEffect(() => {
    const loadSettings = async () => {
      if (!user) return;
      
      try {
        const settings = await getAdminSettings();
        setAdminSettings(settings);
      } catch (error) {
        console.error('Error loading admin settings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load admin settings.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, [user, toast]);
  
  const handleRegenerateCode = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      const updatedSettings = await updateAdminRegistrationCode();
      setAdminSettings(updatedSettings);
      
      // Log this admin action
      await logAdminAction(
        user.id,
        'update_admin_code',
        'admin_settings',
        undefined,
        { action: 'update_admin_code' }
      );
      
      toast({
        title: 'Code Updated',
        description: 'The admin registration code has been regenerated successfully.'
      });
    } catch (error) {
      console.error('Error updating admin code:', error);
      toast({
        title: 'Error',
        description: 'Failed to update admin registration code.',
        variant: 'destructive'
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
        <CardDescription>
          Configure system-wide administrative settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="registration-code">Admin Registration Code</Label>
          <div className="flex gap-2">
            <Input 
              id="registration-code"
              value={adminSettings?.registration_code || ''}
              readOnly
              className="font-mono"
            />
            <Button 
              onClick={handleRegenerateCode} 
              disabled={isUpdating}
              className="whitespace-nowrap"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Regenerate Code'
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            This code is required for admin registration. Currently {adminSettings?.admin_count || 0}/2 admin accounts are registered.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
