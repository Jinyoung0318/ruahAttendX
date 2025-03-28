"use client";

import { useEffect, useState } from 'react';
import CircleIcon from '../components/circleiconprops';
import { CreditCard } from 'react-feather';
import Link from 'next/link';

// 최근 인증 기록 데이터 타입
type Scan = {
    userName: string;
    parName: string;
    date: string;
};

export default function RFIDScanner() {

    const [recentScans, setRecentScans] = useState<{ data: Scan[]; message?: string }>({ data: [] });

    useEffect(() => {
        async function getScans() {
            const res = await fetch("/attendance/api/scan", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            // 만약 data가 있고 배열로 된 값이라면
            if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
                setRecentScans({ data: data.data });  // 데이터를 상태에 설정
            } else {
                setRecentScans({ data: [], message: data?.message});
            }
        }
        getScans();
    }, []);

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
                            {/* 데이터가 있으면 출력하고, 없으면 메시지를 출력 */}
                            {recentScans.data.length > 0 ? (
                                recentScans.data.map((a, index) => (
                                    <div key={index} className="flex justify-between text-white">
                                        <span className="text-left">{a.userName}</span>
                                        <span className="text-left">{a.parName}</span>
                                        <span className="text-right">{a.date}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white text-center">{recentScans.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}