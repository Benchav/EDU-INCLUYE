import React, { useState, useEffect } from 'react';

export default function InstallPWAButton() {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    // Captura el evento que lanza el navegador
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Evita que el navegador muestre su propio aviso
      setInstallPrompt(e); // Guarda el evento para usarlo después
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }
    
    // Muestra el aviso de instalación oficial del navegador
    const result = await installPrompt.prompt();
    
    // El evento ya no es necesario
    setInstallPrompt(null);
  };

  // Si el navegador no ha ofrecido instalar (o ya se instaló), no muestra el botón.
  if (!installPrompt) {
    return null;
  }

  // Renderiza tu botón (usa los estilos del Header)
  // Lo he cambiado a "nav-link" para que se vea como los otros enlaces en móvil
  return (
    <button
      className="header__nav-link" // Lo estiliza como un enlace de menú
      onClick={handleInstallClick}
      title="Instalar la aplicación en tu dispositivo"
      style={{
        background: 'var(--color-secondary)', // Fondo aqua
        color: 'white', // Texto blanco
        fontWeight: '700',
        borderRadius: 'var(--radius-md)',
        margin: '0.5rem 1rem'
      }}
    >
      Descargar App
    </button>
  );
}