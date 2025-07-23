import React, { useState } from 'react';
import glosario from '../data/glosario.json';
import '../styles/Glosario.css';

export default function Glosario() {
  const [filtro, setFiltro] = useState('');
  const items = glosario.filter(g => g.palabra.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <section className="glosario">
      <h2>Categorias</h2>
      <input
        type="text"
        placeholder="Buscar..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />
      <div className="glosario__grid">
        {items.map((g, i) => (
          <div key={i} className="glosario__item">
            <img src={g.mediaUrl} alt={g.palabra} />
            <h4>{g.palabra}</h4>
            <p>{g.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}