<script lang="ts">
export default { name: 'DynamicMenu' }
</script>
<script lang="ts" setup>
import { routes } from '@/router'
import { sidebarStore } from '@/stores/sidebar'
import { MenuOutlined } from '@ant-design/icons-vue'
import { defineComponent, h, ref } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'

const count = ref(0)
const router = useRouter()
const sidebar = sidebarStore()

function addDynamicMenu(keepAlive: boolean = false) {
  count.value++
  const path = '/newMenu' + count.value
  const parentRoute = routes.find(route => route.name === 'Route')
  if (!parentRoute) return
  const dynamicRoute = parentRoute?.children?.find(item => item.path === path)
  if (dynamicRoute) {
    router.push({ name: dynamicRoute.name })
    return
  }
  const comp = defineComponent({
    props: ['id'],
    name: 'newMenu' + count.value,
    render() {
      return h('div', `这里是新增的菜单${'newMenu' + this.$props.id}页面`)
    }
  })
  const newRoute: RouteRecordRaw = {
    path: path,
    name: 'newMenu' + count.value,
    component: comp,
    meta: { title: `${'新增菜单' + count.value}`, icon: MenuOutlined, keepAlive: keepAlive },
    props: { id: count.value }
  }
  parentRoute?.children?.push(newRoute)
  router.addRoute(parentRoute)
  router.push(`/redirect${path}`)
  sidebar.refreshSidebar()
}
</script>

<template>
  <div>
    <p>已创建动态菜单数：{{ count }}</p>
    <ASpace>
      <AButton @click="() => addDynamicMenu()">新增动态菜单</AButton>
      <AButton @click="() => addDynamicMenu(true)">新增动态菜单（缓存）</AButton>
    </ASpace>
  </div>
</template>