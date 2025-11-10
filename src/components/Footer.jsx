import React, { useState, useEffect } from 'react'; 
import { NavLink, useLocation } from 'react-router-dom'; 
import { 
  HiOutlineHome, 
  HiOutlineViewGrid, 
  HiOutlineBookOpen, 
  HiOutlinePencilAlt, 
  HiOutlineCollection 
} from 'react-icons/hi';
import '../styles/Footer.css'; 

export default function Footer() {

  const location = useLocation(); 
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token')); 

  useEffect(() => {
    setIsLogged(!!localStorage.getItem('token'));
  }, [location.pathname]);



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
        <span className="footer-nav__text">Practica</span>
      </NavLink>

      <NavLink to="/recursos" className="footer-nav__link">
        <HiOutlineCollection className="footer-nav__icon" />
        <span className="footer-nav__text">Recursos</span>
      </NavLink>

    </footer>
  );
}