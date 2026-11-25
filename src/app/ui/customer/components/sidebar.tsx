'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from "next/image";
import Icon from "../../common/svg-tiles";

const links = [
    { name: 'Home', href: '/profile/dashboard' },
    { name: 'Wishlist', href: '/profile/wishlists' },
    { name: 'SignOut', href: '' },
];

export default function CustomerSideBar() {
    const pathname = usePathname();
    return (
        <>
           <nav className="fixed top-0 left-0 z-50 w-full h-16 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <Link href={"/"} className="flex ms-2 md:me-24">
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Insta Mart</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <Image className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" width={50} height={50} />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
              <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {
                            links.map((link) => {
                                let isActive = false;
                                if (link.href === '/profile/dashboard') {
                                    isActive = pathname === '/profile/dashboard';
                                }else if (link.href === "/profile/wishlists") {
                                    isActive = pathname === "/profile/wishlists";
                                }
                                    return (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className={clsx(
                                                    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                                                    {
                                                        "bg-gray-100": isActive,
                                                    },
                                                )}
                                            >
                                                <Icon name={link.name} />
                                                <span className="ms-3 pt-1">{link.name}</span>
                                            </Link>
                                        </li>
                                    );
                            })
                        }

                    </ul>
                </div>
            </aside>
        </>
    )
}
