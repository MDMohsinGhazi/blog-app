import { NextResponse } from 'next/server';
import PostService from '@/services/postService';
import { APIErrorHandler } from '@/lib/handlers/ErrorHandle';

interface Params {
    params: { id: string };
}

export async function GET(req: any, { params }: Params) {
    const { id } = params;

    try {
        const post = await PostService.getPostById(id);
        return NextResponse.json(post, { status: 200 });
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
