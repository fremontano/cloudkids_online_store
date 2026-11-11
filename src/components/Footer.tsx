export const Footer = () => {
    return (
        <footer className="w-full">
            <div className="grid grid-cols-1 items-stretch bg-[#2D3154] text-center text-white lg:grid-cols-2">
                <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:px-12 xl:px-20">
                    <div className="mb-6 flex flex-col items-center gap-2">
                        <span className="inline-block -rotate-1 rounded-sm bg-[#D4E157] px-4 py-1 text-2xl font-extrabold text-[#2D3154] shadow-sm md:text-3xl">
                            Llena tus prendas
                        </span>
                        <span className="inline-block rotate-1 rounded-sm bg-[#E0F2FE] px-6 py-1 text-2xl font-extrabold text-[#1E293B] shadow-sm md:text-3xl">
                            con muchos colores
                        </span>
                    </div>

                    <p className="mx-auto mb-8 max-w-sm text-xs font-light leading-relaxed text-gray-200 md:text-sm">
                        Encuentra la mejor selección de{' '}
                        <strong className="font-semibold text-white">tendencias</strong>, colecciones y{' '}
                        <strong className="font-semibold text-white">productos</strong> que tenemos para ti.
                    </p>

                    <button
                        onClick={() => console.log('Probar clickeado')}
                        className="group flex w-full max-w-xs items-center justify-between rounded-md bg-[#FF5252] px-6 py-3 text-white shadow-md transition duration-200 hover:bg-[#FF3838]"
                    >
                        <span className="w-full text-center text-sm font-semibold tracking-wide">Probar</span>
                        <span className="text-lg font-bold transition-transform group-hover:translate-x-1">&gt;</span>
                    </button>
                </div>

                <div className="relative hidden min-h-[360px] w-full overflow-hidden bg-[#FCE4EC] lg:block">
                    <img
                        src="https://media.istockphoto.com/id/2096480418/es/foto/grupo-de-ni%C3%B1os-multiculturales-amigos-que-enlazan-brazos-mirando-hacia-abajo-a-la-c%C3%A1mara.jpg?s=612x612&w=0&k=20&c=uhkFo3Z-4lk0XagDN_uUb1VuS0tRRkfgw5TqGkpVTp8="
                        alt="Niños felices vistiendo prendas de colores"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading="lazy"
                    />
                </div>
            </div>

            <div className="bg-[#222644] px-6 py-6 text-white/80 sm:px-8 lg:px-12 p-5">
                <p className="text-center text-lg font-medium p-3">
                    &copy; {new Date().getFullYear()} CoolKidClods. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}


export default Footer;
