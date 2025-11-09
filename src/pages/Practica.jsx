import React, { useState, useEffect } from 'react';
import glosario from '../data/glosario.json';
import '../styles/Practica.css';

export default function Practica() {
  const [actual, setActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const nuevaRonda = () => {
    const lista = [...glosario];
    const idx = Math.floor(Math.random() * lista.length);
    const correcta = lista.splice(idx, 1)[0];
    const distractores = lista.sort(() => 0.5 - Math.random()).slice(0, 3);
    const opts = [correcta, ...distractores].sort(() => 0.5 - Math.random());
    setActual(correcta);
    setOpciones(opts);
    setMensaje('');
  };

  useEffect(nuevaRonda, []);

  const handleClick = (seleccion) => {
    setMensaje(
      seleccion.palabra === actual.palabra
        ? '¡Correcto! 🎉'
        : `Incorrecto… era “${actual.palabra}”.`
    );
    setTimeout(nuevaRonda, 1500);
  };

  if (!actual) return null;

  return (
    <section className="practica">
      <h2>Práctica de Señas</h2>
      <div className="practica__media">
        <img src={actual.mediaUrl} alt={actual.palabra} />
      </div>
      <div className="practica__opciones">
        {opciones.map((o, i) => (
          <button key={i} onClick={() => handleClick(o)}>
            {o.palabra}
          </button>
        ))}
      </div>
      {mensaje && <p className="practica__mensaje">{mensaje}</p>}
    </section>
  );
}