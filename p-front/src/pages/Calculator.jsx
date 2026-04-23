import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Calculator() {
  const [pantalla, setPantalla] = useState('0');
  const [valorAnterior, setValorAnterior] = useState(null);
  const [operador, setOperador] = useState(null);
  const [esperandoNuevoValor, setEsperandoNuevoValor] = useState(false);

  const teclearNumero = (numero) => {
    if (esperandoNuevoValor) {
      setPantalla(String(numero));
      setEsperandoNuevoValor(false);
    } else {
      setPantalla(pantalla === '0' ? String(numero) : pantalla + numero);
    }
  };

  // 1. NUEVA FUNCIÓN: Para no repetir las matemáticas dos veces, las agrupamos aquí
  const realizarOperacion = (num1, num2, op) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (op === '+') return n1 + n2;
    if (op === '-') return n1 - n2;
    if (op === '*') return n1 * n2;
    if (op === '/') return n1 / n2;
    return n2;
  };

  const teclearOperador = (nuevoOperador) => {
    // 2. EL ARREGLO DEL BUG: Si ya hay un operador pendiente, calculamos el intermedio
    // Esto es lo que permite hacer 1 + 2 + 3 + ...
    if (operador !== null && !esperandoNuevoValor) {
      const resultadoIntermedio = realizarOperacion(valorAnterior, pantalla, operador);
      setPantalla(String(resultadoIntermedio));
      setValorAnterior(String(resultadoIntermedio));
    } else {
      // Si es el primer operador que aplastamos en la operación
      setValorAnterior(pantalla);
    }

    setOperador(nuevoOperador);
    setEsperandoNuevoValor(true);
  };

  const calcularResultado = () => {
    if (!operador || valorAnterior === null) return;

    // Usamos nuestra nueva función matemática
    const resultado = realizarOperacion(valorAnterior, pantalla, operador);

    setPantalla(String(resultado));
    setValorAnterior(null);
    setOperador(null);
    setEsperandoNuevoValor(true);
  };

  const limpiarPantalla = () => {
    setPantalla('0');
    setValorAnterior(null);
    setOperador(null);
    setEsperandoNuevoValor(false);
  };

  // --- ESTILOS LIMPIOS ---
  // Guardamos los estilos en variables de JavaScript para que el HTML de abajo se lea fácil
  const estiloBoton = { padding: '20px', fontSize: '1.5rem', cursor: 'pointer' };
  const estiloPantalla = { padding: '20px', fontSize: '2rem', textAlign: 'right', border: '1px solid black', marginBottom: '10px' };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Calculadora Simple</h2>

      <div style={estiloPantalla}>
        {pantalla}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {/* Usamos el spread operator (...) para combinar nuestro estilo base con reglas específicas de la grilla */}
        <button onClick={limpiarPantalla} style={{ ...estiloBoton, gridColumn: 'span 3' }}>CE</button>
        <button onClick={() => teclearOperador('/')} style={estiloBoton}>/</button>

        <button onClick={() => teclearNumero(7)} style={estiloBoton}>7</button>
        <button onClick={() => teclearNumero(8)} style={estiloBoton}>8</button>
        <button onClick={() => teclearNumero(9)} style={estiloBoton}>9</button>
        <button onClick={() => teclearOperador('*')} style={estiloBoton}>*</button>

        <button onClick={() => teclearNumero(4)} style={estiloBoton}>4</button>
        <button onClick={() => teclearNumero(5)} style={estiloBoton}>5</button>
        <button onClick={() => teclearNumero(6)} style={estiloBoton}>6</button>
        <button onClick={() => teclearOperador('-')} style={estiloBoton}>-</button>

        <button onClick={() => teclearNumero(1)} style={estiloBoton}>1</button>
        <button onClick={() => teclearNumero(2)} style={estiloBoton}>2</button>
        <button onClick={() => teclearNumero(3)} style={estiloBoton}>3</button>
        <button onClick={() => teclearOperador('+')} style={estiloBoton}>+</button>

        <button onClick={() => teclearNumero(0)} style={{ ...estiloBoton, gridColumn: 'span 2' }}>0</button>
        <button onClick={() => teclearNumero('.')} style={estiloBoton}>.</button>
        <button onClick={calcularResultado} style={estiloBoton}>=</button>
      </div>

      {/* BOTÓN DE VOLVER */}
      <Link to="/">
        <button>Volver al Home</button>
      </Link>

    </div>
  );
}