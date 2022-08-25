<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { onBeforeMount, provide, reactive, ref } from 'vue'
import HeadBar from './HeadBar.vue'
import SideBar from './SideBar.vue'
import TabsBar from './TabsBar.vue'
import isMobile from '@/composables/isMobile'
import Logo from '@/assets/logo.png'
import { transitions } from '@/appConfig'
import type { Layout } from 'types/layout'

const _isMobile = isMobile()
const sidebarRelated = reactive<Layout.SidebarRelated>({
  collapsed: true,
  width: '15rem',
  collapsedWidth: '3rem'
})
const loading = reactive<Layout.Loading>({
  logout: false
})
const keepAlivePages = ref<Layout.keepAlivePages>(new Set())
const getKeepAlivePages = computed(() => {
  return Array.from(keepAlivePages.value)
})

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
          <AImage width="100%" :height="sidebarRelated.collapsed ? '3rem' : '6rem'"
            style="padding: .3rem 0; object-fit: contain;" :src="Logo" :preview="false" />
        </RouterLink>
        <SideBar :style="{ paddingRight: sidebarRelated.collapsed ? '0' : '0' }"></SideBar>
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
            <KeepAlive :include="getKeepAlivePages" :max="10">
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
            <AImage :width="sidebarRelated.width" height="6rem" style="padding: .3rem 0; object-fit: contain;"
              :preview="false" :src="Logo" />
          </RouterLink>
          <SideBar></SideBar>
        </div>
      </Shadow>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sidebar-mobile {
  width: v-bind('sidebarRelated.width');
  height: 96vh;
  position: absolute;
  top: 2vh;
  left: 2vw;
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>
