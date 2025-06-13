
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { getAdminLogs } from '@/lib/api/admin';
import { Shield, User, Store, Calendar, Settings, AlertCircle } from 'lucide-react';

interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: any;
  created_at: string;
  admin?: {
    name: string;
    email: string;
  };
}

const AdminLogs: React.FC = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await getAdminLogs();
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching admin logs:', error);
      // Mock data for demonstration
      const mockLogs: AdminLog[] = [
        {
          id: '1',
          admin_id: 'admin1',
          action: 'approve_restaurant',
          entity_type: 'restaurants',
          entity_id: 'rest1',
          details: { restaurant_name: 'Royal Garden Palace' },
          created_at: new Date().toISOString(),
          admin: { name: 'Admin User', email: 'admin@dinevibe.com' }
        },
        {
          id: '2',
          admin_id: 'admin1',
          action: 'update_user_role',
          entity_type: 'profiles',
          entity_id: 'user1',
          details: { previous_role: 'user', new_role: 'owner' },
          created_at: new Date(Date.now() - 3600000).toISOString(),
          admin: { name: 'Admin User', email: 'admin@dinevibe.com' }
        },
        {
          id: '3',
          admin_id: 'admin1',
          action: 'grant_admin',
          entity_type: 'profiles',
          entity_id: 'user2',
          details: { new_admin_status: true },
          created_at: new Date(Date.now() - 7200000).toISOString(),
          admin: { name: 'Admin User', email: 'admin@dinevibe.com' }
        }
      ];
      setLogs(mockLogs);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('restaurant')) return Store;
    if (action.includes('user') || action.includes('admin')) return User;
    if (action.includes('reservation')) return Calendar;
    if (action.includes('settings')) return Settings;
    return Shield;
  };

  const getActionColor = (action: string) => {
    if (action.includes('approve')) return 'bg-green-100 text-green-800';
    if (action.includes('reject') || action.includes('delete')) return 'bg-red-100 text-red-800';
    if (action.includes('update') || action.includes('edit')) return 'bg-blue-100 text-blue-800';
    if (action.includes('grant') || action.includes('create')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.entity_type === filter);

  const entityTypes = ['all', 'profiles', 'restaurants', 'reservations', 'settings'];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Activity Logs</h1>
            <p className="text-muted-foreground">
              Track all administrative actions performed on the platform
            </p>
          </div>
          <Button variant="outline" onClick={fetchLogs} disabled={loading}>
            Refresh Logs
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {entityTypes.map((type) => (
            <Button 
              key={type}
              variant={filter === type ? 'default' : 'outline'} 
              onClick={() => setFilter(type)}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              {type !== 'all' && ` (${logs.filter(log => log.entity_type === type).length})`}
            </Button>
          ))}
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Activity Logs ({filteredLogs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="text-muted-foreground">Loading logs...</div>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="h-32 flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No logs found</p>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admin</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => {
                    const ActionIcon = getActionIcon(log.action);
                    return (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{log.admin?.name || 'Unknown Admin'}</div>
                            <div className="text-sm text-muted-foreground">{log.admin?.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <ActionIcon className="h-4 w-4 mr-2" />
                            <Badge className={getActionColor(log.action)}>
                              {formatAction(log.action)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{log.entity_type}</div>
                            {log.entity_id && (
                              <div className="text-sm text-muted-foreground">ID: {log.entity_id}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            {log.details && (
                              <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(log.created_at)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminLogs;
