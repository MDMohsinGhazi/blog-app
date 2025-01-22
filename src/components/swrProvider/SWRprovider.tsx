'use client';

import React from 'react';
import { SWRConfig } from 'swr';
import { toast } from 'react-hot-toast';

const cacheProvider = () => new Map();

const SWRProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SWRConfig
            value={{
                provider: cacheProvider,
                fetcher: (resource: string, init?: RequestInit) =>
                    fetch(resource, init).then((res) => {
                        if (!res.ok) {
                            return res.json().then((err) => {
                                toast.error(`${err.message || 'Fetch failed'}`);
                                throw new Error(err.message || 'Fetch failed');
                            });
                        }
                        return res.json();
                    }),
                revalidateOnFocus: false,
            }}
        >
            {children}
        </SWRConfig>
    );
};

export default SWRProvider;
