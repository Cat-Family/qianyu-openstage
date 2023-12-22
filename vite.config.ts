import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/qy/api/v1/os/': {
        target: 'http://61.164.252.244:46179',
        // target: 'http://192.168.0.131:7777',
        changeOrigin: true,
      },
    },
  },
});
