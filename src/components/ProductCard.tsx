import type { Product } from '../data/products';
import { formatPriceCLP } from '../data/products';
import { Link } from 'react-router';
import { Rating } from './Rating';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link to={`/producto/${product._id}`} className="group flex cursor-pointer flex-col items-center text-center">
            <div className="mb-3 flex h-64 w-full items-center justify-center overflow-hidden bg-white p-1 sm:h-72">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <p className="max-w-full truncate text-sm font-semibold text-gray-900">
                {product.name}
            </p>

            <Rating value={product.rating} text={`(${product.numReviews}) Vistas`} />

            <p className="text-sm font-medium text-gray-900">
                {formatPriceCLP(product.price)}
            </p>

            <span
                className="mt-2 h-3.5 w-3.5 rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: product.color }}
                role="img"
                aria-label={`Color ${product.color}`}
                title={`Color ${product.color}`}
            />
        </Link>
    );
};
