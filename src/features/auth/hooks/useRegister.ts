import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth.store';
import { registerSchema, type RegisterFormValues } from '../schema/register.schema';

interface BackendAuthError {
    message?: string;
    errors?: Array<{ path?: string; param?: string; msg: string }>;
}

export const useRegister = () => {
    const navigate = useNavigate();
    const registerUser = useAuthStore((state) => state.register);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        criteriaMode: 'all',
        defaultValues: { name: '', email: '', password: '', acceptTerms: false },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        form.clearErrors(['name', 'email', 'password']);

        try {
            await registerUser({
                name: values.name,
                email: values.email,
                password: values.password,
            });

            toast.success('Tu cuenta se creó correctamente.');
            navigate('/');
        } catch (error) {
            const response = axios.isAxiosError<BackendAuthError>(error)
                ? error.response?.data
                : undefined;
            const messagesByField: Partial<Record<'name' | 'email' | 'password', string[]>> = {};

            for (const validationError of response?.errors ?? []) {
                const field = validationError.path ?? validationError.param;
                if (field === 'name' || field === 'email' || field === 'password') {
                    messagesByField[field] ??= [];
                    messagesByField[field].push(validationError.msg);
                }
            }

            for (const field of ['name', 'email', 'password'] as const) {
                const messages = messagesByField[field];
                if (messages?.length) {
                    form.setError(field, { type: 'server', message: messages.join('\n') });
                }
            }

            if (!response?.errors?.length || Object.keys(messagesByField).length === 0) {
                const message = response?.message ?? (error instanceof Error ? error.message : undefined);
                if (message) {
                    form.setError('email', {
                        type: 'server',
                        message,
                    });
                }
            }
        }
    };

    return { ...form, onSubmit };
};
