import { NextResponse } from "next/server";
import { getRecentScans } from "../../../../../services/attendance/controller";

export async function GET() {

    try {
        const result = await getRecentScans();
        return NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, {status: 500});
    }
}