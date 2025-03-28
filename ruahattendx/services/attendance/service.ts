import {userAttendInfos} from './repository';

export async function recentScans() {
    const userData = await userAttendInfos();
    if (!userData.data || userData.data.length === 0) {
        return { success: true, message: "인증을 한 사용자가 없습니다" };
    } else {
        return { success: true, data: userData };
    }
}