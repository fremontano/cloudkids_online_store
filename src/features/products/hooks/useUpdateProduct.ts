import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { update } from '../api/products.api';
import type { ProductUpdateArgs } from '../interfaces/product.interface';
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage';

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (args: ProductUpdateArgs) => update(args),
        onSuccess: ({ message }) => {
            toast.success(message || 'Producto actualizado correctamente.');
            void queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error: unknown) => {
            toast.error(getApiErrorMessage(error, 'No se pudo actualizar el producto.'));
        },
    });
};
