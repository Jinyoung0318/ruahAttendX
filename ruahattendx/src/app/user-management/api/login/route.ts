import { NextResponse } from 'next/server';
import { loginUser } from '../../../../../services/user/controller';  // 로그인 로직을 서비스로 전달

export async function POST(request: Request) {
    const { userId, password } = await request.json();

    try {
        const user = await loginUser(userId, password);
        if (user) {
            return NextResponse.json({ message: 'Login successful' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid user ID or password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}