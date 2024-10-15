import { NextResponse } from 'next/server';
import UploadService from '@/services/storageService';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No file uploaded or invalid file format' }, { status: 400 });
        }

        const imageUrl = await UploadService.uploadImage(file);

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const imageURL = searchParams.get('imageURL');
        console.log({ imageURL });
        if (!imageURL) {
            return NextResponse.json({ error: 'No image url is required' }, { status: 400 });
        }

        const imageUrl = await UploadService.deleteImage(imageURL);

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}
