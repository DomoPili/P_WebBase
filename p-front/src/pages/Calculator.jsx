import { useState } from 'react';

export function Calculator() {
  // 1. Aquí definimos nuestros Estados (nuestra memoria)
  // num1 es la variable, setNum1 es la función exclusiva para modificarla
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [resultado, setResultado] = useState(0);

  // 2. Aquí creamos las funciones lógicas de nuestra calculadora
  // Usamos Number() para asegurarnos de que JavaScript sume matemáticamente y no junte textos
  const sumar = () => setResultado(Number(num1) + Number(num2));
  const restar = () => setResultado(Number(num1) - Number(num2));
  const multiplicar = () => setResultado(Number(num1) * Number(num2));
  const dividir = () => setResultado(Number(num1) / Number(num2));

  // 3. Aquí va lo que se dibuja en la pantalla
  return (
    <div>
      <h2>Calculadora en React</h2>
      
      {/* Contenedor para los inputs */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="number" 
          value={num1} 
          onChange={(evento) => setNum1(evento.target.value)} 
          placeholder="Número 1"
        />
        <input 
          type="number" 
          value={num2} 
          onChange={(evento) => setNum2(evento.target.value)} 
          placeholder="Número 2"
        />
      </div>

      {/* Contenedor para los botones */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={sumar}>Sumar (+)</button>
        <button onClick={restar}>Restar (-)</button>
        <button onClick={multiplicar}>Multiplicar (*)</button>
        <button onClick={dividir}>Dividir (/)</button>
      </div>

      {/* Mostramos la variable de estado 'resultado' */}
      <h3>El resultado es: {resultado}</h3>
    </div>
  );
}