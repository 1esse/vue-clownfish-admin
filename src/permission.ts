import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { appTitle } from './appConfig'
import { getCookie, removeCookie } from './utils'
import { userStore } from './stores/user'
import { message } from 'ant-design-vue'

NProgress.configure({ showSpinner: false })

const whitelist: string[] = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 设置页面标题
  document.title = `${to.meta.title}-${appTitle}`
  // 路径命中白名单，放行通过
  if (whitelist.includes(to.path)) next()
  else {
    // 判断是否有token
    const token = getCookie('token')
    const user = userStore()
    if (!token) {
      next('/login')
    } else if (!user.token) {
      try {
        await user.getUserInfo(token)
        next()
      } catch (_) {
        message.error('token失效，请重新登录')
        removeCookie('token') // 清除cookie
        next('/login')
      }
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
