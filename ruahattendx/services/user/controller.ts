import { authenticateUser } from './service'; // 서비스에서 인증 함수 호출

export async function loginUser(userId: string, password: string) {
    // userId와 password를 받아 서비스로 전달
    return await authenticateUser(userId, password);
}