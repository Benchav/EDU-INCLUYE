import React from 'react';
import '../styles/Contacto.css';

export default function Contacto() {
  return (
    <section className="contacto">
      <h2>Contacto</h2>
      <form className="contacto__form">
        <label>
          Nombre:
          <input type="text" name="nombre" placeholder="Tu nombre" />
        </label>
        <label>
          Email:
          <input type="email" name="email" placeholder="Tu email" />
        </label>
        <label>
          Mensaje:
          <textarea name="mensaje" placeholder="Escribe tu mensaje"></textarea>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}