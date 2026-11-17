import type { FieldError } from 'react-hook-form';

interface AuthFieldErrorsProps {
    error?: FieldError;
    id?: string;
}

export const AuthFieldErrors = ({ error, id }: AuthFieldErrorsProps) => {
    const typeMessages = error?.types
        ? Object.values(error.types)
            .flatMap((value) => Array.isArray(value) ? value : [value])
            .filter((value): value is string => typeof value === 'string')
        : [];

    const messages = typeMessages.length > 0
        ? typeMessages
        : error?.message?.split('\n') ?? [];

    if (messages.length === 0) {
        return null;
    }

    return (
        <div id={id} role="alert" className="mt-1.5 text-xs text-red-600 font-medium">
            {messages.map((message, index) => (
                <p key={`${index}-${message}`}>{message}</p>
            ))}
        </div>
    );
};