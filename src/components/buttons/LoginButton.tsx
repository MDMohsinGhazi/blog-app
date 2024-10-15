import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

interface Props {
    src: string;
    entity: string;
}

const LoginButton: React.FC<Props> = ({ src, entity }) => {
    return (
        <button
            className="flex items-center justify-center  gap-2 px-4 py-2  bg-primary rounded-full text-lightGray shadow-sm shadow-lightGray hover:shadow-lg"
            onClick={() => signIn(entity)}
        >
            <p className="text-nowrap">Login with</p>
            <Image src={src} height={16} width={16} alt="google" />
        </button>
    );
};

export default LoginButton;
