import { create } from 'zustand';
import { api } from '../lib/api';
import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const COOKIE_OPTIONS = { expires: 7, sameSite: 'Lax', path: '/' };

export const useAuthStore = create((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    _hasHydrated: false,

    // Call this on app mount to restore session from cookies
    hydrate: () => {
        if (typeof window === 'undefined') {
            set({ _hasHydrated: true });
            return;
        }

        const token = Cookies.get(TOKEN_KEY);
        const userStr = Cookies.get(USER_KEY);

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                set({ user, token, isAuthenticated: true, _hasHydrated: true });
            } catch {
                // Invalid cookie data, clear it
                Cookies.remove(TOKEN_KEY, { path: '/' });
                Cookies.remove(USER_KEY, { path: '/' });
                set({ _hasHydrated: true });
            }
        } else {
            set({ _hasHydrated: true });
        }
    },

    login: async (email, password) => {
        const response = await api.post('/login', { email, password });
        const { user, token } = response.data.data;

        // Store in cookies (persists across refreshes)
        Cookies.set(TOKEN_KEY, token, COOKIE_OPTIONS);
        Cookies.set(USER_KEY, JSON.stringify(user), COOKIE_OPTIONS);

        set({ user, token, isAuthenticated: true });
        return response.data;
    },

    logout: async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }

        // Clear cookies
        Cookies.remove(TOKEN_KEY, { path: '/' });
        Cookies.remove(USER_KEY, { path: '/' });

        set({ user: null, token: null, isAuthenticated: false });
    },

    setUser: (user) => {
        Cookies.set(USER_KEY, JSON.stringify(user), COOKIE_OPTIONS);
        set({ user });
    },
}));

export default useAuthStore;
