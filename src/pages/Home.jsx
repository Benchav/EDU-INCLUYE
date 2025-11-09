import React from 'react'
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate(); // Hook para navegación

  return (
    <section className="home">
      <div className="home__content">
        
        {/* --- Columna 1: Texto y Botones --- */}
        <div className="home__text-content">
          <h2 className="home__title">EDU-INCLUYE</h2>
          <p className="home__intro">
            Aquí aprenderás Lengua de Señas Nicaragüense paso a paso, con vídeos e imágenes.
          </p>
      {/*   <div className="home__actions">
            <button 
              className="home__btn-primary" 
              onClick={() => navigate('/glosario')}
            >
              Ver Categorías
            </button>
            <button 
      
            className="home__btn-primary"
              onClick={() => navigate('/curso')}
            >
              Ver Cursos
            </button>
             <button 
              className="home__btn-primary" 
              onClick={() => navigate('/practica')}
            >
              Practicar
            </button>
          </div> */}
        </div>

        {/* --- Columna 2: Visual (Logo) --- */}
        <div className="home__visual-content">
          <div className="home__hero-image-container">
            <img 
              src="https://i.ibb.co/LyxKpZD/logo.png"
              alt="Logo EDU-INCLUYE" 
              className="home__hero-img"
            />
          </div>
        </div>

      </div>
    </section>
  )
}