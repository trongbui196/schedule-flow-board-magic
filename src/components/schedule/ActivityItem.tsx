import { Activity } from "@/types/schedule";
import { useDraggable } from "@dnd-kit/core";
import { Grip } from "lucide-react";

interface ActivityItemProps {
  activity: Activity;
  isDragging: boolean;
  isScheduled?: boolean;
  index: number; // Add index as a prop
}

const ActivityItem = ({ activity, isDragging, isScheduled = false, index }: ActivityItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: activity.id,
  });

  // Define color classes, skipping the second color
  const colorClasses = [
    { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800',cate:'aaa' },
    { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-800',cate:'abc' },
    { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800',cate:'bbb' },
    { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-800',cate:'ccc' },
  ];

  // Cycle through colors, skipping the second
  const color = colorClasses.find(c => c.cate === activity.category) || colorClasses[0];

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
        ${color.bg} ${color.border}
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
          <h3 className={`font-medium ${color.text}`}>{activity.name}</h3>
          
          {activity.description && !isScheduled && (
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;