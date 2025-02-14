import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/scripts/*',
          dest: 'scripts'
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
        `
        @import "./src/style.css";
        @import "./src/scss/colors.css";
        
        `
      }
    }
  },
})
