import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'
import { GithubOutlined, TableOutlined, HomeOutlined, BlockOutlined, ExportOutlined, FireOutlined } from '@ant-design/icons-vue'

export const dashboardRoute: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  meta: { breadcrumb: false },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard.vue'),
      meta: { title: '首页', icon: HomeOutlined }
    }
  ]
}

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true, title: '页面跳转', hiddenTab: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true, title: '404' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true },
  }
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true, title: '登录' }
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Layout,
    redirect: { name: 'ModalIndex' },
    meta: { breadcrumb: false },
    children: [
      {
        path: 'index',
        name: 'ModalIndex',
        component: () => import('@/views/modal.vue'),
        meta: { title: '模态框', icon: BlockOutlined }
      }
    ]
  },
  {
    path: '/table',
    name: 'Table',
    component: Layout,
    redirect: { name: 'TableIndex' },
    meta: { title: '表格管理', icon: TableOutlined },
    children: [
      {
        path: 'index',
        name: 'TableIndex',
        component: () => import('@/views/table/index.vue'),
        meta: { title: '表格列表', icon: TableOutlined }
      },
      {
        path: 'export',
        name: 'TableExport',
        component: () => import('@/views/table/export.vue'),
        meta: { title: '表格导出', icon: ExportOutlined }
      }
    ]
  },
  {
    path: '/route',
    name: 'Route',
    component: Layout,
    redirect: { name: 'DynamicRoute' },
    meta: { title: '路由管理', icon: FireOutlined },
    children: [
      {
        path: 'dynamicRoute',
        name: 'DynamicRoute',
        component: () => import('@/views/route/dynamicRoute.vue'),
        meta: { title: '动态路由', icon: FireOutlined, keepAlive: true }
      },
      {
        path: 'dynamicMenu',
        name: 'DynamicMenu',
        component: () => import('@/views/route/dynamicMenu.vue'),
        meta: { title: '动态菜单', icon: FireOutlined, keepAlive: true }
      }
    ]
  },
  {
    path: '/https://github.com/1esse/vue-clownfish-admin',
    component: undefined,
    redirect: 'https://github.com/1esse/vue-clownfish-admin',
    meta: { title: 'github', icon: GithubOutlined, external: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [dashboardRoute, ...routes, ...constantRoutes]
})

export default router