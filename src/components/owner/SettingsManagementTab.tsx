
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsManagementTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="card-luxury">
        <CardHeader>
          <CardTitle className="text-[#0C0C0C]">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">General</label>
              <p className="font-semibold">Manage your venue settings</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Notifications</label>
              <p className="font-semibold">Manage your notifications</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Security</label>
              <p className="font-semibold">Manage your security settings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-luxury">
        <CardHeader>
          <CardTitle className="text-[#0C0C0C]">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Profile Picture</label>
              <p className="font-semibold">Upload your profile picture</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Personal Information</label>
              <p className="font-semibold">Update your personal information</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManagementTab;
