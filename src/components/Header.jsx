// src/components/Header.jsx
import React, { useState, useEffect } from 'react'; // ¡CAMBIO!
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; // ¡CAMBIO!
import '../styles/Header.css'; 
import InstallPWAButton from './InstallPWAButton';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // --- ¡LÓGICA MEJORADA! ---
  const location = useLocation(); // 1. Obtiene la ubicación actual
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token')); // 2. Crea un estado

  // 3. Este "efecto" se ejecuta CADA VEZ que la ruta (location.pathname) cambia
  useEffect(() => {
    setIsLogged(!!localStorage.getItem('token'));
  }, [location.pathname]);
  // --- FIN DE LA MEJORA ---

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogged(false); // ¡CAMBIO! Actualiza el estado al salir
    closeMenu();
    navigate('/', { replace: true }); 
  };

  return (
    <header className="header">
      <div className="header__content">
        
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

        <button
          className={`header__toggle ${menuOpen ? 'is-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Ahora el menú reaccionará al estado "isLogged" */}
        <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
          {isLogged ? (
            <>
              <NavLink to="/home" end className="header__nav-link" onClick={closeMenu}>Home</NavLink>
              <NavLink to="/glosario" className="header__nav-link" onClick={closeMenu}>Categorías</NavLink>
              <NavLink to="/curso" className="header__nav-link" onClick={closeMenu}>Cursos</NavLink>
              <NavLink to="/practica" className="header__nav-link" onClick={closeMenu}>Práctica</NavLink>
              <NavLink to="/recursos" className="header__nav-link" onClick={closeMenu}>Recursos</NavLink>
              
              <InstallPWAButton />

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
              
              <InstallPWAButton />

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