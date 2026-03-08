'use client';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MyAccount() {
    const router = useRouter();
    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Logging out...');
        try {
            await fetch('/api/actions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'logout',
                }),
            }).then((res) => {
                if (res.ok) router.push('/login')
            })


        } catch (error) {
            console.log('Error during logout:', error);
        }
    };

    return (
        <Dropdown
            className="ml-7"
        >
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                My Account
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as="button">
                    <Link href="/dashboard">Dashboard</Link>
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
                    onClick={handleLogout}
                    style={{ color: "red" }}
                >
                    Signout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
