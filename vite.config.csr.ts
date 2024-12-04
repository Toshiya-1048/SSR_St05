import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/client/csr.tsx')
      }
    }
  }
}); 