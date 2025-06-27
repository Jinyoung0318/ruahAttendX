import { Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './styles/certification.module.css'
import Login from './pages/auth/login'
import CardRegist from "./pages/card/cardRegist.tsx";
import Dashboard from "./pages/attendance/dashboard";
import UserProfile from "./pages/user/userProfile.tsx";
import UserManagement from "./pages/admin/userManagement.tsx"
import { MdBadge } from 'react-icons/md'


const MainPage = () => {
    const navigate = useNavigate();
    const [scanRecords, setScanRecords] = useState([]);

    interface ScanRecord {
        userName: string;
        userParName: string;
        attendanceDate: string;
    }

    useEffect(() => {
        const fetchRecentAttendances = async () => {
            try {
                const response = await fetch('/api/attendances/recent');
                if (!response.ok) {
                    return ('네트워크 응답이 올바르지 않습니다.')
                }

                const data = await response.json();
                setScanRecords(data || []);
            } catch (error) {
                console.error('인증 기록 불러오기 실패:', error);
                setScanRecords([]);
            }
        };

        fetchRecentAttendances();
    }, []);

    // RFID 카드 입력 감지 및 서버 전송
    // useEffect(() => {
    //     let cardBuffer = '';
    //
    //     const handleKeyPress = (e: KeyboardEvent) => {
    //         if (e.key === 'Enter') {
    //             const cardNumber = cardBuffer.trim();
    //             if (cardNumber) {
    //                 fetch('/api/attendances/check', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({ card_uid: cardNumber }),
    //                 }).catch(err => console.error('카드 전송 실패:', err));
    //             }
    //             cardBuffer = '';
    //         } else {
    //             cardBuffer += e.key;
    //         }
    //     };
    //
    //     window.addEventListener('keydown', handleKeyPress);
    //     return () => window.removeEventListener('keydown', handleKeyPress);
    // }, []);

    useEffect(() => {
        let cardBuffer = '';

        const handleKeyPress = async (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                const cardNumber = cardBuffer.trim();
                if (cardNumber) {
                    try {
                        const response = await fetch('/api/attendances/check', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ card_uid: cardNumber }),
                        });

                        if (response.ok) {
                            navigate(0)  // 성공 시 페이지 새로고침
                        } else {
                            console.error('서버 응답 오류:', response.statusText);
                        }
                    } catch (err) {
                        console.error('카드 전송 실패:', err);
                    }
                }
                cardBuffer = '';
            } else {
                cardBuffer += e.key;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
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
                                    <td>{record.userName}</td>
                                    <td>{record.userParName}</td>
                                    <td>{record.attendanceDate}</td>
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