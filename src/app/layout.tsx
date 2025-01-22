import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import { Header, SessionWrapper } from '@/components';
import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Blog App',
    description: 'Best blog site',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <SessionWrapper>
                <body
                    className={`flex flex-col ${geistSans.variable} ${geistMono.variable}  font-[family-name:var(--font-geist-sans)]`}
                >
                    <Header />
                    {children}
                    <Toaster />
                </body>
            </SessionWrapper>
        </html>
    );
}
