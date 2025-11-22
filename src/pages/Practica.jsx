import React, { useState, useEffect } from 'react';
import glosario from '../data/glosario.json';
import '../styles/Practica.css'; // Asegúrate de crear este archivo

export default function Practica() {
  const [actual, setActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [showHint, setShowHint] = useState(false); // Estado para la pista
  const [feedback, setFeedback] = useState(null); // Estado para feedback visual
  const [selected, setSelected] = useState(null); // Guarda la opción elegida para animaciones
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);

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

  // Cargar progreso guardado al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem('practicaProgress');
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj && typeof obj.correct === 'number' && typeof obj.attempts === 'number') {
          setCorrectCount(obj.correct);
          setAttempts(obj.attempts);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const persistProgress = (correct, att) => {
    try {
      localStorage.setItem('practicaProgress', JSON.stringify({ correct: correct, attempts: att }));
    } catch (e) {
      // ignore
    }
  };

  const handleClick = (seleccion) => {
    // No hacer nada si ya se respondió
    if (feedback) return;

    setSelected(seleccion.palabra);
    // Actualizamos intentos y aciertos
    const isCorrect = seleccion.palabra === actual.palabra;
    const newAttempts = attempts + 1;
    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    setAttempts(newAttempts);
    setCorrectCount(newCorrect);
    persistProgress(newCorrect, newAttempts);

    if (isCorrect) {
      setMensaje('¡Correcto! 🎉');
      setFeedback('correct');
    } else {
      // Guardamos sólo tipo para renderizar la parte que necesita estilo
      setMensaje('incorrect');
      setFeedback('incorrect');
    }
    
    // Espera 2 segundos antes de la siguiente ronda
    setTimeout(nuevaRonda, 2000);
  };

  const resetProgress = () => {
    setCorrectCount(0);
    setAttempts(0);
    persistProgress(0, 0);
  };

  if (!actual) return null;

  return (
    <section className="practica">
      <div className="practica__card">
        <h2>Practicar Señas</h2>
        
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

        {/* Barra de progreso colocada justo debajo de la pista */}
        <div className="practica__progress">
          <div className="practica__progress-info">
            <div className="practica__progress-label">Progreso de aprendizaje</div>
            <div className="practica__progress-stats">{correctCount} aciertos / {attempts} intentos</div>
          </div>
          <div className="practica__progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={attempts === 0 ? 0 : Math.round((correctCount / attempts) * 100)}>
            <div className="practica__progress-fill" style={{ width: `${attempts === 0 ? 0 : Math.round((correctCount / attempts) * 100)}%` }} />
          </div>
          <button className="practica__progress-reset" onClick={resetProgress} title="Reiniciar progreso">Reset</button>
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
                ${selected === o.palabra && feedback === 'incorrect' ? 'selected-wrong' : ''}
              `}
              disabled={!!feedback} // Deshabilita botones al responder
            >
              {o.palabra}
            </button>
          ))}
        </div>

        {/* --- MENSAJE --- */}
        {mensaje && (
          <p className={`practica__mensaje ${feedback === 'correct' ? 'correct-msg' : 'incorrect-msg'}`}>
            {feedback === 'correct' && mensaje}
            {feedback === 'incorrect' && (
              <>
                <span>No es la opción correcta 😔&nbsp;</span>
                <span className="respuesta-correcta">la respuesta correcta es “{actual.palabra}”.</span>
              </>
            )}
          </p>
        )}
      </div>
    </section>
  );
}