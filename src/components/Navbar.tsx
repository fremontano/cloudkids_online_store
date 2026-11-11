import { useState } from 'react';

const links = [
    { href: '#destacados', label: 'Productos destacados' },
    { href: '#ninos', label: 'Niños' },
    { href: '#ninas', label: 'Niñas' },
    { href: '#blog', label: 'Blog' },
    { href: '#Inicio Sesion', label: 'Inicio Sesion' },
    { href: '#cart', label: 'Mi carrito', isCart: true },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <div className="h-2 w-full bg-[#FFEB3B]" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <a href="#inicio" className="shrink-0" aria-label="CoolKidClods, inicio">
                        <span className="rounded-sm bg-black px-4 py-2 font-serif text-xl font-bold text-white">
                            CoolKidClods
                        </span>
                    </a>

                    <nav className="hidden space-x-8 text-xs font-semibold uppercase tracking-wider text-gray-800 md:flex">
                        {links.map((link) => (
                            <a key={link.href} href={link.href} aria-label={link.isCart ? 'Mi carrito' : undefined} className="inline-flex items-center gap-2 hover:text-amber-500">
                                {link.isCart && (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
                                        <circle cx="10" cy="20" r="1.3" fill="currentColor" />
                                        <circle cx="18" cy="20" r="1.3" fill="currentColor" />
                                    </svg>
                                )}
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center md:hidden">
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

            {isOpen && (
                <nav className="border-b border-gray-200 bg-white md:hidden" aria-label="Menú móvil">
                    <div className="space-y-1 px-2 pb-3 pt-2 text-xs font-semibold uppercase sm:px-3">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                {link.isCart && (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
                                        <circle cx="10" cy="20" r="1.3" fill="currentColor" />
                                        <circle cx="18" cy="20" r="1.3" fill="currentColor" />
                                    </svg>
                                )}
                                {link.label}
                            </a>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
};
