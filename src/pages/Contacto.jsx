// src/components/Contacto.jsx
import React, { useState } from 'react';
import '../styles/Contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validación en tiempo real
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simular envío a servidor
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ nombre: '', email: '', mensaje: '' });
        
        // Resetear mensaje de éxito después de 5 segundos
        setTimeout(() => setSubmitSuccess(false), 5000);
      }, 1500);
    }
  };

  return (
    <section className="contacto" id="contacto">
      <div className="contacto-container">
        <div className="contacto-header">
          <h2>Contáctanos</h2>
          <p>¿Tienes alguna pregunta o comentario? Escríbenos y te responderemos pronto.</p>
        </div>
        
        <form className="contacto__form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">
              Nombre
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              placeholder="Nombre completo" 
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'has-error' : ''}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">
              Email
              {errors.email && <span className="error-message">{errors.email}</span>}
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Corre@gmail.com" 
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'has-error' : ''}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mensaje">
              Mensaje
              {errors.mensaje && <span className="error-message">{errors.mensaje}</span>}
            </label>
            <textarea 
              id="mensaje" 
              name="mensaje" 
              placeholder="Escribe tu mensaje aquí..." 
              value={formData.mensaje}
              onChange={handleChange}
              className={errors.mensaje ? 'has-error' : ''}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Enviando...
              </>
            ) : (
              'Enviar mensaje'
            )}
          </button>
          
          {submitSuccess && (
            <div className="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              ¡Mensaje enviado con éxito! Te responderemos pronto.
            </div>
          )}
        </form>
        
        <div className="contacto-info">
          <div className="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <div>
              <h3>Email</h3>
              <p>edu-incluye@gmail.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            <div>
              <h3>Teléfono</h3>
              <p>+505 912 345 678</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}