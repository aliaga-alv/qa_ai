import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Suppress warning for vendor-charts (515 KB) - it's lazy-loaded only for dashboard pages
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // DON'T manually chunk recharts - let it be auto-split per route
          // This prevents it from being modulepreloaded in index.html

          // React core - used everywhere
          if (id.includes('react/') || id.includes('react-dom/')) {
            return 'vendor-react';
          }

          // Router - used everywhere
          if (id.includes('react-router')) {
            return 'vendor-react';
          }

          // State management
          if (
            id.includes('zustand') ||
            id.includes('@tanstack/react-query') ||
            id.includes('axios')
          ) {
            return 'vendor-state';
          }

          // Forms - only some pages
          if (
            id.includes('react-hook-form') ||
            id.includes('@hookform/resolvers') ||
            id.includes('zod')
          ) {
            return 'vendor-forms';
          }

          // Animation
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
        },
      },
    },
    target: 'es2020',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['recharts'], // Don't pre-bundle charts - lazy load them
  },
});
