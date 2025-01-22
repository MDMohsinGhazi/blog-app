import { APIErrorHandler } from '@/lib/handlers/ErrorHandle';
import PostService from '@/services/postService';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const posts = await PostService.getPosts();
        return NextResponse.json(posts, { status: 200 });
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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, content, textContent, category, imageUrl, auther } = body;

        if (!title) {
            return NextResponse.json({ message: 'title is required' }, { status: 404 });
        }

        if (!content) {
            return NextResponse.json({ message: 'content is required' }, { status: 404 });
        }
        if (!category) {
            return NextResponse.json({ message: 'category is required' }, { status: 404 });
        }
        if (!auther) {
            return NextResponse.json({ message: 'User name is required' }, { status: 404 });
        }
        if (title.length < 10) {
            return NextResponse.json({ message: 'The title must contain 10 or more letters.' }, { status: 404 });
        }
        if (title.content < 50) {
            return NextResponse.json({ message: 'The content must contain 50 or more letters.' }, { status: 404 });
        }

        const post = await PostService.createPost({ title, content, textContent, category, imageUrl, auther });
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        const errorObject = new APIErrorHandler(error as any);

        return NextResponse.json({
            code: errorObject.getErrorCode,
            message: errorObject.getErrorMessage,
            details: errorObject.getErrorDetails,
        });
    }
}
