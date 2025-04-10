import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/login.module.css';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //todo: Login Logic
    };

    return (
        <div className={styles.container}>
            <button className={styles.authButton} onClick={() => navigate('/')}>인증페이지</button>
            <div className={styles.loginCard}>
                <div className={styles.logo}>
                    <img src="../public/ruah1.png" alt="Logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>아이디</label>
                        <input
                            type="ID"
                            placeholder="아이디를 입력해주세요"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>비밀번호</label>
                        <input
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.loginButton}>
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;