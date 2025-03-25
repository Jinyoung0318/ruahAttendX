import { getUserByUserId } from './repository';  // DB에서 사용자 조회
import bcrypt from 'bcrypt';  // 비밀번호 암호화/복호화 라이브러리

export async function authenticateUser(userId: string, password: string) {
    const user = await getUserByUserId(userId);  // userId로 사용자 조회
    if (!user) {
        return alert("없는 사용자입니다"); // 사용자 없음
    }

    // 암호화된 비밀번호 비교
    const userPwd = user?.RAX_U_PWD ?? '';
    const isPasswordValid = await bcrypt.compare(password, userPwd);

    if (isPasswordValid) {
        return user; // 로그인 성공 시 사용자 반환
    } else {
        return alert("비밀번호가 틀립니다"); // 비밀번호 불일치
    }
}