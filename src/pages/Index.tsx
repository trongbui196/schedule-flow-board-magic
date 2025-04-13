
import { useEffect, useState } from "react";
import ScheduleTable from "@/components/schedule/ScheduleTable";
import ActivityBoard from "@/components/schedule/ActivityBoard";
import ActivityLibrary from "@/components/schedule/ActivityLibrary";
import VietMapLeaflet from "@/components/VietMapLeaflet";
import { 
  DndContext, 
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { Activity, ScheduleData, TimeSlot } from "@/types/schedule";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useToast } from "@/components/ui/use-toast";
import { generateId, generateInitialData, getLibraryActivities } from "@/utils/scheduleUtils";

const Index = () => {
  const { toast } = useToast();
  const [scheduleData, setScheduleData] = useState<ScheduleData>(() => generateInitialData());
  const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null);
  const [libraryActivities] = useState<Activity[]>(() => getLibraryActivities());
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px of movement required before activating
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // 250ms delay for touch
      tolerance: 5, // 5px of movement allowed during delay
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id as string;
    
    // Find the activity being dragged
    let activity: Activity | undefined;
    
    // Check in the activity board first
    activity = scheduleData.activities.find(act => act.id === id);
    
    // If not in board, check in the schedule
    if (!activity) {
      for (const day in scheduleData.schedule) {
        for (const timeSlot of scheduleData.schedule[day]) {
          activity = timeSlot.activities.find(act => act.id === id);
          if (activity) break;
        }
        if (activity) break;
      }
    }
    
    if (activity) {
      setDraggedActivity(activity);
    }
  };
  
  const handleDragOver = (event: DragOverEvent) => {
    // We can implement additional logic here if needed
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setDraggedActivity(null);
      return;
    }
    
    const activityId = active.id as string;
    const targetId = over.id as string;
    
    // Handle dropping on a time slot
    if (targetId.includes('timeslot-')) {
      const [_, day, timeIndex] = targetId.split('-');
      moveActivityToTimeSlot(activityId, day, parseInt(timeIndex));
      toast({
        title: "Activity scheduled",
        description: "Your activity has been added to the schedule.",
      });
    }
    // Handle dropping back to the activity board
    else if (targetId === 'activity-board') {
      moveActivityToBoard(activityId);
      toast({
        title: "Activity unscheduled",
        description: "Your activity has been moved back to the board.",
      });
    }
    
    setDraggedActivity(null);
  };
  
  const moveActivityToTimeSlot = (activityId: string, day: string, timeIndex: number) => {
    setScheduleData(prev => {
      const newData = {...prev};
      
      // First, remove the activity from its current location
      let activityToMove: Activity | null = null;
      
      // Check in the activity board
      const boardIndex = newData.activities.findIndex(a => a.id === activityId);
      if (boardIndex !== -1) {
        activityToMove = newData.activities[boardIndex];
        newData.activities = [
          ...newData.activities.slice(0, boardIndex),
          ...newData.activities.slice(boardIndex + 1)
        ];
      } 
      
      // If not in board, check in the schedule
      if (!activityToMove) {
        for (const scheduleDay in newData.schedule) {
          for (let i = 0; i < newData.schedule[scheduleDay].length; i++) {
            const timeSlot = newData.schedule[scheduleDay][i];
            const actIndex = timeSlot.activities.findIndex(a => a.id === activityId);
            if (actIndex !== -1) {
              activityToMove = timeSlot.activities[actIndex];
              newData.schedule[scheduleDay][i] = {
                ...timeSlot,
                activities: [
                  ...timeSlot.activities.slice(0, actIndex),
                  ...timeSlot.activities.slice(actIndex + 1)
                ]
              };
              break;
            }
          }
          if (activityToMove) break;
        }
      }
      
      // Now add the activity to the target time slot
      if (activityToMove && newData.schedule[day] && newData.schedule[day][timeIndex]) {
        newData.schedule[day][timeIndex] = {
          ...newData.schedule[day][timeIndex],
          activities: [...newData.schedule[day][timeIndex].activities, activityToMove]
        };
      }
      
      return newData;
    });
  };
  
  const moveActivityToBoard = (activityId: string) => {
    setScheduleData(prev => {
      const newData = {...prev};
      
      // Find and remove the activity from the schedule
      let activityToMove: Activity | null = null;
      
      for (const day in newData.schedule) {
        for (let i = 0; i < newData.schedule[day].length; i++) {
          const timeSlot = newData.schedule[day][i];
          const actIndex = timeSlot.activities.findIndex(a => a.id === activityId);
          if (actIndex !== -1) {
            activityToMove = timeSlot.activities[actIndex];
            newData.schedule[day][i] = {
              ...timeSlot,
              activities: [
                ...timeSlot.activities.slice(0, actIndex),
                ...timeSlot.activities.slice(actIndex + 1)
              ]
            };
            break;
          }
        }
        if (activityToMove) break;
      }
      
      // Add the activity back to the board
      if (activityToMove) {
        newData.activities = [...newData.activities, activityToMove];
      }
      
      return newData;
    });
  };
  
  const handleAddActivityFromLibrary = (libraryActivity: Activity) => {
    // Create a new copy of the activity with a unique ID
    const newActivity: Activity = {
      ...libraryActivity,
      id: generateId() // Generate a unique ID
    };
    
    // Add the new activity to the board
    setScheduleData(prev => ({
      ...prev,
      activities: [...prev.activities, newActivity]
    }));
    
    toast({
      title: "Activity added",
      description: `"${newActivity.title}" has been added to your board.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Schedule Planner</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Activity Library Table - 1/3 width */}
          <div className="md:col-span-1">
            <ActivityLibrary 
              activities={libraryActivities}
              onAddActivity={handleAddActivityFromLibrary}
            />
          </div>
          
          {/* Map - 2/3 width */}
          <div className="md:col-span-2 h-[500px]">
            <VietMapLeaflet />
          </div>
        </div>
        
        <DndContext
          sensors={sensors}
          modifiers={[restrictToWindowEdges]}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Activity board - takes 1/4 of the space on large screens */}
            <div className="lg:col-span-1 md:col-span-1">
              <ActivityBoard 
                activities={scheduleData.activities}
                draggedActivity={draggedActivity}
              />
            </div>
            
            {/* Schedule table - takes 3/4 of the space on large screens */}
            <div className="lg:col-span-3 md:col-span-2 overflow-x-auto">
              <ScheduleTable 
                schedule={scheduleData.schedule}
                draggedActivity={draggedActivity}
              />
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default Index;
