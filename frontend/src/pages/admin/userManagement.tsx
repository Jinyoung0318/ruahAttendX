import { useState, useEffect } from 'react';
import CalendarLib from 'react-calendar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../../components/common/commSidebar.tsx';
import Header from  '../../components/common/commHeader.tsx';
import styles from '../../styles/userManagement.module.css';

const UserManagement = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showBirthCalendar, setShowBirthCalendar] = useState(false);
    const [deptList, setDeptList] = useState<string[]>([]);
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
      rax_u_pwd: '',
    });
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editUser, setEditUser] = useState<any>(null);
    const [userList, setUserList] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [newUserErrors, setNewUserErrors] = useState({
        rax_u_user_id: '',
        rax_u_user_name: '',
        rax_u_email: '',
        rax_u_tel: '',
        rax_u_addr: '',
        rax_u_birth: '',
        rax_u_par_birth: '',
        rax_u_dept_role: '',
        rax_u_pwd: '',
    });

    const validateField = (field: string, value: string) => {
        let error = '';

        if (field === 'rax_u_user_id') {
            if (!value.trim()) {
                error = '아이디는 필수입니다. (5~15자 사이)';
            } else if (value.length < 5 || value.length > 15) {
                error = '아이디는 5~15자 사이로 입력해 주세요.';
            }
        } else if (
            field === 'rax_u_email' &&
            (
                !value ||
                value.length > 255 ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            )
        ) {
            error = '유효한 이메일 형식이어야 하며 너무 길지 않아야 합니다.';
        } else if (
            field === 'rax_u_tel' &&
            (
                !/^010-\d{4}-\d{4}$/.test(value) ||
                value.length > 13
            )
        ) {
            error = '전화번호는 010-0000-0000 형식으로 입력해 주세요.';
        } else if (
            field === 'rax_u_addr' &&
            (value.length < 5 || value.length > 255)
        ) {
            error = '주소는 5자 이상 255자 이하로 입력해 주세요.';
        } else if (field === 'rax_u_birth') {
            const today = new Date().toISOString().slice(0, 10);
            if (value > today) {
                error = '생년월일은 오늘 날짜를 넘길 수 없습니다.';
            }
        } else if (field === 'rax_u_par_birth') {
            if (value.length !== 5) {
                error = '축일은 5자로 입력해 주세요.';
            } else if (!/^\d{2}-\d{2}$/.test(value)) {
                error = '축일은 MM-DD 형식(예: 03-19)으로 입력해 주세요.';
            }
        } else if (
            field === 'rax_u_dept_role' &&
            value.length > 5
        ) {
            error = '직급은 5자 이내로 입력해 주세요.';
        } else if (field === 'rax_u_pwd') {
            if (!value.trim()) {
                error = '비밀번호는 필수입니다.';
            } else if (value.length < 5) {
                error = '비밀번호는 최소 5자 이상이어야 합니다.';
            } else if (value.length > 19) {
                error = '비밀번호는 20자 미만으로 입력해 주세요.';
            }
        }

        setNewUserErrors(prev => ({ ...prev, [field]: error }));
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('/api/dept/list');
                const data = await response.json();
                setDeptList(data.departments);
            } catch (err) {
                console.error('부서 목록 불러오기 실패:', err);
            }
        };
        fetchDepartments();
    }, []);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/user/list?page=${page}&limit=${limit}`);
                const data = await response.json();
                setUserList(
                  data.users.map((user: any) => ({
                    ...user,
                    year_attendance_rate: user.year_attendance_rate || 0
                  }))
                ); // 실제 데이터 배열
                setTotalCount(data.total); // 전체 유저 수
            } catch (err) {
                console.error("사용자 불러오기 실패:", err);
            }
        };

        fetchUsers();
    }, [page, limit]); //

    const handleNewUserChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      field: string
    ) => {
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
                              rax_u_dept_role: '',
                              rax_u_pwd: '',
                            });
                            setNewUserErrors({
                              rax_u_user_id: '',
                              rax_u_user_name: '',
                              rax_u_email: '',
                              rax_u_tel: '',
                              rax_u_addr: '',
                              rax_u_birth: '',
                              rax_u_par_birth: '',
                              rax_u_dept_role: '',
                              rax_u_pwd: '',
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
                            <th><div className={styles.columnHeader}>이름(이메일)</div></th>
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
                          {userList.map((user, index) => (
                            <tr key={index}>
                              <td>
                                <div className={styles.userInfo}>
                                  <div>
                                    <div style={{fontSize: '15px'}}>{user.rax_u_user_name}</div>
                                    <div className={styles.email}>{user.rax_u_email}</div>
                                  </div>
                                </div>
                              </td>
                              <td><div className={styles.dataCell}>{user.rax_u_par_name}</div></td>
                              <td><div className={styles.dataCell}>{user.rax_u_user_id}</div></td>
                              <td><div className={styles.dataCell}>{user.rax_u_tel}</div></td>
                              <td><div className={styles.dataCell}>{user.rax_u_addr}</div></td>
                              <td><div className={styles.dataCell}>{user.rax_u_birth}</div></td>
                              <td><div className={styles.dataCell}>{user.rax_u_par_birth}</div></td>
                              <td><div className={styles.dataCell}>{user.rax_u_dept}</div></td>
                              <td><div className={styles.dataCell}>{user.rax_u_dept_role}</div></td>
                              <td><span className={styles.attendanceSuccess}>{user.year_attendance_rate}%</span></td>
                              <td className={styles.actionCell}>
                                <span
                                  className={styles.actionEdit}
                                  onClick={() => {
                                    setEditUser(user);
                                    setShowEditPopup(true);
                                  }}
                                >
                                  Edit
                                </span>
                                <span
                                  className={styles.actionDelete}
                                  onClick={() => {
                                    setTargetUser(user.rax_u_user_name);
                                    setShowConfirm(true);
                                  }}
                                >
                                  Delete
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.paginationContainer}>
                  <div className={styles.paginationCenter}>
                    {Array.from({ length: Math.ceil(totalCount / limit) }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={page === i + 1 ? styles.activePage : styles.pageButton}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <div className={styles.paginationRight}>
                    <label htmlFor="limit-select" className={styles.limitLabel}>페이지당 개수:</label>
                      <select
                          id="limit-select"
                          value={limit}
                          onChange={(e) => {
                              setPage(1);
                              setLimit(Number(e.target.value));
                          }}
                          className={styles.limitSelect}
                      >
                          <option value={5}>5개</option>
                          <option value={10}>10개</option>
                          <option value={15}>15개</option>
                          <option value={20}>20개</option>
                      </select>
                  </div>
                </div>
                {showConfirm && (
                  <div className={styles.popupOverlay}>
                    <div className={styles.popup}>
                      <p>{targetUser}을(를) 지우시겠습니까?</p>
                      <div className={styles.popupActions}>
                        <button
                          className={styles.confirmButton}
                          onClick={async () => {
                            try {
                              const response = await fetch(`/api/user/delete?rax_u_id=${editUser?.rax_u_id}`, {
                                method: 'DELETE',
                              });

                              if (response.ok) {
                                alert('삭제가 완료되었습니다.');

                                // 사용자 목록 다시 불러오기
                                const updated = await fetch(`/api/user/list?page=${page}&limit=${limit}`);
                                const updatedData = await updated.json();
                                setUserList(updatedData.users);
                                setTotalCount(updatedData.total);
                              } else {
                                const errorText = await response.text();
                                alert(errorText || '삭제에 실패했습니다.');
                              }
                            } catch (err) {
                              console.error('삭제 중 오류:', err);
                              alert('삭제 중 오류가 발생했습니다.');
                            } finally {
                              setShowConfirm(false);
                              setTargetUser(null);
                            }
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
                          {/* 1. 아이디 / 비밀번호 */}
                          <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                              <input
                                type="text"
                                placeholder="아이디 (5~15자)"
                                value={newUser.rax_u_user_id}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_user_id')}
                                onBlur={(e) => validateField('rax_u_user_id', e.target.value)}
                                className={styles.inputField}
                              />
                              <div className={styles.validationError}>
                                {newUserErrors.rax_u_user_id}
                              </div>
                            </div>
                            <div className={styles.inputGroup} style={{ position: 'relative' }}>
                              <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="비밀번호 (5~15자)"
                                value={newUser.rax_u_pwd}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_pwd')}
                                onBlur={(e) => validateField('rax_u_pwd', e.target.value)}
                                className={styles.inputField}
                              />
                              <span className={styles.showPassword} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                              </span>
                            </div>
                          </div>
                          {/* 2. 이름 / 세례명 */}
                          <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                              <input
                                type="text"
                                placeholder="이름"
                                value={newUser.rax_u_user_name}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_user_name')}
                                className={styles.inputField}
                              />
                            </div>
                            <div className={styles.inputGroup}>
                              <input
                                type="text"
                                placeholder="세례명"
                                value={newUser.rax_u_par_name}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_par_name')}
                                className={styles.inputField}
                              />
                            </div>
                          </div>
                          {/* 3. 생년월일 / 축일 */}
                          <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                              <div style={{ position: 'relative' }}>
                                <input
                                  type="text"
                                  readOnly
                                  value={newUser.rax_u_birth}
                                  placeholder="생년월일"
                                  onClick={() => setShowBirthCalendar(!showBirthCalendar)}
                                  className={styles.inputField}
                                />
                                {showBirthCalendar && (
                                  <div style={{ position: 'absolute', zIndex: 100 }}>
                                      <CalendarLib
                                          onChange={(date) => {
                                              if (date instanceof Date) {
                                                  const yyyy = date.getFullYear();
                                                  const mm = String(date.getMonth() + 1).padStart(2, '0');
                                                  const dd = String(date.getDate()).padStart(2, '0');
                                                  const formatted = `${yyyy}-${mm}-${dd}`;

                                                  setNewUser({ ...newUser, rax_u_birth: formatted });
                                                  validateField('rax_u_birth', formatted);
                                                  setShowBirthCalendar(false);
                                              }
                                          }}
                                          value={
                                              newUser.rax_u_birth && !isNaN(new Date(newUser.rax_u_birth).getTime())
                                                  ? new Date(newUser.rax_u_birth)
                                                  : new Date()
                                          }
                                          locale="en-US"
                                          className={styles.reactCalendar}
                                      />
                                  </div>
                                )}
                              </div>
                              <div className={styles.validationError}>
                                {newUserErrors.rax_u_birth}
                              </div>
                            </div>
                            <div className={styles.inputGroup}>
                              <input
                                type="text"
                                placeholder="축일 (00-00)"
                                value={newUser.rax_u_par_birth}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_par_birth')}
                                onBlur={(e) => validateField('rax_u_par_birth', e.target.value)}
                                className={styles.inputField}
                              />
                              <div className={styles.validationError}>
                                {newUserErrors.rax_u_par_birth}
                              </div>
                            </div>
                          </div>
                          {/* 4. 이메일 / 전화번호 */}
                          <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                              <input
                                type="email"
                                placeholder="이메일"
                                value={newUser.rax_u_email}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_email')}
                                onBlur={(e) => validateField('rax_u_email', e.target.value)}
                                className={styles.inputField}
                              />
                              <div className={styles.validationError}>
                                {newUserErrors.rax_u_email}
                              </div>
                            </div>
                            <div className={styles.inputGroup}>
                              <input
                                type="text"
                                placeholder="전화번호 (010-0000-0000)"
                                value={newUser.rax_u_tel}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_tel')}
                                onBlur={(e) => validateField('rax_u_tel', e.target.value)}
                                className={styles.inputField}
                              />
                              <div className={styles.validationError}>
                                {newUserErrors.rax_u_tel}
                              </div>
                            </div>
                          </div>
                          {/* 5. 부서 / 직급 */}
                          <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                              <select
                                value={newUser.rax_u_dept}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_dept')}
                                className={styles.inputField}
                              >
                                <option value="">부서를 선택하세요</option>
                                {Array.isArray(deptList) &&
                                  deptList.map((dept, idx) => (
                                    <option key={idx} value={dept}>{dept}</option>
                                  ))}
                              </select>
                            </div>
                            <div className={styles.inputGroup}>
                              <input
                                type="text"
                                placeholder="직급 (부장,차장 등)"
                                value={newUser.rax_u_dept_role}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_dept_role')}
                                onBlur={(e) => validateField('rax_u_dept_role', e.target.value)}
                                className={styles.inputField}
                              />
                              <div className={styles.validationError}>
                                {newUserErrors.rax_u_dept_role}
                              </div>
                            </div>
                          </div>
                          {/* 6. 주소 */}
                          <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                              <input
                                type="text"
                                placeholder="주소"
                                value={newUser.rax_u_addr}
                                onChange={(e) => handleNewUserChange(e, 'rax_u_addr')}
                                onBlur={(e) => validateField('rax_u_addr', e.target.value)}
                                className={styles.inputField}
                              />
                              <div className={styles.validationError}>
                                {newUserErrors.rax_u_addr}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.popupActions}>
                            <button
                                className={styles.confirmButton}
                                onClick={async () => {
                                  const requiredFields = [
                                    'rax_u_user_id',
                                    'rax_u_user_name',
                                    'rax_u_email',
                                    'rax_u_tel',
                                    'rax_u_addr',
                                    'rax_u_birth',
                                    'rax_u_dept_role',
                                    'rax_u_pwd',
                                  ];

                                  let localErrors = { ...newUserErrors };
                                  let hasError = false;

                                  requiredFields.forEach((field) => {
                                    const value = newUser[field as keyof typeof newUser];
                                    validateField(field, value);
                                    if (!value || (typeof value === 'string' && value.trim() === '')) {
                                      localErrors[field as keyof typeof newUserErrors] = '필수 입력 항목입니다.';
                                      hasError = true;
                                    }
                                  });

                                  // 최신 에러 반영
                                  setNewUserErrors(localErrors);

                                  // 유효성 에러 메시지를 하나의 문자열로 묶어서 표시
                                  const errorMessages = Object.values(localErrors).filter(Boolean);
                                  if (hasError || errorMessages.length > 0) {
                                    alert(errorMessages.join('\n'));
                                    return;
                                  }

                                  try {
                                    const response = await fetch('/api/user/add', {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify(newUser),
                                    });

                                    if (response.ok) {
                                      const result = await response.json();
                                      alert(result.detail || "사용자 추가 성공");
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
                                        rax_u_dept_role: '',
                                        rax_u_pwd: '',
                                      });

                                      const updated = await fetch(`/api/user/list?page=${page}&limit=${limit}`);
                                      const updatedData = await updated.json();
                                      setUserList(updatedData.users);
                                      setTotalCount(updatedData.total);
                                    } else {
                                      const errorText = await response.text();
                                      alert(errorText || "사용자 추가 실패");
                                    }
                                  } catch (err) {
                                    console.error('사용자 추가 중 오류:', err);
                                    alert('사용자 추가 중 오류가 발생했습니다.');
                                  }
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
                          <select
                            value={editUser.rax_u_dept}
                            onChange={(e) => setEditUser({ ...editUser, rax_u_dept: e.target.value })}
                            className={styles.inputField}
                          >
                            <option value="">부서를 선택하세요</option>
                            {Array.isArray(deptList) &&
                              deptList.map((dept, idx) => (
                                <option key={idx} value={dept}>
                                  {dept}
                                </option>
                              ))}
                          </select>
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
                          onClick={async () => {
                            try {
                              const response = await fetch('/api/user/edit', {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  rax_u_id: editUser.rax_u_id,
                                  rax_u_user_id: editUser.rax_u_user_id,
                                  rax_u_email: editUser.rax_u_email,
                                  rax_u_tel: editUser.rax_u_tel,
                                  rax_u_addr: editUser.rax_u_addr,
                                  rax_u_dept: editUser.rax_u_dept,
                                  rax_u_dept_role: editUser.rax_u_dept_role,
                                }),
                              });

                              if (response.ok) {
                                console.log('사용자 정보 수정 성공');
                                setShowEditPopup(false);
                                setEditUser(null);
                                alert('수정이 완료되었습니다.');

                                // 사용자 목록 갱신
                                const updated = await fetch(`/api/user/list?page=${page}&limit=${limit}`);
                                const updatedData = await updated.json();
                                setUserList(updatedData.users);
                                setTotalCount(updatedData.total);
                              } else {
                                console.error('사용자 정보 수정 실패:', await response.text());
                              }
                            } catch (err) {
                              console.error('사용자 정보 수정 중 오류:', err);
                            }
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
