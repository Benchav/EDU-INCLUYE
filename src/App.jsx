import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header   from './components/Header';
import Footer   from './components/Footer';
import Home     from './pages/Home';
import Login    from './pages/Login';
import Register from './pages/Register';
import Curso    from './pages/Curso';
import Leccion  from './pages/Leccion';
import Glosario from './pages/Glosario';
import Contacto from './pages/Contacto';
import Practica from './pages/Practica';
import Recursos from './pages/Recursos';
import './styles/App.css';

// Componente para proteger rutas privadas
// (Este ya estaba bien)
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />; // Redirige a / (Login)
}

// NUEVO: Componente para rutas públicas (Login/Register)
// Si el usuario ya está logueado, lo redirige a /home
function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/home" replace />;
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          {/* Rutas Públicas: Redirigen a /home si ya estás logueado */}
          
          {/* AHORA / es la ruta de Login */}
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          {/* /login redirige a / para evitar rutas duplicadas */}
          <Route path="/login" element={<Navigate to="/" replace />} />


          {/* Rutas Privadas: Redirigen a / (Login) si NO estás logueado */}
          <Route path="/home"       element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/curso"      element={<PrivateRoute><Curso /></PrivateRoute>} />
          <Route path="/curso/:leccionId" element={<PrivateRoute><Leccion /></PrivateRoute>} />
          <Route path="/glosario"   element={<PrivateRoute><Glosario /></PrivateRoute>} />
          <Route path="/contacto"   element={<PrivateRoute><Contacto /></PrivateRoute>} />
          <Route path="/practica"   element={<PrivateRoute><Practica /></PrivateRoute>} />
          <Route path="/recursos"   element={<PrivateRoute><Recursos /></PrivateRoute>} />
          
          {/* Ruta comodín: Redirige a la raíz (que luego decidirá a dónde ir) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}