
import { Activity, DaySchedule, TimeSlot } from "@/types/schedule";
import TimeSlotCell from "./TimeSlotCell";

interface ScheduleTableProps {
  schedule: {
    [day: string]: DaySchedule;
  };
  draggedActivity: Activity | null;
}

const ScheduleTable = ({ schedule, draggedActivity }: ScheduleTableProps) => {
  const days = Object.keys(schedule);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-4 px-4 text-left font-semibold text-gray-600 border-b border-r">
                Time
              </th>
              {days.map(day => (
                <th key={day} className="py-4 px-4 text-left font-semibold text-gray-600 border-b min-w-[180px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule[days[0]]?.map((_, timeIndex) => (
              <tr key={timeIndex} className="border-b last:border-b-0">
                <td className="py-2 px-4 text-sm text-gray-600 border-r font-medium">
                  {schedule[days[0]][timeIndex].time}
                </td>
                
                {days.map(day => {
                  const timeSlot = schedule[day][timeIndex];
                  return (
                    <TimeSlotCell 
                      key={`${day}-${timeIndex}`}
                      timeSlot={timeSlot}
                      draggedActivity={draggedActivity}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;
