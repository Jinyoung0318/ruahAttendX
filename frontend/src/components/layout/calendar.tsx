import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../../styles/calendar.module.css';

interface AttendanceCalendarProps {
    attendedDates: string[]; // 'YYYY-MM-DD' 형식
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
    attendedDates,
}) => {
    const currentDate = new Date();
    const displayMonth = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>{displayMonth}</span>
            </div>
            <Calendar
                tileClassName={({ date }) => {
                    const iso = date.toISOString().split('T')[0];
                    return attendedDates.includes(iso) ? styles.attendedDay : undefined;
                }}
            />
        </div>
    );
};

export default AttendanceCalendar;