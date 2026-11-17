import type { ProductDetailsInput } from '../interfaces/product.interface';

export const normalizeDetails = (details: ProductDetailsInput): string[] => {
    if (Array.isArray(details)) {
        return details
            .map((item) => String(item).trim())
            .filter(Boolean);
    }

    const trimmed = details.trim();

    if (!trimmed) {
        return [];
    }

    let parsed: unknown;

    try {
        parsed = JSON.parse(trimmed);
    } catch {
        parsed = undefined;
    }

    if (Array.isArray(parsed)) {
        return parsed
            .map((item) => String(item).trim())
            .filter(Boolean);
    }

    return trimmed
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
};
