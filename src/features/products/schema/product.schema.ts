import { z } from 'zod';

const hexColorPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const productFormSchema = z.object({
    name: z.string().trim().min(1, 'El nombre es obligatorio.'),
    image: z.string().trim().min(1, 'La imagen es obligatoria.').url('Ingresa una URL válida.'),
    brand: z.string().trim().min(1, 'La marca es obligatoria.'),
    category: z.string().trim().min(1, 'La categoría es obligatoria.'),
    color: z.string().trim().min(1, 'El color es obligatorio.'),
    colorHex: z.string().trim().refine(
        (value) => value === '' || hexColorPattern.test(value),
        'Ingresa un hexadecimal válido (ej. #F36F21).',
    ),
    description: z.string().trim().min(1, 'La descripción es obligatoria.'),
    details: z.string().trim().min(1, 'Agrega al menos un detalle.'),
    price: z.number().min(0, 'El precio debe ser mayor o igual a 0.'),
    countInStock: z.number().int('El stock debe ser un número entero.').min(0, 'El stock debe ser mayor o igual a 0.'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
