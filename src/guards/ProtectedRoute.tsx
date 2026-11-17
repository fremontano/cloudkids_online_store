import { Navigate, Outlet, useLocation } from 'react-router';
import { FullPageSpinner } from '../components/FullPageSpinner';
import { useAuthStore } from '../features/auth/store/auth.store';

export const ProtectedRoute = () => {
    const status = useAuthStore((state) => state.status);
    const user = useAuthStore((state) => state.user);
    const location = useLocation();

    if (status === 'checking') {
        return <FullPageSpinner label="Verificando sesión...." />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};
