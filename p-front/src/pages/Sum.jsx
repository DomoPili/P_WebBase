import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Sum() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result, setResult] = useState(0);

  const handleSum = () => {
    setResult(a + b);
  };

  return (
    <div>
      <h2>Suma de Dos Números</h2>
      <input
        type="number"
        placeholder="Primer número"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Segundo número"
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
      />
      <button onClick={handleSum}>Sumar</button>
      <p>Resultado: {result}</p>

        <Link to="/">
            <button>Volver al Home</button>
        </Link>        
    </div>
  );
}