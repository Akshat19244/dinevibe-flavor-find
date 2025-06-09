
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  image?: string;
}

interface MenuManagementProps {
  restaurantId: string;
  isOwner?: boolean;
}

const MenuManagement: React.FC<MenuManagementProps> = ({ restaurantId, isOwner = false }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Fresh tomato sauce, mozzarella cheese, and basil leaves',
      price: 450,
      category: 'Main Course',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500'
    },
    {
      id: '2',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice with tender chicken and spices',
      price: 380,
      category: 'Main Course',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      image: 'https://images.unsplash.com/photo-1563379091774-d5822f9823f0?q=80&w=500'
    },
    {
      id: '3',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan and Caesar dressing',
      price: 280,
      category: 'Appetizer',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500'
    }
  ]);

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({});
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverages', 'Sides'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description || '',
        price: newItem.price,
        category: newItem.category,
        isVegetarian: newItem.isVegetarian || false,
        isVegan: newItem.isVegan || false,
        isGlutenFree: newItem.isGlutenFree || false,
        image: newItem.image
      };
      setMenuItems(prev => [...prev, item]);
      setNewItem({});
      setShowAddForm(false);
    }
  };

  const handleUpdateItem = (id: string, updatedItem: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Menu Management</h2>
          <p className="text-slate-600">Manage your restaurant menu items and categories</p>
        </div>
        {isOwner && (
          <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
          </Button>
        )}
      </div>

      {/* Add New Item Form */}
      {showAddForm && isOwner && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Menu Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newItem.price || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newItem.description || ''}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter item description"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newItem.category || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input
                  id="image"
                  value={newItem.image || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Enter image URL"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newItem.isVegetarian || false}
                  onChange={(e) => setNewItem(prev => ({ ...prev, isVegetarian: e.target.checked }))}
                />
                Vegetarian
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newItem.isVegan || false}
                  onChange={(e) => setNewItem(prev => ({ ...prev, isVegan: e.target.checked }))}
                />
                Vegan
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newItem.isGlutenFree || false}
                  onChange={(e) => setNewItem(prev => ({ ...prev, isGlutenFree: e.target.checked }))}
                />
                Gluten-Free
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddItem} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Add Item
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Menu Items by Category */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-slate-600 text-sm mt-1">{item.description}</p>
                        
                        <div className="flex gap-2 mt-2">
                          {item.isVegetarian && <Badge variant="secondary" className="text-green-700 bg-green-100">Veg</Badge>}
                          {item.isVegan && <Badge variant="secondary" className="text-green-700 bg-green-100">Vegan</Badge>}
                          {item.isGlutenFree && <Badge variant="secondary" className="text-blue-700 bg-blue-100">Gluten-Free</Badge>}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">
                          {formatPrice(item.price)}
                        </div>
                        
                        {isOwner && (
                          <div className="flex gap-1 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingItem(item.id)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuManagement;
