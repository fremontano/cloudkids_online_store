import { HeroBanner } from '../components/HeroBanner';
import { CategorySection } from '../components/CategorySection';
import { ProductGrid } from '../../products/components/ProductGrid';
import { ProductFiltersBar } from '../../products/components/ProductFiltersBar';
import { useProducts } from '../../products/hooks/useProducts';

export const HomePage = () => {
    const {
        products,
        isLoading,
        errorMessage,
        totalCount,
        availableBrands,
        availableCategories,
    } = useProducts();

    return (
        <>
            <HeroBanner />
            <CategorySection />

            <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Productos destacados</h2>
                <p className="mx-auto mt-2 mb-8 max-w-lg text-lg text-gray-500">
                    Encuentra la mejor selección de tendencias, colecciones y productos que tenemos para ti.
                </p>

                <ProductFiltersBar
                    brands={availableBrands}
                    categories={availableCategories}
                    total={totalCount}
                    resultCount={products.length}
                />

                {isLoading ? (
                    <p className="py-10 text-sm text-gray-500">Cargando productos...</p>
                ) : errorMessage ? (
                    <p className="py-10 text-sm text-rose-600">{errorMessage}</p>
                ) : products.length === 0 ? (
                    <p className="py-10 text-sm text-gray-500">No hay productos disponibles.</p>
                ) : (
                    <div className="mt-8">
                        <ProductGrid products={products} />
                    </div>
                )}
            </section>
        </>
    );
};
