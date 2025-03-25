"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    const res = await fetch("/user-management/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    if (res.ok) {
      //router.push("/dashboard"); // 로그인 성공 시 대시보드로 이동
      setSuccess("로그인에 성공하였습니다.");
    } else {
      const { message } = await res.json();
      setError(message);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">로그인</h1>
        <input
            type="id"
            placeholder="사용자 아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border p-2 my-2"
        />
        <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 my-2"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
          로그인
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
  );
}