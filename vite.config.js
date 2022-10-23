/* eslint-env node */
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue(), Icons({ compiler: 'vue3' })],
  build: {
    lib: {
      entry: resolve(__dirname, './lib/lib.js'),
      name: 'vue-single-date-picker',
      fileName: `lib`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'vue',
        },
      },
    },
  },
});
