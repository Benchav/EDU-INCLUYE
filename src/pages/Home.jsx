import React from 'react'
import '../styles/Home.css'

export default function Home() {
  return (
    <section className="home">
      <div className="home__content">
        <h2 className="home__title">EDU-INCLYE</h2>
        <p className="home__intro">
          Aquí aprenderás Lengua de Señas Nicaragüense paso a paso, con vídeos e imágenes.
        </p>

        <div className="home__hero">
          <img 
            src="https://www.tribuna.com.mx/u/fotografias/m/2024/6/10/f425x230-395971_409953_5050.jpg" 
            alt="Seña destacada" 
          />
        </div>

        <div className="home__actions">
          <button onClick={() => window.location.href = '/glosario'}>Categorías</button>
          <button onClick={() => window.location.href = '/curso'}>Ver cursos</button>
        </div>
      </div>
    </section>
  )
}