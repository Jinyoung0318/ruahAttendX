import { getUserByUserId } from './repository';  // DB에서 사용자 조회
import bcrypt from 'bcrypt';  // 비밀번호 암호화/복호화 라이브러리

export async function authenticateUser(userId: string, password: string) {
    const user = await getUserByUserId(userId);  // userId로 사용자 조회
    if (!user) {
        console.log("user Not Found");
        return { success: false, message: 'User Not Found' };
    }

    // 암호화된 비밀번호 비교
    const userPwd = user?.RAX_U_PWD ?? '';
    const isPasswordValid = await bcrypt.compare(password, userPwd);

    if (isPasswordValid) {
        console.log("Valid user");
        return { success: true, user} // 로그인 성공 시 사용자 반환
    } else {
        console.log("InValid user");
        return { success: false , message: 'Invalid user ID or password'}; // 비밀번호 불일치
    }
}