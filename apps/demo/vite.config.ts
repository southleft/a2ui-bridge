import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteApiPlugin } from './vite-api-plugin';

export default defineConfig({
  plugins: [react(), viteApiPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
