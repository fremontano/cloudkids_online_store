import { useEffect, useState } from 'react';

const slides = [
    {
        image: 'https://images.pexels.com/photos/6261877/pexels-photo-6261877.jpeg',
        alt: 'Niño con un look moderno y divertido',
        title: 'Looks para cada aventura',
        subtitle: 'Nueva colección',
        href: '#destacados',
    },
    {
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=2000&q=85',
        alt: 'Niños compartiendo un momento divertido',
        title: 'Pequeños grandes momentos',
        subtitle: 'Descubre lo nuevo',
        href: '#ninos',
    },
    {
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=2000&q=85',
        alt: 'Niña con un look alegre y colorido',
        title: 'Color para jugar',
        subtitle: 'Estilo todos los días',
        href: '#ninas',
    },
    {
        image: 'https://images.pexels.com/photos/6437487/pexels-photo-6437487.jpeg',
        alt: 'Pequeños disfrutando juntos',
        title: 'Hecho para explorar',
        subtitle: 'Comodidad en movimiento',
        href: '#destacados',
    },
    {
        image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=2000&q=85',
        alt: 'Niños jugando y sonriendo',
        title: 'Un mundo de diversión',
        subtitle: 'Encuentra su favorito',
        href: '#destacados',
    },
];

export const HeroBanner = () => {
    // Estado para controlar la diapositiva activa
    const [activeIndex, setActiveIndex] = useState(0);

    // Efecto para cambiar automaticamente la diapositiva cada 5.5 segundos
    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length);
        }, 5500);

        return () => window.clearInterval(intervalId);
    }, []);

    // Funciones para mostrar la diapositiva anterior y siguiente
    const showPrevious = () => {
        setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
    };

    const showNext = () => {
        setActiveIndex((current) => (current + 1) % slides.length);
    };

    return (
        <section
            className="relative isolate h-[22.5rem] w-full overflow-hidden bg-sky-100 sm:h-[26.25rem] md:h-[30rem]"
            aria-label="Colecciones destacadas"
            aria-roledescription="carrusel"
        >
            {slides.map((slide, index) => (
                <div
                    key={slide.image}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
                        }`}
                    aria-hidden={index !== activeIndex}
                >
                    <img
                        src={slide.image}
                        alt={slide.alt}
                        className={`h-full w-full object-cover object-center transition-transform duration-700 ease-out motion-reduce:transition-none ${index === activeIndex ? 'scale-105' : 'scale-100'
                            }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/15 to-transparent" />

                </div>
            ))}

            <button
                type="button"
                onClick={showPrevious}
                aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-800 shadow-md transition hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 sm:left-6"
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
            </button>
            <button
                type="button"
                onClick={showNext}
                aria-label="Imagen siguiente"
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-800 shadow-md transition hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 sm:right-6"
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2" aria-label="Elegir diapositiva">
                {slides.map((slide, index) => (
                    <button
                        key={slide.image}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Mostrar imagen ${index + 1}`}
                        aria-current={index === activeIndex ? 'true' : undefined}
                        className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-7 bg-white' : 'w-2.5 bg-white/60 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};
