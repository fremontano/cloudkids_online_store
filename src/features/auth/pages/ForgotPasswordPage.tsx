import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, MailCheck, RefreshCw, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { requestPasswordOtp, resetPassword } from '../api/auth.api';
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage';

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState<'request' | 'reset'>('request');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleRequestOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedEmail = email.trim();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            toast.error('Ingresa un correo electrónico válido.');
            return;
        }

        setLoading(true);
        try {
            const response = await requestPasswordOtp(trimmedEmail);
            setEmail(trimmedEmail);
            setStep('reset');
            toast.success(response.message);
        } catch (error) {
            toast.error(getApiErrorMessage(error, 'No se pudo enviar el código de verificación.'));
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(otp)) {
            toast.error('El código debe tener 6 dígitos.');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('La nueva contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword)) {
            toast.error('La nueva contraseña debe incluir mayúsculas y minúsculas.');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        try {
            const response = await resetPassword({
                email,
                otp,
                newPassword,
            });
            toast.success(response.message);
            navigate('/login');
        } catch (error) {
            toast.error(getApiErrorMessage(error, 'No se pudo restablecer la contraseña.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h1 className="text-4xl sm:text-[42px] font-bold tracking-tight text-[#1E1E1E] mb-2">
                Recuperar contraseña
            </h1>
            <p className="text-base text-[#6B6B6B] mb-9">
                {step === 'request'
                    ? 'Ingresa tu correo y te enviaremos un código de verificación.'
                    : 'Ingresa el código que enviamos a tu correo y define tu nueva contraseña.'}
            </p>

            {step === 'request' ? (
                <form className="space-y-5" onSubmit={handleRequestOtp} noValidate>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                            autoComplete="email"
                            className="w-full h-12 px-3.5 text-base bg-transparent border border-[#CFCBC4] rounded-lg placeholder:text-[#A39E96] focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] transition-colors"
                        />
                    </div>

                    <div className="pt-2 flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 px-10 py-3 rounded-full bg-[#F36F21] hover:bg-[#df5e12] active:scale-[0.99] text-white text-base font-semibold shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <MailCheck size={18} />
                            {loading ? 'Enviando...' : 'Enviar código'}
                        </button>

                        <Link
                            to="/login"
                            className="text-sm text-[#4A4A4A] underline hover:text-[#1E1E1E]"
                        >
                            Volver a iniciar sesión
                        </Link>
                    </div>
                </form>
            ) : (
                <form className="space-y-5" onSubmit={handleResetPassword} noValidate>
                    <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-emerald-700">
                        <ShieldCheck size={18} className="mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold">Código enviado</p>
                            <p className="mt-0.5 text-xs">
                                Revisa <span className="font-semibold">{email}</span> e ingresa el código de 6 dígitos.
                            </p>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="otp"
                            className="block text-sm font-semibold text-[#2A2A2A] mb-2"
                        >
                            Código de verificación<span className="text-[#F36F21] ml-0.5">*</span>
                        </label>
                        <input
                            id="otp"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="123456"
                            autoComplete="one-time-code"
                            className="w-full h-12 px-3.5 text-base tracking-widest bg-transparent border border-[#CFCBC4] rounded-lg placeholder:text-[#A39E96] focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] transition-colors"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-semibold text-[#2A2A2A] mb-2"
                        >
                            Nueva contraseña<span className="text-[#F36F21] ml-0.5">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoComplete="new-password"
                                className="w-full h-12 px-3.5 pr-10 text-base bg-transparent border border-[#CFCBC4] rounded-lg focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword((value) => !value)}
                                aria-label={showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8A84] hover:text-[#1E1E1E] transition-colors cursor-pointer"
                            >
                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-[#2A2A2A] mb-2"
                        >
                            Confirmar contraseña<span className="text-[#F36F21] ml-0.5">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                className="w-full h-12 px-3.5 pr-10 text-base bg-transparent border border-[#CFCBC4] rounded-lg focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((value) => !value)}
                                aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8A84] hover:text-[#1E1E1E] transition-colors cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-10 py-3 rounded-full bg-[#F36F21] hover:bg-[#df5e12] active:scale-[0.99] text-white text-base font-semibold shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? 'Guardando...' : 'Cambiar contraseña'}
                        </button>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => setStep('request')}
                                className="inline-flex items-center gap-1.5 text-sm text-[#4A4A4A] underline hover:text-[#1E1E1E]"
                            >
                                <RefreshCw size={14} />
                                Cambiar correo / reenviar
                            </button>

                            <Link
                                to="/login"
                                className="text-sm text-[#4A4A4A] underline hover:text-[#1E1E1E]"
                            >
                                Volver a iniciar sesión
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};
