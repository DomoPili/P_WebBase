import { useState } from 'react';
import { Link } from 'react-router-dom';

// 1. Le cambiamos el nombre al molde a 'TarjetaMini' para evitar confusiones
function TarjetaMini({ pokemon }) {
  return (
    <div>
      <h4>{pokemon.name}</h4>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <br />
      <input type="text" value={`ID: ${pokemon.id}`} readOnly />
      <br />
      <input type="text" value={`Peso: ${pokemon.weight / 10} kg`} readOnly />
      <br />

      {/* 2. El botón ahora apunta a la ruta /detalle/ */}
      <Link to={`/detalle/${pokemon.name}`}>
        <button>Ver Info</button>
      </Link>
      <hr />
    </div>
  );
}

// LA PÁGINA PRINCIPAL DE BÚSQUEDA
export function PokemonApi() {
  const [busqueda, setBusqueda] = useState('');
  const [listaPokemon, setListaPokemon] = useState([]);
  const [error, setError] = useState(false);

  const buscarPokemon = async () => {
    if (busqueda === '') return;

    try {
      const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
      const datos = await respuesta.json();

      const resultadosFiltrados = datos.results.filter((p) =>
        p.name.includes(busqueda.toLowerCase())
      );

      const maximoResultados = resultadosFiltrados.slice(0, 30);

      if (maximoResultados.length === 0) {
        setError(true);
        setListaPokemon([]);
        return;
      }

      const promesasDeDetalles = maximoResultados.map(async (pokeBasico) => {
        const res = await fetch(pokeBasico.url);
        return res.json();
      });

      const detallesCompletos = await Promise.all(promesasDeDetalles);

      setError(false);
      setListaPokemon(detallesCompletos);

    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div>
      <Link to="/"><button>Volver al Home</button></Link>

      <h2>Buscador Pokémon</h2>

      <input
        type="text"
        placeholder="Escribe pikachu..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={buscarPokemon}>Buscar</button>

      {error && <p>No se encontraron Pokémon.</p>}

      {/* Añadimos un estilo de cuadrícula (Grid) de 4 columnas iguales (1fr) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginTop: '20px'
      }}>
        {listaPokemon.map((pokemonIndividual) => (
          <TarjetaMini key={pokemonIndividual.name} pokemon={pokemonIndividual} />
        ))}
      </div>
    </div>
  );
}