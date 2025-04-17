import { useState } from 'react';
import styles from '../../styles/recentAttendance.module.css';
import DateFilter from '../common/commCalendarSearch.tsx';
import axios from 'axios';

type AttendanceRecord = {
    date: string;
    status: string;
};

const RecentAttendance = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
    const userId = JSON.parse(sessionStorage.getItem('user') || '{}').userId

    const totalPages = Math.max(1, Math.ceil(attendanceList.length / itemsPerPage));
    const paginatedData = attendanceList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const fetchAttendance = () => {
        axios.get('/api/recentAttendance', {
            params: { start_date: startDate, end_date: endDate , userid: userId },
        }).then(res => {
            setAttendanceList(res.data);
            setCurrentPage(1);
        }).catch(err => {
            console.error('출석 데이터 불러오기 실패:', err);
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div className={styles.headerLeft}>
                    <h2 className={styles.title}>🕓 인증 기록 🕓</h2>
                </div>
                <div className={styles.headerRight}>
                    <DateFilter
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        onSearch={fetchAttendance}
                    />
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.thLeft}>날짜</th>
                        <th className={styles.thRight}>출석 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((attendance, index) => (
                            <tr key={index}>
                                <td className={styles.tdLeftPresent}>{attendance.date}</td>
                                <td className={styles.tdRight}>
                                    <span className={styles.present}>{attendance.status}</span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>
                                인증 기록이 존재하지 않습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPages >= 1 && (
                <div className={styles.paginationWrapper}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button className={styles.pagingButton} key={index + 1} onClick={() => setCurrentPage(index + 1)}> {index + 1} </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentAttendance;