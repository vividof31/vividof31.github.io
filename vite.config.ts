import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Removed optimizeDeps exclusion for lucide-react
  // Removed explicit css.postcss setting again
})
