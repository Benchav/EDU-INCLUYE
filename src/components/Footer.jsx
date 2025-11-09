// src/components/Footer.jsx
import React, { useState, useEffect } from 'react'; // ¡CAMBIO!
import { NavLink, useLocation } from 'react-router-dom'; // ¡CAMBIO!
import { 
  HiOutlineHome, 
  HiOutlineViewGrid, 
  HiOutlineBookOpen, 
  HiOutlinePencilAlt, 
  HiOutlineCollection 
} from 'react-icons/hi';
import '../styles/Footer.css'; 

export default function Footer() {
  // --- ¡LÓGICA MEJORADA! ---
  const location = useLocation(); // 1. Obtiene la ubicación actual
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token')); // 2. Crea un estado

  // 3. Este "efecto" se ejecuta CADA VEZ que la ruta (location.pathname) cambia
  useEffect(() => {
    setIsLogged(!!localStorage.getItem('token'));
  }, [location.pathname]);
  // --- FIN DE LA MEJORA ---


  // Ahora, la barra de navegación reaccionará al estado "isLogged"
  if (!isLogged) {
    return null; 
  }

  return (
    <footer className="footer-nav">
      
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