import { useState } from 'react';
import AttendanceRate from '../layout/attendanceRate.tsx';
import Calendar from '../layout/calendar.tsx';
import RecentAttendance from '../layout/RecentAttendance.tsx';

const Dashboard = () => {
    const [markedDates, setMarkedDates] = useState<string[]>([]);

    return (
        <div className="flex">
            <div className="flex-1">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <AttendanceRate />
                        <Calendar markedDates={markedDates} />
                    </div>
                    <RecentAttendance setMarkedDates={setMarkedDates} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;