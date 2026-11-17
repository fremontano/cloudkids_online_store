import type { User } from './user.interface';

export interface LoginResponse extends User {
    token: string;
}

export type RegisterResponse = User;

