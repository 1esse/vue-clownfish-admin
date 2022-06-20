<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { onMounted, provide, reactive, ref } from 'vue'
import HeadBar from './HeadBar.vue'
import SideBar from './SideBar.vue'
import TabsBar from './TabsBar.vue'
import isMobile from '@/composables/isMobile'
import Shadow from '@/components/Shadow.vue'

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

onMounted(() => {
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
  <Teleport to="body">
    <Transition name="fade" mode="in-out" appear>
      <Shadow v-if="_isMobile && !sidebarRelated.collapsed" @shadowClick="sidebarRelated.collapsed = true">
        <Transition name="slide-left" mode="out-in" appear>
          <div class="block sidebar">
            <SideBar></SideBar>
          </div>
        </Transition>
      </Shadow>
    </Transition>
  </Teleport>
</template>

<style lang="postcss" scoped>
.sidebar {
  width: v-bind('sidebarRelated.width');
  height: 96vh;
  position: absolute;
  top: 2vh;
  left: 2vw;
  padding: 0;
}

:deep(.sidebar>.scrollbar) {
  padding-right: 1rem;
}
</style>
