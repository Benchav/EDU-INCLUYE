import React, { useState, useEffect } from 'react';
import {
  getCategories,
  getContentByCategory
} from '../services/api';
import { useSearchParams } from 'react-router-dom';
import '../styles/Curso.css';

function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  let match = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  if (!match) match = url.match(/(?:watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function Curso() {
  const [searchParams] = useSearchParams();
  const initialCatId = searchParams.get('cat');  // id de categoría desde la URL

  const [categories, setCategories] = useState([]);
  const [items, setItems]           = useState([]);
  const [activeCat, setActiveCat]   = useState(initialCatId);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const cats = await getCategories();
        setCategories(cats);

        if (initialCatId) {
          await loadCategory(initialCatId);
        } else if (cats.length) {
          // Si no hay parámetro, carga la primera categoría por defecto
          await loadCategory(cats[0].id);
        }
      } catch {
        setError('Error inicializando contenido');
      } finally {
        setLoading(false);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCatId]);

  /** Carga y muestra los items de una categoría */
  const loadCategory = async (catId) => {
    setActiveCat(catId);
    setLoading(true);
    setError(null);
    try {
      const data = await getContentByCategory(catId);
      setItems(data);
    } catch {
      setError('Error cargando contenidos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="curso__msg">Cargando contenidos…</p>;
  if (error)   return <p className="curso__msg curso__error">{error}</p>;

  return (
    <div className="curso-page">
      <div className="curso__filters">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${activeCat===cat.id?'active':''}`}
            onClick={() => loadCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="curso__grid">
        {items.map(item => {
          const embedUrl = getYoutubeEmbedUrl(item.video);
          return (
            <div key={item.id} className="curso__card">
              <h3 className="curso__card-title">{item.name}</h3>
              {(item.image || item.mediaUrl) && (
                <img
                  src={item.image || item.mediaUrl}
                  alt={item.name}
                  className="curso__card-img"
                />
              )}
              <p className="curso__card-desc">{item.description}</p>

              {embedUrl && (
                <div className="curso__video">
                  <iframe
                    src={embedUrl}
                    title={item.name}
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
    </div>
  );
}