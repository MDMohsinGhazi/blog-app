'use client';

import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
    const search = useSearchParams();
    const error = search.get('error');

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <a
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>
                        There was a problem when trying to authenticate. Please contact us if this error persists.
                        Unique error code: <code className="rounded-sm bg-slate-100 p-1 text-xs">{error}</code>
                    </p>
                </h5>
            </a>
        </div>
    );
}
