'use client';

import React from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import Card from '@/components/card/Card';
import Loading from './loading';
import dynamic from 'next/dynamic';

const Carousel = dynamic(() => import('@/components/carousel/Carousel'), { ssr: false });

const Page = () => {
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR('/api/blog', {
        onError: (error) => {
            toast.error(error);
        },
    });

    if (isLoading || error) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-6 p-8 my-6 shadow-md custom-min-hight">
            <Carousel posts={posts?.slice(0, 11)} />
            <div className="flex gap-8 flex-wrap">
                {posts.map((post: Post) => (
                    <div>
                        <Card
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            textContent={post.textContent}
                            imageUrl={post.imageUrl}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
