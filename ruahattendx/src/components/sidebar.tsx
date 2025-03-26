// components/Sidebar.tsx
'use client';
import { useState, useEffect} from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
    const pathname = usePathname();
    const [userDept, setUserDept] = useState<String | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserDept(parsedUser.RAX_U_DEPT);
        }
    }, []);


    const menuItems = [
        { name: 'Dashboard', path: '/attendance-rate', icon: '📊' },
        { name: 'Attendance History', path: '/attendance', icon: '📅' },
        { name: 'Profile', path: '/profile', icon: '👤' },
    ];

    if (userDept === 'father') {
        menuItems.push ({ name: 'User Management', path: '/users', icon: '👥' });
    }
    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen">
            <div className="p-4">
                <Image
                    src="/your-logo.png"
                    alt="Logo"
                    width={150}
                    height={50}
                    className="mb-8"
                />
            </div>
            <nav>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 ${
                            pathname === item.path ? 'bg-gray-800 text-white' : ''
                        }`}
                    >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
