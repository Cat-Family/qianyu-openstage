import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/qy/api/v1/os/': {
        target: 'http://82.157.67.120:8084',
        changeOrigin: true,
      },
    },
  },
});
