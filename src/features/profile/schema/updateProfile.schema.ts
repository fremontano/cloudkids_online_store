import { z } from 'zod';

export const updateProfileSchema = z.object({
    name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres.'),
    email: z.string().trim().email('Ingresa un correo electrónico válido.'),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
