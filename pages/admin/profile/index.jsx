import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/admin/DashboardLayout';
import withAuth from '../../../middleware/withAuth';
import { useAuthStore } from '../../../store/authStore';
import { api } from '../../../lib/api';

function ProfileIndex() {
    const { user, setUser } = useAuthStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Optionally fetch real user from /me if you don't fully trust the store
        const fetchMe = async () => {
            try {
                const response = await api.get('/me');
                if (response.data?.data) {
                    setUser(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching me", error);
            }
        };
        fetchMe();
    }, [setUser]);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                    <p className="text-gray-600 mt-1">View your profile details</p>
                </div>

                <div className="bg-white rounded-xl shadow-soft p-6 max-w-2xl">
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="h-24 w-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-3xl font-bold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                                <p className="text-gray-500">{user?.email}</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.name}</dd>
                                </div>
                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.email}</dd>
                                </div>
                                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{user?.role || 'Admin'}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default withAuth(ProfileIndex);
