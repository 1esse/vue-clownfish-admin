import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'
import { SmileOutlined, GithubOutlined } from '@ant-design/icons-vue'
import type { Component } from "vue"

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * title：菜单名
     */
    title?: string
    /**
     * icon：菜单图标，值为src/svgs文件夹下相同的名称或者antd图标组件，当值为组件时需要显式导入
     */
    icon?: Component | string
    /**
     * external：是否外部链接，外部链接时需在redirect指定链接地址
     */
    external?: boolean
    /**
     * breadcrumb：是否显示面包屑，默认true
     */
    breadcrumb?: boolean
    /**
     * hidden：是否在菜单隐藏
     */
    hidden?: boolean
    /**
     * keepAlive：是否缓存该路由，只有当页面定义的name和路由定义的name一致时，才能生效
     */
    keepAlive?: boolean
  }
}

const dashboardRoute: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  meta: { breadcrumb: false },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard.vue'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }
  ]
}

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true, title: '页面跳转' },
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

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true, title: '登录' }
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/test2',
    meta: { title: '嵌套菜单', icon: SmileOutlined },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('@/views/test/test1.vue'),
        meta: { title: '缓存页', icon: SmileOutlined, keepAlive: true }
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/test/test2.vue'),
        meta: { title: '普通页', icon: SmileOutlined }
      },
      {
        path: 'test3',
        name: 'Test3',
        component: () => import('@/views/test/test3.vue'),
        redirect: '/test/test3/nested1',
        meta: { title: '嵌套页父级容器', icon: 'nested' },
        children: [
          {
            path: 'nested1',
            name: 'Nested1',
            component: () => import('@/views/test/test-nested/nested1.vue'),
            meta: { title: '嵌套页子容器1', icon: SmileOutlined },
          },
          {
            path: 'nested2',
            name: 'Nested2',
            component: () => import('@/views/test/test-nested/nested2.vue'),
            meta: { title: '嵌套页子容器2', icon: SmileOutlined },
          }
        ]
      }
    ]
  },
  {
    path: '/https://github.com/1esse/vue-clownfish-admin',
    component: undefined,
    redirect: 'https://github.com/1esse/vue-clownfish-admin',
    meta: { title: '测试外链', icon: GithubOutlined, external: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [dashboardRoute, ...routes, ...constantRoutes]
})

export default router