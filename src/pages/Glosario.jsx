import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import '../styles/Glosario.css';

function getYoutubeEmbedUrl(url) {
  // Convierte un short de YouTube en embed estándar
  const match = url.match(/(?:\/shorts\/|watch\?v=)([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

export default function Glosario() {
  const [filtro, setFiltro] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('No estás autenticado');
      setLoading(false); 
      return;
    }

    getCategories(token)
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar categorías:', err);
        setError('No se pudo cargar las categorías');
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p>Cargando categorías…</p>;
  if (error) return <p>{error}</p>;

  const filtrados = items.filter(cat =>
    cat.name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <section className="glosario">
      <h2>Categorías</h2>
      <input
        type="text"
        placeholder="Buscar..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />
      <div className="glosario__grid">
        {filtrados.map((g, i) => {
          const embedUrl = getYoutubeEmbedUrl(g.video);

          return (
            <div key={i} className="glosario__item">
              <h4>{g.name}</h4>
              <p>{g.description}</p>

              {embedUrl && (
                <div className="glosario__video">
                  <iframe
                    width="100%"
                    height="200"
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