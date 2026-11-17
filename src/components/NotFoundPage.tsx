import { Link, useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, User, ShoppingBag, SearchX, Star, Watch, Tag, FileText } from 'lucide-react';

export const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <section className="relative mx-auto flex min-h-[120vh] max-w-4xl flex-col items-center justify-center overflow-hidden px-24 py-16 text-center sm:px-6 lg:px-8">

            {/* Bloque central 404 */}
            <div className="relative my-6 select-none">
                <div className="absolute inset-0 -z-10 mx-auto h-48 w-48 rounded-full bg-[#FFEB3B]/40 blur-3xl" />

                {/* Elementos flotantes decorativos */}
                <div className="absolute -left-24 -top-3 hidden h-12 w-12 rotate-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg sm:flex">
                    <FileText size={22} className="animate-float" />
                </div>
                <div className="absolute -right-24 -top-3 hidden h-12 w-12 rotate-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg sm:flex">
                    <Tag size={22} className="animate-float-delayed" />
                </div>
                <div className="absolute -left-14 -bottom-2 hidden h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-white shadow-md sm:flex">
                    <Watch size={20} className="animate-float" />
                </div>
                <div className="absolute -right-14 -bottom-2 hidden h-10 w-10 items-center justify-center rounded-full bg-[#FFEB3B] text-amber-900 shadow-md sm:flex">
                    <Star size={20} fill="currentColor" className="animate-float-delayed" />
                </div>
                <h1 className="text-[120px] font-black leading-none tracking-tighter text-[#1A1A1A] sm:text-[160px]">
                    4<span className="text-[#F36F21]">0</span>4
                </h1>
                <span className="absolute right-4 top-2 sm:right-12 sm:top-4 inline-flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl bg-[#F36F21] text-white shadow-lg">
                    <ShoppingBag size={24} className="animate-basket" />
                </span>
            </div>

            {/* Badge "Página no encontrada" */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFEB3B] px-5 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-sm">
                <SearchX size={15} className="animate-search" />
                <span>Página no encontrada</span>
            </div>

            {/* Titulo Principal */}
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl max-w-2xl">
                ¡Ups! Esta página se perdió entre los juguetes
            </h2>

            {/* Descripción */}
            <p className="mt-4 max-w-lg text-sm text-gray-500 sm:text-base leading-relaxed">
                Parece que el producto o la página que buscas cambió de lugar o ya no está disponible en nuestra tienda infantil. ¡No te preocupes, te ayudamos a volver al juego!
            </p>

            {/* Botones de accion principales */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                    to="/#ninos"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#F36F21] bg-white px-7 py-3 text-sm font-bold text-[#F36F21] shadow-sm transition-all hover:bg-[#F36F21] hover:text-white"
                >
                    <ArrowRight size={16} />
                    <span>Ir a la tienda  Ver productos</span>
                </Link>

                <Link
                    to="/perfil"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-bold text-gray-800 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300"
                >
                    <User size={16} className="text-gray-500" />
                    <span>Ir a mi perfil</span>
                </Link>

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition hover:text-gray-900 py-2 px-3 cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    <span>Regresar</span>
                </button>
            </div>

            {/* Texto inferior de categorias */}
            <div className="mt-14 border-t border-gray-100 pt-6 w-full">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    O explora nuestras categorías favoritas
                </p>
            </div>
        </section>
    );
};