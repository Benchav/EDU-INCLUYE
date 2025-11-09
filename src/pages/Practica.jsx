import React, { useState, useEffect } from 'react';
import glosario from '../data/glosario.json';
import '../styles/Practica.css'; // Asegúrate de crear este archivo

export default function Practica() {
  const [actual, setActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [showHint, setShowHint] = useState(false); // Estado para la pista
  const [feedback, setFeedback] = useState(null); // Estado para feedback visual

  const nuevaRonda = () => {
    // Limpia los duplicados de tu JSON (como "Comidas")
    const uniqueGlosario = [...new Map(glosario.map(item => [item.palabra, item])).values()];
    
    const lista = [...uniqueGlosario];
    
    const idx = Math.floor(Math.random() * lista.length);
    const correcta = lista.splice(idx, 1)[0];
    
    // Asegura 3 distractores (si hay suficientes datos)
    const distractores = lista.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const opts = [correcta, ...distractores].sort(() => 0.5 - Math.random());
    
    setActual(correcta);
    setOpciones(opts);
    setMensaje('');
    setShowHint(false); // Oculta la pista
    setFeedback(null);  // Resetea el feedback
  };

  useEffect(nuevaRonda, []);

  const handleClick = (seleccion) => {
    // No hacer nada si ya se respondió
    if (feedback) return;

    if (seleccion.palabra === actual.palabra) {
      setMensaje('¡Correcto! 🎉');
      setFeedback('correct');
    } else {
      setMensaje(`Incorrecto… la respuesta era “${actual.palabra}”.`);
      setFeedback('incorrect');
    }
    
    // Espera 2 segundos antes de la siguiente ronda
    setTimeout(nuevaRonda, 2000);
  };

  if (!actual) return null;

  return (
    <section className="practica">
      <div className="practica__card">
        <h2>Práctica de Señas</h2>
        
        <div className="practica__media">
          <img src={actual.mediaUrl} alt="Seña a adivinar" />
        </div>

        {/* --- PISTA --- */}
        <div className="practica__hint-container">
          {!showHint && (
            <button 
              className="practica__hint-button"
              onClick={() => setShowHint(true)}
            >
              Mostrar Pista
            </button>
          )}
          {showHint && (
            <p className="practica__hint-text">{actual.descripcion}</p>
          )}
        </div>

        {/* --- OPCIONES --- */}
        <div className="practica__opciones">
          {opciones.map((o, i) => (
            <button 
              key={i} 
              onClick={() => handleClick(o)}
              // Añade clases de feedback (visual)
              className={`
                ${feedback && o.palabra === actual.palabra ? 'correct' : ''}
                ${feedback === 'incorrect' && o.palabra !== actual.palabra ? 'incorrect' : ''}
              `}
              disabled={!!feedback} // Deshabilita botones al responder
            >
              {o.palabra}
            </button>
          ))}
        </div>

        {/* --- MENSAJE --- */}
        {mensaje && (
          <p 
            className={`practica__mensaje ${feedback === 'correct' ? 'correct-msg' : 'incorrect-msg'}`}
          >
            {mensaje}
          </p>
        )}
      </div>
    </section>
  );
}