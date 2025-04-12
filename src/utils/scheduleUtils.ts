
import { Activity, ScheduleData, TimeSlot } from "@/types/schedule";

export const generateInitialData = (): ScheduleData => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  // Generate some sample activities
  const activities: Activity[] = [
    { 
      id: "activity-1", 
      title: "Team Meeting", 
      description: "Weekly team sync-up", 
      color: "schedule-item-1" 
    },
    { 
      id: "activity-2", 
      title: "Project Planning", 
      description: "Planning session for Q2", 
      color: "schedule-item-2" 
    },
    { 
      id: "activity-3", 
      title: "Client Call", 
      description: "Monthly update with client", 
      color: "schedule-item-3" 
    },
    { 
      id: "activity-4", 
      title: "Design Review", 
      description: "UX design review", 
      color: "schedule-item-4" 
    },
    { 
      id: "activity-5", 
      title: "Code Review", 
      description: "PR review session", 
      color: "schedule-item-5" 
    }
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
    { id: "lib-1", title: "Brainstorming", description: "Creative thinking session", color: "schedule-item-1" },
    { id: "lib-2", title: "Sprint Planning", description: "Plan next sprint tasks", color: "schedule-item-2" },
    { id: "lib-3", title: "Retrospective", description: "Review previous sprint", color: "schedule-item-3" },
    { id: "lib-4", title: "1-on-1 Meeting", description: "Individual check-in", color: "schedule-item-4" },
    { id: "lib-5", title: "Workshop", description: "Hands-on learning session", color: "schedule-item-5" },
    { id: "lib-6", title: "Product Demo", description: "Showcase new features", color: "schedule-item-1" },
    { id: "lib-7", title: "Standup", description: "Daily status update", color: "schedule-item-2" },
    { id: "lib-8", title: "Training", description: "Skill development", color: "schedule-item-3" },
    { id: "lib-9", title: "User Testing", description: "Test with real users", color: "schedule-item-4" },
    { id: "lib-10", title: "Strategy Session", description: "Long-term planning", color: "schedule-item-5" },
    { id: "lib-11", title: "Lunch & Learn", description: "Casual learning session", color: "schedule-item-1" },
    { id: "lib-12", title: "Customer Interview", description: "Feedback collection", color: "schedule-item-2" },
    { id: "lib-13", title: "Hackathon", description: "Rapid prototyping", color: "schedule-item-3" },
    { id: "lib-14", title: "All Hands", description: "Company-wide meeting", color: "schedule-item-4" },
    { id: "lib-15", title: "Tech Talk", description: "Knowledge sharing", color: "schedule-item-5" }
  ];
};
