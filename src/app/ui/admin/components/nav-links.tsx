'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
	{ name: 'Home', href: '/admin/dashboard' },
	{ name: 'Customers', href: '/admin/customers' },
	{ name: 'Products', href: '/admin/products' },
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				let isActive = false;
				if (link.href === '/admin/customers') {
					isActive = pathname.startsWith('/admin/customers');
				} else if (link.href === '/admin/dashboard') {
					isActive = pathname === '/admin/dashboard';
				} else if (link.href === '/admin/products') {
					isActive = pathname.startsWith('/admin/products');
				}


				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 text-black",
							{
								'bg-sky-100 text-blue-600': isActive,
							}
						)}
					>
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
