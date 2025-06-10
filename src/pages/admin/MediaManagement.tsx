
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, Award, Calendar, Megaphone, Trash2, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MediaManagement: React.FC = () => {
  const { user } = useAuth();
  const [uploadType, setUploadType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const mediaItems = [
    {
      id: '1',
      type: 'event_photo',
      title: 'Royal Wedding at Crystal Palace',
      description: '500-guest wedding with royal theme',
      uploadDate: '2024-01-15',
      status: 'published',
      views: 1250
    },
    {
      id: '2',
      type: 'award',
      title: 'Best Event Platform 2024',
      description: 'Award from Mumbai Chamber of Commerce',
      uploadDate: '2024-01-10',
      status: 'published',
      views: 890
    },
    {
      id: '3',
      type: 'announcement',
      title: 'New 3D Preview Feature Launch',
      description: 'Revolutionary 3D venue preview technology',
      uploadDate: '2024-01-08',
      status: 'draft',
      views: 0
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Uploading media:', { uploadType, title, description, selectedFile });
    // Reset form
    setUploadType('');
    setTitle('');
    setDescription('');
    setSelectedFile(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event_photo': return <Image className="h-4 w-4" />;
      case 'award': return <Award className="h-4 w-4" />;
      case 'announcement': return <Megaphone className="h-4 w-4" />;
      default: return <Image className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event_photo': return 'bg-blue-500';
      case 'award': return 'bg-yellow-500';
      case 'announcement': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName={user?.user_metadata?.name} />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Media Management
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Upload and manage event photos, awards, and announcements
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    Upload Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="uploadType">Type</Label>
                      <Select value={uploadType} onValueChange={setUploadType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="event_photo">Event Photo</SelectItem>
                          <SelectItem value="award">Award</SelectItem>
                          <SelectItem value="announcement">Announcement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="file">File</Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileUpload}
                        accept="image/*,video/*"
                        required
                      />
                      {selectedFile && (
                        <p className="text-sm text-slate-600 mt-1">
                          Selected: {selectedFile.name}
                        </p>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Upload Media
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Media List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Media Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mediaItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg ${getTypeColor(item.type)} flex items-center justify-center text-white`}>
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-slate-600">{item.description}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-slate-500">
                                <Calendar className="h-3 w-3 inline mr-1" />
                                {item.uploadDate}
                              </span>
                              <span className="text-xs text-slate-500">
                                <Eye className="h-3 w-3 inline mr-1" />
                                {item.views} views
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MediaManagement;
