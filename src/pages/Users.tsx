import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Plus, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
}

const Users = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<Partial<User>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "ID copied to clipboard",
    });
  };

  const handleAddUser = async () => {
    try {
      const { data, error } = await supabase
        .from('User')
        .insert([{
          name: editUser.name || '',
          email: editUser.email || '',
          phone: editUser.phone || ''
        }])
        .select()
        .single();

      if (error) throw error;

      setUsers([data, ...users]);
      setEditUser({});
      toast({
        title: "Success",
        description: "User added successfully",
      });
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive"
      });
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      const { error } = await supabase
        .from('User')
        .update({
          name: editUser.name,
          email: editUser.email,
          phone: editUser.phone
        })
        .eq('id', selectedUser.id);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...editUser }
          : user
      ));
      setSelectedUser({ ...selectedUser, ...editUser });
      setIsEditing(false);
      setEditUser({});
      
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('User')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setUsers(users.filter(user => user.id !== id));
      if (selectedUser?.id === id) {
        setSelectedUser(null);
      }
      
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={() => {
          setSelectedUser(null);
          setIsEditing(true);
          setEditUser({});
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      {/* User Details/Edit Form */}
      {(selectedUser || isEditing) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {isEditing ? (selectedUser ? "Edit User" : "Add New User") : "User Details"}
            </h2>
            {!isEditing && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  setIsEditing(true);
                  setEditUser(selectedUser || {});
                }}>
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => selectedUser && handleDeleteUser(selectedUser.id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={editUser.name || ''}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  placeholder="User name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={editUser.email || ''}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  placeholder="User email"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  value={editUser.phone || ''}
                  onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                  placeholder="User phone"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditUser({});
                    if (!selectedUser) {
                      setSelectedUser(null);
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={selectedUser ? handleUpdateUser : handleAddUser}>
                  <Save className="mr-2 h-4 w-4" />
                  {selectedUser ? "Save Changes" : "Add User"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedUser?.name}</p>
              <p><strong>Email:</strong> {selectedUser?.email}</p>
              <p><strong>Phone:</strong> {selectedUser?.phone}</p>
              <p><strong>Created At:</strong> {selectedUser && new Date(selectedUser.created_at).toLocaleString()}</p>
            </div>
          )}
        </div>
      )}

      {/* Users Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.id}
              className={`cursor-pointer ${selectedUser?.id === user.id ? 'bg-gray-100' : ''}`}
              onClick={() => {
                setSelectedUser(user);
                setIsEditing(false);
                setEditUser({});
              }}
            >
              <TableCell className="flex items-center gap-2">
                <span>...{user.id.slice(-5)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(user.id);
                  }}
                >
                  <Copy size={16} />
                </Button>
              </TableCell>
              <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users; 