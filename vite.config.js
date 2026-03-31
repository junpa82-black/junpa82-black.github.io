import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // GitHub Pages (username.github.io)
  server: {
    allowedHosts: ['caaf4fc6ff932b76fcbf-pod-husct3cbhrei3h3c3ez7rpwdbq-5173.us6.cursorvm.com'],
  },
})
