import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuthStore } from '../features/auth/store/auth.store';

const links = [
    { href: '#ninos', label: 'Niños' },
    { href: '#ninas', label: 'Niñas' },
    { href: '#coleccion', label: 'Colección 2025' },
    { href: '#blog', label: 'Blog' },
];

const adminLinks = [
    { to: '/admin/productos', label: 'Listado de productos' },
    { to: '/admin/productos/crear', label: 'Crear producto' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isMobileAdminOpen, setIsMobileAdminOpen] = useState(false);

    const adminMenuRef = useRef<HTMLDivElement>(null);

    const user = useAuthStore((state) => state.user);
    const authStatus = useAuthStore((state) => state.status);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const isAuthenticated = Boolean(user) && authStatus === 'authenticated';
    const isSessionPending = authStatus === 'checking' || (authStatus === 'authenticated' && !user);

    // Cerrar el submenú de administrador al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
                setIsAdminOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
        setIsAdminOpen(false);
        toast.success('Cerraste sesión correctamente.');
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            {/* Franja superior amarilla decorativa */}
            <div className="h-2 w-full bg-[#FFEB3B]" />

            <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-10">
                <div className="flex h-20 items-center justify-between gap-6">

                    {/* BLOQUE IZQUIERDO Logo y Enlaces principales */}
                    <div className="flex items-center gap-10">
                        <a href="#inicio" className="shrink-0 flex items-center gap-3 group" aria-label="CoolKidClods, inicio">

                            <div className="flex flex-col">
                                <span className="font-serif text-xl font-extrabold tracking-tight text-gray-900">
                                    CoolKid<span className="text-[#F36F21]">Clods</span>
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    Kids & Teens Store
                                </span>
                            </div>
                        </a>

                        <nav className="hidden items-center space-x-7 text-xs font-semibold uppercase tracking-wider text-gray-700 lg:flex">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="transition-colors hover:text-[#F36F21]"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* BLOQUE DERECHO Carrito, Perfil, Sesion y Administrador */}
                    <div className="hidden items-center gap-5 md:flex">

                        {/* Carrito con badge de cantidad */}
                        <Link
                            to="/carrito"
                            aria-label="Mi carrito"
                            className="relative p-2 text-gray-700 transition hover:text-[#F36F21]"
                        >
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
                                <circle cx="10" cy="20" r="1.3" fill="currentColor" />
                                <circle cx="18" cy="20" r="1.3" fill="currentColor" />
                            </svg>
                            {/* Contador del carrito */}
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F36F21] text-[10px] font-bold text-white shadow-sm">
                                0
                            </span>
                        </Link>

                        <div className="h-6 w-px bg-gray-200" />

                        {/* Estado del Usuario / Login */}
                        {isAuthenticated && user ? (
                            <div className="inline-flex items-center gap-3">
                                <img
                                    src={user.image}
                                    alt={`Perfil de ${user.name}`}
                                    className="h-11 w-11 rounded-full border-2 border-yellow-300 object-cover shadow-sm"
                                />
                                <div className="flex min-w-0 flex-col gap-0.5 normal-case">
                                    <span className="max-w-32 truncate text-xs font-bold text-gray-900">{user.name}</span>
                                    <span className="max-w-32 truncate text-[11px] font-medium text-amber-600">
                                        {user.isAdmin ? 'Administrador' : 'Cliente'}
                                    </span>
                                </div>
                                <Link
                                    to="/perfil"
                                    className="rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-800 transition hover:border-[#F36F21] hover:text-[#F36F21]"
                                >
                                    Ver perfil
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="cursor-pointer rounded-xl bg-black px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-gray-800"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        ) : isSessionPending ? null : (
                            <Link to="/login" className="text-xs font-semibold uppercase tracking-wider text-gray-800 transition-colors hover:text-[#F36F21]">
                                Iniciar sesión
                            </Link>
                        )}

                        {/* Boton Administrador con Submenu */}
                        {user?.isAdmin && (
                            <div className="relative border-l border-gray-200 pl-4" ref={adminMenuRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsAdminOpen((prev) => !prev)}
                                    aria-expanded={isAdminOpen}
                                    aria-haspopup="true"
                                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm bg-[#FFEB3B] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-sm transition hover:bg-amber-400"
                                >
                                    Administrador
                                    <svg
                                        className={`h-4 w-4 transition-transform duration-200 ${isAdminOpen ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {isAdminOpen && (
                                    <div
                                        role="menu"
                                        className="absolute right-0 mt-2 w-48 rounded-md border border-gray-100 bg-white py-1.5 shadow-lg ring-1 ring-black/5"
                                    >
                                        {adminLinks.map((item) => (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                role="menuitem"
                                                onClick={() => setIsAdminOpen(false)}
                                                className="block px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-700 transition hover:bg-amber-50 hover:text-amber-600"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Botón Hamburguesa Movil */}
                    <div className="flex items-center gap-3 md:hidden">
                        <Link
                            to="/carrito"
                            aria-label="Mi carrito"
                            className="relative p-2 text-gray-700"
                        >
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
                                <circle cx="10" cy="20" r="1.3" fill="currentColor" />
                                <circle cx="18" cy="20" r="1.3" fill="currentColor" />
                            </svg>
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F36F21] text-[9px] font-bold text-white">
                                0
                            </span>
                        </Link>

                        <button
                            type="button"
                            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen((open) => !open)}
                            className="rounded-sm bg-black p-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navegacion Movil */}
            {isOpen && (
                <nav className="border-b border-gray-200 bg-white md:hidden" aria-label="Menú móvil">
                    <div className="space-y-1 px-4 pb-4 pt-3 text-xs font-semibold uppercase">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-100"
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* Perfil + Cerrar sesion en Movil */}
                        {isAuthenticated && user ? (
                            <>
                                <div className="mt-2 flex items-center gap-3 border-t border-gray-100 px-3 py-3 text-gray-700">
                                    <img
                                        src={user.image}
                                        alt={`Perfil de ${user.name}`}
                                        className="h-10 w-10 rounded-full border-2 border-yellow-300 object-cover shadow-sm"
                                    />
                                    <div className="flex min-w-0 flex-1 flex-col gap-0.5 normal-case">
                                        <span className="truncate text-xs font-bold text-gray-900">{user.name}</span>
                                        <span className="truncate text-[11px] font-normal text-gray-500">{user.email}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="rounded-xl bg-black px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800"
                                    >
                                        Salir
                                    </button>
                                </div>
                                <Link
                                    to="/perfil"
                                    onClick={() => setIsOpen(false)}
                                    className="flex rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-100"
                                >
                                    Ver perfil
                                </Link>
                            </>
                        ) : isSessionPending ? null : (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-100"
                            >
                                Iniciar sesión
                            </Link>
                        )}

                        {/* Submenú Administrador en Movil */}
                        {user?.isAdmin && (
                            <div className="my-2 border-t border-gray-100 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsMobileAdminOpen((prev) => !prev)}
                                    aria-expanded={isMobileAdminOpen}
                                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-bold uppercase text-black hover:bg-amber-50"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-[#FFEB3B] ring-1 ring-black/20" />
                                        Administrador
                                    </span>
                                    <svg
                                        className={`h-4 w-4 transition-transform duration-200 ${isMobileAdminOpen ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {isMobileAdminOpen && (
                                    <div className="mt-1 space-y-1 rounded-md bg-gray-50/70 py-1.5 pl-6 pr-3">
                                        {adminLinks.map((item) => (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setIsMobileAdminOpen(false);
                                                }}
                                                className="block rounded-sm px-3 py-2 text-gray-700 hover:bg-amber-100/60 hover:text-black"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
};