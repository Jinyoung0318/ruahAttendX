import styles from '../../styles/header.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';

const userName = JSON.parse(sessionStorage.getItem('user') || '{}').userName;
const userParName = JSON.parse(sessionStorage.getItem('user') || '{}').userParName;

const CommHeader = () => {
    const location = useLocation();
    const pageTitle = location.state?.pageTitle || '출석률 현황 📈';
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <div
                onClick={() => setShowDropdown(!showDropdown)}
                className={styles.userInfo}
                style={{ cursor: 'pointer'}}
            >
                <img
                    src="../../public/mainRuah.png"
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