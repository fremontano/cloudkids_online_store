import { create } from 'zustand';
import type { ProductFilters, ProductSort } from '../interfaces/product.interface';

interface ProductsFiltersState extends ProductFilters {
    setSearch: (search: string) => void;
    setBrand: (brand: string) => void;
    setCategory: (category: string) => void;
    setSort: (sort: ProductSort) => void;
    resetFilters: () => void;
}

const initialFilters: ProductFilters = {
    search: '',
    brand: '',
    category: '',
    sort: 'newest',
};

export const useProductsFiltersStore = create<ProductsFiltersState>()((set) => ({
    ...initialFilters,

    setSearch: (search) => set({ search }),
    setBrand: (brand) => set({ brand }),
    setCategory: (category) => set({ category }),
    setSort: (sort) => set({ sort }),
    resetFilters: () => set({ ...initialFilters }),
}));
