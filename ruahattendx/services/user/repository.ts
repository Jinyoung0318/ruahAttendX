import { prisma } from '../../prisma/client'; // Prisma 클라이언트

// userId로 사용자 조회 (로그인 시)
export async function getUserByUserId(userId: string) {
    return prisma.rAX_USER.findUnique({
        where: {RAX_U_USER_ID: userId},
    });
}