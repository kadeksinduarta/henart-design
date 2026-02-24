import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store/authStore';

export default function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const router = useRouter();
        const { isAuthenticated, token, _hasHydrated, hydrate } = useAuthStore();

        // Hydrate auth state from cookies on mount
        useEffect(() => {
            hydrate();
        }, []);

        // Redirect to login if not authenticated (only after hydration)
        useEffect(() => {
            if (_hasHydrated && (!isAuthenticated || !token)) {
                router.replace('/admin/login');
            }
        }, [_hasHydrated, isAuthenticated, token, router]);

        // Show loading spinner while hydrating or not authenticated
        if (!_hasHydrated || !isAuthenticated || !token) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-sm text-gray-500">Loading...</p>
                    </div>
                </div>
            );
        }

        return <Component {...props} />;
    };
}
