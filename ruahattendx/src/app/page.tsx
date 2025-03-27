import CircleIcon from '../components/circleiconprops';
import { CreditCard } from 'react-feather';
import Link from 'next/link';

export default function RFIDScanner() {
    // recentScans 배열을 컴포넌트 내부로 이동 (API를 사용해 데이터 변경 필요)
    const recentScans = [
        { name: 'John Doe', date: '2024-01-20' },
        { name: 'Jane Smith', date: '2024-01-20' },
        { name: 'Mike Johnson', date: '2024-01-20' },
    ];

    return (
        <div className="relative min-h-screen bg-gray-100 flex flex-col justify-center">
            {/* Left top login button */}
            <div className="absolute top-6 right-6">
                <Link href="/user" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors text-lg">
                    로그인
                </Link>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8 text-black">출입 카드를 스캔해주세요</h1>

                    <CircleIcon icon={<CreditCard size={64} color="white" />}/>
                    <h2 className="text-2xl text-blue-500 mt-8">Tap Your Card</h2>
                    <p className="text-black-600 mt-2 text-blue-400">
                        인증이 완료 될 때까지 카드를 태깅해주세요
                    </p>

                    <div className="mt-12 bg-slate-800 rounded-lg p-8 max-w-2xl mx-auto">
                        <h3 className="text-blue-400 text-xl mb-4">최근 인증 기록</h3>
                        <div className="space-y-4">
                            {recentScans.map((scan, index) => (
                                <div key={index} className="flex justify-between text-white">
                                    <span>{scan.name}</span>
                                    <span>{scan.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}