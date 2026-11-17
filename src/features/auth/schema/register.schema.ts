import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string()
        .trim()
        .min(1, 'El nombre es obligatorio.')
        .max(98, 'El nombre no puede superar los 98 caracteres.'),
    email: z.string().trim().min(1, 'El correo electrónico es obligatorio.').email('Ingresa un correo electrónico válido.'),
    password: z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres.')
        .regex(/[a-z]/, 'La contraseña debe incluir al menos una letra minúscula.')
        .regex(/[A-Z]/, 'La contraseña debe incluir al menos una letra mayúscula.'),
    acceptTerms: z.boolean().refine((accepted) => accepted, 'Debes aceptar los términos y la privacidad.'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
