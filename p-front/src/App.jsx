import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Aquí importamos las 3 "ventanas" que acabas de crear
// Asegúrate de que las rutas coincidan con los nombres de tus archivos
import { Home } from './pages/Home';
import { PokemonApi } from './pages/PokemonApi';
import { Calculator } from './pages/Calculator';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Aquí definimos qué componente se carga en cada URL */}
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonApi />} />
        <Route path="/calculadora" element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  );
}