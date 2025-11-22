import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/api';
import '../styles/Glosario.css'; // Usaremos el CSS actualizado

function getYoutubeEmbedUrl(url) {
  if (!url) return null; 
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
  const navigate = useNavigate();

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

  const handleClick = (catId) => {
    navigate(`/curso?cat=${catId}`);
  };

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
        {filtrados.map(g => {
          const embedUrl = getYoutubeEmbedUrl(g.video);
          
          return (
            <div key={g.id} className="glosario__item">
              
              {/* VIDEO O PLACEHOLDER */}
              {embedUrl ? (
                <div className="glosario__video">
                  <iframe
                    src={embedUrl}
                    title={`Video de ${g.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="glosario__video_placeholder"></div>
              )}

              {/* ----- ¡CAMBIO AQUÍ! ----- */}
              {/* Agrupamos el título y el botón */}
              <div className="glosario__item-content">
                <h4 className="glosario__item-title">{g.name}</h4>
                <button 
                  className="glosario__item-ver"
                  onClick={() => handleClick(g.id)}
                >
                  VER
                </button>
              </div>
              {/* ----- FIN DEL CAMBIO ----- */}

            </div>
          );
        })}
      </div>
    </section>
  );
}