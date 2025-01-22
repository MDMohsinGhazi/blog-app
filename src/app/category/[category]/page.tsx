'use client';

import Card from '@/components/card/Card';
import React from 'react';
import useSWR from 'swr';

interface PropsInterface {
    params: { category: string };
}

const Page: React.FC<PropsInterface> = ({ params }) => {
    const { data: posts, error } = useSWR(`/api/blog/category?category=${params.category}`);

    if (error) return <div>Error loading posts</div>;
    if (!posts) return <div>Loading...</div>;

    return (
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
    );
};

export default Page;
