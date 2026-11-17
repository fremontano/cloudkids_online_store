import { cloudKidsApi } from '../../../api/axiosInstance';
import type { LoginRequest, RegisterRequest } from '../interfaces/auth.request.interface';
import type { LoginResponse, RegisterResponse } from '../interfaces/auth.response.interface';
import type { User } from '../interfaces/user.interface';

export interface ForgotPasswordResetRequest {
    email: string;
    otp: string;
    newPassword: string;
}

interface MessageResponse {
    message: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await cloudKidsApi.post<LoginResponse>('/api/users/login', credentials);
    return data;
};

export const register = async (values: RegisterRequest): Promise<RegisterResponse> => {
    const { data } = await cloudKidsApi.post<RegisterResponse>('/api/users/register', values);
    return data;
};

export const logout = async (): Promise<void> => {
    await cloudKidsApi.post('/api/users/logout');
};

export const checkAuthStatus = async (): Promise<User> => {
    const { data } = await cloudKidsApi.get<User>('/api/users/check-status-profile');
    return data;
};

export const requestPasswordOtp = async (email: string): Promise<MessageResponse> => {
    const { data } = await cloudKidsApi.post<MessageResponse>(
        '/api/users/forgot-password/request-otp',
        { email },
    );
    return data;
};

export const resetPassword = async (values: ForgotPasswordResetRequest): Promise<MessageResponse> => {
    const { data } = await cloudKidsApi.post<MessageResponse>(
        '/api/users/forgot-password/verify-otp',
        values,
    );
    return data;
};
