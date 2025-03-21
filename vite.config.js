import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middleware: [history()],
  },
});
