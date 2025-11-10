import React, { useState, useEffect } from 'react';

export default function InstallPWAButton() {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
 
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); 
      setInstallPrompt(e); 
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
    
 
    const result = await installPrompt.prompt();
    
    
    setInstallPrompt(null);
  };


  if (!installPrompt) {
    return null;
  }


  return (
    <button
      className="header__nav-link" 
      onClick={handleInstallClick}
      title="Instalar la aplicación en tu dispositivo"
      style={{
        background: 'var(--color-secondary)', 
        color: 'white', 
        fontWeight: '700',
        borderRadius: 'var(--radius-md)',
        margin: '0.5rem 1rem'
      }}
    >
      Descargar App
    </button>
  );
}