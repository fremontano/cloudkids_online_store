import type { ProductFormValues } from '../schema/product.schema';
import type { ProductFormData } from '../interfaces/product.interface';
import { normalizeDetails } from './normalizeDetails';

export const toProductFormData = (values: ProductFormValues, hasImageFile = false): ProductFormData => ({
    name: values.name,
    image: hasImageFile ? '' : values.image,
    brand: values.brand,
    category: values.category,
    color: values.color,
    colorHex: values.colorHex.trim() || undefined,
    description: values.description,
    details: normalizeDetails(values.details),
    price: values.price,
    countInStock: values.countInStock,
});
