interface CategoryItem {
    title: string;
    subtitle: string;
    bgColor: string;
    image: string;
    imageAlt: string;
}

const categories: CategoryItem[] = [
    {
        title: 'Dulces',
        subtitle: 'Looks encantadores para cada día.',
        bgColor: 'bg-[#F06292]',
        image: 'https://ninoxnino.org/sitio/wp-content/uploads/2023/01/IMG_BANNER_HOME_NINOXNINO.png',
        imageAlt: 'Niño con ropa de la colección Dulces',
    },
    {
        title: 'Creativos',
        subtitle: 'Color y comodidad para imaginar.',
        bgColor: 'bg-[#2979FF]',
        image: 'https://www.icbf.gov.co/sites/default/files/welcome-nnahome.png?fid=149572',
        imageAlt: 'Niños disfrutando de la colección Creativos',
    },
    {
        title: 'Atrevidos',
        subtitle: 'Estilos únicos para grandes aventuras.',
        bgColor: 'bg-[#C0CA33]',
        image: 'https://www.smartick.es/images/home3/benefit-bullets/ninos.png',
        imageAlt: 'Hermanos con ropa de la colección Atrevidos',
    },
];

export const CategorySection = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {categories.map((cat, idx) => (
                    <article
                        key={cat.title}
                        className={`relative isolate min-h-[250px] overflow-hidden rounded-xl ${cat.bgColor} text-white shadow-sm transition-shadow duration-300 hover:shadow-lg`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
                        <div className="relative z-10 w-1/2 px-6 pb-8 pt-7 sm:px-7">
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                                Explora la colección
                            </p>
                            <h3 className="font-serif text-2xl font-bold tracking-wide sm:text-3xl">
                                {cat.title}
                            </h3>
                            <p className="mt-3 max-w-[190px] text-sm leading-relaxed text-white/95">
                                {cat.subtitle}
                            </p>
                        </div>
                        <div className={`pointer-events-none absolute bottom-0 right-0 ${idx === 1 ? 'h-full w-[72%]' : 'h-[94%] w-[66%]'} sm:w-[70%}`}>
                            <img
                                src={cat.image}
                                alt={cat.imageAlt}
                                className="h-full w-full object-contain object-bottom drop-shadow-md"
                            />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
