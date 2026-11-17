import { Suspense, type ReactNode } from 'react';
import { Route } from 'react-router';
import { FullPageSpinner } from '../../components/FullPageSpinner';
import { NotFoundPage } from '../../components/NotFoundPage';
import { CartPage } from '../../features/cart/pages/CartPage';
import { HomePage } from '../../features/home/pages/HomePage';
import { ProductDetailPage } from '../../features/products/pages/ProductDetailPage';
import { ProfilePage } from '../../features/profile/pages/ProfilePage';
import { AdminRoute } from '../../guards/AdminRoute';
import { ProtectedRoute } from '../../guards/ProtectedRoute';
import { AdminProductFormPage, AdminProductsPage } from './lazyPages';

const withSuspense = (page: ReactNode) => (
    <Suspense fallback={<FullPageSpinner />}>{page}</Suspense>
);

export const mainRoutes = (
    <>
        <Route index element={<HomePage />} />
        <Route path="producto/:id" element={<ProductDetailPage />} />
        <Route path="carrito" element={<CartPage />} />

        <Route element={<ProtectedRoute />}>
            <Route path="perfil" element={<ProfilePage />} />
        </Route>

        <Route element={<AdminRoute />}>
            <Route path="admin/productos" element={withSuspense(<AdminProductsPage />)} />
            <Route path="admin/productos/crear" element={withSuspense(<AdminProductFormPage />)} />
            <Route path="admin/productos/:id" element={withSuspense(<AdminProductFormPage />)} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
    </>
);
