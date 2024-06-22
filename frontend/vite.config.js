import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto permite que el servidor esté accesible externamente
    port: 5173, // Este es el puerto por defecto, puedes cambiarlo si es necesario
  },
})
