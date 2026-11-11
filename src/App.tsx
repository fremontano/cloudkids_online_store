import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import { HomePage } from './Pages/HomePage';
import { ProductDetailPage } from './Pages/ProductDetailPage';

function App() {
  return (
    <Routes>
      {/* Las rutas anidadas usan MainLayout como estructura principal. */}
      <Route element={<MainLayout />}>
        {/* La ruta índice es la página principal: /. */}
        <Route index element={<HomePage />} />
        {/* El parámetro :id identifica el producto que se debe mostrar. */}
        <Route path="producto/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
