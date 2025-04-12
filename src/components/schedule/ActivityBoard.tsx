
import { Activity } from "@/types/schedule";
import ActivityItem from "./ActivityItem";
import { useDroppable } from "@dnd-kit/core";

interface ActivityBoardProps {
  activities: Activity[];
  draggedActivity: Activity | null;
}

const ActivityBoard = ({ activities, draggedActivity }: ActivityBoardProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'activity-board',
  });
  
  return (
    <div
      ref={setNodeRef}
      className={`
        bg-white rounded-lg shadow-md p-4 h-[calc(100vh-180px)] overflow-y-auto
        ${isOver ? 'ring-2 ring-primary/50 bg-primary/5' : ''}
        transition-colors duration-200
      `}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Activities</h2>
      
      <div className="space-y-3">
        {activities.length > 0 ? (
          activities.map(activity => (
            <ActivityItem 
              key={activity.id} 
              activity={activity} 
              isDragging={draggedActivity?.id === activity.id} 
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 italic">
            All activities have been scheduled
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityBoard;
