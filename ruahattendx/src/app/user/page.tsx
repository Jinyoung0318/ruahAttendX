"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [success, setSuccess] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const res = await fetch("/user-management/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId, password}),
        });
        const data = await res.json();

        if (res.status === 200) {
            //router.push("/dashboard"); // 로그인 성공 시
            //setSuccess("로그인에 성공하였습니다.");
            sessionStorage.setItem("user",JSON.stringify(data.user));
            router.push("/attendance-rate");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <img
                    src="/main.png"
                    alt="루하출석시스템 메인 로고"
                    className="w-32 h-auto mx-auto"
                />

                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">아이디</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-black"
                            placeholder="아이디를 입력하세요"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-black"
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}