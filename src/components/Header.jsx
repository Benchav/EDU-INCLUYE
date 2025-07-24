import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleLogout = () => {
    alert('Has salido de la app');
    window.location.href = '/login';
  };

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
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className="nav__link" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/glosario" className="nav__link" onClick={() => setMenuOpen(false)}>Categorías</NavLink>
        <NavLink to="/curso" className="nav__link" onClick={() => setMenuOpen(false)}>Cursos</NavLink>
        <NavLink to="/recursos" className="nav__link" onClick={() => setMenuOpen(false)}>Recursos</NavLink>
        <NavLink to="/contacto" className="nav__link" onClick={() => setMenuOpen(false)}>Contacto</NavLink>

        <button
          className="nav__link logout-button"
          onClick={() => {
            setMenuOpen(false);
            handleLogout();
          }}
          type="button"
        >
          Salir
        </button>
      </nav>
    </header>
  );
}
