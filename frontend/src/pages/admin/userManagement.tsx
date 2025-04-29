import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../components/common/commSidebar.tsx';
import Header from  '../../components/common/commHeader.tsx';
import styles from '../../styles/userManagement.module.css';

const UserManagement = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [targetUser, setTargetUser] = useState<string | null>(null);

    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newUser, setNewUser] = useState({
      rax_u_user_id: '',
      rax_u_user_name: '',
      rax_u_par_name: '',
      rax_u_email: '',
      rax_u_tel: '',
      rax_u_dept: '',
      rax_u_addr: '',
      rax_u_birth: '',
      rax_u_par_birth: '',
      rax_u_dept_role: '',
    });

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editUser, setEditUser] = useState<any>(null);

    const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
      setNewUser({ ...newUser, [field]: e.target.value });
    };

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <main className="flex-1 w-full h-full">
                <Header />
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.title}>사용자 관리</h2>
                        <button
                          className={styles.addUserButton}
                          onClick={() => {
                            setNewUser({
                              rax_u_user_id: '',
                              rax_u_user_name: '',
                              rax_u_par_name: '',
                              rax_u_email: '',
                              rax_u_tel: '',
                              rax_u_dept: '',
                              rax_u_addr: '',
                              rax_u_birth: '',
                              rax_u_par_birth: '',
                              rax_u_dept_role: ''
                            });
                            setShowAddPopup(true);
                          }}
                        >
                          + 봉사자 추가
                        </button>
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
                                    <span
                                      className={styles.actionEdit}
                                      onClick={() => {
                                        setEditUser({
                                          rax_u_user_id: 'EMP001',
                                          rax_u_user_name: 'John Doe',
                                          rax_u_par_name: '베드로',
                                          rax_u_email: 'john.doe@company.com',
                                          rax_u_tel: '010-1234-5678',
                                          rax_u_dept: '전산팀',
                                          rax_u_addr: '서울시 강남구',
                                          rax_u_birth: '1990-01-01',
                                          rax_u_par_birth: '06-29',
                                          rax_u_dept_role: '팀장'
                                        });
                                        setShowEditPopup(true);
                                      }}
                                    >
                                      Edit
                                    </span>
                                    <span
                                      className={styles.actionDelete}
                                      onClick={() => {
                                        setTargetUser('John Doe');
                                        setShowConfirm(true);
                                      }}
                                    >
                                      Delete
                                    </span>
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
                                    <span
                                        className={styles.actionDelete}
                                        onClick={() => {
                                            setTargetUser('Jane Smith');
                                            setShowConfirm(true);
                                        }}
                                    >
                                      Delete
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {showConfirm && (
                    <div className={styles.popupOverlay}>
                        <div className={styles.popup}>
                            <p>{targetUser}을(를) 지우시겠습니까?</p>
                            <div className={styles.popupActions}>
                                <button
                                    className={styles.confirmButton}
                          onClick={() => {
                            // TODO: 삭제 API
                            setShowConfirm(false);
                            setTargetUser(null);
                          }}
                        >
                          삭제
                        </button>
                        <button
                          className={styles.cancelButton}
                          onClick={() => {
                            setShowConfirm(false);
                            setTargetUser(null);
                          }}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {showAddPopup && (
                  <div className={styles.popupOverlay}>
                    <div className={styles.popup}>
                      <h3 className={styles.popupTitle}>봉사자 추가</h3>
                      <div className={styles.popupForm}>
                        <input type="text" placeholder="아이디" value={newUser.rax_u_user_id} onChange={(e) => handleNewUserChange(e, 'rax_u_user_id')} className={styles.inputField} />
                        <input type="text" placeholder="이름" value={newUser.rax_u_user_name} onChange={(e) => handleNewUserChange(e, 'rax_u_user_name')} className={styles.inputField} />
                        <input type="text" placeholder="세례명" value={newUser.rax_u_par_name} onChange={(e) => handleNewUserChange(e, 'rax_u_par_name')} className={styles.inputField} />
                        <input type="email" placeholder="이메일" value={newUser.rax_u_email} onChange={(e) => handleNewUserChange(e, 'rax_u_email')} className={styles.inputField} />
                        <input type="text" placeholder="전화번호" value={newUser.rax_u_tel} onChange={(e) => handleNewUserChange(e, 'rax_u_tel')} className={styles.inputField} />
                        <input type="text" placeholder="부서" value={newUser.rax_u_dept} onChange={(e) => handleNewUserChange(e, 'rax_u_dept')} className={styles.inputField} />
                        <input type="text" placeholder="주소" value={newUser.rax_u_addr} onChange={(e) => handleNewUserChange(e, 'rax_u_addr')} className={styles.inputField} />
                        <DatePicker
                          selected={newUser.rax_u_birth ? new Date(newUser.rax_u_birth) : null}
                          onChange={(date: Date | null) => {
                            if (date) {
                              setNewUser({ ...newUser, rax_u_birth: date.toISOString().slice(0, 10) });
                            }
                          }}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="생년월일"
                          className={styles.inputField}
                        />
                        <input type="text" placeholder="축일" value={newUser.rax_u_par_birth} onChange={(e) => handleNewUserChange(e, 'rax_u_par_birth')} className={styles.inputField} />
                        <input type="text" placeholder="직급" value={newUser.rax_u_dept_role} onChange={(e) => handleNewUserChange(e, 'rax_u_dept_role')} className={styles.inputField} />
                      </div>
                      <div className={styles.popupActions}>
                        <button
                          className={styles.confirmButton}
                          onClick={() => {
                            // TODO: Add API call to POST new user
                            console.log('Saving user:', newUser);
                            setShowAddPopup(false);
                            setNewUser({
                                rax_u_user_id: '',
                                rax_u_user_name: '',
                                rax_u_par_name: '',
                                rax_u_email: '',
                                rax_u_tel: '',
                                rax_u_dept: '',
                                rax_u_addr: '',
                                rax_u_birth: '',
                                rax_u_par_birth: '',
                                rax_u_dept_role: ''
                            });
                          }}
                        >
                          저장
                        </button>
                        <button className={styles.cancelButton} onClick={() => setShowAddPopup(false)}>
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {showEditPopup && editUser && (
                  <div className={styles.popupOverlay}>
                    <div className={`${styles.popup} ${styles.editPopup}`}>
                      <h3 className={styles.popupTitle}>봉사자 정보 수정</h3>
                      <div className={styles.popupForm}>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>이름:</span>
                          <input type="text" placeholder="이름" value={editUser.rax_u_user_name} disabled className={`${styles.inputField} ${styles.readonlyField}`} />
                        </div>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>세례명:</span>
                          <input type="text" placeholder="세례명" value={editUser.rax_u_par_name} disabled className={`${styles.inputField} ${styles.readonlyField}`} />
                        </div>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>이메일:</span>
                          <input type="email" placeholder="이메일" value={editUser.rax_u_email} onChange={(e) => setEditUser({ ...editUser, rax_u_email: e.target.value })} className={styles.inputField} />
                        </div>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>사용자 ID:</span>
                          <input type="text" placeholder="사용자 ID" value={editUser.rax_u_user_id} onChange={(e) => setEditUser({ ...editUser, rax_u_user_id: e.target.value })} className={styles.inputField} />
                        </div>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>전화번호:</span>
                          <input type="text" placeholder="전화번호" value={editUser.rax_u_tel} onChange={(e) => setEditUser({ ...editUser, rax_u_tel: e.target.value })} className={styles.inputField} />
                        </div>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>주소:</span>
                          <input type="text" placeholder="주소" value={editUser.rax_u_addr} onChange={(e) => setEditUser({ ...editUser, rax_u_addr: e.target.value })} className={styles.inputField} />
                        </div>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>부서:</span>
                          <input type="text" placeholder="부서" value={editUser.rax_u_dept} onChange={(e) => setEditUser({ ...editUser, rax_u_dept: e.target.value })} className={styles.inputField} />
                        </div>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>직책:</span>
                          <input type="text" placeholder="직책" value={editUser.rax_u_dept_role} onChange={(e) => setEditUser({ ...editUser, rax_u_dept_role: e.target.value })} className={styles.inputField} />
                        </div>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>생년월일:</span>
                          <input type="text" placeholder="생년월일" value={editUser.rax_u_birth} disabled className={`${styles.inputField} ${styles.readonlyField}`} />
                        </div>
                        <div className={styles.inputRow}>
                          <span className={styles.inputLabel}>축일:</span>
                          <input type="text" placeholder="축일" value={editUser.rax_u_par_birth} disabled className={`${styles.inputField} ${styles.readonlyField}`} />
                        </div>
                      </div>
                      <div className={styles.popupActions}>
                        <button
                          className={styles.confirmButton}
                          onClick={() => {
                            console.log('수정된 사용자 정보:', editUser);
                            // TODO: 수정 API 호출
                            setShowEditPopup(false);
                            setEditUser(null);
                          }}
                        >
                          저장
                        </button>
                        <button className={styles.cancelButton} onClick={() => setShowEditPopup(false)}>
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </main>
        </div>
    );
};

export default UserManagement;
