import React, { useState, useEffect } from 'react';
import { getCategories, getContentByCategory } from '../services/api';
import { useSearchParams, useNavigate } from 'react-router-dom'; 
import '../styles/Curso.css';

function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  // Soporte para shorts, watch?v= y youtu.be/
  let match = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  if (!match) match = url.match(/(?:watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function Curso() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const initialCatId = searchParams.get('cat');

  const [categories, setCategories] = useState([]);
  const [items, setItems]           = useState([]);
  const [progressMap, setProgressMap] = useState({}); 
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
        } else {
          // Si no hay categoría, limpiamos items
          setItems([]);
        }
      } catch (err) {
        console.error(err);
        setError('Error inicializando contenido');
      } finally {
        setLoading(false);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCatId]);

  // Actualizar título del navegador
  useEffect(() => {
    if (!initialCatId || categories.length === 0) return;
    const cat = categories.find(c => String(c.id) === String(initialCatId));
    if (cat && cat.name) {
      document.title = `${cat.name} — EDU-INCLUYE`;
    } else {
      document.title = 'Curso — EDU-INCLUYE';
    }
  }, [initialCatId, categories]);

  const loadCategory = async (catId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContentByCategory(catId);
      setItems(data);
    } catch (err) {
      console.error(err);
      setError('Error cargando contenidos');
    } finally {
      setLoading(false);
    }
  };

  // Manejo de progreso (LocalStorage)
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

  // Botón regresar inteligente
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/glosario');
    }
  };

  if (loading) return <div className="curso-page"><p className="curso__msg">Cargando contenidos...</p></div>;
  if (error)   return <div className="curso-page"><p className="curso__msg curso__error">{error}</p></div>;

  // Nombre de la categoría actual para el título
  const currentCategory = categories.find(c => String(c.id) === String(initialCatId));
  const categoryTitle = currentCategory ? currentCategory.name : 'Contenido';

  return (
    <div className="curso-page">
      {!initialCatId && (
        <div className="curso__empty">
          <p>Seleccione una categoría para ver su contenido.</p>
          <button className="filter-btn active" onClick={() => navigate('/glosario')}>Ir a Categorías</button>
        </div>
      )}

      {initialCatId && (
        <div className="curso__category-view">
          {/* Cabecera con botón y título alineados */}
          <div className="curso__top">
            <button className="curso__back" onClick={handleBack}>
              ← Regresar
            </button>
            <h2 className="curso__category-title">{categoryTitle}</h2>
          </div>

          <div className="curso__grid">
            {items.map(item => {
              // --- NORMALIZACIÓN DE DATOS (AQUÍ ESTÁ LA MAGIA) ---
              // Esto asegura que funcione igual para "Señas" o "Alfabeto"
              const embedUrl = getYoutubeEmbedUrl(item.video || item.videoUrl || item.url);
              const imageUrl = item.image || item.mediaUrl || item.img || item.thumbnail; 
              const title = item.name || item.titulo || item.palabra || 'Lección';
              const description = item.description || item.descripcion || item.desc || 'Aprende paso a paso';
              const percent = progressMap[item.id] || 0;
              // ---------------------------------------------------

              return (
                <div key={item.id} className="curso__card">
                  {/* Contenedor Multimedia (Siempre mide lo mismo) */}
                  <div className="curso__card-media">
                    {embedUrl ? (
                      <div className="curso__video">
                        <iframe
                          src={embedUrl}
                          title={title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : imageUrl ? (
                      <>
                        <img
                          src={imageUrl}
                          alt={title}
                          className="curso__card-img"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            // Mostrar placeholder si falla la imagen
                            if (e.currentTarget.nextSibling) {
                              e.currentTarget.nextSibling.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="curso__card-placeholder" style={{ display: 'none' }}>
                          Imagen no disponible
                        </div>
                      </>
                    ) : (
                      <div className="curso__card-placeholder">
                        Multimedia no disponible
                      </div>
                    )}
                  </div>

                  {/* Contenido Texto */}
                  <div className="curso__card-body">
                    <h3 className="curso__card-title">{title}</h3>
                    <p className="curso__card-desc">{description}</p>
                  </div>

                  {/* Barra de Progreso y Botones */}
                  <div className="curso__item-progress">
                    <div 
                      className="curso__item-progress-bar" 
                      role="progressbar" 
                      aria-valuemin={0} 
                      aria-valuemax={100} 
                      aria-valuenow={percent}
                    >
                      <div 
                        className="curso__item-progress-fill" 
                        style={{ width: `${percent}%` }} 
                      />
                    </div>
                    <div className="curso__item-progress-actions">
                      {percent < 100 ? (
                        <button 
                          className="curso__mark-btn" 
                          onClick={() => setItemProgress(item.id, 100)}
                        >
                          Marcar visto
                        </button>
                      ) : (
                        <span className="curso__seen">Visto ✓</span>
                      )}
                      <button 
                        className="curso__reset-btn" 
                        title="Reiniciar progreso" 
                        onClick={() => setItemProgress(item.id, 0)}
                      >
                        ⟲
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}