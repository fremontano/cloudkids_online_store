import { useState } from 'react';
import {
    Eye,
    EyeOff,
    KeyRound,
    MailCheck,
    RefreshCw,
    ShieldCheck,
} from 'lucide-react';
import { AuthFieldErrors } from '../../auth/components/AuthFieldErrors';
import { useChangePassword } from '../hooks/useChangePassword';

export const ChangePasswordSection = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        otpSent,
        sending,
        onSubmit,
        handleRequestOtp,
        handleCancel,
    } = useChangePassword();

    return (
        <section className="rounded-3xl border border-[#EBE7DF] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
                <KeyRound size={18} className="text-[#F36F21]" />
                <h2 className="text-lg font-bold text-[#1E1E1E]">Seguridad</h2>
            </div>

            {!otpSent ? (
                <div className="mt-5 flex flex-col items-start gap-4 rounded-2xl bg-[#FAF9F6] p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-[#1E1E1E]">Cambiar contraseña</p>
                        <p className="mt-1 text-xs text-gray-500">
                            Enviaremos un código de 6 dígitos a tu correo electrónico.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={sending}
                        className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-[#F36F21] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#df5e12] disabled:opacity-50"
                    >
                        <MailCheck size={16} />
                        {sending ? 'Enviando....' : 'Enviar código'}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" noValidate>
                    <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-4 text-emerald-700">
                        <ShieldCheck size={18} className="mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold">Código enviado</p>
                            <p className="mt-0.5 text-xs">
                                Revisa tu correo electrónico e ingresa el código de 6 dígitos.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                Código OTP
                            </span>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                autoComplete="one-time-code"
                                {...register('otp')}
                                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm tracking-widest focus:outline-none ${errors.otp
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-gray-200 focus:border-[#F36F21]'
                                    }`}
                            />
                            <AuthFieldErrors error={errors.otp} />
                        </label>

                        <label className="block">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                Nueva contraseña
                            </span>
                            <div className="relative mt-1">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    {...register('newPassword')}
                                    className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:outline-none ${errors.newPassword
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-gray-200 focus:border-[#F36F21]'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-gray-400 transition hover:text-[#F36F21]"
                                    aria-label={showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <AuthFieldErrors error={errors.newPassword} />
                        </label>

                        <label className="block">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                Confirmar contraseña
                            </span>
                            <div className="relative mt-1">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    {...register('confirmPassword')}
                                    className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:outline-none ${errors.confirmPassword
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-gray-200 focus:border-[#F36F21]'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-gray-400 transition hover:text-[#F36F21]"
                                    aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <AuthFieldErrors error={errors.confirmPassword} />
                        </label>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer rounded-xl bg-[#F36F21] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#df5e12] disabled:opacity-50"
                        >
                            {isSubmitting ? 'Guardando...' : 'Cambiar contraseña'}
                        </button>
                        <button
                            type="button"
                            onClick={handleRequestOtp}
                            disabled={sending}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            <RefreshCw size={16} />
                            {sending ? 'Enviando...' : 'Reenviar código'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="cursor-pointer rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
};
