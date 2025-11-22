import React, { useState, useEffect } from 'react';
import glosario from '../data/glosario.json';
import { FaLightbulb, FaRedoAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 
import '../styles/Practica.css';

export default function Practica() {
  const [actual, setActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const nuevaRonda = () => {
    const uniqueGlosario = [...new Map(glosario.map(item => [item.palabra, item])).values()];
    const lista = [...uniqueGlosario];
    
    const idx = Math.floor(Math.random() * lista.length);
    const correcta = lista.splice(idx, 1)[0];
    
    const distractores = lista.sort(() => 0.5 - Math.random()).slice(0, 3);
    const opts = [correcta, ...distractores].sort(() => 0.5 - Math.random());
    
    setActual(correcta);
    setOpciones(opts);
    setMensaje('');
    setShowHint(false);
    setFeedback(null);
    setSelectedOption(null);
  };

  useEffect(nuevaRonda, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('practicaProgress');
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj && typeof obj.correct === 'number') {
          setCorrectCount(obj.correct);
          setAttempts(obj.attempts);
        }
      }
    } catch (e) {}
  }, []);

  const persistProgress = (correct, att) => {
    try {
      localStorage.setItem('practicaProgress', JSON.stringify({ correct, attempts: att }));
    } catch (e) {}
  };

  const handleClick = (seleccion) => {
    if (feedback) return; 

    setSelectedOption(seleccion.palabra);
    const isCorrect = seleccion.palabra === actual.palabra;
    
    const newAttempts = attempts + 1;
    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    
    setAttempts(newAttempts);
    setCorrectCount(newCorrect);
    persistProgress(newCorrect, newAttempts);

    if (isCorrect) {
      setFeedback('correct');
      setMensaje('¡Correcto! 🎉');
    } else {
      setFeedback('incorrect');
    }
    
    setTimeout(nuevaRonda, 2000);
  };

  const resetProgress = () => {
    if(window.confirm("¿Reiniciar estadísticas?")) {
      setCorrectCount(0);
      setAttempts(0);
      persistProgress(0, 0);
    }
  };

  if (!actual) return <div className="practica__loading">Cargando...</div>;

  const progressPercent = attempts === 0 ? 0 : Math.round((correctCount / attempts) * 100);

  return (
    <section className="practica">
      <div className="practica__container">
        
        {/* Cabecera con botón de texto */}
        <div className="practica__header">
          <h2 className="practica__title">Práctica</h2>
          <button className="practica__reset-btn" onClick={resetProgress}>
            <FaRedoAlt /> Reiniciar
          </button>
        </div>

        {/* Barra de Progreso */}
        <div className="practica__stats">
          <div className="practica__bar-container">
            <div className="practica__bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span className="practica__score">{correctCount}/{attempts}</span>
        </div>

        {/* Tarjeta Principal */}
        <div className="practica__card">
          
          {/* Imagen Limpia */}
          <div className="practica__media-frame">
            <img src={actual.mediaUrl} alt="Seña" className="practica__image" />
          </div>

          {/* Botón de Pista (Debajo de la imagen) */}
          <div className="practica__hint-wrapper">
             {!showHint ? (
                <button 
                  className="practica__hint-btn" 
                  onClick={() => setShowHint(true)}
                >
                  <FaLightbulb /> Ver Pista
                </button>
             ) : (
                <div className="practica__hint-text show">
                  <p>💡 {actual.descripcion}</p>
                </div>
             )}
          </div>

          <h3 className="practica__question">¿Qué significa?</h3>

          {/* Opciones Compactas */}
          <div className="practica__options-grid">
            {opciones.map((opcion, index) => {
              let btnClass = "practica__option";
              if (feedback === 'correct' && opcion.palabra === actual.palabra) btnClass += " correct";
              if (feedback === 'incorrect' && opcion.palabra === selectedOption) btnClass += " incorrect";
              if (feedback === 'incorrect' && opcion.palabra === actual.palabra) btnClass += " show-correct"; 

              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleClick(opcion)}
                  disabled={!!feedback}
                >
                  {opcion.palabra}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          <div className={`practica__feedback ${feedback}`}>
            {feedback === 'correct' && (
              <>
                <FaCheckCircle className="feedback-icon" />
                <span>{mensaje}</span>
              </>
            )}

            {feedback === 'incorrect' && (
              <>
                <FaTimesCircle className="feedback-icon error-icon" />
                <div className="feedback-text-group">
                   <span>Incorrecto 😔 </span>
                   <span className="respuesta-correcta">Era: "{actual.palabra}"</span>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}