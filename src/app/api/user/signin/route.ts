import { NextResponse } from 'next/server';
import { signIn } from '@/auth';
import { APIErrorHandler } from '@/lib/handlers/ErrorHandle';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, provider } = body;
        if (provider) {
            await signIn(provider);
        }
        if (email && password) {
            const user = await signIn('credentials', {
                redirect: true,
                email,
                password,
            });

            return NextResponse.json(user);
        } else {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }
    } catch (error) {
        console.log({ merroe: JSON.stringify(error) });

        const errorObject = new APIErrorHandler(error as any);

        return NextResponse.json(
            {
                code: errorObject.getErrorCode,
                message: (error as Record<string, string>).name,
                details: errorObject.getErrorDetails,
            },
            { status: Number(errorObject.getErrorCode) }
        );
    }
}
