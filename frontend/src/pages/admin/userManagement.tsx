import Sidebar from '../../components/common/commSidebar.tsx';
import Header from  '../../components/common/commHeader.tsx';
import styles from '../../styles/userManagement.module.css';

const UserManagement = () => {
    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <main className="flex-1 w-full h-full">
                <Header />
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.title}>사용자 관리</h2>
                        <button className={styles.addUserButton}>+ 봉사자 추가</button>
                    </div>
                    <table className={styles.userTable}>
                        <thead>
                        <tr>
                            <th>이름(이메일)</th>
                            <th><div className={styles.columnHeader}>세례명</div></th>
                            <th><div className={styles.columnHeader}>사용자 ID</div></th>
                            <th><div className={styles.columnHeader}>전화번호</div></th>
                            <th><div className={styles.columnHeader}>주소</div></th>
                            <th><div className={styles.columnHeader}>생년월일</div></th>
                            <th><div className={styles.columnHeader}>축일</div></th>
                            <th><div className={styles.columnHeader}>부서</div></th>
                            <th><div className={styles.columnHeader}>직책</div></th>
                            <th><div className={styles.columnHeader}>출석률(년)</div></th>
                            <th><div className={styles.columnHeader}>관리</div></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className={styles.userInfo}>
                                        <div>
                                            <div>John Doe</div>
                                            <div className={styles.email}>john.doe@company.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td><div className={styles.dataCell}>베드로</div></td>
                                <td><div className={styles.dataCell}>EMP001</div></td>
                                <td><div className={styles.dataCell}>010-1234-5678</div></td>
                                <td><div className={styles.dataCell}>서울시 강남구</div></td>
                                <td><div className={styles.dataCell}>1990-01-01</div></td>
                                <td><div className={styles.dataCell}>06-29</div></td>
                                <td><div className={styles.dataCell}>전산팀</div></td>
                                <td><div className={styles.dataCell}>팀장</div></td>
                                <td><span className={styles.attendanceSuccess}>95.3%</span></td>
                                <td className={styles.actionCell}>
                                    <span className={styles.actionEdit}>Edit</span>
                                    <span className={styles.actionDelete}>Delete</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className={styles.userInfo}>
                                        <div>
                                            <div>Jane Smith</div>
                                            <div className={styles.email}>jane.smith@company.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td><div className={styles.dataCell}>마리아</div></td>
                                <td><div className={styles.dataCell}>EMP002</div></td>
                                <td><div className={styles.dataCell}>010-5678-1234</div></td>
                                <td><div className={styles.dataCell}>서울시 마포구</div></td>
                                <td><div className={styles.dataCell}>1992-03-15</div></td>
                                <td><div className={styles.dataCell}>12-08</div></td>
                                <td><div className={styles.dataCell}>홍보팀</div></td>
                                <td><div className={styles.dataCell}>간사</div></td>
                                <td><span className={styles.attendanceSuccess}>96.5%</span></td>
                                <td className={styles.actionCell}>
                                    <span className={styles.actionEdit}>Edit</span>
                                    <span className={styles.actionDelete}>Delete</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default UserManagement;
