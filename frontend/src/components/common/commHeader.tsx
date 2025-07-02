import styles from '../../styles/header.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const CommHeader = () => {
    const location = useLocation();
    const pageTitle = location.state?.pageTitle || '출석률 현황 📈';
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const [userName, setUserName] = useState('');
    const [userParName, setUserParName] = useState('');

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        setUserName(user.userName || '');
        setUserParName(user.userParName || '');
    }, []);

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <div
                onClick={() => setShowDropdown(!showDropdown)}
                className={styles.userInfo}
                style={{ cursor: 'pointer'}}
            >
                <img
                    src="/mainRuah.png"
                    alt="User"
                    className={styles.avatar}
                />
                <span className={styles.userName}>{userName} {userParName}</span>
                {showDropdown && (
                    <div className={styles.dropdownPanel}>
                        <div
                            className={styles.dropdownItem}
                            onClick={(e) => {
                                e.stopPropagation();
                                sessionStorage.clear();
                                navigate('/login');
                            }}
                        >
                            로그아웃
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommHeader;