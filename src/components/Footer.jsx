// src/components/Footer.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
// ¡NUEVO! Importamos iconos de app
import { 
  HiOutlineHome, 
  HiOutlineViewGrid, 
  HiOutlineBookOpen, 
  HiOutlinePencilAlt, 
  HiOutlineCollection 
} from 'react-icons/hi';
import '../styles/Footer.css'; // Usará el nuevo CSS

export default function Footer() {
  const isLogged = !!localStorage.getItem('token');

  // Si el usuario NO ha iniciado sesión, no se muestra la barra de navegación.
  if (!isLogged) {
    return null; 
  }

  // ¡NUEVO! Esta es la nueva estructura de barra de navegación
  return (
    <footer className="footer-nav"> {/* Clase principal para la barra */}
      
      {/* Enlace a Home (¡NUEVO!) */}
      <NavLink to="/home" className="footer-nav__link" end>
        <HiOutlineHome className="footer-nav__icon" />
        <span className="footer-nav__text">Home</span>
      </NavLink>

      <NavLink to="/glosario" className="footer-nav__link">
        <HiOutlineViewGrid className="footer-nav__icon" />
        <span className="footer-nav__text">Categorías</span>
      </NavLink>

      <NavLink to="/curso" className="footer-nav__link">
        <HiOutlineBookOpen className="footer-nav__icon" />
        <span className="footer-nav__text">Cursos</span>
      </NavLink>

      <NavLink to="/practica" className="footer-nav__link">
        <HiOutlinePencilAlt className="footer-nav__icon" />
        <span className="footer-nav__text">Práctica</span>
      </NavLink>

      <NavLink to="/recursos" className="footer-nav__link">
        <HiOutlineCollection className="footer-nav__icon" />
        <span className="footer-nav__text">Recursos</span>
      </NavLink>

    </footer>
  );
}