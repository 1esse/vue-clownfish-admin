<script setup lang="tsx">
import SvgIcon from '../components/SvgIcon.vue'
import { defineComponent, ref, h, Component, watch, Slots, inject, computed } from 'vue'
import { RouteMeta, RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { resolve } from 'pathe' // path包es代码实现
import Scrollbar from '../components/Scrollbar.vue'
import { RouterLink } from 'vue-router'
import { SubMenu, MenuItem, Menu } from 'ant-design-vue/es'

const router = useRouter()
const route = useRoute()
const selectedKeys = ref<string[]>([route.path]) // 菜单默认选中项
const openKeys = ref<string[]>(
  router.getRoutes()
    .filter(matchedRoute => matchedRoute.children.length > 0)
    .map(matchedRoute => matchedRoute.path)
) // 子菜单默认展开项
const keepAlivePages = inject<Layout.keepAlivePages>('keepAlivePages')
const routesList = computed(() => {
  return router.options.routes
})

watch(route, (currentRoute) => {
  selectedKeys.value = [currentRoute.path]
  // 如果该路由设置页面缓存则推进缓存组
  if (currentRoute.meta.keepAlive && !keepAlivePages?.has(currentRoute.name as string)) {
    keepAlivePages?.add(currentRoute.name as string)
  }
})

const getNavIcon = (item: RouteMeta | undefined) => {
  if (!item || (item && !item.icon)) return null
  if (typeof item.icon === 'string') {
    return <SvgIcon iconName={item.icon as string} />
  }
  return h(item?.icon as Component)
}

const MenuItemLink = (props: any, { slots }: { slots: Slots }) => {
  if (props.route.meta?.external) {
    return <a href={props.route.redirect} target='_blank' ref='noopener noreferrer'>{slots.default?.()}</a>
  }
  return <RouterLink to={props.url}>{slots.default?.()}</RouterLink>
}

const MenuItemNav = defineComponent({
  props: ['route', 'basePath'],
  setup(props) {
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
    return () =>
      // 隐藏设置hidden的路由菜单
      props.route.meta?.hidden ? <div style="display: none"></div> :
        props.route.children ?
          props.route.children.filter((route: RouteRecordRaw) => !route.meta?.hidden).length > 1 ?
            subMenuTemplate(props.route) :
            menuItemTemplate(getOnlyChildPath(props.route)) :
          menuItemTemplate(props.route)
  }
})

const TheSideBar = () => (
  <Scrollbar>
    <Menu v-model:selectedKeys={selectedKeys.value} v-model:openKeys={openKeys.value} mode="inline" selectable={false}>
      {routesList.value.map((route, index) => <MenuItemNav key={index} route={route} basePath={route.path}></MenuItemNav>)}
    </Menu>
  </Scrollbar>
)

function getOnlyChildPath(parentRoute: RouteRecordRaw): RouteRecordRaw {
  const childRoute = parentRoute.children?.find((route: RouteRecordRaw) => !route.meta?.hidden)
  if (childRoute)
    childRoute.path = `${parentRoute.path}/${childRoute.path}`
  return (childRoute || {}) as RouteRecordRaw
}
</script>

<template>
  <TheSideBar />
</template>
