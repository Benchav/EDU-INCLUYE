import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Curso from './pages/Curso';
import Leccion from './pages/Leccion';
import Glosario from './pages/Glosario';
import Contacto from './pages/Contacto';
import Practica from './pages/Practica';
import './styles/App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curso" element={<Curso />} />
          <Route path="/curso/:leccionId" element={<Leccion />} />
          <Route path="/glosario" element={<Glosario />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/practica" element={<Practica />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}