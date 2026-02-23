import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    user: { name: string; email: string; studentId: string } | null;
    login: (userData: { name: string; email: string; studentId: string }) => void;
    logout: () => void;
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: (userData) => set({ isAuthenticated: true, user: userData }),
            logout: () => set({ isAuthenticated: false, user: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
