import { useState } from 'react';
import { Link, useParams } from 'react-router';
import {
    FaArrowLeft,
    FaCheckCircle,
    FaHeart,
    FaLeaf,
    FaRuler,
    FaShieldAlt,
    FaTruck,
    FaUndoAlt,
} from 'react-icons/fa';
import { Rating } from '../components/Rating';
import { formatPriceCLP } from '../utils/formatPrice';
import { ShoppingBagIcon } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';

const sizes = ['1–2 años', '2–4 años', '4–6 años', '6–7 años', '8–9 años'];

const colorOptions = [
    { name: 'Celeste Glaciar', value: '#93C5FD' },
    { name: 'Azul Marino', value: '#1E293B' },
    { name: 'Terracota', value: '#C2410C' },
    { name: 'Mostaza', value: '#EAB308' },
    { name: 'Arena', value: '#D4D4D8' },
];

const benefits = [
    { title: 'Compra Protegida', detail: 'Garantía 100% con Webpay Plus', Icon: FaShieldAlt, color: 'text-[#F36F21]' },
    { title: 'Material Certificado', detail: 'Algodón peinado hipoalergénico', Icon: FaLeaf, color: 'text-emerald-600' },
    { title: 'Envío Rápido', detail: 'Despacho en 24-48 hrs. a regiones', Icon: FaTruck, color: 'text-blue-600' },
    { title: 'Cambios Sin Costo', detail: 'Hasta 30 días para cambio de talla', Icon: FaUndoAlt, color: 'text-amber-600' },
];

const sizeGuide = [
    { size: '1–2 años', age: '12–24 meses', height: '80–92 cm', chest: '48–50 cm' },
    { size: '2–4 años', age: '2–4 años', height: '92–104 cm', chest: '51–54 cm' },
    { size: '4–6 años', age: '4–6 años', height: '104–116 cm', chest: '55–58 cm' },
    { size: '6–7 años', age: '6–7 años', height: '116–122 cm', chest: '59–62 cm' },
    { size: '8–9 años', age: '8–9 años', height: '122–128 cm', chest: '63–66 cm' },
];

type DetailTab = 'description' | 'details' | 'reviews';

export const ProductDetailPage = () => {
    const { id } = useParams();
    const { data: product, isLoading, isError, errorMessage } = useProduct(id);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState(sizes[1]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<DetailTab>('description');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    if (isLoading) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-20 text-center">
                <p className="text-sm font-semibold text-gray-500">Cargando producto...</p>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{errorMessage ?? 'No pudimos cargar el producto'}</h1>
                <Link to="/" className="mt-6 inline-block text-sm font-semibold text-[#F36F21] hover:underline">
                    Volver a la tienda
                </Link>
            </section>
        );
    }

    if (!product) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900">No encontramos ese producto</h1>
                <Link to="/" className="mt-6 inline-block text-sm font-semibold text-[#F36F21] hover:underline">
                    Volver a la tienda
                </Link>
            </section>
        );
    }

    const productColorHex = product.colorHex || '#94A3B8';
    const availableColors = [
        { name: product.color, value: productColorHex },
        ...colorOptions.filter(
            (color) => color.value.toLowerCase() !== productColorHex.toLowerCase(),
        ),
    ];
    const currentColor = selectedColor ?? productColorHex;
    const currentColorName =
        availableColors.find((color) => color.value === currentColor)?.name ??
        product.color;

    return (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Contenedor Principal Superior */}
            <div className="overflow-hidden rounded-3xl border border-[#EBE7DF] bg-white shadow-sm">
                <div className="grid lg:grid-cols-2">

                    {/* Imagen del Producto */}
                    <div className="relative m-4 flex min-h-96 items-center justify-center rounded-2xl bg-transparent p-8 sm:m-6 sm:min-h-128">
                        <div className="absolute left-4 top-4 flex flex-col gap-2">
                            <span className="rounded-full bg-[#FFEB3B] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-black shadow-xs">
                                Colección Infantil
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-xs">
                                <FaCheckCircle aria-hidden="true" /> Producto Destacado
                            </span>
                        </div>

                        <img src={product.image} alt={product.name} className="max-h-112 w-full object-contain transition-transform duration-300 hover:scale-105" />

                        <span className="absolute bottom-4 right-4 rounded-full bg-white/80 px-3 py-1 text-[10px] text-gray-400 backdrop-blur-xs">
                            Vista oficial CoolKidClods
                        </span>
                    </div>

                    {/* Información y Compra */}
                    <div className="flex flex-col px-6 pb-8 pt-6 sm:px-10 lg:py-8">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-800">
                                <FaArrowLeft aria-hidden="true" /> Volver a productos
                            </Link>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                SKU: CKD-{product._id.slice(-4).toUpperCase()}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                            <span>CoolKidClods Oficial</span>
                            <span>•</span>
                            <span className="text-[#F36F21]">{product.category}</span>
                        </div>

                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
                            {product.name}
                        </h1>

                        <div className="mt-3 flex items-center gap-2">
                            <Rating value={product.rating} />
                            <span className="text-xs font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                            <span className="text-xs font-medium text-gray-400">· {product.numReviews} calificaciones de usuarios</span>
                            <span className="text-xs text-gray-300">|</span>
                            <span className="text-xs font-semibold text-[#F36F21] cursor-pointer hover:underline" onClick={() => setActiveTab('reviews')}>
                                Opiniones ({product.numReviews})
                            </span>
                        </div>

                        {/* Caja de Precio */}
                        <div className="mt-5 rounded-2xl bg-[#FAF9F6] p-4 border border-gray-100">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black text-[#1A1A1A]">{formatPriceCLP(product.price)}</span>
                                <span className="text-sm font-semibold text-gray-400 line-through">{formatPriceCLP(product.price * 1.3)}</span>
                                <span className="rounded-md bg-rose-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                    30% OFF
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Precio en pesos chilenos (IVA incluido)</p>
                            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs border border-gray-200/60">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Hasta 3 cuotas sin interés de <span className="text-gray-900 font-bold">{formatPriceCLP(Math.round(product.price / 3))}</span>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-gray-600">
                            {product.description}
                        </p>

                        {/* Opciones de Color */}
                        <div className="mt-6">
                            <div className="mb-2.5 flex items-center justify-between gap-3">
                                <p className="text-xs font-bold text-gray-900">
                                    Color: <span className="font-normal text-gray-600">{currentColorName}</span>
                                </p>
                                <span className="text-[11px] font-medium text-gray-400">{availableColors.length} colores disponibles</span>
                            </div>
                            <div className="flex items-center gap-3" role="group" aria-label="Elegir color">
                                {availableColors.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => setSelectedColor(color.value)}
                                        className={`h-8 w-8 rounded-full shadow-sm transition focus:outline-none ${currentColor === color.value ? 'ring-2 ring-[#F36F21] ring-offset-2 scale-110' : 'hover:scale-105'}`}
                                        style={{ backgroundColor: color.value }}
                                        aria-label={`Elegir color ${color.name}`}
                                        aria-pressed={currentColor === color.value}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Selección de Talla */}
                        <div className="mt-6">
                            <div className="mb-2.5 flex items-center justify-between gap-3">
                                <p className="text-xs font-bold text-gray-900">Selecciona una talla infantil:</p>
                                <button
                                    type="button"
                                    onClick={() => setIsSizeGuideOpen(true)}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#F36F21] hover:underline cursor-pointer"
                                    aria-haspopup="dialog"
                                >
                                    <FaRuler aria-hidden="true" /> Guía de tallas
                                </button>
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`rounded-xl px-2.5 py-2.5 text-center text-xs font-bold transition focus:outline-none ${selectedSize === size ? 'bg-[#1A1A1A] text-white shadow-sm' : 'bg-[#FAF9F6] text-gray-700 hover:bg-gray-100 border border-gray-200/60'}`}
                                        aria-pressed={selectedSize === size}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Estado de Stock */}
                        <div className={`mt-5 flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold ${product.countInStock > 0 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' : 'bg-red-50 text-red-700'}`}>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                {product.countInStock > 0 ? `¡Solo quedan ${product.countInStock} unidades en talla ${selectedSize}!` : 'Producto agotado'}
                            </span>

                        </div>

                        {/* Botones de Cantidad y Carrito */}
                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex shrink-0 items-center rounded-xl border border-gray-200 bg-[#FAF9F6] p-1">
                                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="h-10 w-10 rounded-lg bg-white text-sm font-bold text-gray-700 shadow-2xs transition hover:bg-gray-50" aria-label="Reducir cantidad">−</button>
                                <span className="min-w-9 text-center text-sm font-bold text-gray-900">{quantity}</span>
                                <button type="button" onClick={() => setQuantity((current) => Math.min(product.countInStock || 5, current + 1))} className="h-10 w-10 rounded-lg bg-white text-sm font-bold text-gray-700 shadow-2xs transition hover:bg-gray-50" aria-label="Aumentar cantidad">+</button>
                            </div>

                            <button type="button" disabled={product.countInStock === 0} className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#343D47] px-6 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 shadow-md">
                                <ShoppingBagIcon size={18} /> Agregar al Carro
                            </button>

                            <button type="button" onClick={() => setIsFavorite((current) => !current)} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition ${isFavorite ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-rose-500'}`} aria-label="Marcar como favorito" aria-pressed={isFavorite}>
                                <FaHeart size={18} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Beneficios Inferiores en la Card */}
                <div className="grid grid-cols-2 gap-3 bg-[#FAF9F6] p-5 sm:grid-cols-4 sm:p-6 border-t border-gray-100">
                    {benefits.map(({ title, detail, Icon, color }) => (
                        <div key={title} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-2xs border border-gray-100">
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon size={18} aria-hidden="true" /></span>
                            <div>
                                <strong className="block text-xs font-bold text-gray-900">{title}</strong>
                                <small className="mt-0.5 block text-[11px] leading-tight text-gray-500">{detail}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pestañas de Detalle / Especificaciones / Opiniones */}
            <section className="mt-10 overflow-hidden rounded-3xl border border-[#EBE7DF] bg-white shadow-sm">
                <div className="flex flex-wrap gap-8 px-6 sm:px-10 border-b border-gray-100">
                    {[
                        { id: 'description', label: 'Descripción y Composición' },
                        { id: 'details', label: 'Cuidados de la Prenda' },
                        { id: 'reviews', label: `Opiniones de Clientes (${product.numReviews})` },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id as DetailTab)}
                            className={`border-b-2 py-4 text-xs font-bold uppercase tracking-wider transition ${activeTab === tab.id ? 'border-[#F36F21] text-[#F36F21]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid gap-8 p-6 text-sm leading-relaxed text-gray-600 sm:p-10 md:grid-cols-2">
                    <div>
                        {activeTab === 'description' && (
                            <>
                                <h2 className="mb-3 text-lg font-bold text-[#1A1A1A]">Detalles de {product.name}</h2>
                                <p>{product.description}</p>
                                <ul className="mt-4 space-y-2 text-gray-700">
                                    {product.details.length > 0 ? (
                                        product.details.map((detail) => (
                                            <li key={detail} className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F36F21]" /> {detail}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500">Este producto no tiene detalles adicionales registrados.</li>
                                    )}
                                </ul>
                            </>
                        )}

                        {activeTab === 'details' && (
                            <>
                                <h2 className="mb-3 text-lg font-bold text-[#1A1A1A]">Instrucciones de Cuidado</h2>
                                <p className="mb-3">Sigue estas recomendaciones para mantener la prenda como nueva por más tiempo:</p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#F36F21]" /> Lavar a máquina con agua fría (máx. 30°C).</li>
                                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#F36F21]" /> Lavar y planchar la prenda al revés para proteger el estampado.</li>
                                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#F36F21]" /> No usar blanqueadores ni cloro.</li>
                                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#F36F21]" /> Secar a la sombra colgado; evitar secadora a alta temperatura.</li>
                                </ul>
                            </>
                        )}

                        {activeTab === 'reviews' && (
                            <>
                                <div className="mb-6 flex items-center gap-4">
                                    <p className="text-4xl font-black text-[#1A1A1A]">{product.rating.toFixed(1)}</p>
                                    <div>
                                        <Rating value={product.rating} />
                                        <p className="mt-1 text-xs text-gray-500">Basado en {product.numReviews} opiniones verificadas</p>
                                    </div>
                                </div>
                                {product.reviews.length > 0 ? (
                                    <ul className="space-y-4">
                                        {product.reviews.map((review) => (
                                            <li key={review._id ?? `${review.name}-${review.rating}`} className="rounded-2xl border border-gray-100 bg-[#FAF9F6] p-4">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="font-bold text-[#1A1A1A]">{review.name}</span>
                                                    <Rating value={review.rating} />
                                                </div>
                                                <p className="mt-2 text-xs text-gray-600">{review.comment}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">Este producto aún no tiene opiniones.</p>
                                )}
                            </>
                        )}
                    </div>

                    {/* Ficha Técnica */}
                    <div className="rounded-2xl bg-[#FAF9F6] p-6 border border-gray-100 h-fit">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-[#1A1A1A]">Ficha Técnica</h2>
                            <span className="text-[10px] font-bold bg-[#FFEB3B] text-black px-2.5 py-1 rounded-full uppercase tracking-wider">Verificada</span>
                        </div>
                        <dl className="divide-y divide-gray-200/60 text-xs">
                            <div className="flex justify-between gap-4 py-3"><dt className="text-gray-500">Categoría</dt><dd className="font-semibold text-gray-900">{product.category}</dd></div>
                            <div className="flex justify-between gap-4 py-3"><dt className="text-gray-500">Marca</dt><dd className="font-semibold text-gray-900">{product.brand}</dd></div>
                            <div className="flex justify-between gap-4 py-3"><dt className="text-gray-500">Género / Público</dt><dd className="font-semibold text-gray-900">Unisex Infantil</dd></div>
                            <div className="flex justify-between gap-4 py-3"><dt className="text-gray-500">Temporada</dt><dd className="font-semibold text-gray-900">Otoño / Invierno 2026</dd></div>
                            <div className="flex justify-between gap-4 py-3"><dt className="text-gray-500">Origen</dt><dd className="font-semibold text-gray-900">Diseñado y curado en Chile</dd></div>
                            <div className="flex justify-between gap-4 py-3"><dt className="text-gray-500">Color</dt><dd className="font-semibold text-gray-900">{product.color}</dd></div>
                            <div className="flex justify-between gap-4 py-3"><dt className="text-gray-500">SKU Principal</dt><dd className="font-semibold text-gray-900">CKD-{product._id.slice(-4).toUpperCase()}</dd></div>
                            <div className="flex justify-between gap-4 py-3"><dt className="text-gray-500">Disponibilidad</dt><dd className="font-semibold text-emerald-600">En Stock</dd></div>
                        </dl>
                    </div>
                </div>
            </section>

            {/* Modal de Guía de Tallas */}
            {isSizeGuideOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
                    role="presentation"
                    onClick={() => setIsSizeGuideOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="size-guide-title"
                        onClick={(event) => event.stopPropagation()}
                        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <h2 id="size-guide-title" className="text-base font-bold text-[#1A1A1A]">Guía de Tallas Infantiles</h2>
                            <button
                                type="button"
                                onClick={() => setIsSizeGuideOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700 transition hover:bg-gray-200 cursor-pointer"
                                aria-label="Cerrar guía de tallas"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Medidas corporales referenciales para asegurar el ajuste perfecto.</p>
                        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-[#FAF9F6] text-gray-700">
                                    <tr>
                                        <th className="px-4 py-3 font-bold">Talla</th>
                                        <th className="px-4 py-3 font-bold">Edad Aprox.</th>
                                        <th className="px-4 py-3 font-bold">Estatura</th>
                                        <th className="px-4 py-3 font-bold">Pecho</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-600">
                                    {sizeGuide.map((row) => (
                                        <tr key={row.size} className={selectedSize === row.size ? 'bg-orange-50/70 font-semibold text-[#1A1A1A]' : 'hover:bg-gray-50/50'}>
                                            <td className="px-4 py-3 font-bold">{row.size}</td>
                                            <td className="px-4 py-3">{row.age}</td>
                                            <td className="px-4 py-3">{row.height}</td>
                                            <td className="px-4 py-3">{row.chest}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsSizeGuideOpen(false)}
                            className="mt-6 w-full rounded-2xl bg-[#343D47] px-4 py-3 text-xs font-bold text-white transition hover:bg-gray-800 shadow-md cursor-pointer"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetailPage;