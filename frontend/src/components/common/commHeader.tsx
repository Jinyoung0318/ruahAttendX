import styles from '../../styles/header.module.css';
import {useLocation} from "react-router-dom";

const userName = JSON.parse(sessionStorage.getItem('user') || '{}').userName;
const userParName = JSON.parse(sessionStorage.getItem('user') || '{}').userParName;

const CommHeader = () => {
    const location = useLocation();
    const pageTitle = location.state?.pageTitle || '';

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={styles.userInfo}>
                <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="User"
                    className={styles.avatar}
                />
                <span className={styles.userName}>{userName} {userParName}</span>
            </div>
        </div>
    );
};

export default CommHeader;