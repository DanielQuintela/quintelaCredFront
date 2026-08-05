import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // TODO: USAR SOMENTE EM DESENVOLVIMENTO 
  // server: {
  //   // 🌟 Libera acesso externo de túneis (localtunnel, cloudflare, ngrok, etc.)
  //   allowedHosts: true,
  // },
})