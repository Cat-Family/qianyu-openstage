import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/qy/api/v1/os/': {
        target: 'https://3901174m26.picp.vip/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // 将 /api 重写
      },
    },
  },
});
