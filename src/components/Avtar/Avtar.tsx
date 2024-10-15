'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Write } from '@/app/assets';

const Avtar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const isWriteing = pathname.startsWith('/write');

    if (session) {
        return (
            <div className="flex flex-row  items-center gap-6">
                <Link className={`flex gap-1 text-secondary ${isWriteing && 'invisible'}`} href={'/write'}>
                    <Image src={Write} width={20} height={20} alt="icon" />
                    <p>Write</p>
                </Link>

                <div className="relative ">
                    <img
                        className="peer inline-block object-cover object-center w-10 h-10 rounded-full cursor-pointer"
                        src={session?.user?.image || ''}
                        alt="avtar"
                    />
                    <ul className="absolute -translate-y-44 flex flex-col  mt-2 bg-white border rounded shadow-lg opacity-0 transition-all duration-200 peer-hover:opacity-100 hover:opacity-100 peer-hover:translate-y-0 hover:translate-y-0">
                        <li className="py-2 px-4 left-0 hover:bg-gray-200">{session.user?.name}</li>
                        <li className="py-2 px-4 left-0 hover:bg-gray-200">{session.user?.email}</li>
                        <LogoutButton />
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <Link
            className="bg-primary px-4 py-1 text-gray-300 shadow-sm rounded-full hover:shadow-md hover:text-gray-100"
            href={'/auth/log-in'}
        >
            Login
        </Link>
    );
};

export default Avtar;
