import styles from '../../styles/header.module.css';

const userName = JSON.parse(sessionStorage.getItem('user') || '{}').userName;
const userParName = JSON.parse(sessionStorage.getItem('user') || '{}').userParName;

const CommHeader = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>출석률 현황</h1>
            <div className={styles.userInfo}>
                <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="User"
                    className={styles.avatar}
                />
                <span className={styles.userName}>{userName} _ {userParName}</span>
            </div>
        </div>
    );
};

export default CommHeader;