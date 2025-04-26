import { AliasOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

import path from "path";

const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
  preview: {
    port: 3001,
   },
   server: {
    port: 3001,
    host: true,
    watch: {
      usePolling: true,
   },
   },
})
