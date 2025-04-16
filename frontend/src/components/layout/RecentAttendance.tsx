import { useEffect, useState } from 'react';
import styles from '../../styles/recentAttendance.module.css';
import DateFilter from '../common/commCalendarSearch.tsx';

const RecentAttendance = () => {
    const [selectedRange] = useState('1개월');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // API 호출 로직 자리 (selectedRange 값을 기준으로)
        console.log(`Fetching data for ${selectedRange}`);
        // 예: axios.get(`/api/attendance?range=${selectedRange}`)
    }, [selectedRange]);

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
                        onSearch={() => {
                            console.log(`Searching between ${startDate} ~ ${endDate}`);
                            // axios.get(`/api/attendance?from=${startDate}&to=${endDate}`)
                        }}
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
                    <tr>
                        <td className={styles.tdLeftPresent}>2024-05-12</td>
                        <td className={styles.tdRight}>
                            <span className={styles.present}>Present</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RecentAttendance;