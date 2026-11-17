import { Route, Routes } from 'react-router';
import AuthLayout from '../../layouts/AuthLayout';
import MainLayout from '../../layouts/MainLayout';
import { authRoutes } from './AuthRoutes';
import { mainRoutes } from './MainRoutes';

export const AppRoutes = () => (
    <Routes>
        <Route element={<MainLayout />}>{mainRoutes}</Route>
        <Route element={<AuthLayout />}>{authRoutes}</Route>
    </Routes>
);
