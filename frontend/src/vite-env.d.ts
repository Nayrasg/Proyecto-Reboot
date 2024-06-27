import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Puedes especificar el puerto aquí
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Cambia esto al puerto en el que corre tu backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});