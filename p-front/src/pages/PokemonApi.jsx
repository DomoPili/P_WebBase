import { useState } from 'react';
import { Link } from 'react-router-dom';

export function PokemonApi() {
  // --- MEMORIA (ESTADOS) ---
  const [busqueda, setBusqueda] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);

  // --- LÓGICA DE LA PANTALLA ---
  const buscarPokemon = async () => {
    if (busqueda === '') return; 
    
    try {
      // 1. fetch va a internet a traer los datos
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`);
      
      if (!respuesta.ok) {
        throw new Error('No encontrado');
      }
      
      // 2. Convertimos la respuesta a JSON
      const datos = await respuesta.json();
      
      // 3. Guardamos en el estado para que la pantalla se actualice
      setPokemon(datos);
      setError(false); 
      
    } catch (err) {
      setError(true);    
      setPokemon(null);  
    }
  };

  // --- INTERFAZ BÁSICA ---
  return (
    <div>
      {/* BOTÓN DE VOLVER */}
      <Link to="/">
        <button>Volver al Home</button>
      </Link>

      <h2>Buscador Pokémon</h2>
      
      {/* INPUT Y BOTÓN DE BÚSQUEDA */}
      <input 
        type="text" 
        placeholder="Nombre o número..." 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={buscarPokemon}>Buscar</button>

      {/* MENSAJE DE ERROR (Aparece si error es true) */}
      {error && (
        <p>Pokémon no encontrado.</p>
      )}

      {/* RESULTADO (Aparece si pokemon tiene datos) */}
      {pokemon && (
        <div>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Número: {pokemon.id}</p>
          <p>Peso: {pokemon.weight / 10} kg</p>
          <p>Altura: {pokemon.height / 10} m</p>
        </div>
      )}
    </div>
  );
}