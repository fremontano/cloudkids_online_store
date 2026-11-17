import { lazy } from 'react';

export const AdminProductsPage = lazy(() =>
    import('../../features/admin/pages/AdminProductsPage').then((module) => ({ default: module.AdminProductsPage })),
);

export const AdminProductFormPage = lazy(() =>
    import('../../features/admin/pages/AdminProductFormPage').then((module) => ({ default: module.AdminProductFormPage })),
);
