<script setup lang="ts">
import { DefaultOptionType, SelectValue } from 'ant-design-vue/es/select'
import type { Layout } from 'types/layout'
import { RouteLocationNormalized } from 'vue-router'
import { userStore } from '../stores/user'
import BreadCrumb from './BreadCrumb.vue'

const sidebarRelated = inject<Layout.SidebarRelated>('sidebarRelated')
const loading = inject<Layout.Loading>('loading')
const user = userStore()
const searchValue = ref('')
const searchOptions = shallowRef<DefaultOptionType[]>([])
const isFullscreen = ref(false)
const router = useRouter()
let timeout: NodeJS.Timeout

onBeforeMount(() => {
  document.onfullscreenchange = () => {
    isFullscreen.value = !isFullscreen.value
  }
})

function logout() {
  if (loading) loading.logout = true
  user.logout().then(_ => {
    router.replace('/login')
  })
}

function toggleSidebar() {
  if (!sidebarRelated) return
  if (!sidebarRelated.collapsed) {
    sidebarRelated.collapsed = true
    nextTick(() => {
      sidebarRelated.shadowCollapsed = true
    })
  }
  else {
    timeout && clearTimeout(timeout)
    sidebarRelated.shadowCollapsed = false
    timeout = setTimeout(() => {
      sidebarRelated.collapsed = false
    }, 120)
  }
}

function searchChange(value: SelectValue) {
  if (!value) {
    searchOptions.value = []
    return
  }
  const routes = router.getRoutes()
  const filteredRoutes = routes.filter(route => !route.meta.hidden && (route.meta.title?.includes(value as string) || route.meta.searchKeywords?.some(keyword => keyword.includes(value as string))))
  searchOptions.value = filteredRoutes.map(route => Object.assign(router.resolve(route), { value: route.path }))
}

function searchSelect(value: any) {
  searchValue.value = ''
  router.push(value)
}

function matchedRoutes(item: RouteLocationNormalized) {
  return item.matched.filter(match => match.meta.breadcrumb !== false)
}
</script>

<template>
  <header>
    <section>
      <MenuFoldOutlined :class="['icon-sidebar-trigger', sidebarRelated?.collapsed && 'collapsed']"
        @click="toggleSidebar" />
      <BreadCrumb :withIcons="true"></BreadCrumb>
    </section>
    <ASpace size="middle" style="margin-right: 1rem; font-size: 1rem;">
      <AAutoComplete v-model:value="searchValue" style="width: 10rem" :dropdownMatchSelectWidth="250"
        :filterOption="false" :options="searchOptions" @change="searchChange" @select="searchSelect">
        <AInputSearch placeholder="搜索" />
        <template #option="item">
          <ABreadcrumb v-if="item.matched.length > 0">
            <ABreadcrumbItem v-for="(route, index) in matchedRoutes(item)" :key="route.path">
              <template v-if="route.meta.icon">
                <SvgIcon v-if="typeof route.meta.icon === 'string'" :iconName="(route.meta.icon as string)"></SvgIcon>
                <component v-else :is="route.meta.icon"></component>
              </template>
              <span>&nbsp;{{ route.meta.title }}</span>
            </ABreadcrumbItem>
          </ABreadcrumb>
        </template>
      </AAutoComplete>
      <ATooltip v-if="!isFullscreen" title="全屏">
        <FullscreenOutlined style="cursor: pointer;" @click="() => launchFullscreen()" />
      </ATooltip>
      <ATooltip v-else title="退出全屏">
        <FullscreenExitOutlined style="cursor: pointer;" @click="() => exitFullscreen()" />
      </ATooltip>
      <ADivider type="vertical" style="background-color: #e1e1e1; height: 1rem; margin: 0" />
    </ASpace>
    <section>
      <ADropdown :trigger="['click']">
        <div style="display: inline-flex; align-items: center; cursor:pointer;">
          <UserOutlined style="margin-right: .5rem;" />
          <span>{{ user.name }}</span>
          <DownOutlined style="margin-left: .5rem;" />
        </div>
        <template #overlay>
          <AMenu>
            <AMenuItem>
              <span @click="logout">
                <LogoutOutlined style="margin-right: .5rem;" />登出
              </span>
            </AMenuItem>
          </AMenu>
        </template>
      </ADropdown>
    </section>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  section {
    &:first-of-type {
      display: inline-flex;
      flex-wrap: nowrap;
      align-items: center;
      flex-shrink: 0;
      overflow: hidden;
      flex: 1
    }

    &:last-of-type {
      display: inline-flex;
      flex-wrap: nowrap;
      flex-shrink: 0;
      align-items: center;
    }
  }
}

.icon-sidebar-trigger {
  cursor: pointer;
  margin-right: 1.2rem;
  font-size: 1.2rem;

  &.collapsed {
    transform: rotate(180deg);
  }
}
</style>