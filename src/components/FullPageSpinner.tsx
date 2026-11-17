interface FullPageSpinnerProps {
    label?: string;
}

export const FullPageSpinner = ({ label = 'Cargando...' }: FullPageSpinnerProps) => (
    <div
        className="fixed inset-0 z-100 flex min-h-screen items-center justify-center bg-[#FAF9F6]"
        role="status"
        aria-live="polite"
    >
        <div className="flex flex-col items-center gap-3">
            <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#F36F21]"
                aria-hidden="true"
            />
            <span className="text-sm font-semibold text-gray-600 animate-pulse">
                {label}
            </span>
        </div>
    </div>
);
