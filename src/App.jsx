import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Curso from './pages/Curso';
import Leccion from './pages/Leccion';
import Glosario from './pages/Glosario';
import Contacto from './pages/Contacto';
import Practica from './pages/Practica';
import Recursos from './pages/Recursos';
import './styles/App.css';

// Componente para rutas protegidas
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/curso" element={<PrivateRoute><Curso /></PrivateRoute>} />
          <Route path="/curso/:leccionId" element={<PrivateRoute><Leccion /></PrivateRoute>} />
          <Route path="/glosario" element={<PrivateRoute><Glosario /></PrivateRoute>} />
          <Route path="/contacto" element={<PrivateRoute><Contacto /></PrivateRoute>} />
          <Route path="/practica" element={<PrivateRoute><Practica /></PrivateRoute>} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}