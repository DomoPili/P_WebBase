// 1. Importamos la herramienta Link de nuestra librería de rutas
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <h1>Esta es la página de Inicio (Home)</h1>
      <p>Bienvenido. Elige a dónde quieres ir:</p>
      
      {/* 2. Un contenedor para separar un poco los botones */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
        
        {/* 3. Usamos Link envolviendo a nuestros botones */}
        <Link to="/pokemon">
          <button>Ir al Buscador Pokémon</button>
        </Link>
        
        <Link to="/calculadora">
          <button>Ir a la Calculadora</button>
        </Link>

        <Link to="/suma">
          <button>Ir a la Suma</button>
        </Link> 
        
      </div>
    </div>
  );
}