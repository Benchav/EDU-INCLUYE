// src/pages/Glosario.jsx
import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import '../styles/Glosario.css';

function getYoutubeEmbedUrl(url) {
  const shorts = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  const watch  = url.match(/(?:watch\?v=|youtu\.be\/)([\w-]+)/);
  const id = (shorts && shorts[1]) || (watch && watch[1]);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export default function Glosario() {
  const [filtro, setFiltro] = useState('');
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('No estás autenticado');
      setLoading(false);
      return;
    }
    getCategories()
      .then(data => setItems(data))
      .catch(err => {
        console.error('Error al cargar categorías:', err);
        setError('No se pudo cargar las categorías');
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="glosario__msg">Cargando categorías…</p>;
  if (error)   return <p className="glosario__msg glosario__error">{error}</p>;

  const filtrados = items.filter(cat =>
    cat.name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <section className="glosario">
      <h2 className="glosario__title">Categorías</h2>
      <input
        className="glosario__search"
        type="text"
        placeholder="Buscar categoría..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />

      <div className="glosario__grid">
        {filtrados.map((g, i) => {
          const embedUrl = getYoutubeEmbedUrl(g.video);
          return (
            <div className="glosario__item" key={i}>
              <h4 className="glosario__item-title">{g.name}</h4>
              <p className="glosario__item-desc">{g.description}</p>
              {embedUrl && (
                <div className="glosario__video">
                  <iframe
                    src={embedUrl}
                    title={`Video de ${g.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
