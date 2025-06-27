import styles from "../../styles/cardRegist.module.css";
import {MdBadge} from "react-icons/md";
import Sidebar from "../../components/common/commSidebar.tsx";
import Header from "../../components/common/commHeader.tsx";
import { useState, useEffect } from "react";


const CardRegist = () => {
    const [cardValue, setCardValue] = useState(""); // 추후 RFID 입력으로 교체

    useEffect(() => {
        let buffer = "";

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                setCardValue(buffer.trim());
                buffer = "";
            } else {
                buffer += e.key;
            }

        };

        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, []);

    const handleRegister = async () => {
        const userUid = JSON.parse(sessionStorage.getItem('user') || '{}').userUId
        if (!userUid || !cardValue) return;

        const response = await fetch("/api/card/regist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rax_u_id: userUid,
                rax_u_uuid: cardValue,
            }),
        });

        if (response.ok) {
            alert("등록이 완료 되었습니다.")
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    };

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <main className="flex-1 w-full h-full">
                <Header/>
                <div className={styles.scannerContainer}>
                    <h2 className={styles.scannerTitle}>
                        <div style={{flex: 1, textAlign: 'center'}}>RFID 카드 등록</div>
                    </h2>
                    <div className={styles.scannerCircle}>
                        <MdBadge size={64} color="black"/>
                    </div>
                    <h3 className={styles.scannerSubtitle}>카드를 태깅해주세요</h3>
                    <p className={styles.scannerDescription}>
                        카드 번호가 입력될 때까지, 카드를 태깅해주세요
                    </p>
                    <div className={styles.cardOutputGroup}>
                        <div className={styles.cardOutput}>{cardValue}</div>
                        <button className={styles.registerButton} disabled={!cardValue} onClick={handleRegister}>
                            등록
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CardRegist;