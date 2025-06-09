
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail, Clock, Edit, Save, X } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  address: string;
  phone: string;
  email: string;
  hours: string;
  priceRange: string;
  rating: number;
  totalReviews: number;
  images: string[];
  features: string[];
}

interface RestaurantProfileProps {
  restaurant: Restaurant;
  isOwner?: boolean;
  onUpdate?: (restaurant: Restaurant) => void;
}

const RestaurantProfile: React.FC<RestaurantProfileProps> = ({
  restaurant,
  isOwner = false,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState(restaurant);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedRestaurant);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRestaurant(restaurant);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editedRestaurant.name}
                  onChange={(e) => setEditedRestaurant(prev => ({ ...prev, name: e.target.value }))}
                  className="text-xl font-bold mb-2"
                />
              ) : (
                <CardTitle className="text-2xl">{restaurant.name}</CardTitle>
              )}
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="text-sm text-slate-500">({restaurant.totalReviews} reviews)</span>
                </div>
                <Badge variant="secondary">{restaurant.priceRange}</Badge>
              </div>
            </div>
            
            {isOwner && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Description */}
          <div>
            <Label className="text-sm font-medium">Description</Label>
            {isEditing ? (
              <Textarea
                value={editedRestaurant.description}
                onChange={(e) => setEditedRestaurant(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="mt-1"
              />
            ) : (
              <p className="text-slate-600 mt-1">{restaurant.description}</p>
            )}
          </div>

          {/* Cuisine Types */}
          <div>
            <Label className="text-sm font-medium">Cuisine</Label>
            <div className="flex gap-2 mt-1">
              {restaurant.cuisine.map((type, index) => (
                <Badge key={index} variant="outline">{type}</Badge>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              {isEditing ? (
                <Textarea
                  value={editedRestaurant.address}
                  onChange={(e) => setEditedRestaurant(prev => ({ ...prev, address: e.target.value }))}
                  rows={2}
                  className="mt-1"
                />
              ) : (
                <p className="text-slate-600 mt-1">{restaurant.address}</p>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                {isEditing ? (
                  <Input
                    value={editedRestaurant.phone}
                    onChange={(e) => setEditedRestaurant(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-600 mt-1">{restaurant.phone}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    value={editedRestaurant.email}
                    onChange={(e) => setEditedRestaurant(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-600 mt-1">{restaurant.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <Label className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Operating Hours
            </Label>
            {isEditing ? (
              <Input
                value={editedRestaurant.hours}
                onChange={(e) => setEditedRestaurant(prev => ({ ...prev, hours: e.target.value }))}
                className="mt-1"
              />
            ) : (
              <p className="text-slate-600 mt-1">{restaurant.hours}</p>
            )}
          </div>

          {/* Features */}
          <div>
            <Label className="text-sm font-medium">Features & Amenities</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {restaurant.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Images Gallery */}
          <div>
            <Label className="text-sm font-medium">Restaurant Gallery</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
              {restaurant.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${restaurant.name} ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantProfile;
