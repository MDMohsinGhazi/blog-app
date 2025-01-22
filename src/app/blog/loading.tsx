import React from 'react';

const BlogLoading = () => {
    return (
        <div className="flex flex-col gap-2 mx-40">
            <div className="bg-neutral-400/50 w-full h-64 animate-pulse"></div>
            <div className="grid grid-cols-4 grid-flow-row gap-8">
                <div className="bg-neutral-400/50 h-64 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50  animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50  animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 h-64 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50  animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50  animate-pulse rounded-md"></div>
            </div>
        </div>
    );
};

export default BlogLoading;
