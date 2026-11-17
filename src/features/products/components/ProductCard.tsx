import type { Product } from '../interfaces/product.interface';
import { formatPriceCLP } from '../utils/formatPrice';
import { Link } from 'react-router';
import { Rating } from './Rating';
import { Heart, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link
            to={`/producto/${product._id}`}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#EBE7DF] bg-white p-4 shadow-sm transition-all hover:shadow-md text-left"
        >
            {/* Boton Favorito (Corazón) */}
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault(); // Evita que navegue al hacer clic en el corazon
                    //  logica de favoritos
                }}
                aria-label="Agregar a favoritos"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-xs text-gray-400 shadow-sm transition hover:text-rose-500 hover:scale-110"
            >
                <Heart size={18} />
            </button>

            {/* Contenedor de la Imagen */}
            <div className="relative mb-4 flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl p-2 sm:h-72">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Marca y Badge de Stock */}
            <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {product.brand || 'Sin marca'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    En Stock
                </span>
            </div>

            {/* Nombre del Producto */}
            <h3 className="mt-1 line-clamp-1 text-base font-bold text-[#1E1E1E] group-hover:text-[#F36F21] transition-colors">
                {product.name}
            </h3>

            {/* Vendedor / Por [Marca] con check */}
            <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                <span>Por {product.brand || 'Pillin'}</span>
                <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-500/10" />
            </p>

            {/* Rating y Calificaciones */}
            <div className="mt-2 flex items-center gap-2">
                <Rating value={product.rating} />
                <span className="text-xs font-bold text-gray-800">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-400">({product.numReviews} calificaciones)</span>
            </div>

            {/* Selector de Color (con anillo de seleccion) */}
            <div className="mt-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#F36F21] p-0.5 shadow-xs">
                    <span
                        className="h-full w-full rounded-full border border-black/10"
                        style={{ backgroundColor: product.colorHex || product.color || '#94A3B8' }}
                        role="img"
                        aria-label={`Color ${product.color}`}
                    />
                </div>
            </div>

            {/* Precio */}
            <div className="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-3">
                <span className="text-xl font-black tracking-tight text-[#1E1E1E]">
                    {formatPriceCLP(product.price)}
                </span>
            </div>
        </Link>
    );
};