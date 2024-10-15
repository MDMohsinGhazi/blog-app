'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { navItem } from '@/constant';
import { Logo } from '@/app/assets';
import Avtar from '../Avtar/Avtar';

const Header = () => {
    const pathname = usePathname();

    const isAuthRoute = pathname.startsWith('/auth');

    if (isAuthRoute) {
        return null;
    }
    return (
        <nav className="flex justify-center px-7 py-3 bg-white border-b shadow-md sticky top-0 z-50">
            <div className="flex items-center justify-between w-[64rem] max-w-7xl">
                <Image src={Logo} width={160} height={36} alt="logo" />
                <ul className="flex gap-4 text-fontSecondary">
                    {navItem.map((item) => (
                        <Link key={item.title} href={item.path} className="flex items-end gap-1 text-secondary">
                            <Image className="" src={item.img} width={16} height={16} alt="logo" />
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </ul>
                <Avtar />
            </div>
        </nav>
    );
};

export default Header;
