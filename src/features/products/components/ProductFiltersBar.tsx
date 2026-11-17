import type { ProductSort } from '../interfaces/product.interface';
import { useProductFilters } from '../hooks/useProductFilters';

interface ProductFiltersBarProps {
    brands: string[];
    categories: string[];
    total: number;
    resultCount: number;
}

const sortOptions: Array<{ value: ProductSort; label: string }> = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'name-asc', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
];

const selectClassName = 'h-11 w-full rounded-xl border border-[#CFCBC4] bg-white px-3 text-sm text-[#2A2A2A] focus:border-[#F36F21] focus:outline-none focus:ring-1 focus:ring-[#F36F21]';

export const ProductFiltersBar = ({ brands, categories, total, resultCount }: ProductFiltersBarProps) => {
    const {
        search,
        brand,
        category,
        sort,
        setSearch,
        setBrand,
        setCategory,
        setSort,
        resetFilters,
    } = useProductFilters();

    const hasFilters = Boolean(search || brand || category || sort !== 'newest');

    return (
        <div className="mt-8 rounded-3xl border border-[#EBE7DF] bg-white p-4 text-left shadow-sm sm:p-5">
            <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
                <div>
                    <label htmlFor="product-search" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Buscar
                    </label>
                    <input
                        id="product-search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Nombre, marca o categoría"
                        className={selectClassName}
                    />
                </div>

                <div>
                    <label htmlFor="product-brand" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Marca
                    </label>
                    <select
                        id="product-brand"
                        value={brand}
                        onChange={(event) => setBrand(event.target.value)}
                        className={selectClassName}
                    >
                        <option value="">Todas</option>
                        {brands.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="product-category" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Categoría
                    </label>
                    <select
                        id="product-category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className={selectClassName}
                    >
                        <option value="">Todas</option>
                        {categories.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="product-sort" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Ordenar
                    </label>
                    <select
                        id="product-sort"
                        value={sort}
                        onChange={(event) => setSort(event.target.value as ProductSort)}
                        className={selectClassName}
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={resetFilters}
                        disabled={!hasFilters}
                        className="h-11 w-full cursor-pointer rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition hover:border-[#F36F21] hover:text-[#F36F21] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
                Mostrando {resultCount} de {total} productos
            </p>
        </div>
    );
};
