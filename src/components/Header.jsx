// src/components/Header.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleLogout = () => {
    // 1. Eliminar token
    localStorage.removeItem('token');
    // 2. Cerrar menú
    setMenuOpen(false);
    // 3. Redirigir al login (replace evita volver atrás)
    navigate('/login', { replace: true });
  };

  // Saber si hay sesión activa
  const isLogged = !!localStorage.getItem('token');

  return (
    <header className="header">
      <div className="header__logo">
        <h1>EDU-INCLUYE</h1>
      </div>

      <button
        className={`header__toggle ${menuOpen ? 'is-active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menú"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
        {isLogged && (
          <>
            <NavLink to="/"      end        className="nav__link" onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/glosario"           className="nav__link" onClick={toggleMenu}>Categorías</NavLink>
            <NavLink to="/curso"              className="nav__link" onClick={toggleMenu}>Cursos</NavLink>
            <NavLink to="/recursos"           className="nav__link" onClick={toggleMenu}>Recursos</NavLink>
            <NavLink to="/contacto"           className="nav__link" onClick={toggleMenu}>Contacto</NavLink>

            <button
              className="nav__link logout-button"
              onClick={handleLogout}
              type="button"
            >
              Salir
            </button>
          </>
        )}

        {!isLogged && (
          <>
            <NavLink to="/login" className="nav__link" onClick={toggleMenu}>Iniciar Sesión</NavLink>
            <NavLink to="/register" className="nav__link" onClick={toggleMenu}>Registrarse</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}