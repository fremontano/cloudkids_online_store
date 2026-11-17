export interface ProductReview {
    _id?: string;
    user: string;
    name: string;
    rating: number;
    comment?: string;
}

export interface Product {
    _id: string;
    user: string;
    name: string;
    image: string;
    brand: string;
    category: string;
    color: string;
    colorHex?: string;
    description: string;
    details: string[];
    reviews: ProductReview[];
    numReviews: number;
    price: number;
    countInStock: number;
    rating: number;
    createdAt?: string;
    updatedAt?: string;
}

export type ProductSort =
    | 'name-asc'
    | 'name-desc'
    | 'price-asc'
    | 'price-desc'
    | 'newest';

export interface ProductFilters {
    search: string;
    brand: string;
    category: string;
    sort: ProductSort;
}

export type ProductDetailsInput = string | string[];

export interface ProductFormData {
    name: string;
    image: string;
    brand: string;
    category: string;
    color: string;
    colorHex?: string;
    description: string;
    details: string[];
    price: number;
    countInStock: number;
}

export interface ProductCreateInput extends Omit<ProductFormData, 'details'> {
    details: ProductDetailsInput;
}

export interface ProductUpdateInput {
    name?: string;
    image?: string;
    brand?: string;
    category?: string;
    color?: string;
    colorHex?: string;
    description?: string;
    details?: ProductDetailsInput;
    price?: number;
    countInStock?: number;
}

export interface ProductCreateArgs {
    values: ProductCreateInput;
    imageFile?: File;
}

export interface ProductUpdateArgs {
    id: string;
    values: ProductUpdateInput;
    imageFile?: File;
}

export interface ProductMutationResponse {
    message: string;
    product: Product;
}

export interface ProductMessageResponse {
    message: string;
}
