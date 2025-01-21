'use client';
import React from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { ContentDisplay } from '@/components';

interface PropsInterface {
    params: { blogID: string };
}

const Page: React.FC<PropsInterface> = ({ params }) => {
    const { data: post, isLoading } = useSWR<Post>(`/api/blog/${params.blogID}`);

    if (isLoading) {
        return <div>loading</div>;
    }
    return (
        <div className="flex flex-col gap-6 py-6 mb-8  px-8 shadow-md custom-min-hight">
            <div className="flex justify-between">
                <h1 className="text-primary font-semibold text-3xl">{post?.title}</h1>
                <div className="text-gray-500">Author {post?.auther}</div>
            </div>
            <div className="relative w-full h-96">
                <Image src={post?.imageUrl || ''} alt="image" fill style={{ objectFit: 'cover' }} />
            </div>
            <ContentDisplay value={post?.content as string} />
        </div>
    );
};

export default Page;
