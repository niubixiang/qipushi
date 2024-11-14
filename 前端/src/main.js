import { createApp } from 'vue'
// svg图标
import 'virtual:svg-icons-register'
import App from './App.vue'
// 导入路由
import router from './router/index.js'
import pinia from './store'

// 导入element plus
import ElementPlus from 'element-plus'
// 导入element plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// 导入element plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入全局样式
import '@/assets/css/common.scss'
// 创建实例
const app=createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router).use(pinia).mount('#app')
// createApp(App).mount('#app')
