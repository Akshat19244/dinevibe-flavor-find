
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Calendar, ImagePlus } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const UploadEvent: React.FC = () => {
  // Form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState<Date>();
  const [eventTime, setEventTime] = useState('19:00');
  const [eventLocation, setEventLocation] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [eventTags, setEventTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Available cuisine/tag options
  const tagOptions = [
    'Italian', 'Japanese', 'Indian', 'Chinese', 'Mexican', 'Thai', 'French', 
    'Vegetarian', 'Vegan', 'Seafood', 'Dessert', 'Wine', 'Beer', 'Cocktail',
    'Live Music', 'Tasting', 'Class', 'Workshop', 'Family Friendly'
  ];

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload to Firebase Storage
      // For now, just create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setEventImage(imageUrl);
    }
  };

  // Add tag to event
  const addTag = (tag: string) => {
    if (tag && !eventTags.includes(tag)) {
      setEventTags([...eventTags, tag]);
      setNewTag('');
    }
  };

  // Remove tag from event
  const removeTag = (tagToRemove: string) => {
    setEventTags(eventTags.filter(tag => tag !== tagToRemove));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send data to Firebase
    console.log({
      title: eventTitle,
      description: eventDescription,
      date: eventDate ? format(eventDate, 'yyyy-MM-dd') : '',
      time: eventTime,
      location: eventLocation,
      capacity: maxCapacity,
      price: eventPrice,
      tags: eventTags,
      // image would be uploaded and we'd store the URL
    });

    // Show success message
    alert('Event submitted successfully!');
    // In a real implementation, we would clear the form or redirect
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName="Restaurant Owner" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Upload Event</h1>
            <p className="text-white text-opacity-90">
              Create and promote special events at your restaurant
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Creation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Title */}
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input 
                        id="event-title" 
                        placeholder="e.g. Italian Wine Tasting Night"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Event Description */}
                    <div className="space-y-2">
                      <Label htmlFor="event-description">Event Description</Label>
                      <Textarea 
                        id="event-description" 
                        placeholder="Describe your event in detail..."
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    
                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Event Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={eventDate}
                              onSelect={setEventDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-time">Event Time</Label>
                        <Input 
                          id="event-time"
                          type="time"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="event-location">Event Location</Label>
                      <Input 
                        id="event-location" 
                        placeholder="e.g. 123 Main Street, City"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Capacity and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="max-capacity">Maximum Capacity</Label>
                        <Input 
                          id="max-capacity" 
                          type="number"
                          placeholder="e.g. 30"
                          value={maxCapacity}
                          onChange={(e) => setMaxCapacity(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-price">Price per Person ($)</Label>
                        <Input 
                          id="event-price" 
                          type="number"
                          placeholder="e.g. 45"
                          value={eventPrice}
                          onChange={(e) => setEventPrice(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Event Image */}
                    <div className="space-y-2">
                      <Label htmlFor="event-image">Event Image</Label>
                      <div className="flex items-center space-x-4">
                        <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center w-full cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden">
                          <input 
                            id="event-image" 
                            type="file" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            onChange={handleImageUpload}
                            accept="image/*"
                          />
                          <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Click to upload event image</span>
                          <span className="text-xs text-gray-400 mt-1">(Max size: 5MB, Format: JPG, PNG)</span>
                        </div>
                        
                        {eventImage && (
                          <div className="relative w-24 h-24">
                            <img 
                              src={eventImage} 
                              alt="Event preview" 
                              className="rounded-md w-full h-full object-cover"
                            />
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={() => setEventImage(null)}
                            >
                              ×
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Event Tags */}
                    <div className="space-y-2">
                      <Label>Event Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {eventTags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="secondary"
                            className="pl-2 flex items-center gap-1"
                          >
                            {tag}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5 rounded-full ml-1 hover:bg-destructive/20" 
                              onClick={() => removeTag(tag)}
                            >
                              ×
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => addTag(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a tag" />
                          </SelectTrigger>
                          <SelectContent>
                            {tagOptions.filter(tag => !eventTags.includes(tag)).map(tag => (
                              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <Button type="submit" className="w-full md:w-auto bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                      Publish Event
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Event Preview */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Event Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative rounded-lg overflow-hidden h-48 bg-gray-100">
                      {eventImage ? (
                        <img 
                          src={eventImage} 
                          alt={eventTitle || "Event"} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                          <ImagePlus className="h-12 w-12" />
                        </div>
                      )}
                      
                      {eventTags.length > 0 && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-dineVibe-primary text-white">
                            {eventTags[0]}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-xl">
                      {eventTitle || "Event Title"}
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-3">
                      {eventDescription || "Event description will appear here..."}
                    </p>
                    
                    <div className="space-y-2">
                      {eventDate && (
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          <span>{format(eventDate, 'PPP')}</span>
                        </div>
                      )}
                      
                      {eventTime && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          <span>{eventTime}</span>
                        </div>
                      )}
                      
                      {eventLocation && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          <span>{eventLocation}</span>
                        </div>
                      )}
                      
                      {maxCapacity && (
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-dineVibe-primary" />
                          <span>0 of {maxCapacity} spots filled</span>
                        </div>
                      )}
                    </div>
                    
                    {eventPrice && (
                      <div className="mt-2 font-semibold">
                        ${eventPrice} per person
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {eventTags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="bg-gray-100">
                          {tag}
                        </Badge>
                      ))}
                      {eventTags.length > 3 && (
                        <Badge variant="outline" className="bg-gray-100">
                          +{eventTags.length - 3} more
                        </Badge>
                      )}
                    </div>
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

export default UploadEvent;
