<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { provide, reactive, ref } from 'vue'
import HeadBar from './HeadBar.vue'
import SideBar from './SideBar.vue'
import TabsBar from './TabsBar.vue'

const sidebarRelated = reactive<Layout.SidebarRelated>({
  collapsed: false,
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

// 为子组件提供布局的相关状态信息
provide('sidebarRelated', sidebarRelated)
provide('keepAlivePages', keepAlivePages.value)
provide('loading', loading)
</script>

<template>
  <ALayout>
    <ALayoutSider v-model:collapsed="sidebarRelated.collapsed" collapsible :trigger="null" :width="sidebarRelated.width"
      :collapsedWidth="sidebarRelated.collapsedWidth" breakpoint="md">
      <SideBar></SideBar>
    </ALayoutSider>
    <ALayout>
      <ALayoutHeader>
        <HeadBar></HeadBar>
        <TabsBar :withIcons="true"></TabsBar>
      </ALayoutHeader>
      <ALayoutContent>
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade-scale" mode="out-in">
            <KeepAlive :include="getKeepAlivePages">
              <component :is="Component" :key="route.path" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>
