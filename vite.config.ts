import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',

  build: {
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        profile: resolve(__dirname, 'profile.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),
        newlisting: resolve(__dirname, 'new-listing.html'),
        listing: resolve(__dirname, 'listing.html'),
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
      },
    },
  },
});
