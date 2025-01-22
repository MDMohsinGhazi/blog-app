import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { Provider } from 'next-auth/providers';

const providers: Provider[] = [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
        credentials: { password: { label: 'Password', type: 'password' }, email: { label: 'Email', type: 'email' } },
        async authorize(credentials: any) {
            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            console.log({ response });
            if (!response.ok) {
                throw new Error('No user found with that email');
            }
            const user = await response.json();

            if (!user) {
                throw new Error('No user found with that email');
            }

            return user;
        },
    }),
];

export default providers;
