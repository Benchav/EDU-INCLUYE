import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/api';
import '../styles/Glosario.css';

// Función optimizada para obtener solo el ID del video
function getYoutubeId(url) {
  if (!url) return null;
  const shorts = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  const watch  = url.match(/(?:watch\?v=|youtu\.be\/)([\w-]+)/);
  return (shorts && shorts[1]) || (watch && watch[1]) || null;
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

    // 1. OPTIMIZACIÓN DE CACHÉ:
    // Revisamos si ya tenemos los datos guardados para mostrarlos de inmediato
    const cachedData = sessionStorage.getItem('categorias_cache');
    if (cachedData) {
      setItems(JSON.parse(cachedData));
      setLoading(false); // Ya no mostramos carga si tenemos datos
    }

    // De todos modos pedimos a la API para actualizar (stale-while-revalidate)
    // Si no había caché, el loading sigue en true hasta que esto termine.
    getCategories()
      .then(data => {
        setItems(data);
        // Guardamos en caché para la próxima vez
        sessionStorage.setItem('categorias_cache', JSON.stringify(data));
      })
      .catch(err => {
        console.error('Error al cargar categorías:', err);
        // Solo mostramos error si no teníamos datos en caché
        if (!cachedData) setError('No se pudo cargar las categorías');
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="glosario__msg">Cargando categorías...</p>;
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
          // 2. OPTIMIZACIÓN VISUAL: Usamos el ID para obtener la imagen
          const videoId = getYoutubeId(g.video);
          // URL de la miniatura de alta calidad de YouTube
          const thumbnailUrl = videoId 
            ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` 
            : null;
          
          return (
            <div key={g.id} className="glosario__item">
              
              {/* Muestra IMAGEN en lugar de IFRAME pesado */}
              <div className="glosario__video">
                {thumbnailUrl ? (
                  <img 
                    src={thumbnailUrl} 
                    alt={`Vista previa de ${g.name}`}
                    loading="lazy" /* Carga diferida nativa */
                    className="glosario__thumb-img"
                  />
                ) : (
                  <div className="glosario__video_placeholder"></div>
                )}
              </div>

              <div className="glosario__item-content">
                <h4 className="glosario__item-title">{g.name}</h4>
                <button 
                  className="glosario__item-ver"
                  onClick={() => handleClick(g.id)}
                >
                  VER
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}