import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      // Options
      algorithm: 'gzip', // or 'brotliCompress' for Brotli compression
      threshold: 10240, // Compress files larger than this size (in bytes)
      deleteOriginFile: false, // Keep original files
    }),
  ],
  build: {
    sourcemap: true, // Generate source maps for debugging
    outDir: 'dist', // Directory for output files
    assetsDir: 'assets', // Directory for static assets
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'entry/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
         // Split code into separate chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    minify: 'terser', // Ensure minification is enabled
    terserOptions: {
      compress: {
        drop_console: true, // Optional: remove console logs
      },
    },
  },
});
