import { useState } from 'react';
import { Link } from 'react-router';
import { Pencil, RefreshCw, Trash2, X } from 'lucide-react';
import { ProductFiltersBar } from '../../products/components/ProductFiltersBar';
import { useDeleteProduct } from '../../products/hooks/useDeleteProduct';
import { useProducts } from '../../products/hooks/useProducts';
import type { Product } from '../../products/interfaces/product.interface';
import { formatPriceCLP } from '../../products/utils/formatPrice';

export const AdminProductsPage = () => {
    const {
        products,
        isLoading,
        isFetching,
        errorMessage,
        totalCount,
        availableBrands,
        availableCategories,
        refetch,
    } = useProducts();

    const deleteProduct = useDeleteProduct();

    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const handleConfirmDelete = () => {
        if (!productToDelete) {
            return;
        }

        deleteProduct.mutate(productToDelete._id, {
            onSuccess: () => setProductToDelete(null),
        });
    };

    return (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F36F21]">
                        Administración
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A]">
                        Productos
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Consulta y elimina productos del catálogo.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => void refetch()}
                        disabled={isFetching}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#F36F21] hover:text-[#F36F21] disabled:opacity-60"
                    >
                        <RefreshCw size={16} />
                        Actualizar
                    </button>
                </div>
            </div>

            <ProductFiltersBar
                brands={availableBrands}
                categories={availableCategories}
                total={totalCount}
                resultCount={products.length}
            />

            <div className="mt-6 overflow-hidden rounded-3xl border border-[#EBE7DF] bg-white shadow-sm">
                {isLoading ? (
                    <p className="p-10 text-center text-sm text-gray-500">Cargando productos....</p>
                ) : errorMessage ? (
                    <p className="p-10 text-center text-sm text-rose-600">{errorMessage}</p>
                ) : products.length === 0 ? (
                    <p className="p-10 text-center text-sm text-gray-500">No hay productos para mostrar.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#FAF9F6] text-[11px] font-bold uppercase tracking-wider text-gray-500">
                                <tr>
                                    <th className="px-5 py-4">Producto</th>
                                    <th className="px-5 py-4">Categoría</th>
                                    <th className="px-5 py-4">Precio</th>
                                    <th className="px-5 py-4">Stock</th>
                                    <th className="px-5 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-[#FFFCF9]">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-12 w-12 rounded-xl border border-gray-100 object-contain"
                                                />
                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-[#1A1A1A]">{product.name}</p>
                                                    <p className="text-xs text-gray-500">{product.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">{product.category}</td>
                                        <td className="px-5 py-4 font-semibold text-[#1A1A1A]">
                                            {formatPriceCLP(product.price)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={product.countInStock > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                                                {product.countInStock}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    to={`/admin/productos/${product._id}`}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-semibold text-gray-600 transition hover:border-[#F36F21] hover:text-[#F36F21]"
                                                    aria-label={`Editar ${product.name}`}
                                                >
                                                    <Pencil size={16} />
                                                    Editar
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => setProductToDelete(product)}
                                                    className="cursor-pointer rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-rose-300 hover:text-rose-600"
                                                    aria-label={`Eliminar ${product.name}`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {productToDelete && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    role="presentation"
                    onClick={() => setProductToDelete(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-product-title"
                        onClick={(event) => event.stopPropagation()}
                        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <h2 id="delete-product-title" className="text-lg font-bold text-[#1A1A1A]">
                                Eliminar producto
                            </h2>
                            <button
                                type="button"
                                onClick={() => setProductToDelete(null)}
                                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-gray-600 transition hover:bg-gray-200"
                                aria-label="Cerrar"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <p className="mt-3 text-sm text-gray-600">
                            ¿Eliminar <strong>{productToDelete.name}</strong>? Esta acción no se puede deshacer.
                        </p>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setProductToDelete(null)}
                                className="cursor-pointer rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={deleteProduct.isPending}
                                className="cursor-pointer rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
                            >
                                {deleteProduct.isPending ? 'Eliminando....' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
