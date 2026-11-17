import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAll } from '../api/products.api';
import { useProductsFiltersStore } from '../store/products-filters.store';
import type { Product, ProductFilters, ProductSort } from '../interfaces/product.interface';
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage';

const sorters: Record<ProductSort, (a: Product, b: Product) => number> = {
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    newest: (a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''),
};

export const useProducts = () => {
    const search = useProductsFiltersStore((state) => state.search);
    const brand = useProductsFiltersStore((state) => state.brand);
    const category = useProductsFiltersStore((state) => state.category);
    const sort = useProductsFiltersStore((state) => state.sort);

    const filters = useMemo<ProductFilters>(
        () => ({ search, brand, category, sort }),
        [search, brand, category, sort],
    );

    const query = useQuery({
        queryKey: ['products'],
        queryFn: getAll,
    });

    const products = useMemo(() => {
        const term = filters.search.trim().toLowerCase();

        const filtered = (query.data ?? []).filter((product) => {
            if (filters.brand && product.brand !== filters.brand) {
                return false;
            }

            if (filters.category && product.category !== filters.category) {
                return false;
            }

            if (!term) {
                return true;
            }

            return [
                product.name,
                product.brand,
                product.category,
                product.description,
                ...product.details,
            ].some((value) => value.toLowerCase().includes(term));
        });

        return [...filtered].sort(sorters[filters.sort]);
    }, [query.data, filters]);

    const availableBrands = useMemo(
        () => [...new Set((query.data ?? []).map((product) => product.brand))].sort(),
        [query.data],
    );

    const availableCategories = useMemo(
        () => [...new Set((query.data ?? []).map((product) => product.category))].sort(),
        [query.data],
    );

    return {
        ...query,
        data: products,
        products,
        filters,
        totalCount: query.data?.length ?? 0,
        availableBrands,
        availableCategories,
        errorMessage: query.error
            ? getApiErrorMessage(query.error, 'No pudimos cargar los productos.')
            : null,
    };
};
