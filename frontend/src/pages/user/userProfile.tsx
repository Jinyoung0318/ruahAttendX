import { useState } from "react";
import styles from "../../styles/userProfile.module.css";
import Sidebar from "../../components/common/commSidebar.tsx";
import Header from "../../components/common/commHeader.tsx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState("john.doe@company.com");
    const [phone, setPhone] = useState("+1 (555) 123-4567");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState("john123");
    const [showConfirm, setShowConfirm] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setShowConfirm(true);
    };

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <main className="flex-1 w-full h-full">
                <Header />
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.title}>사용자 정보</h2>
                        <button
                            className={`${styles.editButton} ${isEditing ? styles.saveMode : ""}`}
                            onClick={isEditing ? handleSaveClick : handleEditClick}
                        >
                            {isEditing ? "저장" : "수정"}
                        </button>
                    </div>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            {isEditing ? (
                                <div className={styles.row}>
                                    <strong className={styles.label}>아이디:</strong>
                                    <input
                                        className={`${styles.inputField} ${styles.editableInput}`}
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className={styles.row}>
                                    <strong className={styles.label}>아이디:</strong> {userId}
                                </div>
                            )}
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>이름:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value="홍길동" onChange={() => {}} />
                                ) : (
                                    <span>홍길동</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>카드번호:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value="1234-5678-9012-3456" onChange={() => {}} />
                                ) : (
                                    <span>1234-5678-9012-3456</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>세례명:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value="요한" onChange={() => {}} />
                                ) : (
                                    <span>요한</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            {isEditing ? (
                                <div className={styles.row}>
                                    <strong className={styles.label}>이메일:</strong>
                                    <input
                                        className={`${styles.inputField} ${styles.editableInput}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className={styles.row}>
                                    <strong className={styles.label}>이메일:</strong> {email}
                                </div>
                            )}
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.row}>
                                <strong className={styles.label}>비밀번호</strong>
                                {isEditing ? (
                                    <div className={styles.passwordWrapper}>
                                        <input
                                            className={`${styles.inputField} ${styles.editableInput}`}
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            className={styles.showPassword}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                                        </span>
                                    </div>
                                ) : (
                                    <span>********</span>
                                )}
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            {isEditing ? (
                                <div className={styles.row}>
                                    <strong className={styles.label}>전화번호:</strong>
                                    <input
                                        className={`${styles.inputField} ${styles.editableInput}`}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className={styles.row}>
                                    <strong className={styles.label}>전화번호:</strong> {phone}
                                </div>
                            )}
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>부서:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value="기획팀" onChange={() => {}} />
                                ) : (
                                    <span>기획팀</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            {isEditing ? (
                                <div className={styles.row}>
                                    <strong className={styles.label}>주소:</strong>
                                    <input
                                        className={`${styles.inputField} ${styles.editableInput}`}
                                        value={"서울특별시 강남구"}
                                        onChange={() => {}}
                                    />
                                </div>
                            ) : (
                                <div className={styles.row}>
                                    <strong className={styles.label}>주소:</strong> 서울특별시 강남구
                                </div>
                            )}
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>생년월일:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value="1990-01-01" onChange={() => {}} />
                                ) : (
                                    <span>1990-01-01</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>축일:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value="06-24" onChange={() => {}} />
                                ) : (
                                    <span>06-24</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>직급:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value="대리" onChange={() => {}} />
                                ) : (
                                    <span>대리</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            {showConfirm && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popup}>
                        <p>저장하시겠습니까?</p>
                        <div className={styles.popupActions}>
                            <button
                                className={styles.confirmButton}
                                onClick={() => {
                                    console.log("GET API 호출 - 최신 정보 가져오기");
                                    setIsEditing(false);
                                    setShowConfirm(false);
                                    alert("수정이 완료되었습니다.");
                                }}
                            >
                                확인
                            </button>
                            <button
                                className={styles.cancelButton}
                                onClick={() => {
                                    setShowConfirm(false);
                                }}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;