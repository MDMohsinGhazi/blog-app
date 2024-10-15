import { NextResponse } from 'next/server';
import UsersServise from '@/services/user';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        if (email && password) {
            const user = await UsersServise.getUser(body.email, body.password);
            return NextResponse.json(user);
        } else {
            return NextResponse.json({ error: 'Email and password is required' }, { status: 400 });
        }
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
