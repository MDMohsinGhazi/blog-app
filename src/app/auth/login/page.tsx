'use client';

import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { login } from '@/lib/actions/auth';

const LogIn = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const body = { email, password };

        const res = await fetch('/api/user/signin', { method: 'POST', body: JSON.stringify(body) });

        if (res.ok) {
            return alert('login successfull');
        }

        const a = await res.json();
        toast.error(a.message);
    };

    return (
        <div className="flex flex-col justify-start gap-6 py-6 px-8 h-fit bg-gray-100 rounded-md w-96">
            <div className="flex justify-center">
                <Image src="/icons/Logo.svg" width={112} height={26} priority alt="logo" />
            </div>
            <h1 className="text-primary font-semibold text-xl">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                            className="p-2 border border-gray-400 outline-none text-secondary rounded-md"
                            type="email"
                            placeholder="Johndoe@email.com"
                            name="email"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            className="p-2 border border-gray-400 outline-none text-secondary rounded-md"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                </div>
                <button type="submit" className="flex bg-primary p-2 text-lightGray rounded-md justify-center">
                    Sign In
                </button>
            </form>
            <Link className="flex justify-center font-semibold text-primary" href="/auth/register">
                <div>Sign Up</div>
            </Link>
            <div className="center-line">or</div>
            <button
                className="flex items-center justify-center  gap-2 px-4 py-2  bg-primary rounded-full text-lightGray shadow-sm shadow-lightGray hover:shadow-lg"
                onClick={() => login('google')}
            >
                <p className="text-nowrap">Login with</p>
                <Image src={'/icons/Google.svg'} height={16} width={16} alt="google" />
            </button>
            <button
                onClick={() => login('github')}
                className="flex items-center justify-center  gap-2 px-4 py-2  bg-primary rounded-full text-lightGray shadow-sm shadow-lightGray hover:shadow-lg"
            >
                <p className="text-nowrap">Login with</p>
                <Image src={'/icons/GitHub.svg'} height={20} width={20} alt="google" />
            </button>
        </div>
    );
};

export default LogIn;
