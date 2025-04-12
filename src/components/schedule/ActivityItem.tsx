
import { Activity } from "@/types/schedule";
import { useDraggable } from "@dnd-kit/core";
import { getActivityColorClasses } from "@/utils/scheduleUtils";
import { Grip } from "lucide-react";

interface ActivityItemProps {
  activity: Activity;
  isDragging: boolean;
  isScheduled?: boolean;
}

const ActivityItem = ({ activity, isDragging, isScheduled = false }: ActivityItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: activity.id,
  });
  
  const colorClasses = getActivityColorClasses(activity.color);
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 999,
  } : undefined;
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative p-3 rounded-md border cursor-grab 
        ${colorClasses.bg} ${colorClasses.border}
        ${isDragging ? 'opacity-50 shadow-lg scale-105' : 'opacity-100'}
        transition-all duration-200
        ${isScheduled ? 'text-sm p-2' : ''}
      `}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-2">
        <div className={`${isScheduled ? 'hidden' : 'block'} mt-1 opacity-50`}>
          <Grip size={14} />
        </div>
        <div className="flex-1">
          <h3 className={`font-medium ${colorClasses.text}`}>{activity.title}</h3>
          
          {activity.description && !isScheduled && (
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
