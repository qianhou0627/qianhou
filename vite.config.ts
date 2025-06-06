import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite' // 1️⃣ 自动导入 API（如 composition API）
import Components from 'unplugin-vue-components/vite' // 2️⃣ 自动导入组件
import { TDesignResolver } from 'unplugin-vue-components/resolvers' // 3️⃣ 解析器来自这里

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: ['vue'], // 可选：自动导入 Vue 相关 API（如 ref, reactive）
      resolvers: [
        TDesignResolver({
          library: 'vue-next', // 明确指定 Vue 3 版本
        }),
      ],
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'vue-next', // 必须与 AutoImport 一致
        }),
      ],
      dts: true, // 生成类型声明文件（推荐）
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
