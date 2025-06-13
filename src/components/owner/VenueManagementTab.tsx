
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, FileText, MessageSquare } from 'lucide-react';

const VenueManagementTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="card-luxury">
        <CardHeader>
          <CardTitle className="text-[#0C0C0C]">Venue Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Venue Name</label>
              <p className="font-semibold">Royal Garden Palace</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Capacity</label>
              <p className="font-semibold">500 guests</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Location</label>
              <p className="font-semibold">Bandra West, Mumbai</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Venue Type</label>
              <p className="font-semibold">Banquet Hall with Garden</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-luxury">
        <CardHeader>
          <CardTitle className="text-[#0C0C0C]">Venue Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
              <Camera className="h-4 w-4 mr-2" />
              Update Photos
            </Button>
            <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
              <FileText className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
            <Button variant="outline" className="w-full border-[#2F2F2F] text-[#2F2F2F]">
              <MessageSquare className="h-4 w-4 mr-2" />
              Manage Amenities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueManagementTab;
