import '../../styles/mainContenet.module.css';
import AttendanceRate from '../layout/attendanceRate.tsx';
import Calendar from '../layout/calendar.tsx';

const MainContenet = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-body">
                <div className="attendance-rate-card">
                    <h2>출석률</h2>
                    <AttendanceRate attendanceRate={80}/>
                </div>
                <div className="calendar-card">
                    <h2>이번 달</h2>
                    <Calendar attendedDates={['2025-04-11']}/>
                </div>
            </div>
        </div>
    );
};

export default MainContenet;