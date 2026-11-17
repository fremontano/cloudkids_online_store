import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { AuthFieldErrors } from '../components/AuthFieldErrors';

export const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        onSubmit,
        onInvalid,
    } = useLogin();


    return (
        <div className="w-full max-w-md">
            {/* Columna Izquierda: Collage de imagenes */}

            {/* Columna Derecha: Formulario de Inicio de Sesion */}
            <h1 className="text-4xl sm:text-[42px] font-bold tracking-tight text-[#1E1E1E] mb-2">
                Iniciar sesión
            </h1>
            <p className="text-base text-[#6B6B6B] mb-9">
                ¿No tienes una cuenta?{' '}
                <Link
                    to="/register"
                    className="text-[#F36F21] font-medium hover:underline transition-all"
                >
                    Regístrate.
                </Link>
            </p>

            {import.meta.env.DEV && (
                <div className="mb-6 rounded-xl border border-dashed border-[#F36F21]/40 bg-[#FFF4EC] px-4 py-3 text-sm text-[#7A4A22]">
                    <p className="font-semibold">Usuario de prueba</p>
                    <p className="mt-1">
                        Email: <span className="font-mono">demo@coolkid.cl</span>
                    </p>
                    <p>
                        Contraseña: <span className="font-mono">Demo1234</span>
                    </p>
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#2A2A2A] mb-2"
                    >
                        Correo electrónico<span className="text-[#F36F21] ml-0.5">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Correo electrónico"
                        {...register('email')}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className="w-full h-12 px-3.5 text-base bg-transparent border border-[#CFCBC4] rounded-lg placeholder:text-[#A39E96] focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] transition-colors"
                    />
                    <AuthFieldErrors id="email-error" error={errors.email} />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-[#2A2A2A] mb-2"
                    >
                        Contraseña<span className="text-[#F36F21] ml-0.5">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...register('password')}
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                            className="w-full h-12 px-3.5 pr-10 text-base bg-transparent border border-[#CFCBC4] rounded-lg placeholder:text-[#A39E96] focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] transition-colors"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8A84] hover:text-[#1E1E1E] transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <AuthFieldErrors id="password-error" error={errors.password} />
                </div>

                <div className="pt-2 flex flex-col gap-4">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-[#4A4A4A] underline hover:text-[#1E1E1E]"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-10 py-3 rounded-full bg-[#F36F21] hover:bg-[#df5e12] active:scale-[0.99] text-white text-base font-semibold shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? 'Ingresando....' : 'Iniciar sesión'}
                    </button>
                </div>
            </form>
        </div>
    );
};
