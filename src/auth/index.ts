import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firestoreAdmin } from '@/lib/firebaseAdmin';
import providers from './auth.config';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers,
    adapter: FirestoreAdapter(firestoreAdmin),
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'credentials') {
                if (!user || !user.email) {
                    throw new Error('Invalid credentials');
                }
                return true;
            }

            const isSupportedProvider = ['google', 'github'].includes(account?.provider || '');
            const isEmailVerified = profile?.email_verified;

            if (isSupportedProvider && isEmailVerified) {
                return true;
            }
            throw new Error('Email not verified or unsupported provider');
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id?.toString();
                token.username = user.username;
                token.picture = user.image;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.username = token.username;
                session.user.image = token.picture;
            }
            return session;
        },
    },

    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
        newUser: '/auth/register',
    },
});
