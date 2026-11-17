import axios from 'axios';

export interface BackendFieldError {
    path?: string;
    param?: string;
    msg: string;
}

export interface BackendErrorResponse {
    message?: string;
    errors?: BackendFieldError[];
}

export interface ParsedBackendErrors<TField extends string> {
    status: number | null;
    message?: string;
    fieldErrors: Partial<Record<TField, string[]>>;
    hasFieldErrors: boolean;
}

export const parseBackendErrors = <TField extends string>(
    error: unknown,
    fields: readonly TField[],
    invalidCredentialsMessage = 'Email o contraseña inválidos.',
): ParsedBackendErrors<TField> => {
    const axiosError = axios.isAxiosError<BackendErrorResponse>(error) ? error : undefined;
    const data = axiosError?.response?.data;
    const status = axiosError?.response?.status ?? null;
    const isField = (value: string): value is TField => fields.some((field) => field === value);
    const fieldErrors: Partial<Record<TField, string[]>> = {};

    for (const validationError of data?.errors ?? []) {
        const field = validationError.path ?? validationError.param;

        if (field !== undefined && isField(field)) {
            const messages = fieldErrors[field] ?? [];
            messages.push(validationError.msg);
            fieldErrors[field] = messages;
        }
    }

    const message = status === 401
        ? data?.message ?? invalidCredentialsMessage
        : data?.message ?? (error instanceof Error ? error.message : undefined);

    return {
        status,
        message,
        fieldErrors,
        hasFieldErrors: fields.some((field) => (fieldErrors[field]?.length ?? 0) > 0),
    };
};
