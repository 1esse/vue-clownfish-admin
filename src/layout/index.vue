<script setup lang="ts">
import { onBeforeMount, provide, reactive, ref } from 'vue'
import HeadBar from './HeadBar.vue'
import SideBar from './SideBar.vue'
import TabsBar from './TabsBar.vue'
import isMobile from '@/composables/isMobile'
import Logo from '@/assets/logo.png'
import { transitions } from '@/appConfig'
import type { Layout } from 'types/layout'
import { createSharedComposable } from '@/composables/sharedComposable'

const useSharedIsMobile = createSharedComposable(isMobile)
const _isMobile = useSharedIsMobile(setSidebarCollapsed)

const sidebarRelated = reactive<Layout.SidebarRelated>({
  collapsed: true,
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
}

// 为子组件提供布局的相关状态信息
provide('sidebarRelated', sidebarRelated)
provide('keepAlivePages', keepAlivePages.value)
provide('loading', loading)
</script>
  
<template>
  <ALayout>
    <ALayoutSider v-if="!_isMobile" v-model:collapsed="sidebarRelated.collapsed" collapsible :trigger="null"
      :width="sidebarRelated.width" :collapsedWidth="sidebarRelated.collapsedWidth" breakpoint="md">
      <div style="display: flex; flex-direction: column; width: 100%; height: 100%;">
        <RouterLink to="/">
          <div v-if="sidebarRelated.collapsed && sidebarRelated.collapsedText" class="flex-center logo-collapsed">
            {{sidebarRelated.collapsedText}}
          </div>
          <img v-else :src="Logo" alt="Logo" class="logo">
        </RouterLink>
        <SideBar></SideBar>
      </div>
    </ALayoutSider>
    <ALayout>
      <ALayoutHeader>
        <HeadBar></HeadBar>
        <TabsBar :withIcons="true"></TabsBar>
      </ALayoutHeader>
      <ALayoutContent id="content-window">
        <RouterView v-slot="{ Component, route }">
          <Transition :name="transitions.fadeScale" mode="out-in" appear>
            <!-- 
                vite的hmr和keepalive组件冲突会导致路由失效，
                https://github.com/vuejs/core/pull/5165
                开发过程注释掉keepalive
              -->
            <KeepAlive :include="Array.from(keepAlivePages)" :max="10">
              <component :is="Component" :key="route.name" />
            </KeepAlive>
          </Transition>
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
  