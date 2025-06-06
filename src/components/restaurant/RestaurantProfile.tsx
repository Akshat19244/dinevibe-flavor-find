
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Edit, 
  Save, 
  Upload,
  Camera,
  Heart
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState(restaurant);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSave = () => {
    onUpdate?.(editedRestaurant);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Restaurant profile has been successfully updated.",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Simulate image upload
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setEditedRestaurant({
        ...editedRestaurant,
        images: [...editedRestaurant.images, ...newImages]
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorite ? 
        "Restaurant removed from your favorites." : 
        "Restaurant added to your favorites.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editedRestaurant.name}
                  onChange={(e) => setEditedRestaurant({
                    ...editedRestaurant,
                    name: e.target.value
                  })}
                  className="text-2xl font-bold mb-2"
                />
              ) : (
                <CardTitle className="text-3xl mb-2">{restaurant.name}</CardTitle>
              )}
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-muted-foreground">({restaurant.totalReviews} reviews)</span>
                </div>
                <Badge variant="secondary">{restaurant.priceRange}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {restaurant.cuisine.map((type, index) => (
                  <Badge key={index} variant="outline">{type}</Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {!isOwner && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleFavorite}
                  className={isFavorite ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
              )}
              
              {isOwner && (
                <Button
                  variant="outline"
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <div>
            <Label className="text-sm font-medium">Description</Label>
            {isEditing ? (
              <Textarea
                value={editedRestaurant.description}
                onChange={(e) => setEditedRestaurant({
                  ...editedRestaurant,
                  description: e.target.value
                })}
                className="mt-1"
                rows={3}
              />
            ) : (
              <p className="text-muted-foreground mt-1">{restaurant.description}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editedRestaurant.address}
                  onChange={(e) => setEditedRestaurant({
                    ...editedRestaurant,
                    address: e.target.value
                  })}
                  className="flex-1"
                />
              ) : (
                <span className="text-sm">{restaurant.address}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editedRestaurant.phone}
                  onChange={(e) => setEditedRestaurant({
                    ...editedRestaurant,
                    phone: e.target.value
                  })}
                  className="flex-1"
                />
              ) : (
                <span className="text-sm">{restaurant.phone}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editedRestaurant.hours}
                  onChange={(e) => setEditedRestaurant({
                    ...editedRestaurant,
                    hours: e.target.value
                  })}
                  className="flex-1"
                />
              ) : (
                <span className="text-sm">{restaurant.hours}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Gallery */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gallery</CardTitle>
            {isOwner && isEditing && (
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Add Images
                    </span>
                  </Button>
                </label>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {restaurant.images.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${restaurant.name} ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
            {restaurant.images.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No images uploaded yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features & Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {restaurant.features.map((feature, index) => (
              <Badge key={index} variant="secondary">{feature}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantProfile;
