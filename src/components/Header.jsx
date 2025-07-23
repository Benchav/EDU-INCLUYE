import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        {/* Aquí tu logo o nombre */}
        <h1>EDU-INCLUYE</h1>
      </div>
      <nav className="header__nav">
        <NavLink to="/" end className="nav__link">Home</NavLink>
        <NavLink to="/curso" className="nav__link">Curso</NavLink>
        {/* <NavLink to="/practica" className="nav__link">Practica</NavLink>*/}
        <NavLink to="/glosario" className="nav__link">Categorias</NavLink>
        <NavLink to="/contacto" className="nav__link">Contacto</NavLink>
      </nav>
    </header>
  )
}
