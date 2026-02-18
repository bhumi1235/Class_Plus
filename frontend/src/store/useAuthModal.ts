import { create } from 'zustand';

type AuthView = 'login' | 'signup';

interface AuthModalStore {
    isOpen: boolean;
    view: AuthView;
    openLogin: () => void;
    openSignup: () => void;
    close: () => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    view: 'login',
    openLogin: () => set({ isOpen: true, view: 'login' }),
    openSignup: () => set({ isOpen: true, view: 'signup' }),
    close: () => set({ isOpen: false }),
}));
