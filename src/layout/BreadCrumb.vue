<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { dashboardRoute } from '@/router'
import { resolve } from 'pathe'

const router = useRouter()
const route = useRoute()
const allRoutes = router.getRoutes()
const routeMatched = shallowRef<RouteLocationMatched[]>([])
const props = withDefaults(defineProps<{
  withIcons?: boolean
}>(), {
  withIcons: false
})

onBeforeMount(() => refreshBreadCrumb())
watch(() => route.path, refreshBreadCrumb)

defineExpose({
  refreshBreadCrumb
})

function refreshBreadCrumb() {
  routeMatched.value = []
  nextTick(() => {
    const options = []
    routeMatched.value = route.matched.filter((item) => item.meta.breadcrumb !== false)
    for (const matched of routeMatched.value) {
      if (matched.meta.belongs) {
        const belongRoute = allRoutes.find(item => item.path === matched.meta.belongs)
        belongRoute && options.push(belongRoute)
      }
      options.push(matched)
    }
    routeMatched.value = options
    if (routeMatched.value.length === 0) {
      routeMatched.value.unshift({ ...dashboardRoute.children?.[0], path: resolve('/', dashboardRoute.children?.[0].path as string) } as RouteLocationMatched)
      return
    }
    if (routeMatched.value[0].path !== '/dashboard') {
      routeMatched.value.unshift({ ...dashboardRoute.children?.[0], path: resolve('/', dashboardRoute.children?.[0].path as string) } as RouteLocationMatched)
    }
  })
}
</script>
  
<template>
  <Transition name="fade-scale" mode="out-in" appear>
    <ABreadcrumb v-if="routeMatched.length > 0">
      <ABreadcrumbItem v-for="(route, index) in routeMatched" :key="route.path">
        <template v-if="props.withIcons && route.meta.icon">
          <SvgIcon v-if="typeof route.meta.icon === 'string'" :iconName="(route.meta.icon as string)"></SvgIcon>
          <component v-else :is="route.meta.icon"></component>
        </template>
        <RouterLink custom :to="route.path" v-slot="{ navigate, href }">
          <a v-if="index < routeMatched.length - 1" :href="href" @click="navigate">&nbsp;{{ route.meta.title }}</a>
          <span v-else>&nbsp;{{ route.meta.title }}</span>
        </RouterLink>
      </ABreadcrumbItem>
    </ABreadcrumb>
  </Transition>
</template>
  