'use client';

import React from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import Card from '@/components/card/Card';
import Loading from './loading';

const fetcher = (url: string) => fetch(url, { method: 'GET' }).then((res) => res.json());
const Home = () => {
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR('/api/blog', fetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    if (isLoading || error) {
        return <Loading />;
    }

    return (
        <div className="flex gap-8 flex-wrap">
            {posts.map((post: Post) => (
                <div>
                    <Card key={post.title} title={post.title} textContent={post.textContent} imageUrl={post.imageUrl} />
                </div>
            ))}
        </div>
    );
};

export default Home;
