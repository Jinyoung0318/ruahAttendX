import AttendanceRate from '../layout/attendanceRate.tsx';
import Calendar from '../layout/calendar.tsx';
import RecentAttendance from '../layout/RecentAttendance.tsx';

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="flex-1">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <AttendanceRate />
                        <Calendar />
                    </div>
                    <RecentAttendance />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;