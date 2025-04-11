import Sidebar from '../../components/common/commSidebar.tsx';
import Header from  '../../components/common/commHeader.tsx';
import MainDashboard from '../../components/layout/mainDashboard.tsx';
import styles from '../../styles/dashboard.module.css';

const Dashboard = () => {
    // todo: 페이지 진입 시, 로그인 한 사용자 ID 로 데이터 조회해와서 각각의 컴포넌트에 넘겨주고 표시하기
    // const attendanceRate = 86;
    // const [scanRecords, setScanRecords] = useState<ScanRecord[]>([]);
    // interface ScanRecord {
    //     raxUUserName: string;
    //     raxADate: string;
    // }
    //
    // useEffect(() => {
    //     axios.get('/api/attendances/${userId}')
    //         .then(response => {
    //             setScanRecords(response.data || []);
    //         })
    //         .catch(() => {
    //             setScanRecords([]); // 에러 발생 시에도 빈 배열로 처리
    //         });
    // }, []);


    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <main className="flex-1 w-full h-full">
                <Header />
                <MainDashboard />
            </main>
        </div>
    );
};

export default Dashboard;
