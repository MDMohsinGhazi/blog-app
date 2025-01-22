import { NextResponse } from 'next/server';
import UsersServise from '@/services/userService';
import { APIErrorHandler } from '@/lib/handlers/ErrorHandle';

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
        const errorObject = new APIErrorHandler(error as any);

        return NextResponse.json(
            {
                code: errorObject.getErrorCode,
                message: errorObject.getErrorMessage,
                details: errorObject.getErrorDetails,
            },
            { status: Number(errorObject.getErrorCode) }
        );
    }
}
