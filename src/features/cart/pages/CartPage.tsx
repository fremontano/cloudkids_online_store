import { Link } from 'react-router';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export const CartPage = () => (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1E1E1E]">Mi carrito</h1>

        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4EC] text-[#F36F21]">
                <ShoppingBag size={30} />
            </div>
            <h2 className="mt-5 text-lg font-bold text-[#1E1E1E]">Tu carrito está vacío</h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
                Explora nuestros productos y agrega tus favoritos para comenzar tu compra.
            </p>
            <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F36F21] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#df5e12]"
            >
                Ver productos
                <ArrowRight size={16} />
            </Link>
        </div>
    </section>
);
