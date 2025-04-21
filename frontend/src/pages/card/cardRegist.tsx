import styles from "../../styles/cardRegist.module.css";
import {MdBadge} from "react-icons/md";
import Sidebar from "../../components/common/commSidebar.tsx";
import Header from "../../components/common/commHeader.tsx";
import { useState } from "react";


const CardRegist = () => {
    const [cardValue, {/*setCardValue*/}] = useState(""); // 추후 RFID 입력으로 교체


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
                        <button className={styles.registerButton} disabled={!cardValue}>
                            등록
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CardRegist;