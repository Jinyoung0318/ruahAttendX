import { Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './styles/certification.module.css'
import Login from './pages/auth/login'
import CardRegist from "./pages/card/cardRegist.tsx";
import Dashboard from "./pages/attendance/dashboard";
import UserProfile from "./pages/user/userProfile.tsx";
import UserManagement from "./pages/admin/userManagement.tsx"
import { MdBadge } from 'react-icons/md'
import axios from 'axios'


const MainPage = () => {
    const navigate = useNavigate();
    const [scanRecords, setScanRecords] = useState([]);

    interface ScanRecord {
        raxUUserName: string;
        raxUParNAme: string;
        raxADate: string;
    }

    useEffect(() => {
        axios.get('/api/attendances')
            .then(response => {
                setScanRecords(response.data || []);
            })
            .catch(() => {
                setScanRecords([]); // 에러 발생 시에도 빈 배열로 처리
            });
    }, []);


    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <button className={styles.loginButton} onClick={() => navigate('/login')}>로그인</button>
                <div className={styles.header}>
                    <h1 className={styles.title}>출석 체크</h1>
                </div>
                <div className={styles.cardIcon}>
                    <MdBadge size={48} color="black" />
                </div>

                <div className={styles.cardText}>카드를 태깅해주세요</div>
                <div className={styles.subText}>인증이 완료 될 때까지 카드를 태깅해주세요</div>

                <section className={styles.recentScans}>
                    <h2 className={styles.scanTitle}>최근 인증 기록</h2>
                    <table className={styles.scanTable}>
                        <thead>
                        <tr>
                            <th>이름</th>
                            <th>세례명</th>
                            <th>날짜</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scanRecords.length > 0 ? (
                            scanRecords.map((record: ScanRecord, index) => (
                                <tr key={index}>
                                    <td>{record.raxUUserName}</td>
                                    <td>{record.raxUParNAme}</td>
                                    <td>{record.raxADate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center', color: '#737373' }}>
                                    최근 인증 기록이 없습니다.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    )
}

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cardRegist" element={<CardRegist />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/userManagement" element={<UserManagement />} />
        </Routes>
    )
}

export default App