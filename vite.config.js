import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vueDevTools from 'vite-plugin-vue-devtools'

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
    }),
    vueDevTools(),
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
