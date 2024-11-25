import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        territoryborders: resolve(__dirname, 'projects/territoryborders/page.html'),
        rangeindicator: resolve(__dirname, 'projects/rangeindicator/page.html'),
        fliight: resolve(__dirname, 'projects/fliight/page.html'),
        huehades: resolve(__dirname, 'projects/huehades/page.html'),
        paradise: resolve(__dirname, 'projects/paradise/page.html'),
        timebooker: resolve(__dirname, 'projects/timebooker/page.html'),
        gardeneye: resolve(__dirname, 'projects/gardeneye/page.html'),
        voxel: resolve(__dirname, 'projects/voxel/page.html'),
        gameoflife: resolve(__dirname, 'projects/gameoflife/page.html'),
        survival: resolve(__dirname, 'projects/survival/page.html'),
        fps: resolve(__dirname, 'projects/fps/page.html'),
      },
    },
  },
})