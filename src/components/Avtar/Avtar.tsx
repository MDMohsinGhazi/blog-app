'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Logout, Write } from '@/app/assets';
import { logOut } from '@/lib/actions/auth';
import toast from 'react-hot-toast';

const Avtar = () => {
    const { data: session, update: updateSession, status } = useSession();
    const pathname = usePathname();
    const isWriteing = pathname.startsWith('/write');

    const logOutHandle = async () => {
        const promise = new Promise((resolve, reject) => {
            logOut().then(resolve).catch(reject);
        });

        toast.promise(promise, {
            loading: 'Logging out...',
            success: 'Logged out successfully!',
            error: 'Failed to log out',
        });
        await updateSession();
    };

    if (status === 'authenticated') {
        return (
            <div className="flex flex-row  items-center gap-6">
                <Link className={`flex gap-1 text-secondary ${isWriteing && 'invisible'}`} href={'/write'}>
                    <Image src={Write} width={20} height={20} alt="icon" />
                    <p>Write</p>
                </Link>
                <div className="relative ">
                    {session?.user?.image ? (
                        <Image
                            className="peer inline-block object-cover object-center w-10 h-10 rounded-full cursor-pointer"
                            src={session?.user?.image || ''}
                            alt="avtar"
                            width={20}
                            height={20}
                        />
                    ) : (
                        <div className="peer cursor-pointer flex items-center justify-center uppercase bg-primary text-gray-200 text-xl text-center  font-semibold rounded-full w-10 aspect-square">
                            {session?.user?.name?.slice(0, 2)}
                        </div>
                    )}

                    <ul className="absolute -translate-y-44 flex flex-col  mt-2 bg-white border rounded shadow-lg opacity-0 transition-all duration-300 delay-150 peer-hover:opacity-100 hover:opacity-100 peer-hover:translate-y-0 hover:translate-y-0">
                        <li className="py-2 px-4 left-0 hover:bg-gray-200">{session?.user?.name}</li>
                        <li className="py-2 px-4 left-0 hover:bg-gray-200">{session?.user?.email}</li>
                        <button
                            className="flex flex-1  gap-2 items-center px-4 py-2 hover:bg-gray-200"
                            onClick={logOutHandle}
                        >
                            <p className="text-nowrap text-red-700 font-semibold">Logout</p>
                            <Image className="text-red-700" src={Logout} height={20} width={20} alt="google" />
                        </button>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <Link
            className="bg-primary px-4 py-1 text-gray-300 shadow-sm rounded-full hover:shadow-md hover:text-gray-100"
            href={'/auth/login'}
        >
            Login
        </Link>
    );
};

export default Avtar;
