<script setup lang="ts">
import HeadBar from './HeadBar.vue'
import TabsBar from './TabsBar.vue'
import Logo from '@/assets/logo.png'
import { transitions, fixedHeader } from '@/appConfig'
import type { Layout } from 'typings/layout'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export type CloseTabInject = (tab: RouteLocationNormalizedLoaded, noRedirect?: boolean, forceClose?: boolean) => Promise<void> | undefined
export type GetTabsInject = () => Readonly<RouteLocationNormalizedLoaded>[] | undefined
export type SetCurrentTabNameInject = (name: string) => void | undefined
export type RefreshBreadCrumbInject = () => void

const SideBar = defineAsyncComponent(() => import('./SideBar.vue')) as ReturnType<typeof defineComponent>
const tabsBarRef = shallowRef<InstanceType<typeof TabsBar> | null>(null)
const headBarRef = shallowRef<InstanceType<typeof HeadBar> | null>(null)
const useSharedIsMobile = createSharedComposable(isMobile)
const _isMobile = useSharedIsMobile(setSidebarCollapsed)

const sidebarRelated = reactive<Layout.SidebarRelated>({
  collapsed: true,
  shadowCollapsed: true,
  width: '13rem',
  collapsedWidth: '3rem',
  collapsedText: 'Clown Fish'
})
const loading = reactive<Layout.Loading>({
  logout: false
})
const keepAlivePages = ref<Layout.keepAlivePages>(new Set())

onBeforeMount(() => {
  setSidebarCollapsed()
})

function setSidebarCollapsed() {
  sidebarRelated.collapsed = _isMobile.value
  sidebarRelated.shadowCollapsed = sidebarRelated.collapsed
}
// 为子组件提供布局的相关状态信息
provide('sidebarRelated', sidebarRelated)
provide('keepAlivePages', keepAlivePages.value)
provide('loading', loading)
provide<CloseTabInject>('closeTab', (tab: RouteLocationNormalizedLoaded, noRedirect?: boolean, forceClose?: boolean) => tabsBarRef.value?.closeTab(tab, noRedirect, forceClose))
provide<GetTabsInject>('getTabs', () => tabsBarRef.value?.getReadOnlyTabs())
provide<SetCurrentTabNameInject>('setCurrentTabName', (name: string) => tabsBarRef.value?.setCurrentTabName(name))
provide<RefreshBreadCrumbInject>('refreshBreadCrumb', () => headBarRef.value?.refreshBreadCrumb())
</script>

<template>
  <ALayout>
    <ALayoutSider v-if="!_isMobile" v-model:collapsed="sidebarRelated.collapsed" collapsible :trigger="null"
      :width="sidebarRelated.width" :collapsedWidth="sidebarRelated.collapsedWidth" breakpoint="md">
      <div style="position: relative; z-index: 999; display: flex; flex-direction: column; width: 100%; height: 100%;">
        <RouterLink to="/">
          <div v-if="(sidebarRelated.shadowCollapsed || sidebarRelated.collapsed) && sidebarRelated.collapsedText"
            class="flex-center logo-collapsed">
            {{ sidebarRelated.collapsedText }}
          </div>
          <img v-else :src="Logo" alt="Logo" class="logo">
        </RouterLink>
        <SideBar></SideBar>
      </div>
      <div v-if="!_isMobile" class="sidebar-shadow"
        :style="{ transform: `translate3d(${sidebarRelated.shadowCollapsed ? '-10rem' : '0'}, 0, 0)` }">
      </div>
    </ALayoutSider>
    <ALayout>
      <ALayoutHeader v-if="fixedHeader">
        <HeadBar ref="headBarRef"></HeadBar>
        <TabsBar ref="tabsBarRef" :withIcons="false" :withDot="true"></TabsBar>
      </ALayoutHeader>
      <ALayoutContent id="content-window">
        <div v-if="!fixedHeader" style="padding: 0 1rem;">
          <HeadBar ref="headBarRef"></HeadBar>
          <TabsBar ref="tabsBarRef" :withIcons="false" :withDot="true"></TabsBar>
        </div>
        <RouterView v-slot="{ Component, route }">
          <div class="content-view">
              <Transition :name="transitions.fadeScale" mode="out-in" appear>
              <KeepAlive :include="Array.from(keepAlivePages)" :max="10">
                <component :is="Component" :key="route.name" />
              </KeepAlive>
            </Transition>
          </div>
        </RouterView>
      </ALayoutContent>
    </ALayout>
  </ALayout>
  <Teleport to="body">
    <Transition name="slide-right" mode="out-in" appear>
      <Shadow v-if="_isMobile && !sidebarRelated.collapsed" @shadowClick="sidebarRelated.collapsed = true">
        <div class="block sidebar-mobile">
          <RouterLink to="/">
            <img :src="Logo" alt="Logo" class="logo">
          </RouterLink>
          <SideBar></SideBar>
        </div>
      </Shadow>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sidebar-mobile {
  width: 15rem;
  height: 96vh;
  position: absolute;
  top: 2vh;
  left: 2vw;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.content-view {
  padding: 1rem;
  width: 100%;
  height: 100%;
}

.sidebar-shadow {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 13rem;
  height: 100%;
  background-color: var(--sidebar-background-color);
  transition: transform ease 0.2s;
}

.logo {
  width: 100%;
  height: 3rem;
  object-fit: contain;
  image-rendering: optimizeQuality;
  animation: fadeIn 1s ease;
}

.logo-collapsed {
  color: var(--sidebar-font-color);
  font-size: .8rem;
  width: 100%;
  height: 3rem;
  text-align: center;
  overflow: hidden;
  animation: fadeIn 1s ease;
}
</style>
