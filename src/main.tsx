import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter habilita el enrutamiento por URL para toda la aplicacion. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
