
import { Activity, TimeSlot } from "@/types/schedule";
import { useDroppable } from "@dnd-kit/core";
import ActivityItem from "./ActivityItem";

interface TimeSlotCellProps {
  timeSlot: TimeSlot;
  draggedActivity: Activity | null;
}

const TimeSlotCell = ({ timeSlot, draggedActivity }: TimeSlotCellProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: timeSlot.id,
  });
  
  return (
    <td
      ref={setNodeRef}
      className={`
        py-2 px-4 align-top min-h-[100px]
        ${isOver ? 'bg-primary/10' : 'hover:bg-gray-50'}
        transition-colors duration-200
      `}
    >
      {timeSlot.activities.length > 0 ? (
        <div className="space-y-1.5">
          {timeSlot.activities.map((activity,index) => (
            <ActivityItem 
              key={activity.id} 
              activity={activity} 
              isDragging={draggedActivity?.id === activity.id}
              isScheduled={true}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="h-[40px] flex items-center justify-center">
          {isOver && (
            <div className="text-xs text-gray-400">Drop here</div>
          )}
        </div>
      )}
    </td>
  );
};

export default TimeSlotCell;
