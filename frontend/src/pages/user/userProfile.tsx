import { useState, useEffect} from "react";
import styles from "../../styles/userProfile.module.css";
import Sidebar from "../../components/common/commSidebar.tsx";
import Header from "../../components/common/commHeader.tsx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [userData, setUserData] = useState({
        userId: "",
        name: "",
        cardNumber: "",
        parName: "",
        email: "",
        password: "",
        phone: "",
        dept: "",
        address: "",
        birth: "",
        parBirth: "",
        position: ""
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setShowConfirm(true);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const storedUser = sessionStorage.getItem("user");
                if (!storedUser) return;

                const { userUId } = JSON.parse(storedUser);

                const response = await fetch(`/api/profile?userUId=${encodeURIComponent(userUId)}`, {
                    method: "GET",
                });

                const data = await response.json();
                console.log(data);
                // 필요한 데이터 상태 업데이트
                // base64로 인코딩된 비밀번호를 디코딩
                const decodedPassword = atob(data.rax_u_pwd);
                setUserData({
                    userId: data.rax_u_user_id,
                    name: data.rax_u_user_name,
                    cardNumber: data.rax_u_uuid,
                    parName: data.rax_u_par_name,
                    email: data.rax_u_email,
                    password: decodedPassword,
                    phone: data.rax_u_tel,
                    dept: data.rax_u_dept,
                    address: data.rax_u_addr,
                    birth: data.rax_u_birth,
                    parBirth: data.rax_u_par_birth,
                    position: data.rax_u_dept_role
                });
                setEmail(data.rax_u_email);
                setPhone(data.rax_u_tel);
                setPassword(decodedPassword);
                setUserId(data.rax_u_user_id);
                setAddress(data.rax_u_addr);
            } catch (err) {
                console.error("사용자 정보 요청 실패", err);
            }
        };

        fetchUserProfile();
    }, []);


    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <main className="flex-1 w-full h-full">
                <Header />
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.title}>사용자 정보</h2>
                        {isEditing ? (
                            <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                    className={`${styles.editButton} ${styles.saveMode}`}
                                    onClick={handleSaveClick}
                                >
                                    저장
                                </button>
                                <button
                                    className={styles.editButton}
                                    onClick={() => {
                                        setEmail(userData.email);
                                        setPhone(userData.phone);
                                        setPassword(userData.password);
                                        setUserId(userData.userId);
                                        setAddress(userData.address);
                                        setIsEditing(false);
                                    }}
                                >
                                    취소
                                </button>
                            </div>
                        ) : (
                            <button
                                className={styles.editButton}
                                onClick={handleEditClick}
                            >
                                수정
                            </button>
                        )}
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
                                    <input className={styles.inputField} value={userData.name} onChange={() => {}} />
                                ) : (
                                    <span>{userData.name}</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>카드번호:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value={userData.cardNumber} onChange={() => {}} />
                                ) : (
                                    <span>{userData.cardNumber}</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>세례명:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value={userData.parName} onChange={() => {}} />
                                ) : (
                                    <span>{userData.parName}</span>
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
                                    <input className={styles.inputField} value={userData.dept} onChange={() => {}} />
                                ) : (
                                    <span>{userData.dept}</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            {isEditing ? (
                                <div className={styles.row}>
                                    <strong className={styles.label}>주소:</strong>
                                    <input
                                        className={`${styles.inputField} ${styles.editableInput}`}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className={styles.row}>
                                    <strong className={styles.label}>주소:</strong> {address}
                                </div>
                            )}
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>생년월일:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value={userData.birth} onChange={() => {}} />
                                ) : (
                                    <span>{userData.birth}</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>축일:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value={userData.parBirth} onChange={() => {}} />
                                ) : (
                                    <span>{userData.parBirth}</span>
                                )}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <p className={styles.row}>
                                <strong className={styles.label}>직급:</strong>
                                {isEditing ? (
                                    <input className={styles.inputField} value={userData.position} onChange={() => {}} />
                                ) : (
                                    <span>{userData.position}</span>
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
                                onClick={async () => {
                                  try {
                                    const storedUser = sessionStorage.getItem("user");
                                    const { userUId } = storedUser ? JSON.parse(storedUser) : {};
                                    const response = await fetch("/api/profile/save", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json"
                                      },
                                      body: JSON.stringify({
                                        userUId: userUId,
                                        userId: userId,
                                        email: email,
                                        phone: phone,
                                        password: password,
                                        address: address
                                      })
                                    });

                                    if (response.ok) {
                                      alert("수정이 완료되었습니다.");
                                    } else {
                                      alert("수정에 실패했습니다.");
                                      setEmail(userData.email);
                                      setPhone(userData.phone);
                                      setPassword(userData.password);
                                      setUserId(userData.userId);
                                      setAddress(userData.address);
                                    }
                                  } catch (error) {
                                    console.error("Error during profile update:", error);
                                    alert("에러 발생");
                                    setEmail(userData.email);
                                    setPhone(userData.phone);
                                    setPassword(userData.password);
                                    setUserId(userData.userId);
                                    setAddress(userData.address);
                                  } finally {
                                    setIsEditing(false);
                                    setShowConfirm(false);
                                  }
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