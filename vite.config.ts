import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import dayjs from "dayjs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
      target: 'esnext',
      minify: 'terser',
      lib: {
        entry: './src/main.ts',
        name: '_debug_chii__',
        formats: ['iife'],
        fileName: 'debugchii' + dayjs().format("YY_MD_hm")
      },
    },
    define: {
      'process.env': {},
      __DEV__: mode === 'development'
    },
    plugins: [vue()]
  }
})
