export const AuthCollage = () => {
    return (
        <div className="hidden lg:block lg:w-[52%] relative bg-black overflow-hidden p-3">
            <div className="grid grid-cols-3 gap-3 h-full items-center">
                {/* Columna 1 */}
                <div className="flex flex-col gap-3">
                    {/* Primera imagen: alargada, se sale por arriba del div */}
                    <div className="h-105 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/8923269/pexels-photo-8923269.jpeg"
                            alt="Cañón"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="h-80 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg"
                            alt="Senderismo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="h-64 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/5896798/pexels-photo-5896798.jpeg"
                            alt="Montañas"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Columna 2 */}
                <div className="flex flex-col gap-3">
                    <div className="h-72 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/8457972/pexels-photo-8457972.jpeg"
                            alt="Esquí"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="h-96 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/8813497/pexels-photo-8813497.jpeg"
                            alt="Trail running"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="h-48 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/8034649/pexels-photo-8034649.jpeg"
                            alt="Atardecer"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Columna 3 */}
                <div className="flex flex-col gap-3">
                    <div className="h-96 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/5274629/pexels-photo-5274629.jpeg"
                            alt="Ciclismo de montaña"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="h-80 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/5278985/pexels-photo-5278985.jpeg"
                            alt="Pico rocoso"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Última imagen alargada, se sale por abajo del div */}
                    <div className="h-105 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/5275828/pexels-photo-5275828.jpeg"
                            alt="Niebla"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
