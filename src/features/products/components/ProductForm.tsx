import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { productFormSchema, type ProductFormValues } from '../schema/product.schema';
import type { Product } from '../interfaces/product.interface';

interface ProductFormProps {
    product: Product | null;
    isSubmitting: boolean;
    onSubmit: (values: ProductFormValues, imageFile: File | null) => void;
    onCancel: () => void;
}

interface FieldProps {
    id: string;
    label: string;
    message?: string;
    children: ReactNode;
}

const inputClassName = 'h-11 w-full rounded-xl border border-[#CFCBC4] bg-white px-3 text-sm text-[#2A2A2A] placeholder:text-[#A39E96] focus:border-[#F36F21] focus:outline-none focus:ring-1 focus:ring-[#F36F21]';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const toFormValues = (product: Product | null): ProductFormValues => ({
    name: product?.name ?? '',
    image: product?.image ?? '',
    brand: product?.brand ?? '',
    category: product?.category ?? '',
    color: product?.color ?? '',
    colorHex: product?.colorHex ?? '',
    description: product?.description ?? '',
    details: product?.details.join('\n') ?? '',
    price: product?.price ?? 0,
    countInStock: product?.countInStock ?? 0,
});

const Field = ({ id, label, message, children }: FieldProps) => (
    <div>
        <label htmlFor={id} className="mb-1.5 block text-xs font-bold text-gray-700">
            {label}
        </label>
        {children}
        {message && (
            <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">
                {message}
            </p>
        )}
    </div>
);

export const ProductForm = ({ product, isSubmitting, onSubmit, onCancel }: ProductFormProps) => {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        criteriaMode: 'all',
        defaultValues: toFormValues(product),
    });

    const { errors } = form.formState;

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFileError, setImageFileError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imageUrl = useWatch({ control: form.control, name: 'image' });

    useEffect(() => () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    }, [imagePreview]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;

        if (!file) {
            setImageFile(null);
            setImagePreview(null);
            return;
        }

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            event.target.value = '';
            setImageFile(null);
            setImagePreview(null);
            setImageFileError('Usa una imagen JPG, PNG, WEBP o GIF.');
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            event.target.value = '';
            setImageFile(null);
            setImagePreview(null);
            setImageFileError('La imagen debe pesar menos de 5 MB.');
            return;
        }

        setImageFileError(null);
        setImageFile(file);

        const preview = URL.createObjectURL(file);
        setImagePreview(preview);
        form.setValue('image', preview, { shouldValidate: true, shouldDirty: true });
    };

    const handleValidSubmit = (values: ProductFormValues) => {
        onSubmit(values, imageFile);
    };

    const onInvalid = () => {
        toast.error('Revisa los campos del formulario.');
    };

    return (
        <form
            className="rounded-3xl border border-[#EBE7DF] bg-white p-6 shadow-sm"
            onSubmit={form.handleSubmit(handleValidSubmit, onInvalid)}
            noValidate
        >
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">
                        {product ? 'Ver detalle del producto' : 'Crear producto'}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                        Los detalles se pueden separar por saltos de línea o comas.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-[#F36F21] hover:text-[#F36F21]"
                >
                    Cancelar
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Field id="product-name" label="Nombre" message={errors.name?.message}>
                    <input
                        id="product-name"
                        type="text"
                        placeholder="Ej. Polerón infantil"
                        {...form.register('name')}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'product-name-error' : undefined}
                        className={inputClassName}
                    />
                </Field>

                <Field id="product-image" label="URL de la imagen" message={errors.image?.message}>
                    <input
                        id="product-image"
                        type="url"
                        placeholder="https://..."
                        {...form.register('image')}
                        aria-invalid={!!errors.image}
                        aria-describedby={errors.image ? 'product-image-error' : undefined}
                        className={inputClassName}
                    />
                </Field>

                <Field id="product-image-file" label="O subir archivo" message={imageFileError ?? undefined}>
                    <div className="flex items-center gap-3">
                        <input
                            id="product-image-file"
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleImageChange}
                            aria-invalid={!!imageFileError}
                            aria-describedby={imageFileError ? 'product-image-file-error' : undefined}
                            className="h-11 w-full cursor-pointer rounded-xl border border-[#CFCBC4] bg-white px-3 py-2 text-sm text-[#2A2A2A] file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#F36F21] file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white"
                        />
                        {(imagePreview ?? imageUrl) && (
                            <img
                                src={imagePreview ?? imageUrl}
                                alt="Vista previa de la imagen"
                                className="h-11 w-11 shrink-0 rounded-lg border border-gray-200 object-cover"
                            />
                        )}
                    </div>
                </Field>

                <Field id="product-brand" label="Marca" message={errors.brand?.message}>
                    <input
                        id="product-brand"
                        type="text"
                        {...form.register('brand')}
                        aria-invalid={!!errors.brand}
                        aria-describedby={errors.brand ? 'product-brand-error' : undefined}
                        className={inputClassName}
                    />
                </Field>

                <Field id="product-category" label="Categoría" message={errors.category?.message}>
                    <input
                        id="product-category"
                        type="text"
                        {...form.register('category')}
                        aria-invalid={!!errors.category}
                        aria-describedby={errors.category ? 'product-category-error' : undefined}
                        className={inputClassName}
                    />
                </Field>

                <Field id="product-color" label="Color" message={errors.color?.message}>
                    <input
                        id="product-color"
                        type="text"
                        {...form.register('color')}
                        aria-invalid={!!errors.color}
                        aria-describedby={errors.color ? 'product-color-error' : undefined}
                        className={inputClassName}
                    />
                </Field>

                <Field id="product-color-hex" label="Color hexadecimal" message={errors.colorHex?.message}>
                    <input
                        id="product-color-hex"
                        type="text"
                        placeholder="#F36F21"
                        {...form.register('colorHex')}
                        aria-invalid={!!errors.colorHex}
                        aria-describedby={errors.colorHex ? 'product-color-hex-error' : undefined}
                        className={inputClassName}
                    />
                </Field>

                <Field id="product-price" label="Precio" message={errors.price?.message}>
                    <input
                        id="product-price"
                        type="number"
                        min="0"
                        step="1"
                        {...form.register('price', { valueAsNumber: true })}
                        aria-invalid={!!errors.price}
                        aria-describedby={errors.price ? 'product-price-error' : undefined}
                        className={inputClassName}
                    />
                </Field>

                <Field id="product-stock" label="Stock" message={errors.countInStock?.message}>
                    <input
                        id="product-stock"
                        type="number"
                        min="0"
                        step="1"
                        {...form.register('countInStock', { valueAsNumber: true })}
                        aria-invalid={!!errors.countInStock}
                        aria-describedby={errors.countInStock ? 'product-stock-error' : undefined}
                        className={inputClassName}
                    />
                </Field>

                <div className="md:col-span-2">
                    <Field id="product-description" label="Descripción" message={errors.description?.message}>
                        <textarea
                            id="product-description"
                            rows={3}
                            {...form.register('description')}
                            aria-invalid={!!errors.description}
                            aria-describedby={errors.description ? 'product-description-error' : undefined}
                            className={`${inputClassName} h-auto py-2.5`}
                        />
                    </Field>
                </div>

                <div className="md:col-span-2">
                    <Field id="product-details" label="Detalles" message={errors.details?.message}>
                        <textarea
                            id="product-details"
                            rows={4}
                            placeholder={'Capucha con orejas\nBolsillo canguro\nInterior polar'}
                            {...form.register('details')}
                            aria-invalid={!!errors.details}
                            aria-describedby={errors.details ? 'product-details-error' : undefined}
                            className={`${inputClassName} h-auto py-2.5`}
                        />
                    </Field>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 cursor-pointer rounded-full bg-[#F36F21] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#df5e12] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? 'Guardando...' : product ? 'Guardar cambios' : 'Crear producto'}
            </button>
        </form>
    );
};
