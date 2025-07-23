import React from 'react';
import { Link } from 'react-router-dom';
import lecciones from '../data/lecciones.json';
import '../styles/Curso.css';

export default function Curso() {
  return (
    <section className="curso">
      <h2>Módulos del Curso</h2>
      <div className="curso__grid">
        {lecciones.map(l => (
          <Link to={`/curso/${l.id}`} key={l.id} className="curso__card">
            <img src={l.mediaUrl} alt={l.titulo} />
            <h3>{l.titulo}</h3>
            <p>{l.descripcion}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}