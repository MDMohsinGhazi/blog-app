import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    if (session) {
        redirect('/');
    }

    return <div className="flex justify-center items-center h-screen">{children}</div>;
}
