import React from 'react';
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'; // Iconos no usados
import '../styles/Footer.css'; // Usará el nuevo CSS

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        
        {/* --- MARCA (AHORA CONSISTENTE CON EL HEADER) --- */}
        <div className="footer__brand">
          <div className="footer__logo">
            <img 
              src="https://i.ibb.co/LyxKpZD/logo.png" 
              alt="EDU-INCLUYE Logo" 
              className="footer__logo-img" 
            />
            <span className="footer__logo-text">EDU-INCLUYE</span>
          </div>
          <p className="footer__description">
            Plataforma educativa para aprender Lengua de Señas Nicaragüense de forma accesible y divertida.
          </p>
        </div>
        
        {/* --- ENLACES (SIN CAMBIOS) --- */}
        <div className="footer__links">
          <h4 className="footer__heading">Enlaces</h4>
          <ul className="footer__link-list">
            <li><a href="/glosario">Categorías</a></li>
            <li><a href="/curso">Cursos</a></li>
            <li><a href="/recursos">Recursos</a></li>
          </ul>
        </div>
        
        {/* Secciones comentadas (sin cambios) */}
        
      </div>
      
      {/* --- COPYRIGHT --- */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} EDU-Incluye. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}