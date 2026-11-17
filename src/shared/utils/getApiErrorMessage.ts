import axios from 'axios';

interface ApiErrorResponse {
    message?: string;
}

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data?.message ?? fallback;
    }

    return error instanceof Error ? error.message : fallback;
};
