import { ProductGrid } from "../components/ProductGrid"
import { CategorySection } from "../components/CategorySection"
import { HeroBanner } from "../components/HeroBanner"
import products from "../data/products"

export const HomePage = () => {
    return (
        <>
            {/* Estas secciones componen el contenido que Outlet muestra para la ruta /. */}
            <HeroBanner />
            <CategorySection />
            <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Productos destacados</h2>
                <p className="text-lg text-gray-500 mt-2 mb-10 max-w-lg mx-auto">
                    Encuentra la mejor selección de tendencias, colecciones y productos que tenemos para ti.
                </p>

                {/* Grid de productos destacados  */}
                <ProductGrid products={products} />


            </section>
        </>
    )
}
