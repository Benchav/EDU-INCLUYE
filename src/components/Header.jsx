// src/components/Header.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Usará el nuevo CSS

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem('token');

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false); // Cierra el menú al hacer clic

  const handleLogout = () => {
    localStorage.removeItem('token');
    closeMenu();
    navigate('/', { replace: true }); // Navega a la raíz (Login)
  };

  return (
    <header className="header">
      <div className="header__content">
        
        {/* --- 1. LOGO MEJORADO (IMAGEN + TEXTO) --- */}
        <NavLink 
          to={isLogged ? "/home" : "/"} 
          className="header__logo-link"
          onClick={closeMenu}
        >
          <img 
            src="https://i.ibb.co/LyxKpZD/logo.png" 
            alt="EDU-INCLUYE Logo" 
            className="header__logo-img" 
          />
          <span className="header__logo-text">EDU-INCLUYE</span>
        </NavLink>

        {/* --- 2. BOTÓN HAMBURGUESA --- */}
        <button
          className={`header__toggle ${menuOpen ? 'is-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* --- 3. NAVEGACIÓN --- */}
        <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
          {isLogged ? (
            <>
              <NavLink to="/home" end className="header__nav-link" onClick={closeMenu}>Home</NavLink>
              <NavLink to="/glosario" className="header__nav-link" onClick={closeMenu}>Categorías</NavLink>
              <NavLink to="/curso" className="header__nav-link" onClick={closeMenu}>Cursos</NavLink>
              
              {/* --- ¡AQUÍ ESTÁ EL CAMBIO! --- */}
              <NavLink to="/practica" className="header__nav-link" onClick={closeMenu}>Práctica</NavLink>

              <NavLink to="/recursos" className="header__nav-link" onClick={closeMenu}>Recursos</NavLink>
              {/* <NavLink to="/contacto" className="header__nav-link" onClick={closeMenu}>Contacto</NavLink> */}
              
              <button
                className="header__nav-button header__nav-button--secondary"
                onClick={handleLogout}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" className="header__nav-link" onClick={closeMenu}>Iniciar Sesión</NavLink>
              
              <NavLink 
                to="/register" 
                className="header__nav-button header__nav-button--primary" 
                onClick={closeMenu}
              >
                Registrarse
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}