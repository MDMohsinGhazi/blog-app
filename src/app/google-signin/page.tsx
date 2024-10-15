'use client';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const SignInPage = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        const redirectToHomeInParentWindow = () => {
            if (window.opener) {
                // Change the route in the parent window
                window.opener.location.href = '/'; // Or any other route you want
            }

            // Close the current window after a short delay
            setTimeout(() => {
                window.close();
            }, 500); // Adjust the delay as needed
        };

        if (!(status === 'loading') && !session) {
            void signIn('google');
        }

        if (session) {
            redirectToHomeInParentWindow();
        }
    }, [session, status]);

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                left: 0,
                top: 0,
                background: 'white',
            }}
        ></div>
    );
};

export default SignInPage;
