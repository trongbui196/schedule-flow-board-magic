import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Plus, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface Location {
  id: string;
  created_at: string;
  name: string;
  lat: number;
  long: number;
  address: string;
  category: string;
  description: string;
}

const Activities = () => {
  const { toast } = useToast();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editLocation, setEditLocation] = useState<Partial<Location>>({});

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('Location')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch locations",
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

  const handleAddLocation = async () => {
    try {
      const { data, error } = await supabase
        .from('Location')
        .insert([{
          name: editLocation.name || '',
          lat: editLocation.lat || 0,
          long: editLocation.long || 0,
          address: editLocation.address || '',
          category: editLocation.category || '',
          description: editLocation.description || ''
        }])
        .select()
        .single();

      if (error) throw error;

      setLocations([data, ...locations]);
      setEditLocation({});
      toast({
        title: "Success",
        description: "Location added successfully",
      });
    } catch (error) {
      console.error('Error adding location:', error);
      toast({
        title: "Error",
        description: "Failed to add location",
        variant: "destructive"
      });
    }
  };

  const handleUpdateLocation = async () => {
    if (!selectedLocation) return;

    try {
      const { error } = await supabase
        .from('Location')
        .update({
          name: editLocation.name,
          lat: editLocation.lat,
          long: editLocation.long,
          address: editLocation.address,
          category: editLocation.category,
          description: editLocation.description
        })
        .eq('id', selectedLocation.id);

      if (error) throw error;
      setLocations(locations.map(location => 
        location.id === selectedLocation.id 
          ? { ...location, ...editLocation }
          : location
      ));
      setSelectedLocation({ ...selectedLocation, ...editLocation });
      setIsEditing(false);
      setEditLocation({});
      
      toast({
        title: "Success",
        description: "Location updated successfully",
      });
    } catch (error) {
      
      console.error('Error updating location:', error);
      toast({
        title: "Error",
        description: "Failed to update location",
        variant: "destructive"
      });
    }
  };

  const handleDeleteLocation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('Location')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLocations(locations.filter(location => location.id !== id));
      if (selectedLocation?.id === id) {
        setSelectedLocation(null);
      }
      
      toast({
        title: "Success",
        description: "Location deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting location:', error);
      toast({
        title: "Error",
        description: "Failed to delete location",
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
        <h1 className="text-2xl font-bold">Locations</h1>
        <Button onClick={() => {
          setSelectedLocation(null);
          setIsEditing(true);
          setEditLocation({});
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Location
        </Button>
      </div>

      {/* Location Details/Edit Form */}
      {(selectedLocation || isEditing) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {isEditing ? (selectedLocation ? "Edit Location" : "Add New Location") : "Location Details"}
            </h2>
            {!isEditing && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  setIsEditing(true);
                  setEditLocation(selectedLocation || {});
                }}>
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => selectedLocation && handleDeleteLocation(selectedLocation.id)}
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
                  value={editLocation.name || ''}
                  onChange={(e) => setEditLocation({ ...editLocation, name: e.target.value })}
                  placeholder="Location name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Latitude</label>
                <Input
                  value={editLocation.lat || ''}
                  onChange={(e) => setEditLocation({ ...editLocation, lat: parseFloat(e.target.value) })}
                  placeholder="Latitude"
                  type="number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Longitude</label>
                <Input
                  value={editLocation.long || ''}
                  onChange={(e) => setEditLocation({ ...editLocation, long: parseFloat(e.target.value) })}
                  placeholder="Longitude"
                  type="number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={editLocation.address || ''}
                  onChange={(e) => setEditLocation({ ...editLocation, address: e.target.value })}
                  placeholder="Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input
                  value={editLocation.category || ''}
                  onChange={(e) => setEditLocation({ ...editLocation, category: e.target.value })}
                  placeholder="Category"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  value={editLocation.description || ''}
                  onChange={(e) => setEditLocation({ ...editLocation, description: e.target.value })}
                  placeholder="Description"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditLocation({});
                    if (!selectedLocation) {
                      setSelectedLocation(null);
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={selectedLocation ? handleUpdateLocation : handleAddLocation}>
                  <Save className="mr-2 h-4 w-4" />
                  {selectedLocation ? "Save Changes" : "Add Location"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedLocation?.name}</p>
              <p><strong>Latitude:</strong> {selectedLocation?.lat}</p>
              <p><strong>Longitude:</strong> {selectedLocation?.long}</p>
              <p><strong>Address:</strong> {selectedLocation?.address}</p>
              <p><strong>Category:</strong> {selectedLocation?.category}</p>
              <p><strong>Description:</strong> {selectedLocation?.description}</p>
              <p><strong>Created At:</strong> {selectedLocation && new Date(selectedLocation.created_at).toLocaleString()}</p>
            </div>
          )}
        </div>
      )}

      {/* Locations Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow 
              key={location.id}
              className={`cursor-pointer ${selectedLocation?.id === location.id ? 'bg-gray-100' : ''}`}
              onClick={() => {
                setSelectedLocation(location);
                setIsEditing(false);
                setEditLocation({});
              }}
            >
              <TableCell className="flex items-center gap-2">
                <span>...{location.id ? location.id.slice(-5) : ''}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(location.id);
                  }}
                >
                  <Copy size={16} />
                </Button>
              </TableCell>
              <TableCell>{new Date(location.created_at).toLocaleString()}</TableCell>
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.lat}</TableCell>
              <TableCell>{location.long}</TableCell>
              <TableCell>{location.address}</TableCell>
              <TableCell>{location.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activities;