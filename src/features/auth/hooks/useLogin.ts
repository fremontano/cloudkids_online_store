import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { loginSchema, type LoginFormValues } from '../schema/login.schema';
import { useAuthStore } from '../store/auth.store';
import { parseBackendErrors } from '../utils/parseBackendErrors';

const getFromPathname = (state: unknown): string | null => {
    if (typeof state !== 'object' || state === null || !('from' in state)) {
        return null;
    }

    const from: unknown = state.from;

    if (typeof from !== 'object' || from === null || !('pathname' in from)) {
        return null;
    }

    const pathname: unknown = from.pathname;

    return typeof pathname === 'string' ? pathname : null;
};

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const login = useAuthStore((state) => state.login);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        criteriaMode: 'all',
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (values: LoginFormValues) => {
        form.clearErrors(['email', 'password']);

        try {
            await login(values.email, values.password);
            toast.success('Iniciaste sesión correctamente.');
            navigate(getFromPathname(location.state) ?? '/', { replace: true });
        } catch (error) {
            const parsed = parseBackendErrors(error, ['email', 'password'] as const);

            if (parsed.status === 401) {
                const message = parsed.message ?? 'Email o contraseña inválidos.';
                toast.error(message);
                form.setError('password', { type: 'server', message });
                return;
            }

            for (const field of ['email', 'password'] as const) {
                const messages = parsed.fieldErrors[field];

                if (messages?.length) {
                    form.setError(field, { type: 'server', message: messages.join('\n') });
                }
            }

            if (parsed.hasFieldErrors) {
                toast.error('Email o contraseña inválidos.');
                return;
            }

            toast.error(parsed.message ?? 'Ocurrió un error inesperado al iniciar sesión.');
        }
    };

    const onInvalid = () => {
        toast.error('Revisa los campos del formulario.');
    };

    return { ...form, onSubmit, onInvalid };
};
