// src/pages/Recursos.jsx
import React, { useState, useEffect } from 'react';
import { getGraduates, getPodcasts } from '../services/api';
import '../styles/Recursos.css';

// Convierte enlaces de YouTube (shorts, watch, youtu.be) a URL embed
function getEmbeddedUrl(url) {
  if (!url) return null;
  const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  const watchMatch  = url.match(/(?:watch\?v=)([\w-]+)/);
  const shortyMatch = url.match(/youtu\.be\/([\w-]+)/);
  const id = shortsMatch?.[1] || watchMatch?.[1] || shortyMatch?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export default function Recursos() {
  const [graduates, setGraduates] = useState([]);
  const [podcasts, setPodcasts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    Promise.all([ getGraduates(), getPodcasts() ])
      .then(([grads, pods]) => {
        setGraduates(grads);
        setPodcasts(pods);
      })
      .catch(err => {
        console.error('Error cargando recursos:', err);
        setError('No se pudieron cargar los recursos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="recursos__loading">Cargando recursos…</p>;
  if (error)   return <p className="recursos__error">{error}</p>;

  return (
    <section className="recursos">
      <h2 className="recursos__title">Recursos</h2>

      {/* Egresados Destacados */}
      <div className="recursos__section">
        <h3>Egresados Destacados</h3>
        <div className="recursos__grid">
          {graduates.map((g, i) => (
            <div key={i} className="recursos__card">
              {g.image && (
                <img src={g.image} alt={g.name} className="recursos__img" />
              )}
              <h4 className="recursos__name">{g.name}</h4>
              <p className="recursos__desc">
                {g.discapacidad || g.title || g.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Podcasts con video de YouTube */}
      <div className="recursos__section">
        <h3>Podcasts</h3>
        <div className="recursos__grid">
          {podcasts.map((p, i) => {
            const embedUrl = getEmbeddedUrl(p.video || p.videoUrl);
            return (
              <div key={i} className="recursos__card">
                <h4 className="recursos__name">{p.title}</h4>
                <p className="recursos__desc">{p.description}</p>

                {embedUrl ? (
                  <div className="recursos__video-wrapper">
                    <iframe
                      width="100%"
                      height="200"
                      src={embedUrl}
                      title={`Video – ${p.title}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <p className="recursos__no-video">No hay video disponible.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
