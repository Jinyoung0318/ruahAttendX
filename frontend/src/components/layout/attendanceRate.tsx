import React from 'react';
import styles from '../../styles/atttendanceRate.module.css';

interface attendanceRateProps {
    attendanceRate: number;
}

const AttendanceRate: React.FC<attendanceRateProps> = ({ attendanceRate }) => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.header}>This Month</h2>
                <div className={styles.attendanceRate}>
                    {attendanceRate}%
                </div>
                <div className={styles.subtitle}>Attendance Rate</div>
            </div>
        </div>
    );
};

export default AttendanceRate;