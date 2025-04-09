// App.tsx
import { Routes, Route, useNavigate } from 'react-router-dom'
import styles from './styles/certification.module.css'
import Login from './pages/auth/login' // ⬅️ login 페이지 import
import { MdBadge } from 'react-icons/md'

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <button className={styles.loginButton} onClick={() => navigate('/login')}>로그인</button>
                <div className={styles.header}>
                    <h1 className={styles.title}>출석 체크</h1>
                </div>
                <div className={styles.cardIcon}>
                    <MdBadge size={48} color="white" />
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
                        <tr>
                            <td>John Doe</td>
                            <td>Joseph</td>
                            <td>2024-01-20</td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                            <td>Micheal</td>
                            <td>2024-01-20</td>
                        </tr>
                        <tr>
                            <td>Mike Johnson</td>
                            <td>Maria</td>
                            <td>2024-01-20</td>
                        </tr>
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
        </Routes>
    )
}

export default App