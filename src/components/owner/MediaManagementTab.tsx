
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MediaManagementTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="card-luxury">
        <CardHeader>
          <CardTitle className="text-[#0C0C0C]">Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Photos</label>
              <p className="font-semibold">Upload photos to showcase your venue</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Videos</label>
              <p className="font-semibold">Upload videos to showcase your venue</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-luxury">
        <CardHeader>
          <CardTitle className="text-[#0C0C0C]">Upload Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Photos</label>
              <input type="file" className="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Videos</label>
              <input type="file" className="w-full border border-gray-300 rounded-md p-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManagementTab;
