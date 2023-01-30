import App from './App.vue'
import router from './router'
import { mock, mockEnv } from './appConfig'
import enableMock from '../mock'
import 'ant-design-vue/es/message/style/index.css' // antdv message样式
import 'ant-design-vue/es/modal/style/index.css' // antdv modal样式
import '@/styles/index.scss' // 全局样式
import 'virtual:svg-icons-register'
import './permission'
import { EnvType } from 'typings/app'

mockEnv.includes(import.meta.env.MODE as EnvType) && mock === 'on' && enableMock()

createApp(App).use(createPinia()).use(router).mount('#app')
