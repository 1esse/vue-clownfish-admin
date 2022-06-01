import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'ant-design-vue/es/message/style/index.css' // antdv message样式
import '@/styles/index.postcss' // 全局样式
import 'virtual:svg-icons-register'
import './permission'

createApp(App).use(createPinia()).use(router).mount('#app')
