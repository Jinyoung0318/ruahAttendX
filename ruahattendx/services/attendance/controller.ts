import { recentScans } from './service'; // 서비스에서 인증 함수 호출

export async function getRecentScans() {
    // Scan 정보를 가져오기
    return await recentScans();
}