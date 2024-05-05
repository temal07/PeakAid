import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
  /* 
    set up a proxy for making localhost:3000
    (backend) and localhost:5173 communicate
    with each other
  */ 
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      }
    },
  },
  plugins: [react()],
})
