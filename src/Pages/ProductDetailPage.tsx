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
import products, { formatPriceCLP } from '../data/products';

const colorOptions = [
    { name: 'Arena', value: '#B68A65' },
    { name: 'Rosa', value: '#D97B4D' },
    { name: 'Azul marino', value: '#22283A' },
    { name: 'Mostaza', value: '#C99A24' },
    { name: 'Celeste', value: '#6EA9C7' },
];

const sizes = ['1–2 años', '2–4 años', '4–6 años'];
const benefits = [
    { title: 'Compra protegida', detail: 'Paga de forma segura', Icon: FaShieldAlt, color: 'text-sky-600 bg-sky-50' },
    { title: 'Material cómodo', detail: 'Suave para cada día', Icon: FaLeaf, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Envío disponible', detail: 'Opciones al comprar', Icon: FaTruck, color: 'text-blue-600 bg-blue-50' },
    { title: 'Cambios fáciles', detail: 'Consulta las condiciones', Icon: FaUndoAlt, color: 'text-amber-600 bg-amber-50' },
];
const sizeGuide = [
    { size: '1–2 años', age: '12–24 meses', height: '80–92 cm', chest: '48–50 cm' },
    { size: '2–4 años', age: '2–4 años', height: '92–104 cm', chest: '51–54 cm' },
    { size: '4–6 años', age: '4–6 años', height: '104–116 cm', chest: '55–58 cm' },
];
const productReviews = [
    { name: 'Camila R.', rating: 5, comment: 'La tela es suave y abriga justo lo necesario. A mi hija le encantó el diseño.' },
    { name: 'Diego M.', rating: 4, comment: 'Muy buen producto, llegó en el plazo indicado. La talla corresponde a lo esperado.' },
    { name: 'Valentina P.', rating: 5, comment: 'Se ve igual que en las fotos y resistió varios lavados sin perder color.' },
];

type DetailTab = 'description' | 'details' | 'reviews';

export const ProductDetailPage = () => {
    const { id } = useParams();
    const product = products.find((item) => item._id === id);
    const [colorSelection, setColorSelection] = useState<{ productId: string; color: string } | null>(null);
    const [selectedSize, setSelectedSize] = useState(sizes[1]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<DetailTab>('description');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    if (!product) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900">No encontramos ese producto</h1>
                <Link to="/" className="mt-6 inline-block text-sm font-semibold text-blue-700 hover:underline">
                    Volver a la tienda
                </Link>
            </section>
        );
    }

    const selectedColor = colorSelection?.productId === product._id ? colorSelection.color : product.color;
    const availableColors = [
        { name: 'Color actual', value: product.color },
        ...colorOptions.filter((color) => color.value !== product.color),
    ].slice(0, 5);

    return (


        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_16px_50px_rgba(15,23,42,0.08)]">

                <div className="grid lg:grid-cols-2">
                    <div className="relative m-3 flex min-h-[22.5rem] items-center justify-center rounded-2xl bg-white p-6 sm:m-5 sm:min-h-[31.25rem]">
                        <div className="absolute left-4 top-4 flex flex-col gap-2">
                            <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                Colección infantil
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium text-emerald-700 shadow-sm">
                                <FaCheckCircle aria-hidden="true" /> Producto destacado
                            </span>
                        </div>
                        <img src={product.image} alt={product.name} className=" max-h-[27.5rem] w-full object-contain" />
                        <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] text-gray-500 shadow-sm">
                            Imagen referencial
                        </span>
                    </div>

                    <div className="flex flex-col px-5 pb-8 pt-4 sm:px-8 lg:px-10 lg:py-8">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700">
                                <FaArrowLeft aria-hidden="true" /> Volver a productos
                            </Link>
                            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                                SKU: CKD-{product._id.padStart(4, '0')}
                            </span>
                        </div>

                        <p className="w-fit rounded-full bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700">
                            {product.brand} · {product.category}
                        </p>
                        <h1 className="mt-3 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                            {product.name}
                        </h1>

                        <div className="mt-2 flex items-center gap-2">
                            <Rating value={product.rating} />
                            <span className="text-xs font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
                            <span className="text-xs text-sky-700">· {product.numReviews} opiniones</span>
                        </div>

                        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
                            <p className="text-2xl font-extrabold text-slate-900">{formatPriceCLP(product.price)}</p>
                            <p className="mt-1 text-[11px] text-gray-500">Precio en pesos chilenos (CLP)</p>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-gray-600">{product.description}</p>

                        <div className="mt-5">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <p className="text-xs font-semibold text-slate-800">
                                    Color: <span className="font-normal text-gray-600">{availableColors.find((color) => color.value === selectedColor)?.name}</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsSizeGuideOpen(true)}
                                    className="inline-flex items-center gap-1 text-[10px] font-medium text-sky-700 hover:underline"
                                    aria-haspopup="dialog"
                                >
                                    <FaRuler aria-hidden="true" /> Guía de tallas
                                </button>
                            </div>
                            <div className="flex items-center gap-3" role="group" aria-label="Elegir color">
                                {availableColors.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => setColorSelection({ productId: product._id, color: color.value })}
                                        className={`h-7 w-7 rounded-full shadow-sm transition focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 ${selectedColor === color.value ? 'ring-2 ring-slate-800 ring-offset-2' : 'hover:scale-110'}`}
                                        style={{ backgroundColor: color.value }}
                                        aria-label={`Elegir color ${color.name}`}
                                        aria-pressed={selectedColor === color.value}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="mb-2 text-xs font-semibold text-slate-800">Selecciona una talla infantil</p>
                            <div className="grid grid-cols-3 gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`rounded-lg px-2 py-2.5 text-center text-[11px] transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 ${selectedSize === size ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-gray-700 hover:bg-slate-100'}`}
                                        aria-pressed={selectedSize === size}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={`mt-4 flex items-center justify-between rounded-lg px-3 py-2 text-[11px] ${product.countInStock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            <span className="inline-flex items-center gap-2">
                                <FaCheckCircle aria-hidden="true" />
                                {product.countInStock > 0 ? `${product.countInStock} unidades disponibles` : 'Producto agotado'}
                            </span>
                            <span>{product.countInStock > 0 ? 'Disponible' : 'Sin stock'}</span>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex shrink-0 items-center gap-2">
                                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="h-10 w-10 rounded-md bg-slate-100 text-sm text-slate-700 transition hover:bg-slate-200" aria-label="Reducir cantidad">−</button>
                                <span className="min-w-7 text-center text-sm font-medium text-slate-800">{quantity}</span>
                                <button type="button" onClick={() => setQuantity((current) => Math.min(product.countInStock || 1, current + 1))} className="h-10 w-10 rounded-md bg-slate-100 text-sm text-slate-700 transition hover:bg-slate-200" aria-label="Aumentar cantidad">+</button>
                            </div>
                            <button type="button" disabled={product.countInStock === 0} className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-full bg-[#343D47] px-4 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-base">
                                Agregar al Carro
                            </button>
                            <button type="button" onClick={() => setIsFavorite((current) => !current)} className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${isFavorite ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-rose-500'}`} aria-label="Marcar como favorito" aria-pressed={isFavorite}>
                                <FaHeart aria-hidden="true" />
                            </button>
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 sm:grid-cols-4 sm:p-6">
                    {benefits.map(({ title, detail, Icon, color }) => (
                        <div key={title} className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm">
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}><Icon aria-hidden="true" /></span>
                            <span><strong className="block text-[10px] text-slate-800">{title}</strong><small className="mt-1 block text-[9px] leading-tight text-gray-500">{detail}</small></span>
                        </div>
                    ))}
                </div>
            </div>

            <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                <div className="flex flex-wrap gap-5 px-5 sm:px-8">
                    {[
                        { id: 'description', label: 'Descripción y composición' },
                        { id: 'details', label: 'Cuidados y detalles' },
                        { id: 'reviews', label: `Opiniones de clientes (${product.numReviews})` },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id as DetailTab)}
                            className={`border-b-2 py-4 text-[11px] font-semibold transition ${activeTab === tab.id ? 'border-sky-600 text-sky-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid gap-6 p-5 text-xs leading-relaxed text-gray-600 sm:p-8 md:grid-cols-2">
                    <div>
                        {activeTab === 'description' && (
                            <>
                                <h2 className="mb-2 font-bold text-slate-900">Detalles de {product.name}</h2>
                                <p>{product.description}</p>
                                <ul className="mt-3 list-inside list-disc space-y-1 text-sky-800">
                                    {product.details.map((detail) => <li key={detail}>{detail}</li>)}
                                </ul>
                            </>
                        )}

                        {activeTab === 'details' && (
                            <>
                                <h2 className="mb-2 font-bold text-slate-900">Características de {product.name}</h2>
                                <p>Información específica de este producto.</p>
                                <ul className="mt-3 list-inside list-disc space-y-1 text-sky-800">
                                    {product.details.map((detail) => (
                                        <li key={detail}>{detail}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {activeTab === 'reviews' && (
                            <>
                                <div className="mb-4 flex items-center gap-3">
                                    <p className="text-3xl font-extrabold text-slate-900">{product.rating.toFixed(1)}</p>
                                    <div>
                                        <Rating value={product.rating} />
                                        <p className="text-[11px] text-gray-500">Basado en {product.numReviews} opiniones</p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {productReviews.map((review) => (
                                        <li key={review.name} className="rounded-xl border border-gray-100 bg-slate-50 p-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-semibold text-slate-900">{review.name}</span>
                                                <Rating value={review.rating} />
                                            </div>
                                            <p className="mt-1">{review.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4">
                        <h2 className="mb-3 font-bold text-slate-900">Ficha técnica</h2>
                        <dl className="divide-y divide-gray-100">
                            <div className="flex justify-between gap-4 py-2"><dt>Categoría</dt><dd className="text-right font-medium text-slate-800">{product.category}</dd></div>
                            <div className="flex justify-between gap-4 py-2"><dt>Marca</dt><dd className="text-right font-medium text-slate-800">{product.brand}</dd></div>
                            <div className="flex justify-between gap-4 py-2"><dt>Color seleccionado</dt><dd className="text-right font-medium text-slate-800">{availableColors.find((color) => color.value === selectedColor)?.name}</dd></div>
                            <div className="flex justify-between gap-4 py-2"><dt>Talla seleccionada</dt><dd className="text-right font-medium text-slate-800">{selectedSize}</dd></div>
                            <div className="flex justify-between gap-4 py-2"><dt>SKU</dt><dd className="text-right font-medium text-slate-800">CKD-{product._id.padStart(4, '0')}</dd></div>
                            <div className="flex justify-between gap-4 py-2"><dt>Disponibilidad</dt><dd className="text-right font-medium text-slate-800">{product.countInStock > 0 ? 'En stock' : 'Agotado'}</dd></div>
                        </dl>
                    </div>
                </div>
            </section>

            {isSizeGuideOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
                    role="presentation"
                    onClick={() => setIsSizeGuideOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="size-guide-title"
                        onClick={(event) => event.stopPropagation()}
                        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <h2 id="size-guide-title" className="text-sm font-bold text-slate-900">Guía de tallas</h2>
                            <button
                                type="button"
                                onClick={() => setIsSizeGuideOpen(false)}
                                className="rounded-full bg-slate-100 px-2 py-1 text-xs text-gray-600 transition hover:bg-slate-200"
                                aria-label="Cerrar guía de tallas"
                            >
                                ×
                            </button>
                        </div>
                        <p className="mt-1 text-[11px] text-gray-500">Medidas referenciales del cuerpo del niño.</p>
                        <div className="mt-3 overflow-hidden rounded-xl border border-gray-100">
                            <table className="w-full text-left text-[11px]">
                                <thead className="bg-slate-50 text-slate-700">
                                    <tr>
                                        <th className="px-3 py-2 font-semibold">Talla</th>
                                        <th className="px-3 py-2 font-semibold">Edad</th>
                                        <th className="px-3 py-2 font-semibold">Estatura</th>
                                        <th className="px-3 py-2 font-semibold">Pecho</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-600">
                                    {sizeGuide.map((row) => (
                                        <tr key={row.size} className={selectedSize === row.size ? 'bg-sky-50 text-slate-900' : ''}>
                                            <td className="px-3 py-2 font-medium">{row.size}</td>
                                            <td className="px-3 py-2">{row.age}</td>
                                            <td className="px-3 py-2">{row.height}</td>
                                            <td className="px-3 py-2">{row.chest}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsSizeGuideOpen(false)}
                            className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700"
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
