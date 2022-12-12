<script lang="ts" setup>
import { routes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

const count = ref(0)

const router = useRouter()

async function addDynamicRoute(keepAlive: boolean = false, askBeforeClose: boolean = false) {
  count.value++
  const path = '/route/dynamicRoute/newRoute' + count.value
  const parentRoute = routes.find(route => route.name === 'Route')
  if (!parentRoute) return
  const dynamicRoute = parentRoute?.children?.find(item => item.path === path)
  if (dynamicRoute) {
    router.push({ name: dynamicRoute.name })
    return
  }
  const comp = defineComponent({
    props: ['id'],
    name: 'newRoute' + count.value,
    render() {
      return h('div', `这里是新增的路由${'newRoute' + this.$props.id}页面`)
    }
  })
  const newRoute: RouteRecordRaw = {
    path: path,
    name: 'newRoute' + count.value,
    component: comp,
    meta: { title: `${'新增路由' + count.value}`, icon: useIcon('FireOutlined'), hidden: true, belongs: '/route/dynamicRoute', keepAlive: keepAlive, askBeforeClose: askBeforeClose },
    props: { id: count.value }
  }
  parentRoute?.children?.push(newRoute)
  router.addRoute(parentRoute)
  await router.push(path)
}
</script>

<template>
  <div>
    <p>已创建动态路由数：{{ count }}</p>
    <ASpace>
      <AButton @click="() => addDynamicRoute()">新增动态路由</AButton>
      <AButton @click="() => addDynamicRoute(true)">新增动态路由（缓存）</AButton>
      <AButton @click="() => addDynamicRoute(true, true)">新增动态路由（关闭确认）</AButton>
    </ASpace>
  </div>
</template>