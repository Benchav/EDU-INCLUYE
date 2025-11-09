// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // 1. Importa el plugin

export default defineConfig({
  plugins: [
    react(),
    
    // 2. Añade la configuración de PWA
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto', // Inyecta el service worker

      // 3. Configuración del Manifest (información de la app)
      manifest: {
        name: 'EDU-INCLUYE',
        short_name: 'EduIncluye',
        description: 'Plataforma educativa para aprender Lengua de Señas Nicaragüense.',
        theme_color: '#FFFFFF', // Color del tema (blanco)
        background_color: '#F8FAFC', // Color de fondo (gris claro)
        start_url: '/',
        display: 'standalone', // Se abre como app nativa
        scope: '/',
        icons: [
          {
            src: '/logo-192.png', // El plugin la crea
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo-512.png', // Tu logo principal en /public
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable', // Icono adaptable para Android
          },
        ],
      },
      
      // 4. Configuración de Workbox (para que funcione offline)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff,woff2}']
      }
    })
  ],
  
  // 5. Tu configuración de proxy (se mantiene intacta)
  server: {
    proxy: {
      '/api': {
        target: 'https://edu-incluye-backend.vercel.app',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
})