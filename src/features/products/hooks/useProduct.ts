import { useQuery } from '@tanstack/react-query';
import { getById } from '../api/products.api';
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage';

export const useProduct = (id: string | undefined) => {
    const query = useQuery({
        queryKey: ['products', id],
        queryFn: () => getById(id ?? ''),
        enabled: Boolean(id),
    });

    return {
        ...query,
        errorMessage: query.error
            ? getApiErrorMessage(query.error, 'No pudimos cargar el producto.')
            : null,
    };
};
