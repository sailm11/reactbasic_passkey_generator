import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindConfig from './tailwind.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindConfig],
})
