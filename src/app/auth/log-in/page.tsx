'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { PopupSignin } from '../../../hooks';

const SignIn = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const res = await signIn('credentials', {
            redirect: true,
            email,
            password,
        });

        if (res?.error) {
            console.error('Sign-in error:', res.error);
        } else {
            console.log('Signed in successfully');
        }
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
                onClick={() => PopupSignin('/google-signin', 'Google sign in')}
            >
                <p className="text-nowrap">Login with</p>
                <Image src={'/icons/Google.svg'} height={16} width={16} alt="google" />
            </button>
        </div>
    );
};

export default SignIn;
