
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Upload,
  DollarSign,
  Clock,
  Users
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  allergens: string[];
  preparationTime: number;
  isAvailable: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface MenuManagementProps {
  isOwner?: boolean;
  restaurantId: string;
}

const MenuManagement: React.FC<MenuManagementProps> = ({ isOwner = false, restaurantId }) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<MenuCategory[]>([
    {
      id: '1',
      name: 'Appetizers',
      items: [
        {
          id: '1',
          name: 'Samosa',
          description: 'Crispy pastries filled with spiced potatoes and peas',
          price: 120,
          category: 'Appetizers',
          isVegetarian: true,
          isVegan: false,
          isSpicy: true,
          allergens: ['gluten'],
          preparationTime: 15,
          isAvailable: true
        }
      ]
    },
    {
      id: '2',
      name: 'Main Course',
      items: [
        {
          id: '2',
          name: 'Butter Chicken',
          description: 'Tender chicken in rich tomato and cream sauce',
          price: 450,
          category: 'Main Course',
          isVegetarian: false,
          isVegan: false,
          isSpicy: false,
          allergens: ['dairy'],
          preparationTime: 25,
          isAvailable: true
        }
      ]
    }
  ]);

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const category: MenuCategory = {
        id: Date.now().toString(),
        name: newCategory,
        items: []
      };
      setCategories([...categories, category]);
      setNewCategory('');
      setShowAddCategory(false);
      toast({
        title: "Category Added",
        description: `"${newCategory}" category has been added to the menu.`,
      });
    }
  };

  const handleAddItem = (categoryId: string) => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      category: categories.find(c => c.id === categoryId)?.name || '',
      isVegetarian: false,
      isVegan: false,
      isSpicy: false,
      allergens: [],
      preparationTime: 15,
      isAvailable: true
    };
    setEditingItem(newItem);
  };

  const handleSaveItem = () => {
    if (!editingItem) return;

    const categoryIndex = categories.findIndex(c => c.name === editingItem.category);
    if (categoryIndex === -1) return;

    const updatedCategories = [...categories];
    const existingItemIndex = updatedCategories[categoryIndex].items.findIndex(
      item => item.id === editingItem.id
    );

    if (existingItemIndex >= 0) {
      updatedCategories[categoryIndex].items[existingItemIndex] = editingItem;
    } else {
      updatedCategories[categoryIndex].items.push(editingItem);
    }

    setCategories(updatedCategories);
    setEditingItem(null);
    toast({
      title: "Item Saved",
      description: "Menu item has been successfully saved.",
    });
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.filter(item => item.id !== itemId)
        };
      }
      return category;
    });
    setCategories(updatedCategories);
    toast({
      title: "Item Deleted",
      description: "Menu item has been removed from the menu.",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Menu Management</h2>
          <p className="text-muted-foreground">Manage your restaurant's menu items and categories</p>
        </div>
        {isOwner && (
          <Button onClick={() => setShowAddCategory(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddCategory}>Add</Button>
              <Button variant="outline" onClick={() => setShowAddCategory(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{editingItem.id ? 'Edit Item' : 'Add New Item'}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setEditingItem(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Item Name</Label>
                <Input
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                  placeholder="Item name"
                />
              </div>
              <div>
                <Label>Price (INR)</Label>
                <Input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({...editingItem, price: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={editingItem.description}
                onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                placeholder="Describe the item..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingItem.isVegetarian}
                  onChange={(e) => setEditingItem({...editingItem, isVegetarian: e.target.checked})}
                />
                <span className="text-sm">Vegetarian</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingItem.isVegan}
                  onChange={(e) => setEditingItem({...editingItem, isVegan: e.target.checked})}
                />
                <span className="text-sm">Vegan</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingItem.isSpicy}
                  onChange={(e) => setEditingItem({...editingItem, isSpicy: e.target.checked})}
                />
                <span className="text-sm">Spicy</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingItem.isAvailable}
                  onChange={(e) => setEditingItem({...editingItem, isAvailable: e.target.checked})}
                />
                <span className="text-sm">Available</span>
              </label>
            </div>

            <div>
              <Label>Preparation Time (minutes)</Label>
              <Input
                type="number"
                value={editingItem.preparationTime}
                onChange={(e) => setEditingItem({...editingItem, preparationTime: parseInt(e.target.value) || 15})}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveItem}>
                <Save className="h-4 w-4 mr-2" />
                Save Item
              </Button>
              <Button variant="outline" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Menu Categories */}
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{category.name}</CardTitle>
              {isOwner && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddItem(category.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="flex gap-1">
                        {item.isVegetarian && <Badge variant="secondary">Veg</Badge>}
                        {item.isVegan && <Badge variant="secondary">Vegan</Badge>}
                        {item.isSpicy && <Badge variant="destructive">Spicy</Badge>}
                        {!item.isAvailable && <Badge variant="outline">Unavailable</Badge>}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {formatPrice(item.price)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.preparationTime} min
                      </div>
                    </div>
                  </div>
                  {isOwner && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingItem(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteItem(category.id, item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              {category.items.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No items in this category yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuManagement;
