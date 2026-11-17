import { Outlet } from 'react-router';
import { AuthCollage } from '../features/auth/components/AuthCollage';

const AuthLayout = () => (
    <div className="min-h-screen w-full flex bg-[#FAF9F6] text-[#1A1A1A] font-sans overflow-hidden">
        <AuthCollage />

        <main className="w-full lg:w-[48%] flex items-center justify-center px-6 sm:px-16 lg:px-24 py-12">
            <div className="w-full max-w-md">
                <Outlet />
            </div>
        </main>
    </div>
);

export default AuthLayout;
