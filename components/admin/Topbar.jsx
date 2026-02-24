import { Menu } from '@headlessui/react';
import { Bars3Icon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function Topbar({ setSidebarOpen }) {
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        router.push('/admin/login');
    };

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Mobile menu button */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>

                {/* Breadcrumb / Page title */}
                <div className="flex-1 lg:ml-0">
                    <h1 className="text-xl font-semibold text-gray-900">
                        {getPageTitle(router.pathname)}
                    </h1>
                </div>

                {/* User menu */}
                <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
                            {(user?.name || 'A')[0].toUpperCase()}
                        </div>
                    </Menu.Button>

                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="p-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => router.push('/admin/profile')}
                                        className={`${active ? 'bg-gray-50' : ''
                                            } flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 rounded-md`}
                                    >
                                        <UserCircleIcon className="h-5 w-5" />
                                        Profile
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleLogout}
                                        className={`${active ? 'bg-red-50' : ''
                                            } flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 rounded-md`}
                                    >
                                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Menu>
            </div>
        </header>
    );
}

function getPageTitle(pathname) {
    const titles = {
        '/admin/dashboard': 'Dashboard Overview',
        '/admin/articles': 'Blogs',
        '/admin/articles/create': 'Create Blog',
        '/admin/products': 'Products',
        '/admin/categories': 'Categories',
        '/admin/profile': 'Profile Settings',
    };

    // Check for edit page
    if (pathname.includes('/admin/articles/edit/')) {
        return 'Edit Blog';
    }

    return titles[pathname] || 'Dashboard';
}
