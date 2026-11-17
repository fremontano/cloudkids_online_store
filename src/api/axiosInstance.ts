import axios from 'axios';

const baseURL: string | undefined = import.meta.env.VITE_BASE_URL;

if (import.meta.env.PROD && !baseURL) {
    throw new Error('VITE_BASE_URL no está definida en producción.');
}

const resolvedBaseURL = baseURL ?? 'http://localhost:4000';

interface UnauthorizedHandler {
    (): void;
}

let unauthorizedHandler: UnauthorizedHandler | undefined;

export const setUnauthorizedHandler = (handler: UnauthorizedHandler): void => {
    unauthorizedHandler = handler;
};

// Instancia compartida para las solicitudes HTTP del frontend.
export const cloudKidsApi = axios.create({
    baseURL: resolvedBaseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

cloudKidsApi.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }

    return config;
});

cloudKidsApi.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            const requestUrl = error.config?.url ?? '';

            const isSessionCheck =
                requestUrl.includes('/api/users/login') ||
                requestUrl.includes('/api/users/register') ||
                requestUrl.includes('/api/users/check-status-profile');

            if (!isSessionCheck) {
                unauthorizedHandler?.();
            }
        }

        return Promise.reject(error);
    },
);
