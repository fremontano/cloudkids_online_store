import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { remove } from '../api/products.api';
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage';

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => remove(id),
        onSuccess: ({ message }) => {
            toast.success(message || 'Producto eliminado correctamente.');
            void queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error: unknown) => {
            toast.error(getApiErrorMessage(error, 'No se pudo eliminar el producto.'));
        },
    });
};
