import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage';
import { parseBackendErrors } from '../../auth/utils/parseBackendErrors';
import { requestPasswordOtp, verifyPasswordOtp } from '../api/profile.api';
import {
    changePasswordSchema,
    type ChangePasswordFormValues,
} from '../schema/changePassword.schema';

export const useChangePassword = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [sending, setSending] = useState(false);

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: { otp: '', newPassword: '', confirmPassword: '' },
    });

    const handleRequestOtp = async () => {
        setSending(true);
        try {
            const response = await requestPasswordOtp();
            setOtpSent(true);
            toast.success(response.message);
        } catch (error) {
            toast.error(getApiErrorMessage(error, 'No se pudo enviar el código de verificación.'));
        } finally {
            setSending(false);
        }
    };

    const onSubmit = async (values: ChangePasswordFormValues) => {
        try {
            await verifyPasswordOtp({ otp: values.otp, newPassword: values.newPassword });
            toast.success('Contraseña actualizada correctamente.');
            setOtpSent(false);
            form.reset();
        } catch (error) {
            const parsed = parseBackendErrors(error, ['otp', 'newPassword'] as const);

            for (const field of ['otp', 'newPassword'] as const) {
                const messages = parsed.fieldErrors[field];

                if (messages?.length) {
                    form.setError(field, { type: 'server', message: messages.join('\n') });
                }
            }

            toast.error(getApiErrorMessage(error, 'No se pudo cambiar la contraseña.'));
        }
    };

    const handleCancel = () => {
        setOtpSent(false);
        form.reset();
    };

    return {
        ...form,
        otpSent,
        sending,
        onSubmit,
        handleRequestOtp,
        handleCancel,
    };
};
