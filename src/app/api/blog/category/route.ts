import { APIErrorHandler } from '@/lib/handlers/ErrorHandle';
import PostService from '@/services/postService';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    try {
        if (!category) {
            return NextResponse.json({ error: 'No category found' }, { status: 400 });
        } else {
            const posts = await PostService.getPostByCategory(category);
            return NextResponse.json(posts, { status: 200 });
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
