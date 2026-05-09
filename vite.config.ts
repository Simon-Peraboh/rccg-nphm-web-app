import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'https://app2.rccgphm.org/',
=======
        target: 'http://127.0.0.1:8000/',
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});

