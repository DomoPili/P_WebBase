import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export function PokemonCard() {
  // 1. Obtenemos el nombre del Pokémon desde la URL (/detalle/pikachu -> nombre = "pikachu")
  const { nombre } = useParams();
  
  // 2. Memoria para guardar los detalles
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(true);

  // 3. Lógica para buscar los datos apenas cargue la página
  useEffect(() => {
    const obtenerDetalles = async () => {
      try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const datos = await respuesta.json();
        setPokemon(datos);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener el pokemon", error);
        setCargando(false);
      }
    };

    obtenerDetalles();
  }, [nombre]); // Si el nombre en la URL cambia, el useEffect se vuelve a ejecutar

  // 4. Mientras la API responde, mostramos un mensaje
  if (cargando) return <p>Cargando información del Pokémon...</p>;
  if (!pokemon) return <p>No se encontró la información.</p>;

  // 5. Interfaz simple con la información detallada
  return (
    <div>
      <Link to="/pokemon"><button>⬅ Volver al buscador</button></Link>

      <h2 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h2>
      
      {/* Imagen Grande */}
      <img 
        src={pokemon.sprites.other['official-artwork'].front_default} 
        alt={pokemon.name} 
        style={{ width: '200px' }}
      />

      <div>
        <h3>Estadísticas Base:</h3>
        {/* Usamos otro .map() porque las estadísticas vienen en una lista (Array) */}
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              <strong>{stat.stat.name}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Habilidades:</h3>
        <ul>
          {pokemon.abilities.map((abi) => (
            <li key={abi.ability.name}>{abi.ability.name}</li>
          ))}
        </ul>
      </div>

      <hr />
      <p>ID en Pokedex: {pokemon.id}</p>
      <p>Tipo: {pokemon.types.map(t => t.type.name).join(', ')}</p>
    </div>
  );
}