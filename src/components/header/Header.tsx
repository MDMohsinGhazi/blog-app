'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Catagery, Home, Logo, Message } from '@/app/assets';
import Avtar from '../avtar/Avtar';
import { categories } from '@/constant';

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
                    <Link key={'Home'} href={'/'} className="flex items-end gap-1 text-secondary">
                        <Image className="" src={Home} width={16} height={16} alt="logo" />
                        <span>{'Home'}</span>
                    </Link>
                    <div key={'category'} className="relative group flex items-end gap-1 text-secondary cursor-pointer">
                        <Image src={Catagery} width={16} height={16} alt="logo" />
                        <span>{'Blog'}</span>
                        <ul className="absolute -translate-y-44 flex flex-col  mt-2 bg-white border rounded shadow-lg opacity-0 transition-all duration-300 delay-150 group-hover:opacity-100 hover:opacity-100 group-hover:translate-y-52 hover:translate-y-0">
                            {categories.map((category) => (
                                <Link
                                    className="px-4 py-2 hover:bg-gray-200"
                                    key={category.value}
                                    href={`/category/${category.value}`}
                                >
                                    {category.label}
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <Link key={'Contact us'} href={'/Contact us'} className="flex items-end gap-1 text-secondary">
                        <Image className="" src={Message} width={16} height={16} alt="logo" />
                        <span>{'Contact us'}</span>
                    </Link>
                </ul>
                <Avtar />
            </div>
        </nav>
    );
};

export default Header;
