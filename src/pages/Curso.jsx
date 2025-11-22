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
  const [progressMap, setProgressMap] = useState({}); // per-item progress: { [itemId]: percent }
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
          // En lugar de cargar automáticamente la primera categoría, redirigimos
          // al listado de categorías para evitar confusión.
          // navigate(`/curso?cat=${cats[0].id}`);
          // Si no se proporciona 'cat' mostramos una vista vacía con instrucción.
          setItems([]);
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

  // Actualizar el título del documento al nombre de la categoría seleccionada
  useEffect(() => {
    if (!initialCatId) return;
    const prevTitle = document.title;
    const cat = categories.find(c => String(c.id) === String(initialCatId));
    if (cat && cat.name) {
      document.title = `${cat.name} — EDU-INCLUYE`;
    }
    return () => { document.title = prevTitle; };
  }, [initialCatId, categories]);

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

  // Cargar progreso por item desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cursoProgress');
      if (raw) setProgressMap(JSON.parse(raw));
    } catch (e) {
      setProgressMap({});
    }
  }, []);

  const persistProgressMap = (map) => {
    try { localStorage.setItem('cursoProgress', JSON.stringify(map)); } catch (e) {}
  };

  const setItemProgress = (itemId, percent) => {
    setProgressMap(prev => {
      const next = { ...prev, [itemId]: Math.max(0, Math.min(100, Number(percent) || 0)) };
      persistProgressMap(next);
      return next;
    });
  };

  if (loading) return <p className="curso__msg">Cargando contenidos…</p>;
  if (error)   return <p className="curso__msg curso__error">{error}</p>;
  return (
    <div className="curso-page">
      {/* Si no hay categoria seleccionada (no ?cat=), mostramos instrucción */}
      {!initialCatId && (
        <div className="curso__empty">
          <p>Seleccione una categoría desde la sección <strong>Categorías</strong> para ver su contenido.</p>
        </div>
      )}

      {initialCatId && (
        <div className="curso__category-view">
          <div className="curso__top">
            <button className="curso__back" onClick={() => window.history.back()}>← Regresar</button>
            <h2 className="curso__category-title">{(categories.find(c => String(c.id) === String(initialCatId)) || {}).name || 'Contenido'}</h2>
          </div>

          <div className="curso__grid">
            {items.map(item => {
              const embedUrl = getYoutubeEmbedUrl(item.video);
              const percent = progressMap[item.id] || 0;
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

                  <div className="curso__item-progress">
                    <div className="curso__item-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
                      <div className="curso__item-progress-fill" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="curso__item-progress-actions">
                      {percent < 100 ? (
                        <button className="curso__mark-btn" onClick={() => setItemProgress(item.id, 100)}>Marcar visto</button>
                      ) : (
                        <span className="curso__seen">Visto ✓</span>
                      )}
                      <button className="curso__reset-btn" title="Reiniciar progreso" onClick={() => setItemProgress(item.id, 0)}>⟲</button>
                    </div>
                  </div>

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
      )}
    </div>
  );
}