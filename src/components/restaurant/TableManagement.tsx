
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, MapPin, Plus, Edit } from 'lucide-react';

interface Table {
  id: string;
  number: number;
  capacity: number;
  location: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  currentReservation?: {
    guestName: string;
    checkInTime: string;
    estimatedDuration: number;
  };
}

interface TableManagementProps {
  restaurantId: string;
  isOwner?: boolean;
}

const TableManagement: React.FC<TableManagementProps> = ({ restaurantId, isOwner = false }) => {
  const [tables, setTables] = useState<Table[]>([
    {
      id: '1',
      number: 1,
      capacity: 2,
      location: 'Window Section',
      status: 'occupied',
      currentReservation: {
        guestName: 'John Doe',
        checkInTime: '7:30 PM',
        estimatedDuration: 90
      }
    },
    {
      id: '2',
      number: 2,
      capacity: 4,
      location: 'Main Hall',
      status: 'reserved',
      currentReservation: {
        guestName: 'Sarah Wilson',
        checkInTime: '8:00 PM',
        estimatedDuration: 120
      }
    },
    {
      id: '3',
      number: 3,
      capacity: 6,
      location: 'Private Section',
      status: 'available'
    },
    {
      id: '4',
      number: 4,
      capacity: 2,
      location: 'Bar Area',
      status: 'available'
    },
    {
      id: '5',
      number: 5,
      capacity: 8,
      location: 'Garden Terrace',
      status: 'maintenance'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return '✅';
      case 'occupied': return '🔴';
      case 'reserved': return '📅';
      case 'maintenance': return '🔧';
      default: return '❓';
    }
  };

  const handleStatusChange = (tableId: string, newStatus: Table['status']) => {
    setTables(prev => prev.map(table => 
      table.id === tableId 
        ? { ...table, status: newStatus, currentReservation: newStatus === 'available' ? undefined : table.currentReservation }
        : table
    ));
  };

  const stats = {
    total: tables.length,
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    maintenance: tables.filter(t => t.status === 'maintenance').length,
    totalCapacity: tables.reduce((sum, table) => sum + table.capacity, 0),
    occupiedCapacity: tables.filter(t => t.status === 'occupied').reduce((sum, table) => sum + table.capacity, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Table Management</h2>
          <p className="text-slate-600">Monitor and manage table availability and reservations</p>
        </div>
        {isOwner && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Table
          </Button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Tables</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Occupied</p>
                <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
              </div>
              <div className="text-2xl">🔴</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round((stats.occupiedCapacity / stats.totalCapacity) * 100)}%
                </p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Floor Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className="border-2 rounded-lg p-4 hover:shadow-md transition-shadow"
                style={{
                  borderColor: table.status === 'available' ? '#10b981' : 
                              table.status === 'occupied' ? '#ef4444' :
                              table.status === 'reserved' ? '#f59e0b' : '#6b7280'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">Table {table.number}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="h-4 w-4" />
                      {table.capacity} seats
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      {table.location}
                    </div>
                  </div>
                  <div className="text-2xl">{getStatusIcon(table.status)}</div>
                </div>

                <Badge className={`mb-3 ${getStatusColor(table.status)}`}>
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </Badge>

                {table.currentReservation && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm">
                      <div className="font-medium">{table.currentReservation.guestName}</div>
                      <div className="flex items-center gap-2 text-slate-600 mt-1">
                        <Clock className="h-3 w-3" />
                        {table.currentReservation.checkInTime} • {table.currentReservation.estimatedDuration} min
                      </div>
                    </div>
                  </div>
                )}

                {isOwner && (
                  <div className="mt-3 flex gap-2">
                    <select
                      value={table.status}
                      onChange={(e) => handleStatusChange(table.id, e.target.value as Table['status'])}
                      className="flex-1 p-2 text-sm border rounded"
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="reserved">Reserved</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Live Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              Table 3 became available 2 minutes ago
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              New reservation for Table 6 at 9:00 PM
            </div>
            <div className="flex items-center gap-2 text-yellow-600">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              Table 1 estimated to be available in 15 minutes
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableManagement;
