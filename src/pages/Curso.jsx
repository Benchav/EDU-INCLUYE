import React, { useState, useEffect } from 'react';
import { getLecciones } from '../services/api';
import '../styles/Curso.css';

export default function Curso() {
  const [lecciones, setLecciones] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    getLecciones()
      .then(data => {
        setLecciones(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error cargando lecciones');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando lecciones…</p>;
  if (error)   return <p>{error}</p>;

  return (
    <div className="curso-grid">
      {lecciones.map(l => (
        <div key={l.id} className="leccion-card">
          <h3>{l.titulo}</h3>
          <img src={l.image || l.mediaUrl} alt={l.titulo} />
          <p>{l.descripcion}</p>
        </div>
      ))}
    </div>
  );
}
