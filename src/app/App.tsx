import { useEffect } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { useAuthStore } from '../features/auth/store/auth.store';

function App() {
    const restoreSession = useAuthStore((state) => state.restoreSession);

    useEffect(() => {
        void restoreSession();
    }, [restoreSession]);

    return <AppRoutes />;
}

export default App;
