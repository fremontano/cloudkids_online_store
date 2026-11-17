import { z } from 'zod';

export const changePasswordSchema = z
    .object({
        otp: z
            .string()
            .trim()
            .regex(/^\d{6}$/, 'El código debe tener 6 dígitos.'),
        newPassword: z
            .string()
            .min(6, 'La nueva contraseña debe tener al menos 6 caracteres.')
            .regex(/[a-z]/, 'Debe incluir al menos una letra minúscula.')
            .regex(/[A-Z]/, 'Debe incluir al menos una letra mayúscula.'),
        confirmPassword: z.string().min(1, 'Confirma tu nueva contraseña.'),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
        message: 'Las contraseñas no coinciden.',
        path: ['confirmPassword'],
    });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
