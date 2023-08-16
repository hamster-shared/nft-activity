import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // 打包文件的输出目录
    assetsDir: 'static', // 静态资源的存放目录
    assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
    // minify: 'terser', // 混淆器，terser构建后文件体积更小
    target: ['es2020', 'safari14'],
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target:'',
  //       changeOrigin: true, //是否跨域
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  //   host: true,//同一局域网可以访问本地服务
  // },
})
