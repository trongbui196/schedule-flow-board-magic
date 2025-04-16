
import { Activity, ScheduleData, TimeSlot } from "@/types/schedule";

export const generateInitialData = (): ScheduleData => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "", "", "", "",
    "", "", "", "", ""
  ];
  // Generate some sample activities
  const activities: Activity[] = [
    
  ];
  
  // Generate empty schedule
  const schedule: { [day: string]: TimeSlot[] } = {};
  
  days.forEach(day => {
    schedule[day] = times.map((time, index) => ({
      id: `timeslot-${day}-${index}`,
      time,
      activities: []
    }));
  });
  
  return {
    days,
    times,
    activities,
    schedule
  };
};

// Generate a random ID for new activities
export const generateId = () => {
  return `activity-${Math.floor(Math.random() * 10000)}`;
};

// Get schedule item colors classes
export const getActivityColorClasses = (color: string) => {
  const colorMap: { [key: string]: { bg: string, text: string, border: string } } = {
    'schedule-item-1': { 
      bg: 'bg-schedule-item-1/20', 
      text: 'text-schedule-item-1', 
      border: 'border-schedule-item-1' 
    },
    'schedule-item-2': { 
      bg: 'bg-schedule-item-2/20', 
      text: 'text-schedule-item-2', 
      border: 'border-schedule-item-2' 
    },
    'schedule-item-3': { 
      bg: 'bg-schedule-item-3/20', 
      text: 'text-schedule-item-3', 
      border: 'border-schedule-item-3' 
    },
    'schedule-item-4': { 
      bg: 'bg-schedule-item-4/20', 
      text: 'text-schedule-item-4', 
      border: 'border-schedule-item-4' 
    },
    'schedule-item-5': { 
      bg: 'bg-schedule-item-5/20', 
      text: 'text-schedule-item-5', 
      border: 'border-schedule-item-5' 
    },
  };
  
  return colorMap[color] || { bg: 'bg-gray-200', text: 'text-gray-800', border: 'border-gray-300' };
};

// Get library activities
export const getLibraryActivities = (): Activity[] => {
  return [
    
  ];
};
