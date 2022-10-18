import { Component } from "vue"

declare module 'vue-router' {
  export interface RouteMeta {
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
    /**
     * 当前路由页面所指向的菜单路径
     */
    belongs?: string
    /**
     * 是否在标签页隐藏
     */
    hiddenTab?: boolean
    /**
     * 关闭标签页时确认询问
     */
    askBeforeClose?: boolean,
    /**
     * 关键字，可用于搜索协助
     */
    searchKeywords?: string[]
  }
}
