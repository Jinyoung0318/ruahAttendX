import { NextResponse } from 'next/server';
import { loginUser } from '../../../../../services/user/controller';  // 로그인 로직을 서비스로 전달

export async function POST(request: Request) {
    const { userId, password } = await request.json();

    try {
        const result = await loginUser(userId, password);
        if (result.success) {
            return NextResponse.json({ message: result.message }, { status: 200 });
        } else if (!result.success) {
            return NextResponse.json({ message: result.message }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}