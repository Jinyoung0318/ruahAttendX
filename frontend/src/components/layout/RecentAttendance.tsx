import { useState , useEffect} from 'react';
import styles from '../../styles/recentAttendance.module.css';
import DateFilter from '../common/commCalendarSearch.tsx';

type AttendanceRecord = {
    date: string;
    status: string;
};

const RecentAttendance = ({ setMarkedDates }: { setMarkedDates: (dates: string[]) => void }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
    const userId = JSON.parse(sessionStorage.getItem('user') || '{}').userUId

    const totalPages = Math.max(1, Math.ceil(attendanceList.length / itemsPerPage));
    const paginatedData = attendanceList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // fetchAttendance 정의를 useEffect 밖으로 이동
    const fetchAttendance = async () => {
        try {
            const params = new URLSearchParams({
                start_date: startDate,
                end_date: endDate,
                rax_u_id: userId
            });

            const response = await fetch(`/api/recentAttendance?${params.toString()}`);
            if (!response.ok) {
                return ('네트워크 응답이 올바르지 않습니다.');
            }

            const data = await response.json();
            setAttendanceList(data);
            setCurrentPage(1);

            const attendedDates = data.filter((d: AttendanceRecord) => d.status === '1').map((d: AttendanceRecord) => d.date.split('T')[0]);
            setMarkedDates(attendedDates);
        } catch (err) {
            console.error('출석 데이터 불러오기 실패:', err);
            alert('출석 데이터를 불러오는 데 실패했습니다.');
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div className={styles.headerLeft}>
                    <h2 className={styles.title}>인증 기록 🕓</h2>
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
                                <td className={styles.tdLeftPresent}>
                                    {attendance.date.split('T')[0]}
                                </td>
                                <td className={styles.tdRight}>
                                    <span className={styles.present}>
                                        {attendance.status === '1' ? '출석' : '결석'}
                                    </span>
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
                <div style={{ display: 'flex', justifyContent: '', alignItems: 'center', marginTop: '1rem' }}>
                    <div className={styles.paginationWrapper}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                className={`${styles.pagingButton} ${currentPage === index + 1 ? styles.pagingButtonActive : ''}`}
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div className={styles.paginationRight}>
                        <label htmlFor="limit-select" className={styles.limitLabel}>페이지당 개수:</label>
                        <select
                            id="limit-select"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setCurrentPage(1);
                                setItemsPerPage(Number(e.target.value));
                            }}
                            className={styles.limitSelect}
                        >
                            <option value={2}>2개</option>
                            <option value={5}>5개</option>
                            <option value={10}>10개</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentAttendance;