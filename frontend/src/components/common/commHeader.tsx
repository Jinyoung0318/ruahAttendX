import styles from '../../styles/header.module.css';

const CommHeader = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Dashboard</h1>
            <div className={styles.userInfo}>
                <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="User"
                    className={styles.avatar}
                />
                <span className={styles.userName}>John Doe</span>
            </div>
        </div>
    );
};

export default CommHeader;