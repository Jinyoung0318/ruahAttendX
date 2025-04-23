import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/sidebar.module.css';

const CommSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userDept = JSON.parse(sessionStorage.getItem('user') || '{}').userDept;

    const menuItems = [
        { name: '출석률 현황 📈', path: '/dashboard' },
        { name: '카드 등록 💳', path: '/cardRegist' },
        { name: '사용자 프로필 👤', path: '/userProfile' },
        ...(userDept === 'admin' ? [{ name: '사용자 관리 🧑‍🤝‍🧑', path: '/userManagement' }] : []),
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <button onClick={() => navigate('/dashboard')} className={styles.logoButton}>
                    <img src="../../public/ruah2.png" alt="Logo" />
                </button>
            </div>
            <ul className={styles.navList}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <li key={item.name}>
                            <button
                                className={`${styles.menuButton} ${isActive ? styles.activeButton : styles.inactiveButton}`}
                                onClick={() => navigate(item.path, { state: { pageTitle: item.name } })}>
                                {item.name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default CommSidebar;