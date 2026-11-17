import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'sonner';
import App from './app/App';
import { Providers } from './app/providers';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Providers>
            <BrowserRouter>
                <App />
            </BrowserRouter>

            <Toaster
                position="top-right"
                richColors
                toastOptions={{
                    style: {
                        fontSize: '16px',
                        padding: '16px 20px',
                        minHeight: '60px',
                        minWidth: '320px',
                    },
                }}
            />
        </Providers>
    </StrictMode>,
);
