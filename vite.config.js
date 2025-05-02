import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 10000, // optional, Render provides $PORT anyway
    host: true, // binds to 0.0.0.0
    allowedHosts: ['spotyvibe.onrender.com'],
  },
});
