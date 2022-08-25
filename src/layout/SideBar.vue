<script setup lang="tsx">
import SvgIcon from '../components/SvgIcon.vue'
import { ref, h, watch, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { resolve } from 'pathe' // path包es代码实现
import Scrollbar from '../components/Scrollbar.vue'
import { RouterLink } from 'vue-router'
import { SubMenu, MenuItem } from 'ant-design-vue/es'
import type { Component, Slots } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import type { Layout } from 'types/layout'
import { sidebarStore } from '@/stores/sidebar'

const router = useRouter()
const route = useRoute()
const selectedKeys = ref<string[]>([route.path]) // 菜单默认选中项
// 默认展开选中项所在菜单
const openKeys = ref<string[]>(
  router.getRoutes()
    .filter(matchedRoute =>
      route.path.includes(matchedRoute.path)
    )
    .map(matchedRoute => matchedRoute.path)
) // 子菜单默认展开项
const keepAlivePages = inject<Layout.keepAlivePages>('keepAlivePages')

const sidebar = sidebarStore()
sidebar.refreshSidebar()

watch(() => route.path, () => {
  selectedKeys.value = [route.meta.belongs || route.path]
  // 如果该路由设置页面缓存则推进缓存组
  if (route.meta.keepAlive && !keepAlivePages?.has(route.name as string)) {
    keepAlivePages?.add(route.name as string)
  }
}, { immediate: true })

const getNavIcon = (item: RouteMeta | undefined) => {
  if (!item || (item && !item.icon)) return null
  if (typeof item.icon === 'string') {
    return <SvgIcon iconName={item.icon as string} />
  }
  return h(item?.icon as Component)
}

const MenuItemLink = (props: { route: RouteRecordRaw, url: string }, { slots }: { slots: Slots }) => {
  if (props.route.meta?.external) {
    return <a href={props.route.redirect as string} target='_blank' ref='noopener noreferrer'>{slots.default?.()}</a>
  }
  return <RouterLink to={props.url}>{slots.default?.()}</RouterLink>
}

const MenuItemNav = (props: { route: RouteRecordRaw, basePath: string }) => {
  // 子菜单模板
  const subMenuTemplate = (route: RouteRecordRaw) => {
    const slots = {
      icon: () => getNavIcon(route.meta),
      title: () => route.meta?.title
    }
    const basePath = resolve(props.basePath, route.path)
    return (
      <SubMenu v-slots={slots} key={basePath}>
        {route.children?.map(item => <MenuItemNav route={item} basePath={basePath}></MenuItemNav>)}
      </SubMenu>
    )
  }
  // 菜单项模板
  const menuItemTemplate = (route: RouteRecordRaw) => {
    const slots = {
      icon: () => getNavIcon(route.meta)
    }
    const url = resolve(props.basePath, route.path)
    return (
      <MenuItem key={url} v-slots={slots}>
        <MenuItemLink route={route} url={url}>
          <span>{route.meta?.title}</span>
        </MenuItemLink>
      </MenuItem>
    )
  }

  return props.route.meta?.hidden ? <div style="display: none"></div> :
    props.route.children && props.route.children.filter((route: RouteRecordRaw) => !route.meta?.hidden).length > 0 ?
      props.route.children.filter((route: RouteRecordRaw) => !route.meta?.hidden).length > 1 ?
        subMenuTemplate(props.route) :
        menuItemTemplate(getOnlyChildPath(props.route)) :
      menuItemTemplate(props.route)
}

function getOnlyChildPath(parentRoute: RouteRecordRaw): RouteRecordRaw {
  const childRoute = parentRoute.children?.find((route: RouteRecordRaw) => !route.meta?.hidden)
  return Object.assign({}, childRoute, { path: `${parentRoute.path}/${childRoute?.path}` } as RouteRecordRaw)
}
</script>

<template>
  <Scrollbar :speed="4">
    <AMenu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" :inlineIndent="16"
      :selectable="false">
      <template v-for="route in sidebar.getSidebarList" key="index">
        <MenuItemNav :route="route" :basePath="route.path"></MenuItemNav>
      </template>
    </AMenu>
  </Scrollbar>
</template>
