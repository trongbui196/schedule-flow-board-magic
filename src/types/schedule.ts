
export interface Activity {
  id: string;
  title: string;
  description?: string;
  color: string;
  duration?: number; // in minutes
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
