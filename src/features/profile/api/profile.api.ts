import { cloudKidsApi } from '../../../api/axiosInstance';
import type { User } from '../../auth/interfaces/user.interface';

export interface UpdateProfileRequest {
    name?: string;
    email?: string;
}

export interface VerifyOtpRequest {
    otp: string;
    newPassword: string;
}

interface MessageResponse {
    message: string;
}

export const updateProfile = async (values: UpdateProfileRequest): Promise<User> => {
    const { data } = await cloudKidsApi.put<User>('/api/users/profile', values);
    return data;
};

export const updateProfileImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await cloudKidsApi.put<{ image: string }>('/api/users/profile/image', formData);
    return data.image;
};

export const requestPasswordOtp = async (): Promise<MessageResponse> => {
    const { data } = await cloudKidsApi.post<MessageResponse>('/api/users/profile/password/request-otp');
    return data;
};

export const verifyPasswordOtp = async (values: VerifyOtpRequest): Promise<MessageResponse> => {
    const { data } = await cloudKidsApi.post<MessageResponse>('/api/users/profile/password/verify-otp', values);
    return data;
};
