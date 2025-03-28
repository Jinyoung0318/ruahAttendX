import { prisma } from "../../prisma/client";

export async function userAttendInfos() {
    const attendance = await prisma.rAX_ATTENDANCE.findMany( {
        orderBy: { RAX_A_DATE : "desc"},
        take: 5,
        select: {
            RAX_U_ID: true,
            RAX_A_DATE: true
        }
    });

    const userIds = attendance.map(a => a.RAX_U_ID);

    const users = await prisma.rAX_USER.findMany({
        where: { RAX_U_ID : { in: userIds } },
        select: {
            RAX_U_ID: true,
            RAX_U_USER_NAME: true,
            RAX_U_PAR_NAME: true
        }
    });

    const userAttendInfos = new Map (users.map( u => [u.RAX_U_ID, {userName : u.RAX_U_USER_NAME, parName: u.RAX_U_PAR_NAME}]));

    const recentScans = attendance.map(a => ({
        userName : userAttendInfos.get(a.RAX_U_ID)?.userName || "Unknown",
        parName : userAttendInfos.get(a.RAX_U_ID)?.parName || "Unknown",
        date : a.RAX_A_DATE
    }));

    return {success: true, data: recentScans};
}