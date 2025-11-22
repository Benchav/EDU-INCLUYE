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

  const [pdfAvailable, setPdfAvailable] = useState(null); // null = comprobando, true/false

  // Verifica si el PDF está servido correctamente (mejor para producción)
  useEffect(() => {
    let mounted = true;
    const url = '/Diccionario-LSN.pdf';

    async function checkPdf() {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (!mounted) return;
        const ct = res.headers.get('content-type') || '';
        setPdfAvailable(res.ok && ct.toLowerCase().includes('pdf'));
        return;
      } catch (e) {
        // fallback: algunos hosts bloquean HEAD, intentamos GET parcial
      }

      try {
        const res2 = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-1023' } });
        if (!mounted) return;
        const ct2 = res2.headers.get('content-type') || '';
        setPdfAvailable(res2.ok && ct2.toLowerCase().includes('pdf'));
      } catch (e2) {
        if (!mounted) return;
        setPdfAvailable(false);
      }
    }

    checkPdf();
    return () => { mounted = false; };
  }, []);

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
          {/* PDF integrado: Diccionario-LSN.pdf en public/ (vista previa si está disponible) */}
          <div className="recursos__card recursos__card--pdf">
            <h4 className="recursos__name">Diccionario LNS (PDF)</h4>
            <p className="recursos__desc">Consulta el diccionario en línea o descárgalo para uso offline.</p>

            {pdfAvailable === null && (
              <div className="recursos__pdf-checking">Comprobando vista previa del PDF…</div>
            )}

            {pdfAvailable === true && (
              <div className="recursos__pdf-wrapper">
                <iframe
                  src="/Diccionario-LSN.pdf#toolbar=0"
                  title="Diccionario LSN"
                  frameBorder="0"
                />
              </div>
            )}

            {pdfAvailable === false && (
              <div className="recursos__pdf-fallback">
                <p>La vista previa no está disponible en este entorno. Puedes descargar o abrir el PDF directamente.</p>
                <div className="recursos__pdf-actions--fallback">
                  <a className="recursos__btn recursos__btn--primary recursos__btn--large" href="/Diccionario-LSN.pdf" target="_blank" rel="noopener noreferrer">Abrir PDF</a>
                  <a className="recursos__btn recursos__btn--large" href="/Diccionario-LSN.pdf" download>Descargar PDF</a>
                </div>
              </div>
            )}

            {/* Acciones siempre disponibles */}
            <div className="recursos__pdf-actions" aria-hidden={pdfAvailable === false ? 'true' : 'false'}>
              <a className="recursos__btn recursos__btn--primary" href="/Diccionario-LSN.pdf" target="_blank" rel="noopener noreferrer">Abrir en nueva pestaña</a>
              <a className="recursos__btn" href="/Diccionario-LSN.pdf" download>Descargar PDF</a>
            </div>
          </div>

          {/* Contenido demostrativo adicional */}
          <div className="recursos__card">
            <h4 className="recursos__name">Guía de buenas prácticas</h4>
            <p className="recursos__desc">Pequeña guía con recomendaciones para aprender LNS de forma efectiva.</p>
            <a className="recursos__btn" href="#">Ver recurso</a>
          </div>

          <div className="recursos__card">
            <h4 className="recursos__name">Lista de actividades</h4>
            <p className="recursos__desc">Actividades sugeridas para practicar señales en casa.</p>
            <a className="recursos__btn" href="#">Ver actividad</a>
          </div>
        </div>
      </div>
    </section>
  );
}