import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { create } from '../api/products.api';
import type { ProductCreateArgs } from '../interfaces/product.interface';
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage';

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (args: ProductCreateArgs) => create(args),
        onSuccess: ({ message }) => {
            toast.success(message || 'Producto creado correctamente.');
            void queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error: unknown) => {
            toast.error(getApiErrorMessage(error, 'No se pudo crear el producto.'));
        },
    });
};
