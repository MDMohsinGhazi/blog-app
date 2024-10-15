import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firestoreAdmin } from '@/lib/firebaseAdmin';
import providers from './auth.config';
export const { handlers, auth, signIn, signOut } = NextAuth({
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

        async session({ session, user }) {
            if (user) {
                session.user.id = user.id;
                session.user.username = user.username;
                session.user.image = user.image;
            }
            return session;
        },
    },

    pages: {
        signIn: '/auth/log-in',
        error: '/auth/error',
        newUser: '/auth/register',
    },
});
