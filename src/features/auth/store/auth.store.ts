import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setUnauthorizedHandler } from '../../../api/axiosInstance';
import { checkAuthStatus, login as loginRequest, logout as logoutRequest, register as registerRequest } from '../api/auth.api';
import type { RegisterRequest } from '../interfaces/auth.request.interface';
import type { User } from '../interfaces/user.interface';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

let sessionRequestId = 0;

const toUser = (value: User): User => ({
    _id: value._id,
    name: value.name,
    email: value.email,
    image: value.image,
    isAdmin: value.isAdmin,
});

interface AuthState {
    user: User | null;
    status: AuthStatus;

    login: (email: string, password: string) => Promise<void>;
    register: (values: RegisterRequest) => Promise<void>;
    restoreSession: () => Promise<void>;
    setUser: (user: User) => void;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        user: null,
        status: 'checking',

        login: async (email: string, password: string) => {
            try {
                const response = await loginRequest({ email, password });
                const user = toUser(response);
                sessionRequestId += 1;
                set({ user, status: 'authenticated' });
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                sessionRequestId += 1;
                set({ user: null, status: 'unauthenticated' });
                throw error;
            }
        },

        register: async (values: RegisterRequest) => {
            try {
                const response = await registerRequest(values);
                const user = toUser(response);
                sessionRequestId += 1;
                set({ user, status: 'authenticated' });
            } catch (error) {
                console.error('Error al crear la cuenta:', error);
                throw error;
            }
        },

        restoreSession: async () => {
            const requestId = ++sessionRequestId;

            try {
                const data = await checkAuthStatus();
                if (requestId === sessionRequestId) {
                    set({ user: toUser(data), status: 'authenticated' });
                }
            } catch (error) {
                console.error('No se pudo restaurar la sesión:', error);
                if (requestId === sessionRequestId) {
                    set({ user: null, status: 'unauthenticated' });
                }
            }
        },

        setUser: (user: User) => set({ user: toUser(user), status: 'authenticated' }),

        logout: async () => {
            sessionRequestId += 1;
            set({ user: null, status: 'unauthenticated' });
            try {
                await logoutRequest();
            } catch (error) {
                console.error('Error al cerrar sesión en el servidor:', error);
            }
        },
    }), {
        name: 'auth-storage',
        partialize: (state) => ({
            user: state.user,
            status: state.status,
        }),
    }),
);

setUnauthorizedHandler(() => {
    void useAuthStore.getState().logout();
});
