import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer';
import { Navbar } from '../components/Navbar';

// Layout principal de la aplicacion, con Navbar y Footer donde se mostrara en todas las otras paginas o componentes.
// Outlet muestra el contenido de la ruta que coincide con la URL actual.
const MainLayout = () => {
    const { pathname } = useLocation();

    // Cada vez que cambia la ruta, comienza arriba para no conservar el scroll anterior.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Navbar />
            {/* El contenido de la ruta actual se renderiza dentro del Outlet. */}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
