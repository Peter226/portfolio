import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        fps: resolve(__dirname, 'projects/fps/page.html'),
        gameoflife: resolve(__dirname, 'projects/gameoflife/page.html'),
        huehades: resolve(__dirname, 'projects/huehades/page.html'),
        paradise: resolve(__dirname, 'projects/paradise/page.html'),
        rangeindicator: resolve(__dirname, 'projects/rangeindicator/page.html'),
        survival: resolve(__dirname, 'projects/survival/page.html'),
        voxel: resolve(__dirname, 'projects/voxel/page.html'),
      },
    },
  },
})