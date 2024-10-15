import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Logout } from '@/app/assets';

const LogoutButton = () => {
    return (
        <button className="flex flex-1 gap-2 items-center px-4 py-2 hover:bg-gray-200" onClick={() => signOut()}>
            <p className="text-nowrap">Logout</p>
            <Image src={Logout} height={16} width={16} alt="google" />
        </button>
    );
};

export default LogoutButton;
