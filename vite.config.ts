import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/joke': {
        target: 'https://generativeai.googleapis.com',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/joke/,
            `/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`
          ),
      },
    },
  },
});
