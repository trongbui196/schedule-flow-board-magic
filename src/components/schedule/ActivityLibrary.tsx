
import { Activity } from "@/types/schedule";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getActivityColorClasses } from "@/utils/scheduleUtils";

interface ActivityLibraryProps {
  activities: Activity[];
  onAddActivity: (activity: Activity) => void;
}

const ActivityLibrary = ({ activities, onAddActivity }: ActivityLibraryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Location</h2>
      
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map(activity => {
              const colorClasses = getActivityColorClasses(activity.color);
              
              return (
                <TableRow key={activity.id}>
                  <TableCell>
  <div className="font-medium flex items-center">
    <span className={`inline-block w-3 h-3 rounded-full ${colorClasses.border} mr-2`}></span>
    {activity.name}
  </div>
  <div className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full ${colorClasses.bg} ${colorClasses.text}`}>
    {activity.category}
  </div>
</TableCell>

                  <TableCell>{activity.description || "-"}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 hover:text-primary" 
                      onClick={() => onAddActivity(activity)}
                    >
                      <Plus size={14} />
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ActivityLibrary;
