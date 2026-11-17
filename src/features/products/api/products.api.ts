import { cloudKidsApi } from '../../../api/axiosInstance';
import type {
    Product,
    ProductCreateArgs,
    ProductCreateInput,
    ProductFormData,
    ProductMessageResponse,
    ProductMutationResponse,
    ProductUpdateArgs,
    ProductUpdateInput,
} from '../interfaces/product.interface';
import { normalizeDetails } from '../utils/normalizeDetails';

const normalizeColorHex = (colorHex: string | undefined): string | undefined => {
    const trimmed = colorHex?.trim();
    return trimmed ? trimmed : undefined;
};

const toCreatePayload = (values: ProductCreateInput): ProductFormData => ({
    ...values,
    colorHex: normalizeColorHex(values.colorHex),
    details: normalizeDetails(values.details),
});

const toUpdatePayload = (values: ProductUpdateInput): ProductUpdateInput => ({
    ...values,
    ...(values.colorHex === undefined ? {} : { colorHex: normalizeColorHex(values.colorHex) }),
    ...(values.details === undefined ? {} : { details: normalizeDetails(values.details) }),
});

const toFormData = (values: ProductFormData | ProductUpdateInput, imageFile: File): FormData => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values as Record<string, unknown>)) {
        if (key === 'image' || value === undefined) {
            continue;
        }

        formData.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
    }

    formData.append('image', imageFile);

    return formData;
};

export const getAll = async (): Promise<Product[]> => {
    const { data } = await cloudKidsApi.get<Product[]>('/api/products');
    return data;
};

export const getById = async (id: string): Promise<Product> => {
    const { data } = await cloudKidsApi.get<Product>(`/api/products/${id}`);
    return data;
};

export const create = async ({ values, imageFile }: ProductCreateArgs): Promise<ProductMutationResponse> => {
    const payload = toCreatePayload(values);
    const body = imageFile ? toFormData(payload, imageFile) : payload;
    const { data } = await cloudKidsApi.post<ProductMutationResponse>('/api/products', body);
    return data;
};

export const update = async ({ id, values, imageFile }: ProductUpdateArgs): Promise<ProductMutationResponse> => {
    const payload = toUpdatePayload(values);
    const body = imageFile ? toFormData(payload, imageFile) : payload;
    const { data } = await cloudKidsApi.put<ProductMutationResponse>(`/api/products/${id}`, body);
    return data;
};

export const remove = async (id: string): Promise<ProductMessageResponse> => {
    const { data } = await cloudKidsApi.delete<ProductMessageResponse>(`/api/products/${id}`);
    return data;
};
