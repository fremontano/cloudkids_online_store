import { useProductsFiltersStore } from '../store/products-filters.store';

export const useProductFilters = () => {
    const search = useProductsFiltersStore((state) => state.search);
    const brand = useProductsFiltersStore((state) => state.brand);
    const category = useProductsFiltersStore((state) => state.category);
    const sort = useProductsFiltersStore((state) => state.sort);
    const setSearch = useProductsFiltersStore((state) => state.setSearch);
    const setBrand = useProductsFiltersStore((state) => state.setBrand);
    const setCategory = useProductsFiltersStore((state) => state.setCategory);
    const setSort = useProductsFiltersStore((state) => state.setSort);
    const resetFilters = useProductsFiltersStore((state) => state.resetFilters);

    return {
        search,
        brand,
        category,
        sort,
        setSearch,
        setBrand,
        setCategory,
        setSort,
        resetFilters,
    };
};
