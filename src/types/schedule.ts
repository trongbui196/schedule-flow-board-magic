
export interface Activity {
  id: string;
  name: string;
  description?: string;
  color: string;
  duration?: number;
  category:string; // in minutes
}

export interface TimeSlot {
  id: string;
  time: string;
  activities: Activity[];
}

export type DaySchedule = TimeSlot[];

export interface ScheduleData {
  days: string[];
  times: string[];
  activities: Activity[];
  schedule: {
    [day: string]: DaySchedule;
  };
}
