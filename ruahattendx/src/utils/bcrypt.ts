// utils/bcrypt.ts
import bcrypt from 'bcrypt';

// 비밀번호 암호화 함수
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // salt 생성
    return await bcrypt.hash(password, salt); // 비밀번호 암호화
}

// 비밀번호 비교 함수
export async function comparePasswords(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword); // 비밀번호 비교
}