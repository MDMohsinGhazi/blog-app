import React from 'react';

const RootLoading = () => {
    return (
        <div className="flex flex-col bg-neutral-200 w-full h-screen animate-pulse rounded-md gap-4">
            <div className="bg-neutral-400/50 w-full h-64 animate-pulse rounded-md"></div>
            <div className="flex flex-wrap grid-flow-row gap-8 justify-center">
                <div className="bg-neutral-400/50 w-80 h-64 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-80 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-80 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-80 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-80 h-64 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-80 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-80 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-80 animate-pulse rounded-md"></div>
            </div>
        </div>
    );
};

export default RootLoading;
