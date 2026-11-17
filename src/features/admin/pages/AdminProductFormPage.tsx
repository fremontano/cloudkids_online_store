import { Link, useNavigate, useParams } from 'react-router';
import { FullPageSpinner } from '../../../components/FullPageSpinner';
import { ProductForm } from '../../products/components/ProductForm';
import { useCreateProduct } from '../../products/hooks/useCreateProduct';
import { useProduct } from '../../products/hooks/useProduct';
import { useUpdateProduct } from '../../products/hooks/useUpdateProduct';
import type { ProductFormValues } from '../../products/schema/product.schema';
import { toProductFormData } from '../../products/utils/toProductFormData';

export const AdminProductFormPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data: product, isLoading, errorMessage } = useProduct(id);
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();

    const handleSubmit = (values: ProductFormValues, imageFile: File | null) => {
        const payload = toProductFormData(values, imageFile !== null);
        const onSuccess = () => navigate('/admin/productos');

        if (product) {
            updateProduct.mutate(
                { id: product._id, values: payload, imageFile: imageFile ?? undefined },
                { onSuccess },
            );
            return;
        }

        createProduct.mutate(
            { values: payload, imageFile: imageFile ?? undefined },
            { onSuccess },
        );
    };

    if (id && isLoading) {
        return <FullPageSpinner />;
    }

    return (
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F36F21]">
                        Administración
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A]">
                        {product ? 'Editar producto' : 'Crear producto'}
                    </h1>
                </div>
                <Link
                    to="/admin/productos"
                    className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#F36F21] hover:text-[#F36F21]"
                >
                    Volver al listado
                </Link>
            </div>

            {errorMessage ? (
                <p className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-sm font-medium text-rose-600">
                    {errorMessage}
                </p>
            ) : (
                <ProductForm
                    key={product?._id ?? 'new'}
                    product={product ?? null}
                    isSubmitting={createProduct.isPending || updateProduct.isPending}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate('/admin/productos')}
                />
            )}
        </section>
    );
};
