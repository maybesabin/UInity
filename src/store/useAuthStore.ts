import { User } from "@/types/User";
import { create } from "zustand"

type AuthStore = {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    initializeAuth: () => void;
    user: User | null;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
    isLoggedIn: false,
    user: null,

    login: (token: string) => {
        localStorage.setItem("token", token);
        set({ isLoggedIn: true })
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ isLoggedIn: false, user: null })
    },
    initializeAuth: () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token) {
                set({ isLoggedIn: true });
            }
        }
    },

    setUser: (user) => set({ user })
}))