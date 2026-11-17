import { useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import {
    ArrowRight,
    Camera,
    Mail,
    MapPin,
    Package,
    Pencil,
    ShieldCheck,
    ShoppingBag,
    User as UserIcon,
    LogOut,
} from 'lucide-react';
import { toast } from 'sonner';
import { AuthFieldErrors } from '../../auth/components/AuthFieldErrors';
import { useAuthStore } from '../../auth/store/auth.store';
import { ChangePasswordSection } from '../components/ChangePasswordSection';
import { useProfileForm } from '../hooks/useProfileForm';

export const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        isEditing,
        uploadingImage,
        startEditing,
        cancelEditing,
        onSubmit,
        handleImageChange,
    } = useProfileForm();

    if (!user) return null;

    const role = user.isAdmin ? 'Administrador' : 'Cliente';
    const firstName = user.name.split(' ')[0];

    const handleLogout = async () => {
        await logout();
        toast.success('Cerraste sesión correctamente.');
        navigate('/');
    };

    return (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F36F21]">
                    Mi cuenta
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
                    Hola, {firstName}! Bienvenido de nuevo
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Administra tu información personal, pedidos y direcciones.
                </p>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
                {/* Tarjeta de perfil */}
                <aside className="self-start overflow-hidden rounded-3xl border border-[#EBE7DF] bg-white shadow-sm">
                    <div className="h-24 w-full bg-linear-to-r from-[#FFEB3B] to-[#F36F21]" />

                    <div className="px-6 pb-6">
                        <div className="-mt-12 mb-4 flex items-end justify-between">
                            <div className="relative">
                                {/* Avatar Redondeado (Circular) */}
                                <img
                                    src={user.image}
                                    alt={`Perfil de ${user.name}`}
                                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadingImage}
                                    className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F36F21] text-white shadow transition hover:bg-[#df5e12] disabled:opacity-50"
                                    aria-label="Cambiar imagen de perfil"
                                >
                                    <Camera size={14} />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <span
                                className={`mb-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${user.isAdmin
                                    ? 'bg-[#FFEB3B] text-black'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {role}
                            </span>
                        </div>

                        <h2 className="truncate text-xl font-bold text-[#1E1E1E]">{user.name}</h2>
                        <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-gray-500">
                            <Mail size={14} className="shrink-0" />
                            {user.email}
                        </p>

                        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                            <span className="inline-flex items-center gap-1.5">
                                <ShoppingBag size={15} />
                                0 pedidos
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin size={15} />
                                0 direcciones
                            </span>
                        </div>

                        <Link
                            to="/"
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F36F21] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#df5e12]"
                        >
                            Ir a productos
                            <ArrowRight size={16} />
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                            <LogOut size={16} />
                            Cerrar sesión
                        </button>
                    </div>
                </aside>

                {/* Contenido Principal */}
                <div className="space-y-6">
                    <section className="rounded-3xl border border-[#EBE7DF] bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <UserIcon size={18} className="text-[#F36F21]" />
                                <h2 className="text-lg font-bold text-[#1E1E1E]">Información personal</h2>
                            </div>
                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={startEditing}
                                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-[#F36F21] hover:text-[#F36F21]"
                                >
                                    <Pencil size={14} />
                                    Editar
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl bg-[#FAF9F6] p-4">
                                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                    Nombre
                                </dt>
                                {isEditing ? (
                                    <div className="mt-2 space-y-2">
                                        <input
                                            type="text"
                                            {...register('name')}
                                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1E1E1E] focus:border-[#F36F21] focus:outline-none"
                                        />
                                        <AuthFieldErrors error={errors.name} />
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="cursor-pointer rounded-lg bg-[#F36F21] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#df5e12] disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Guardando...' : 'Guardar'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={cancelEditing}
                                                disabled={isSubmitting}
                                                className="cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <dd className="mt-1 truncate text-sm font-semibold text-[#1E1E1E]">
                                        {user.name}
                                    </dd>
                                )}
                            </div>

                            <div className="rounded-2xl bg-[#FAF9F6] p-4">
                                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                    Correo electrónico
                                </dt>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#1E1E1E] focus:border-[#F36F21] focus:outline-none"
                                        />
                                        <AuthFieldErrors error={errors.email} />
                                    </>
                                ) : (
                                    <dd className="mt-1 truncate text-sm font-semibold text-[#1E1E1E]">
                                        {user.email}
                                    </dd>
                                )}
                            </div>

                            <div className="rounded-2xl bg-[#FAF9F6] p-4 sm:col-span-2">
                                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                    Rol
                                </dt>
                                <dd className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#1E1E1E]">
                                    <ShieldCheck
                                        size={16}
                                        className={user.isAdmin ? 'text-[#F36F21]' : 'text-gray-400'}
                                    />
                                    {role}
                                </dd>
                            </div>
                        </dl>
                        </form>
                    </section>

                    <ChangePasswordSection />

                    <section className="rounded-3xl border border-[#EBE7DF] bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2">
                            <Package size={18} className="text-[#F36F21]" />
                            <h2 className="text-lg font-bold text-[#1E1E1E]">Mis pedidos</h2>
                        </div>

                        <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-[#FAF9F6] px-6 py-10 text-center">
                            <ShoppingBag size={32} className="text-gray-300" />
                            <p className="mt-3 text-sm font-semibold text-gray-700">
                                Aún no tienes pedidos
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Cuando realices una compra, aparecerá aquí.
                            </p>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-[#EBE7DF] bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-[#F36F21]" />
                            <h2 className="text-lg font-bold text-[#1E1E1E]">Mis direcciones</h2>
                        </div>

                        <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-[#FAF9F6] px-6 py-10 text-center">
                            <MapPin size={32} className="text-gray-300" />
                            <p className="mt-3 text-sm font-semibold text-gray-700">
                                No tienes direcciones guardadas
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Agrega una dirección para agilizar tus compras.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};