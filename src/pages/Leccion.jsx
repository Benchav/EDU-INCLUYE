import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lecciones from '../data/lecciones.json';
import '../styles/Leccion.css';

export default function Leccion() {
  const { leccionId } = useParams();
  const navigate = useNavigate();
  const lec = lecciones.find(x => x.id === leccionId);
  if (!lec) return <p>Lección no encontrada</p>;

  return (
    <section className="leccion">
      <h2>{lec.titulo}</h2>
      <div className="leccion__media">
        <img src={lec.mediaUrl} alt={lec.titulo} />
      </div>
      <p>{lec.contenido}</p>
      <ul>
        {lec.ejemplos.map((ex, i) => <li key={i}>{ex}</li>)}
      </ul>
      <div className="leccion__nav">
        <button onClick={() => navigate(-1)}>Anterior</button>
        <button onClick={() => navigate('/curso')}>Volver a Curso</button>
      </div>
    </section>
  );
}