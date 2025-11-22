// src/pages/Recursos.jsx
import React, { useState, useEffect } from 'react';
import {  getPodcasts } from '../services/api';
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

// Componente Skeleton Card (Placeholder)
const SkeletonCard = () => (
  <div className="recursos__card recursos__card--skeleton">
    <div className="recursos__img-skeleton"></div>
    <div className="recursos__text-skeleton"></div>
    <div className="recursos__text-skeleton short"></div>
  </div>
);

export default function Recursos() {
 // const [graduates, setGraduates] = useState([]);
  const [podcasts, setPodcasts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    Promise.all([getPodcasts() ])
      .then(([ pods]) => {
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

  // Nota: preview de PDF deshabilitado en producción — solo ofrecemos descarga.

  if (loading) {
    return (
      <section className="recursos">
        <h2 className="recursos__title">Recursos</h2>

        {/* <div className="recursos__section">
          <h3>Egresados Destacados</h3>
          <div className="recursos__grid">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>  */}

        <div className="recursos__section">
          <h3>Podcasts</h3>
          <div className="recursos__grid">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <p className="recursos__error">{error}</p>;

  return (
    <section className="recursos">
      <h2 className="recursos__title">Recursos</h2>

      {/* Egresados Destacados */}
      {/* <div className="recursos__section">
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
      </div> */}

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

      {/* Materiales / PDF demostrativo */}
      <div className="recursos__section">
        <h3>Materiales</h3>
        <div className="recursos__grid">
          {/* PDF: mostrar solo título, descripción y botón de descarga (sin preview) */}
          <div className="recursos__card recursos__card--pdf">
            <h4 className="recursos__name">Diccionario LNS (PDF)</h4>
            <p className="recursos__desc">Consulta el diccionario: descarga el PDF para verlo en tu dispositivo.</p>

            <div className="recursos__pdf-actions--fallback">
              <a className="recursos__btn recursos__btn--primary recursos__btn--large" href="/Diccionario-LSN.pdf" download>Descargar PDF</a>
            </div>
          </div>

          {/* Contenido demostrativo adicional con imágenes */}
          <div className="recursos__card recursos__card--media">
            <img className="recursos__card-img" src="https://intranet.cali.gov.co/wp-content/uploads/2023/12/BoletinIntranet_BancoBuenasPracticas.jpg" alt="Guía de buenas prácticas" />
            <div className="recursos__card-body">
              <h4 className="recursos__name">Guía de buenas prácticas</h4>
              <p className="recursos__desc">Pequeña guía con recomendaciones para aprender LNS de forma efectiva.</p>
              <a className="recursos__btn recursos__btn--outline" href="/practica">Ver recurso</a>
            </div>
          </div>

          <div className="recursos__card recursos__card--media">
            <img className="recursos__card-img" src="https://res.cloudinary.com/postedin/image/upload/postedin/c-1504907191_476c68a7-a51b-4102-97e6-5353c56e9def_3158" alt="Lista de actividades" />
            <div className="recursos__card-body">
              <h4 className="recursos__name">Lista de actividades</h4>
              <p className="recursos__desc">Actividades sugeridas para practicar señales en casa.</p>
              <a className="recursos__btn recursos__btn--outline" href="/glosario">Ver actividad</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}