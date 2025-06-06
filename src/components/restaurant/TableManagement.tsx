
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  MapPin,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Table {
  id: string;
  number: string;
  capacity: number;
  location: 'indoor' | 'outdoor' | 'private';
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  currentReservation?: {
    customerName: string;
    time: string;
    duration: number;
  };
}

interface TableManagementProps {
  restaurantId: string;
  isOwner?: boolean;
}

const TableManagement: React.FC<TableManagementProps> = ({ restaurantId, isOwner = false }) => {
  const { toast } = useToast();
  const [tables, setTables] = useState<Table[]>([
    {
      id: '1',
      number: 'T1',
      capacity: 2,
      location: 'indoor',
      status: 'available'
    },
    {
      id: '2',
      number: 'T2',
      capacity: 4,
      location: 'indoor',
      status: 'occupied',
      currentReservation: {
        customerName: 'John Doe',
        time: '19:30',
        duration: 2
      }
    },
    {
      id: '3',
      number: 'T3',
      capacity: 6,
      location: 'outdoor',
      status: 'reserved',
      currentReservation: {
        customerName: 'Sarah Smith',
        time: '20:00',
        duration: 3
      }
    },
    {
      id: '4',
      number: 'T4',
      capacity: 8,
      location: 'private',
      status: 'maintenance'
    }
  ]);

  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [showAddTable, setShowAddTable] = useState(false);

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-red-500';
      case 'reserved': return 'bg-yellow-500';
      case 'maintenance': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'Available';
      case 'occupied': return 'Occupied';
      case 'reserved': return 'Reserved';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const handleAddTable = () => {
    const newTable: Table = {
      id: Date.now().toString(),
      number: `T${tables.length + 1}`,
      capacity: 2,
      location: 'indoor',
      status: 'available'
    };
    setTables([...tables, newTable]);
    setShowAddTable(false);
    toast({
      title: "Table Added",
      description: `Table ${newTable.number} has been added successfully.`,
    });
  };

  const handleUpdateTableStatus = (tableId: string, newStatus: Table['status']) => {
    setTables(tables.map(table => 
      table.id === tableId 
        ? { ...table, status: newStatus, currentReservation: newStatus === 'available' ? undefined : table.currentReservation }
        : table
    ));
    
    toast({
      title: "Table Status Updated",
      description: `Table status has been changed to ${getStatusText(newStatus)}.`,
    });
  };

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter(table => table.id !== tableId));
    toast({
      title: "Table Deleted",
      description: "Table has been removed successfully.",
    });
  };

  const getAvailableTablesCount = () => tables.filter(t => t.status === 'available').length;
  const getOccupiedTablesCount = () => tables.filter(t => t.status === 'occupied').length;
  const getTotalCapacity = () => tables.reduce((sum, table) => sum + table.capacity, 0);

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Table Management</h2>
          <p className="text-muted-foreground">Manage restaurant seating and reservations</p>
        </div>
        {isOwner && (
          <Button onClick={() => setShowAddTable(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Table
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{getAvailableTablesCount()}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{getOccupiedTablesCount()}</div>
            <div className="text-sm text-muted-foreground">Occupied</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{tables.length}</div>
            <div className="text-sm text-muted-foreground">Total Tables</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{getTotalCapacity()}</div>
            <div className="text-sm text-muted-foreground">Total Seats</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Table Form */}
      {showAddTable && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>Table Number</Label>
                <Input placeholder="T5" />
              </div>
              <div>
                <Label>Capacity</Label>
                <Input type="number" placeholder="4" min="1" max="20" />
              </div>
              <div>
                <Label>Location</Label>
                <select className="w-full p-2 border rounded">
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddTable}>Add Table</Button>
              <Button variant="outline" onClick={() => setShowAddTable(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <Card key={table.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Table {table.number}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{table.capacity} seats</span>
                    <MapPin className="h-4 w-4 ml-2" />
                    <span className="capitalize">{table.location}</span>
                  </div>
                </div>
                <Badge className={`${getStatusColor(table.status)} text-white`}>
                  {getStatusText(table.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Current Reservation Info */}
              {table.currentReservation && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">{table.currentReservation.customerName}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {table.currentReservation.time} • {table.currentReservation.duration}h
                  </div>
                </div>
              )}

              {/* Action Buttons for Owner */}
              {isOwner && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUpdateTableStatus(
                        table.id, 
                        table.status === 'available' ? 'occupied' : 'available'
                      )}
                    >
                      {table.status === 'available' ? (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Mark Occupied
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Mark Available
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingTable(table)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTable(table.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {tables.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No Tables Added</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first table to manage reservations.</p>
            {isOwner && (
              <Button onClick={() => setShowAddTable(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Table
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TableManagement;
