// src/pages/Recursos.jsx
import React, { useState, useEffect } from 'react';
import { getPodcasts } from '../services/api';
import { FaDownload, FaExternalLinkAlt, FaVideo, FaFilePdf, FaBookOpen } from 'react-icons/fa';
import '../styles/Recursos.css';

// Convierte enlaces de YouTube a URL embed
function getEmbeddedUrl(url) {
  if (!url) return null;
  const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  const watchMatch  = url.match(/(?:watch\?v=)([\w-]+)/);
  const shortyMatch = url.match(/youtu\.be\/([\w-]+)/);
  const id = shortsMatch?.[1] || watchMatch?.[1] || shortyMatch?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

// Componente Skeleton (Carga)
const SkeletonCard = () => (
  <div className="recursos__card recursos__card--skeleton">
    <div className="skeleton-media"></div>
    <div className="skeleton-text title"></div>
    <div className="skeleton-text desc"></div>
  </div>
);

export default function Recursos() {
  const [podcasts, setPodcasts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    getPodcasts()
      .then((data) => {
        setPodcasts(data);
      })
      .catch(err => {
        console.error('Error cargando recursos:', err);
        setError('No se pudieron cargar los recursos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error) return <p className="recursos__error">{error}</p>;

  return (
    <section className="recursos">
      <div className="recursos__header">
        <h2 className="recursos__title">Biblioteca de Recursos</h2>
        <p className="recursos__subtitle">Material complementario para tu aprendizaje</p>
      </div>

      {/* Sección: Podcasts / Videos */}
      <div className="recursos__section">
        <div className="section-title-wrapper">
          <FaVideo className="section-icon" />
          <h3>Podcasts y Videos</h3>
        </div>
        
        <div className="recursos__grid">
          {loading ? (
            [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            podcasts.map((p, i) => {
              const embedUrl = getEmbeddedUrl(p.video || p.videoUrl);
              return (
                <div key={i} className="recursos__card">
                  <div className="recursos__media-container">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={p.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="recursos__video"
                      />
                    ) : (
                      <div className="recursos__placeholder">
                        <FaVideo />
                        <span>Video no disponible</span>
                      </div>
                    )}
                  </div>
                  <div className="recursos__card-content">
                    <h4 className="recursos__name">{p.title}</h4>
                    <p className="recursos__desc">{p.description}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Sección: Materiales Didácticos */}
      <div className="recursos__section">
        <div className="section-title-wrapper">
          <FaBookOpen className="section-icon" />
          <h3>Materiales Didácticos</h3>
        </div>

        <div className="recursos__grid">
          
          {/* Tarjeta PDF */}
          <div className="recursos__card">
            <div className="recursos__media-container icon-bg pdf-bg">
              <FaFilePdf className="recursos__big-icon" />
            </div>
            <div className="recursos__card-content">
              <h4 className="recursos__name">Diccionario LNS</h4>
              <p className="recursos__desc">Descarga el diccionario oficial en formato PDF para estudiar offline.</p>
              <a className="recursos__btn recursos__btn--primary" href="/Diccionario-LSN.pdf" download>
                <FaDownload /> Descargar PDF
              </a>
            </div>
          </div>

          {/* Tarjeta Guía */}
          <div className="recursos__card">
            <div className="recursos__media-container">
              <img 
                className="recursos__img" 
                src="https://intranet.cali.gov.co/wp-content/uploads/2023/12/BoletinIntranet_BancoBuenasPracticas.jpg" 
                alt="Guía" 
              />
            </div>
            <div className="recursos__card-content">
              <h4 className="recursos__name">Guía de Prácticas</h4>
              <p className="recursos__desc">Recomendaciones esenciales para mejorar tu fluidez.</p>
              <a className="recursos__btn recursos__btn--outline" href="/practica">
                <FaExternalLinkAlt /> Ir a Práctica
              </a>
            </div>
          </div>

          {/* Tarjeta Actividades */}
          <div className="recursos__card">
            <div className="recursos__media-container">
              <img 
                className="recursos__img" 
                src="https://res.cloudinary.com/postedin/image/upload/postedin/c-1504907191_476c68a7-a51b-4102-97e6-5353c56e9def_3158" 
                alt="Actividades" 
              />
            </div>
            <div className="recursos__card-content">
              <h4 className="recursos__name">Actividades en Casa</h4>
              <p className="recursos__desc">Ejercicios diarios para reforzar lo aprendido.</p>
              <a className="recursos__btn recursos__btn--outline" href="/glosario">
                <FaExternalLinkAlt /> Ver Categorías
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}