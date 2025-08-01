import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaHandPeace } from 'react-icons/fa';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <div className="footer__logo">
            <FaHandPeace className="footer__logo-icon" />
            <h3>EDU-INCLUYE</h3>
          </div>
          <p className="footer__description">
            Plataforma educativa para aprender Lengua de Señas Nicaragüense de forma accesible y divertida.
          </p>
        </div>
        
        <div className="footer__links">
          <h4 className="footer__heading">Contenido</h4>
          <ul className="footer__link-list">
            <li><a href="/glosario">Categorias</a></li>
            <li><a href="/curso">Cursos</a></li>
            <li><a href="/recursos">Recursos</a></li>
          </ul>
        </div>
        
        <div className="footer__links">
          <h4 className="footer__heading">Enlaces</h4>
          <ul className="footer__link-list">
            <li><a href="/acerca">Acerca de Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer__newsletter">
          <h4 className="footer__heading">Contacto</h4>
          <p>Recibe las últimas actualizaciones y recursos.</p>
          <form className="footer__form">
            <input type="email" placeholder="Tu correo electrónico" required />
            <button type="submit">Contactanos</button>
          </form>
        </div>
      </div>
      
      <div className="footer__socials">
        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
        <a href="#" aria-label="Twitter"><FaTwitter /></a>
        <a href="#" aria-label="YouTube"><FaYoutube /></a>
      </div>
      
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} EDU-Incluye. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
