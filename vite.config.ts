import { defineConfig } from 'vite';

export default defineConfig({
  root: './',

  build: {
    outDir: 'dist',
    target: 'esnext',
  },

  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
      },
    },
  },
});
