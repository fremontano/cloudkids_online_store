import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useRegister } from '../hooks/useRegister';
import { AuthFieldErrors } from '../components/AuthFieldErrors';

export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        onSubmit,
    } = useRegister();

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h1 className="text-4xl sm:text-[42px] font-bold tracking-tight text-[#1E1E1E] mb-2">
                Crear cuenta
            </h1>
            <p className="text-base text-[#6B6B6B] mb-9">
                ¿Ya tienes una cuenta?{' '}
                <Link
                    to="/login"
                    className="text-[#F36F21] font-medium hover:underline transition-all"
                >
                    Inicia sesión.
                </Link>
            </p>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Campo Nombre */}
                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-semibold text-[#2A2A2A] mb-2"
                    >
                        Nombre completo<span className="text-[#F36F21] ml-0.5">*</span>
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        {...register('name')}
                        placeholder="Juan Pérez"
                        className={`w-full h-12 px-3.5 text-base bg-transparent border rounded-lg placeholder:text-[#A39E96] focus:outline-none transition-colors ${errors.name
                                ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                                : 'border-[#CFCBC4] focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21]'
                            }`}
                    />
                    <AuthFieldErrors error={errors.name} />
                </div>

                {/* Campo Email (Aquí saltará el toast y el error si el correo ya está registrado) */}
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
                        {...register('email')}
                        placeholder="Correo electrónico"
                        className={`w-full h-12 px-3.5 text-base bg-transparent border rounded-lg placeholder:text-[#A39E96] focus:outline-none transition-colors ${errors.email
                                ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                                : 'border-[#CFCBC4] focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21]'
                            }`}
                    />
                    <AuthFieldErrors id="email-error" error={errors.email} />
                </div>

                {/* Campo Contraseña */}
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
                            {...register('password')}
                            placeholder="••••••••"
                            className={`w-full h-12 px-3.5 pr-10 text-base bg-transparent border rounded-lg placeholder:text-[#A39E96] focus:outline-none transition-colors ${errors.password
                                    ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                                    : 'border-[#CFCBC4] focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21]'
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8A84] hover:text-[#1E1E1E] transition-colors cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <AuthFieldErrors error={errors.password} />
                </div>

                {/* Términos y Botón */}
                <div className="pt-2 flex flex-col gap-4">
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                        <input type="checkbox" className="peer sr-only" {...register('acceptTerms')} />
                        <span className="w-4 h-4 rounded-sm border border-[#CFCBC4] peer-checked:border-[#F36F21] peer-checked:bg-[#F36F21] text-white flex items-center justify-center transition-colors">
                            <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-sm text-[#4A4A4A]">
                            Acepto los{' '}
                            <a href="#terms" className="underline hover:text-[#1E1E1E]">
                                Términos y Privacidad
                            </a>
                        </span>
                    </label>
                    <AuthFieldErrors error={errors.acceptTerms} />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-10 py-3 rounded-full bg-[#F36F21] hover:bg-[#df5e12] active:scale-[0.99] text-white text-base font-semibold shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </div>
            </form>
        </div>
    );
};